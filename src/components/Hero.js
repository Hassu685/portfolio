'use client'
import { useState, useEffect, useRef } from 'react'

const roles = [
  'Full Stack Developer',
  'Next.js Specialist',
  'UI/UX Enthusiast',
  'React Developer',
  'Node.js Engineer',
]

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  size: Math.random() * 2.5 + 1,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 12 + 8,
  delay: Math.random() * 6,
  opacity: Math.random() * 0.4 + 0.15,
}))

function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, isVisible }
}

function useCounter(target, duration = 1800, isVisible = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isVisible) return
    const start = performance.now()
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isVisible, target, duration])
  return count
}

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return width
}

function StatItem({ value, suffix, label, isVisible }) {
  const count = useCounter(value, 1800, isVisible)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <span style={{ fontWeight: 800, fontSize: '1.5rem', color: '#ffffff', lineHeight: 1 }}>
        {count}<span style={{ color: '#86efac' }}>{suffix}</span>
      </span>
      <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.4)', marginTop: 3, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  )
}

const stats = [
  { value: 50, suffix: '+', label: 'Projects' },
  { value: 3, suffix: '+', label: 'Years Exp' },
  { value: 20, suffix: '+', label: 'Clients' },
]

const socials = [
  {
    label: 'GitHub', href: 'https://github.com',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" /></svg>,
  },
  {
    label: 'LinkedIn', href: 'https://linkedin.com',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
  },
  {
    label: 'Twitter', href: 'https://twitter.com',
    svg: <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  },
  {
    label: 'Email', href: 'mailto:hassan@example.com',
    svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></svg>,
  },
]

