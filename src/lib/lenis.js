import { createContext, useContext, useEffect } from 'react'

export const LenisContext = createContext(null)

export function useLenis() {
  return useContext(LenisContext)
}

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4)

/** Scroll to an element, using Lenis when active and falling back to native scrolling. */
export function scrollToTarget(lenis, node) {
  if (!node) return

  if (lenis) {
    // Callers often close a menu/modal in the same tick; resume first, since a later start() would cancel the animation.
    lenis.start()
    // Lenis honours `scroll-padding-top` on <html>, which already clears the fixed navbar.
    lenis.scrollTo(node, { duration: 1.4, easing: easeOutQuart })
    return
  }

  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  node.scrollIntoView({ behavior, block: 'start' })
}

/** Freeze page scrolling while `locked` is true (menus, modals). */
export function useScrollLock(locked) {
  const lenis = useLenis()

  useEffect(() => {
    if (!locked) return undefined
    document.body.style.overflow = 'hidden'
    lenis?.stop()
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [locked, lenis])
}
