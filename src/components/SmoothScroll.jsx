import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { LenisContext } from '../lib/lenis'

export function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    // Respect users who prefer reduced motion: keep native scrolling.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      smoothWheel: true,
      // Native momentum on touch devices already feels right; smoothing it adds lag.
      syncTouch: false,
    })

    setLenis(instance)

    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