export default function HeroEnhanced() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal(0.3)
  const windowWidth = useWindowWidth()

  const isMobile = windowWidth < 640
  const isTablet = windowWidth >= 640 && windowWidth < 1024

  const imgSize = isMobile ? 200 : isTablet ? 260 : 320
  const imgWidth = isMobile ? 220 : isTablet ? 300 : 360
  const imgHeight = isMobile ? 300 : isTablet ? 300 : 380

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const t = setInterval(() => setCursorVisible(v => !v), 530)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const current = roles[roleIndex]
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 68)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 2400)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32)
        return () => clearTimeout(t)
      } else {
        setRoleIndex(i => (i + 1) % roles.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, roleIndex])

  const py = scrollY * 0.3

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) scale(1); opacity: var(--op); }
          50% { transform: translateY(-14px) scale(1.05); opacity: calc(var(--op) * 1.5); }
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbitSpinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.08); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes borderPulse {
          0%, 100% { border-color: rgba(134,239,172,0.25); }
          50% { border-color: rgba(134,239,172,0.55); }
        }
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; opacity: 0; }
          40% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          60% { transform: scaleY(1); transform-origin: bottom; opacity: 1; }
          100% { transform: scaleY(0); transform-origin: bottom; opacity: 0; }
        }
        .fade-up { opacity: 0; animation: fadeSlideUp 0.65s ease forwards; }
        .gradient-name {
          background: linear-gradient(135deg, #86efac 0%, #4ade80 40%, #a3e635 70%, #86efac 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
          display: inline-block;
        }
        .glow-btn {
          position: relative; overflow: hidden;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .glow-btn:hover {
          box-shadow: 0 0 28px rgba(74,222,128,0.35), 0 8px 24px rgba(0,0,0,0.3);
          transform: translateY(-2px);
        }
        .glass-btn { transition: all 0.25s ease; cursor: pointer; }
        .glass-btn:hover {
          background: rgba(74,222,128,0.1) !important;
          border-color: rgba(74,222,128,0.5) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(74,222,128,0.12);
        }
        .social-icon { transition: all 0.2s ease; }
        .social-icon:hover {
          color: #86efac !important;
          border-color: rgba(134,239,172,0.5) !important;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(74,222,128,0.2);
        }
        .orbit-ring {
          position: absolute; border-radius: 9999px;
          border: 1px solid rgba(74,222,128,0.1);
          top: 50%; left: 50%;
          pointer-events: none;
        }
        .scroll-line { animation: scrollLine 2.2s ease-in-out infinite; }
        .available-dot { animation: pulseGlow 2s ease-in-out infinite; }
        .hero-layout {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2.5rem;
        }
        @media (max-width: 639px) {
          .hero-layout {
            flex-direction: column-reverse;
            align-items: center;
            text-align: center;
            gap: 2rem;
          }
          .hero-text { align-items: center; }
          .hero-badge, .hero-greeting, .hero-ctas, .hero-stats, .hero-socials { justify-content: center; }
          .hero-desc { margin-left: auto; margin-right: auto; }
          .chip-hide { display: none !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .hero-layout {
            flex-direction: column-reverse;
            align-items: center;
            gap: 2.5rem;
          }
          .hero-text { align-items: center; text-align: center; }
          .hero-badge, .hero-greeting, .hero-ctas, .hero-stats, .hero-socials { justify-content: center; }
          .hero-desc { margin-left: auto; margin-right: auto; }
        }
        @media (min-width: 1024px) {
          .hero-layout { flex-direction: row; }
          .hero-text { align-items: flex-start; }
        }
      `}</style>

      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000000',
      }}>

        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(74,222,128,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }} />

        {/* Ambient blobs */}
        <div style={{
          position: 'absolute', top: '15%', left: '10%',
          width: isMobile ? 300 : 600, height: isMobile ? 300 : 600,
          background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)',
          borderRadius: '9999px',
          transform: `translateY(${py * 0.4}px)`,
          transition: 'transform 0.08s linear',
          animation: 'pulseGlow 7s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '5%',
          width: isMobile ? 250 : 500, height: isMobile ? 250 : 500,
          background: 'radial-gradient(circle, rgba(74,222,128,0.08) 0%, transparent 70%)',
          borderRadius: '9999px',
          transform: `translateY(${-py * 0.25}px)`,
          transition: 'transform 0.08s linear',
          animation: 'pulseGlow 9s ease-in-out infinite 2s',
          pointerEvents: 'none',
        }} />

        {/* Particles */}
        {mounted && PARTICLES.map(p => (
          <div key={p.id} style={{
            position: 'absolute',
            width: p.size, height: p.size,
            left: `${p.x}%`, top: `${p.y}%`,
            borderRadius: '9999px',
            background: `rgba(134,239,172,${p.opacity})`,
            '--op': p.opacity,
            animation: `floatUp ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            transform: `translateY(${py * (0.08 + p.id * 0.006)}px)`,
            transition: 'transform 0.05s linear',
            pointerEvents: 'none',
          }} />
        ))}

        {/* Main wrapper */}
        <div style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: 1280, margin: '0 auto',
          padding: isMobile ? '88px 1.25rem 72px' : isTablet ? '100px 2.5rem 80px' : '96px 3rem 64px',
          transform: `translateY(${py * 0.5}px)`,
          transition: 'transform 0.05s linear',
          boxSizing: 'border-box',
        }}>
          <div className="hero-layout">

            {/* ── LEFT: text ── */}
            <div className="hero-text" style={{ display: 'flex', flexDirection: 'column', maxWidth: isMobile ? '100%' : isTablet ? 560 : 620, width: '100%' }}>

              {/* Badge */}
              <div className="fade-up hero-badge" style={{
                animationDelay: '0s',
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '6px 14px', borderRadius: 9999,
                background: 'rgba(74,222,128,0.08)',
                border: '1px solid rgba(74,222,128,0.25)',
                marginBottom: 22,
                alignSelf: 'flex-start',
                animation: 'fadeSlideUp 0.65s ease forwards, borderPulse 3s ease-in-out infinite 1s',
              }}>
                <span style={{ position: 'relative', display: 'inline-flex', width: 7, height: 7 }}>
                  <span className="available-dot" style={{ position: 'absolute', inset: 0, borderRadius: '9999px', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.6)' }} />
                  <span style={{ position: 'relative', width: 7, height: 7, borderRadius: '9999px', background: '#4ade80' }} />
                </span>
                <span style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(134,239,172,0.9)' }}>Available for work</span>
              </div>

              {/* Greeting */}
              <p className="fade-up hero-greeting" style={{
                animationDelay: '0.1s',
                fontFamily: 'monospace', fontSize: 13,
                color: 'rgba(255,255,255,0.55)', marginBottom: 8,
              }}>
                <span style={{ color: '#86efac' }}>{'>'}</span> Hello, I&apos;m
              </p>

              {/* Name */}
              <h1 className="fade-up" style={{
                animationDelay: '0.18s',
                fontWeight: 800,
                fontSize: isMobile ? '2.6rem' : isTablet ? '3.4rem' : 'clamp(3rem, 5vw, 4.2rem)',
                lineHeight: 0.95, letterSpacing: '-0.03em',
                color: '#ffffff', marginBottom: 16,
              }}>
                Hassan <span className="gradient-name">Yousuf</span>
              </h1>

              {/* Typewriter */}
              <div className="fade-up" style={{
                animationDelay: '0.26s',
                fontFamily: 'monospace',
                fontSize: isMobile ? '0.95rem' : '1.15rem',
                color: 'rgba(255,255,255,0.6)',
                marginBottom: 20, height: 32,
                display: 'flex', alignItems: 'center',
              }}>
                <span style={{
                  color: '#86efac',
                  borderRight: cursorVisible ? '2px solid #86efac' : '2px solid transparent',
                  paddingRight: 3,
                  transition: 'border-color 0.05s',
                }}>{displayed}</span>
              </div>

              {/* Description */}
              <p className="fade-up hero-desc" style={{
                animationDelay: '0.34s',
                color: 'rgba(255,255,255,0.5)',
                fontSize: isMobile ? '0.95rem' : '1rem',
                lineHeight: 1.75, marginBottom: 28,
                maxWidth: 500,
              }}>
                I build fast, beautiful, production-ready web applications. Passionate about clean code,
                great UX, and turning ideas into digital products people love.
              </p>

              {/* CTAs */}
              <div className="fade-up hero-ctas" style={{
                animationDelay: '0.42s',
                display: 'flex', flexWrap: 'wrap', gap: 10,
                marginBottom: 32,
              }}>
                <a href="#projects" className="glow-btn" style={{
                  padding: isMobile ? '11px 22px' : '12px 28px',
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  color: '#ffffff', fontWeight: 600,
                  fontSize: isMobile ? 13 : 14,
                  textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  letterSpacing: '0.01em',
                }}>
                  View My Work <span style={{ opacity: 0.75 }}>→</span>
                </a>
                <a href="#contact" className="glass-btn" style={{
                  padding: isMobile ? '11px 22px' : '12px 28px',
                  borderRadius: 12,
                  border: '1px solid rgba(74,222,128,0.25)',
                  background: 'rgba(74,222,128,0.05)',
                  color: '#ffffff', fontWeight: 500,
                  fontSize: isMobile ? 13 : 14,
                  textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                }}>
                  Get In Touch <span style={{ opacity: 0.5 }}>✉</span>
                </a>
              </div>

              {/* Stats */}
              <div ref={statsRef} className="fade-up hero-stats" style={{
                animationDelay: '0.5s',
                display: 'flex', alignItems: 'center',
                gap: isMobile ? 20 : 28,
                marginBottom: 28,
              }}>
                {stats.map((s, i) => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: isMobile ? 20 : 28 }}>
                    <StatItem {...s} isVisible={statsVisible} />
                    {i < stats.length - 1 && (
                      <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.1)' }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="fade-up hero-socials" style={{
                animationDelay: '0.58s',
                display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
              }}>
                {socials.map(({ label, href, svg }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={label} className="social-icon"
                    style={{
                      width: 38, height: 38, borderRadius: 9,
                      background: 'rgba(74,222,128,0.06)',
                      border: '1px solid rgba(74,222,128,0.18)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                    }}>
                    {svg}
                  </a>
                ))}
                <div style={{ width: 1, height: 22, background: 'rgba(255,255,255,0.1)', margin: '0 2px' }} />
                <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
                  hassan.yousuf.dev
                </span>
              </div>
            </div>

            {/* ── RIGHT: Profile image ── */}
            <div className="fade-up" style={{
              animationDelay: '0.28s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <div style={{ position: 'relative', width: imgSize, height: imgSize }}>

                {/* Orbit rings */}
                {!isMobile && [
                  { size: imgSize + 80, dur: '18s', dir: 'orbitSpin' },
                  { size: imgSize + 140, dur: '26s', dir: 'orbitSpinReverse' },
                ].map((r, i) => (
                  <div key={i} className="orbit-ring" style={{
                    width: r.size, height: r.size,
                    borderStyle: 'dashed',
                    borderColor: `rgba(74,222,128,${0.1 - i * 0.03})`,
                    transform: 'translate(-50%, -50%)',
                    animation: `${r.dir} ${r.dur} linear infinite`,
                  }}>
                    <div style={{
                      position: 'absolute', top: -4, left: '50%',
                      transform: 'translateX(-50%)',
                      width: 6, height: 6, borderRadius: '9999px',
                      background: i === 0 ? '#86efac' : '#4ade80',
                      boxShadow: `0 0 10px ${i === 0 ? '#86efac' : '#4ade80'}`,
                    }} />
                  </div>
                ))}

                {/* Glow */}
                <div style={{
                  position: 'absolute', inset: -20,
                  borderRadius: '9999px',
                  background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)',
                  animation: 'pulseGlow 4s ease-in-out infinite',
                  pointerEvents: 'none',
                }} />

                {/* Spinning conic rings */}
                <div style={{
                  position: 'absolute', inset: -4, borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, rgba(74,222,128,0.9), transparent 45%, rgba(34,197,94,0.6), transparent 70%, rgba(74,222,128,0.9))',
                  animation: 'orbitSpin 4.5s linear infinite',
                }} />
                <div style={{
                  position: 'absolute', inset: -2, borderRadius: '50%',
                  background: 'conic-gradient(from 180deg, rgba(34,197,94,0.5), transparent 55%, rgba(74,222,128,0.3), transparent 75%)',
                  animation: 'orbitSpinReverse 7s linear infinite',
                }} />

                {/* Image */}
                <div style={{
                  position: 'relative',
                  width: imgWidth, height: imgHeight,
                  overflow: 'hidden',
                  border: '2px solid rgba(74,222,128,0.35)',
                  background: 'linear-gradient(160deg, #0a1a0a, #000000)',
                }}>
                  <img src="/profile.png" alt="Hassan Yousuf"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(160deg, transparent 50%, rgba(0,10,0,0.3) 100%)',
                    pointerEvents: 'none',
                  }} />
                </div>

                {/* Open to work badge */}
                <div style={{
                  position: 'absolute', bottom: isMobile ? -80 : -48, left: '50%',
                  transform: 'translateX(-40%)',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: isMobile ? '5px 12px' : '7px 16px',
                  borderRadius: 9999,
                  background: 'rgba(0,0,0,0.9)',
                  border: '1px solid rgba(74,222,128,0.35)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
                }}>
                  <span style={{ position: 'relative', display: 'inline-flex', width: 6, height: 6 }}>
                    <span className="available-dot" style={{ position: 'absolute', inset: 0, borderRadius: '9999px', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.7)' }} />
                    <span style={{ position: 'relative', width: 6, height: 6, borderRadius: '9999px', background: '#4ade80' }} />
                  </span>
                  <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Open to work</span>
                </div>

                {/* Skill chips */}
                {!isMobile && [
                  { label: 'Next.js', top: '5%', right: `${-imgSize * 0.22}px`, color: '#86efac', delay: '0s' },
                  { label: 'React', bottom: '20%', right: `${-imgSize * 0.24}px`, color: '#4ade80', delay: '1.2s' },
                  { label: 'Node.js', top: '22%', left: `${-imgSize * 0.24}px`, color: '#a3e635', delay: '0.6s' },
                ].map(chip => (
                  <div key={chip.label} style={{
                    position: 'absolute',
                    top: chip.top, bottom: chip.bottom,
                    left: chip.left, right: chip.right,
                    padding: '4px 12px', borderRadius: 9999,
                    background: 'rgba(0,0,0,0.88)',
                    border: '1px solid rgba(74,222,128,0.25)',
                    backdropFilter: 'blur(8px)',
                    fontSize: 10, fontFamily: 'monospace',
                    color: chip.color, letterSpacing: '0.05em', fontWeight: 600,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                    animation: 'floatUp 5s ease-in-out infinite',
                    animationDelay: chip.delay,
                    '--op': 1,
                    whiteSpace: 'nowrap',
                    zIndex: 20,
                  }}>
                    {chip.label}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 24, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          opacity: 0, animation: 'fadeSlideUp 0.7s ease 1.4s forwards',
        }}>
          <span style={{ fontSize: 8, fontFamily: 'monospace', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>scroll</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 1, height: 28, background: 'linear-gradient(to bottom, transparent, rgba(74,222,128,0.7), rgba(74,222,128,0.3))' }} className="scroll-line" />
            <svg viewBox="0 0 10 6" width="9" style={{ color: 'rgba(74,222,128,0.55)', animation: 'floatUp 1.6s ease-in-out infinite', '--op': 1 }}>
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </div>

      </section>
    </>
  )
}