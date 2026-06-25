'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        paddingTop: scrolled ? '12px' : '24px',
        paddingBottom: scrolled ? '12px' : '24px',
        backgroundColor: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid #1f1f1f' : 'none',
      }}
    >
      <div className="w-full mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ backgroundColor: '#86efac', color: '#000000' }}
          >
            H
          </div>
          <span className="font-semibold text-sm tracking-wide hidden sm:block" style={{ color: '#ffffff' }}>
            Hassan<span style={{ color: '#86efac' }}>.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActive(link.label)}
              className="px-4 py-2 rounded-lg text-sm transition-all duration-200"
              style={{
                color: active === link.label ? '#86efac' : '#71717a',
                backgroundColor: active === link.label ? 'rgba(134,239,172,0.08)' : 'transparent',
              }}
              onMouseEnter={e => {
                if (active !== link.label) {
                  e.currentTarget.style.color = '#ffffff'
                  e.currentTarget.style.backgroundColor = '#111111'
                }
              }}
              onMouseLeave={e => {
                if (active !== link.label) {
                  e.currentTarget.style.color = '#71717a'
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Hire Me button */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{ backgroundColor: '#86efac', color: '#000000' }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#4ade80'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#86efac'}
        >
          Contact me
        </a>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg transition-all"
          style={{ color: '#71717a' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.backgroundColor = '#111111' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#71717a'; e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="md:hidden mt-2 mx-4 rounded-xl p-4 flex flex-col gap-1"
          style={{ backgroundColor: '#0a0a0a', border: '1px solid #1f1f1f' }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => { setOpen(false); setActive(link.label) }}
              className="px-4 py-3 rounded-lg text-sm transition-all"
              style={{ color: '#71717a' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.backgroundColor = '#111111' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#71717a'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 px-4 py-3 rounded-lg text-sm font-medium text-center transition-all"
            style={{ backgroundColor: '#86efac', color: '#000000' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#4ade80'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#86efac'}
          >
            Contact Me
          </a>
        </div>
      )}
    </nav>
  )
}