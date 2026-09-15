import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { scrollToTarget, useLenis, useScrollLock } from '../lib/lenis'

const links = [
  { label: 'Story', target: 'story' },
  { label: 'Craftsmanship', target: 'craft' },
  { label: 'Collection', target: 'collection' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [isPassedFrames, setIsPassedFrames] = useState(false)
  const lenis = useLenis()

  useScrollLock(open)

  useEffect(() => {
    const handleScroll = () => {
      const isMobileView = window.innerWidth < 1024

      if (isMobileView) {
        // On mobile, transition header background as soon as user scrolls down past 30px
        setIsPassedFrames(window.scrollY > 30)
      } else {
        // On desktop, transition header background after completing 3D scroll sequence
        const topElem = document.getElementById('top')
        if (!topElem) return
        const rect = topElem.getBoundingClientRect()
        const passed = rect.bottom <= window.innerHeight + 40
        setIsPassedFrames(passed)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const goTo = (target) => {
    setOpen(false)
    const storyId = window.innerWidth >= 1024 ? 'story-desktop' : 'story'
    const targetId = target === 'story' ? storyId : target
    const node = document.getElementById(targetId) ?? document.getElementById(target)

    scrollToTarget(lenis, node)
  }

  const isSolidHeader = isPassedFrames || open

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-80 h-14 md:h-16 text-ink transition-all duration-500 ease-out ${
          isSolidHeader
            ? 'border-b border-gold/30 bg-[#FDFBF7]/92 shadow-md backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent shadow-none backdrop-blur-none'
        }`}
      >
        <div className="section-wrap flex h-full items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <button onClick={() => goTo('top')} className="focus-ring flex items-center gap-2 sm:gap-3 active:opacity-70" aria-label="Ambot365 home">
            <img src="/ambot-logo.webp" width="96" height="96" alt="Ambot365 Logo" className="h-6 w-auto object-contain sm:h-7 md:h-8" />
            <span className="font-display text-xs font-semibold tracking-[0.18em] sm:text-sm sm:tracking-[0.25em] md:text-[16px] text-ink">
              AMBOT365
            </span>
          </button>

          {/* Navigation Links Desktop */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {links.map((link) => (
              <button
                key={link.target}
                onClick={() => goTo(link.target)}
                className="focus-ring min-h-9 px-3.5 font-display text-xs tracking-wider text-ink/75 transition-colors hover:text-accent active:opacity-70"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Call to Action */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Desktop Only Book Button */}
            <button
              onClick={() => goTo('contact')}
              className="focus-ring hidden md:flex items-center gap-1.5 min-h-10 px-5 text-xs rounded-full bg-ink font-display font-semibold text-surface transition-transform hover:bg-accent active:scale-95 shadow-sm"
            >
              <span>Book</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger Menu Icon */}
            <button
              onClick={() => setOpen((value) => !value)}
              className="focus-ring grid size-10 place-items-center rounded-full border border-ink/20 text-ink active:scale-95 md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay Menu */}
      {open && (
          <div className="fixed inset-0 z-70 bg-surface px-6 pt-20 text-ink md:hidden">
            <nav className="mx-auto flex max-w-xl flex-col border-t border-ink/15" aria-label="Mobile navigation">
              {links.map((link, index) => (
                <button
                  key={link.target}
                  onClick={() => goTo(link.target)}
                  className="focus-ring flex min-h-16 items-center justify-between border-b border-ink/15 text-left font-serif text-[26px] active:opacity-70 text-ink"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-accent">0{index + 1}</span>
                </button>
              ))}

              {/* Book CTA Button Inside Mobile Menu */}
              <button
                onClick={() => goTo('contact')}
                className="focus-ring mt-6 flex min-h-13 w-full items-center justify-between rounded-full bg-ink px-6 font-display text-sm font-semibold uppercase tracking-wider text-surface transition-transform active:scale-95 shadow-md"
              >
                <span>Book Commission</span>
                <ArrowUpRight size={18} />
              </button>
            </nav>

            <div className="mx-auto mt-8 max-w-xl">
              <p className="label text-ink/50">Bespoke Furniture · London Studio</p>
              <p className="mt-2 text-xs text-ink/70">48 Foundry Lane, EC1 · info@ambot365.com</p>
            </div>
          </div>
        )}
    </>
  )
}
