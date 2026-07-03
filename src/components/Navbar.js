'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the link for whichever section is in view.
  // Only in-page hash links (#about, #skills, ...) participate — 'Home'
  // isn't a section on the page, so it's handled separately below.
  useEffect(() => {
    const hashLinks = links.filter((l) => l.href.startsWith('#'))
    const sections = hashLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean)

    if (sections.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = hashLinks.find((l) => l.href === `#${entry.target.id}`)
            if (match) setActive(match.label)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((s) => obs.observe(s))

    // Above the first section (top of page) → treat as 'Home'
    const firstSection = sections[0]
    const homeObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.top > 0) setActive('Home')
      },
      { rootMargin: '0px', threshold: 0 }
    )
    if (firstSection) homeObs.observe(firstSection)

    return () => { obs.disconnect(); homeObs.disconnect() }
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'py-3 bg-black/85 backdrop-blur-xl border-b border-green-900/30'
          : 'py-6 bg-transparent border-b border-transparent'
        }`}
    >
      <div className="w-full mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a
          href="/"
          onClick={() => setActive('Home')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-bold text-sm bg-green-400 text-black transition-transform duration-300 group-hover:-rotate-6">
            H
          </div>
          <span className="font-display font-semibold text-sm tracking-wide text-white hidden sm:block">
            Hassan<span className="text-green-400">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = active === link.label
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActive(link.label)}
                className={`relative px-4 py-2 rounded-lg text-sm font-body transition-all duration-300 ${isActive
                    ? 'text-green-400 bg-green-400/[0.08]'
                    : 'text-white/45 hover:text-white hover:bg-white/[0.05]'
                  }`}
              >
                {link.label}
                <span
                  className={`absolute left-4 right-4 -bottom-px h-px bg-green-400 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              </a>
            )
          })}
        </div>

        {/* Contact button */}
        <a
          href="#contact"
          onClick={() => setActive('Contact')}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-display font-medium text-black bg-green-400 transition-all duration-300 hover:bg-green-300 hover:-translate-y-0.5"
        >
          Contact me
        </a>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="md:hidden p-2 rounded-lg text-white/60 transition-all duration-300 hover:text-white hover:bg-white/[0.06]"
        >
          <span className="relative block w-5 h-5">
            <Menu
              size={20}
              className={`absolute inset-0 transition-all duration-300 ${open ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'}`}
            />
            <X
              size={20}
              className={`absolute inset-0 transition-all duration-300 ${open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`}
            />
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${open ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="mx-4 rounded-xl p-4 flex flex-col gap-1 bg-[#0a0a0a] border border-green-900/30">
          {links.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => { setOpen(false); setActive(link.label) }}
              className={`px-4 py-3 rounded-lg text-sm font-body transition-all duration-300 ${active === link.label
                  ? 'text-green-400 bg-green-400/[0.08]'
                  : 'text-white/50 hover:text-white hover:bg-white/[0.05]'
                }`}
              style={{ transitionDelay: open ? `${idx * 40}ms` : '0ms' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => { setOpen(false); setActive('Contact') }}
            className="mt-2 px-4 py-3 rounded-lg text-sm font-display font-medium text-center text-black bg-green-400 transition-all duration-300 hover:bg-green-300"
          >
            Contact me
          </a>
        </div>
      </div>
    </nav>
  )
}