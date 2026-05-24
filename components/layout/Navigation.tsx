'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/experience', label: 'Experience' },
  { href: '/reservations', label: 'Reservations' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-700 ${
          scrolled ? 'bg-obsidian/95 backdrop-blur-md py-4 border-b border-gold/10' : 'py-8'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl tracking-[0.3em] text-gold font-light">
            ZAFRAN
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link font-body text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 ${
                    pathname === link.href ? 'text-gold' : 'text-ivory-dim hover:text-ivory'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/reservations"
            className="hidden md:block font-body text-xs tracking-[0.2em] uppercase border border-gold/50 text-gold px-6 py-3 hover:bg-gold hover:text-obsidian transition-all duration-300"
          >
            Reserve
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-3 min-h-[44px] min-w-[44px] items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block h-[1px] w-6 bg-ivory transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2.5' : ''}`} />
            <span className={`block h-[1px] w-6 bg-ivory transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[1px] w-6 bg-ivory transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="mobile-menu-overlay flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className="font-display text-5xl text-ivory hover:text-gold transition-colors duration-300 py-2 block"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 text-center"
            >
              <p className="font-body text-xs tracking-[0.3em] text-ivory-dim uppercase">Where Two Civilizations Dine</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
