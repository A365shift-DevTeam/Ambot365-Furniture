import { useCallback, useEffect, useRef, useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import { frameUrl } from '../lib/frames'

const FRAME_COUNT = 120
const MILESTONE_STEP = 10
const MOBILE_FRAME_STEP = 2
// Delivered frame width: native 1440 on desktop, 1080 is plenty for phones/tablets.
const DESKTOP_FRAME_WIDTH = 1440
const MOBILE_FRAME_WIDTH = 1080

export function ProductPackScroll({ mobileContent }) {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const loadedMapRef = useRef(new Uint8Array(FRAME_COUNT))
  const currentFrameRef = useRef(0)
  const loadImageRef = useRef(null)
  const [canvasReady, setCanvasReady] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const isMobile = useIsMobile()

  const getClosestLoadedFrame = useCallback((targetIndex) => {
    if (loadedMapRef.current[targetIndex]) return targetIndex

    for (let delta = 1; delta < FRAME_COUNT; delta++) {
      const prev = targetIndex - delta
      if (prev >= 0 && loadedMapRef.current[prev]) return prev

      const next = targetIndex + delta
      if (next < FRAME_COUNT && loadedMapRef.current[next]) return next
    }

    return 0
  }, [])

  const draw = useCallback((requestedIndex = currentFrameRef.current) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const actualIndex = getClosestLoadedFrame(requestedIndex)
    const image = imagesRef.current[actualIndex]
    if (!image || !image.complete) return

    const context = canvas.getContext('2d', { alpha: false })
    const bounds = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const width = Math.max(1, Math.round(bounds.width * dpr))
    const height = Math.max(1, Math.round(bounds.height * dpr))

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0)
    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = 'high'
    context.fillStyle = '#faf7f2'
    context.fillRect(0, 0, bounds.width, bounds.height)

    const scale = isMobile
      ? Math.min(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight)
      : Math.max(bounds.width / image.naturalWidth, bounds.height / image.naturalHeight)
    const drawWidth = image.naturalWidth * scale
    const drawHeight = image.naturalHeight * scale
    const x = (bounds.width - drawWidth) / 2
    const y = isMobile ? 0 : (bounds.height - drawHeight) / 2

    context.drawImage(image, x, y, drawWidth, drawHeight)
    setCanvasReady(true)
  }, [getClosestLoadedFrame, isMobile])

  useEffect(() => {
    let active = true
    let started = false

    imagesRef.current = new Array(FRAME_COUNT)
    loadedMapRef.current = new Uint8Array(FRAME_COUNT)
    currentFrameRef.current = 0
    setCanvasReady(false)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      loadImageRef.current = null
      return () => { active = false }
    }

    const handleImageLoad = (index) => {
      if (!active) return
      loadedMapRef.current[index] = 1

      if (index === currentFrameRef.current) {
        draw(index)
      }
    }

    const loadImage = (index, priority = 'auto') => {
      if (imagesRef.current[index]) return imagesRef.current[index]

      const img = new Image()
      img.decoding = 'async'
      if ('fetchPriority' in img) img.fetchPriority = priority
      img.onload = () => handleImageLoad(index)
      img.src = frameUrl(index, { width: isMobile ? MOBILE_FRAME_WIDTH : DESKTOP_FRAME_WIDTH })
      imagesRef.current[index] = img

      return img
    }

    loadImageRef.current = loadImage

    const startMilestoneLoading = (priority = 'low') => {
      loadImage(0, priority)

      for (let i = MILESTONE_STEP; i < FRAME_COUNT; i += MILESTONE_STEP) {
        loadImage(i, priority)
      }
    }

    const startBatchedLoading = () => {
      const remainingIndices = []
      const frameStep = isMobile ? MOBILE_FRAME_STEP : 1

      for (let i = 0; i < FRAME_COUNT; i += frameStep) {
        if (i % MILESTONE_STEP !== 0) remainingIndices.push(i)
      }

      let batchOffset = 0
      const batchSize = isMobile ? 4 : 8

      const loadNextBatch = () => {
        if (!active || batchOffset >= remainingIndices.length) return

        const batch = remainingIndices.slice(batchOffset, batchOffset + batchSize)
        batch.forEach((idx) => loadImage(idx, 'low'))
        batchOffset += batchSize

        if (batchOffset < remainingIndices.length) {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(loadNextBatch, { timeout: 400 })
          } else {
            setTimeout(loadNextBatch, 80)
          }
        }
      }

      loadNextBatch()
    }

    const startFrameLoading = (priority = 'low') => {
      if (started) return
      started = true
      startMilestoneLoading(priority)
      startBatchedLoading()
    }

    const startOnIntent = () => startFrameLoading('high')

    if (isMobile) {
      window.addEventListener('scroll', startOnIntent, { once: true, passive: true })
      window.addEventListener('touchstart', startOnIntent, { once: true, passive: true })
      window.addEventListener('pointerdown', startOnIntent, { once: true, passive: true })
    } else {
      startMilestoneLoading('high')

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => startFrameLoading('low'), { timeout: 800 })
      } else {
        setTimeout(() => startFrameLoading('low'), 250)
      }
    }

    return () => {
      active = false
      loadImageRef.current = null
      window.removeEventListener('scroll', startOnIntent)
      window.removeEventListener('touchstart', startOnIntent)
      window.removeEventListener('pointerdown', startOnIntent)
    }
  }, [draw, isMobile])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const observer = new ResizeObserver(() => draw())
    observer.observe(canvas)

    return () => observer.disconnect()
  }, [draw])

  useEffect(() => {
    let rafId = 0

    const updateFrameFromScroll = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const scrollDistance = Math.max(1, rect.height - window.innerHeight)
      const progress = Math.min(1, Math.max(0, -rect.top / scrollDistance))
      const rawFrame = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT))
      const frameStep = isMobile ? MOBILE_FRAME_STEP : 1
      const nextFrame = Math.min(FRAME_COUNT - 1, Math.round(rawFrame / frameStep) * frameStep)
      const shouldRequestFrame = !isMobile || progress > 0.005

      const isScrolled = progress > 0.005
      setHasScrolled((prev) => (prev !== isScrolled ? isScrolled : prev))

      if (shouldRequestFrame && loadImageRef.current && !loadedMapRef.current[nextFrame]) {
        loadImageRef.current(nextFrame, 'high')
      }

      if (nextFrame !== currentFrameRef.current) {
        currentFrameRef.current = nextFrame
        cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(() => draw(nextFrame))
      }
    }

    updateFrameFromScroll()
    window.addEventListener('scroll', updateFrameFromScroll, { passive: true })
    window.addEventListener('resize', updateFrameFromScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', updateFrameFromScroll)
      window.removeEventListener('resize', updateFrameFromScroll)
    }
  }, [draw, isMobile])

  return (
    <section id="top" ref={containerRef} className="relative h-[550vh] bg-surface lg:h-[500vh]" aria-label="Ambot365 chair in motion">
      <div className="sticky top-0 h-[100dvh]">
        <div className="relative w-full bg-surface lg:h-full">
          <picture>
            <source media="(max-width: 767px)" srcSet="/hero-default-720.webp" type="image/webp" />
            <source media="(min-width: 768px)" srcSet="/hero-default-1440.webp" type="image/webp" />
            <img
              src="/hero-default-1440.webp"
              width="2752"
              height="1536"
              alt="Ambot365 signature lounge chair in a warm furniture studio"
              className="block aspect-video w-full object-contain object-top lg:h-full lg:aspect-auto lg:object-cover lg:object-center"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 block h-full w-full touch-none transition-opacity duration-500 ${canvasReady && hasScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            aria-hidden="true"
          />
        </div>
        <div id="story" className="lg:hidden">{mobileContent}</div>
      </div>
    </section>
  )
}
