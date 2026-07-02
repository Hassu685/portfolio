'use client'
import { useRef, useEffect, useState } from 'react'

function useInView() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const check = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      if (rect.top < window.innerHeight + 100) { setVisible(true); return true }
      return false
    }
    if (check()) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0, rootMargin: '100px' }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return w
}

// Animated count-up for the stat numbers (parses leading number, keeps suffix like "+", "%")
function useCountUp(value, active, duration = 1400, delay = 0) {
  const [display, setDisplay] = useState(value.replace(/[0-9.]+/, '0'))
  useEffect(() => {
    if (!active) return
    const match = value.match(/([0-9.]+)/)
    if (!match) { setDisplay(value); return }
    const target = parseFloat(match[1])
    const suffix = value.slice(match.index + match[0].length)
    const prefix = value.slice(0, match.index)
    let raf
    let start
    const timer = setTimeout(() => {
      const tick = (ts) => {
        if (!start) start = ts
        const p = Math.min(1, (ts - start) / duration)
        const eased = 1 - Math.pow(1 - p, 3) // ease-out-cubic
        const current = (target * eased)
        const formatted = Number.isInteger(target) ? Math.round(current) : current.toFixed(1)
        setDisplay(`${prefix}${formatted}${suffix}`)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay * 1000)
    return () => { clearTimeout(timer); if (raf) cancelAnimationFrame(raf) }
  }, [active, value, duration, delay])
  return display
}

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '20+', label: 'Projects Built' },
  { value: '15+', label: 'Happy Clients' },
  { value: '99%', label: 'Satisfaction' },
]

const traits = [
  {
    title: 'Clean Code',
    desc: 'Readable, maintainable, and scalable — every line has a purpose.',
    svg: <svg viewBox="0 0 20 20" fill="none" width="15" height="15" stroke="#86efac" strokeWidth="1.7" strokeLinecap="round"><path d="M6 7l-4 3 4 3M14 7l4 3-4 3M11 4l-2 12" /></svg>,
  },
  {
    title: 'Problem Solver',
    desc: 'Complex challenges become clean, elegant solutions.',
    svg: <svg viewBox="0 0 20 20" fill="none" width="15" height="15" stroke="#86efac" strokeWidth="1.7" strokeLinecap="round"><circle cx="10" cy="10" r="3" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" /></svg>,
  },
  {
    title: 'Fast Delivery',
    desc: 'On-time, every time — quality never sacrificed for speed.',
    svg: <svg viewBox="0 0 20 20" fill="none" width="15" height="15" stroke="#86efac" strokeWidth="1.7" strokeLinecap="round"><path d="M3 10h10M10 6l4 4-4 4" /><path d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" /></svg>,
  },
  {
    title: 'Passion Driven',
    desc: 'Every project gets my full attention, heart, and craft.',
    svg: <svg viewBox="0 0 20 20" fill="#86efac" width="15" height="15"><path d="M10 17s-7-4.5-7-9a4 4 0 0 1 7-2.65A4 4 0 0 1 17 8c0 4.5-7 9-7 9z" /></svg>,
  },
]

const codeLines = [
  [{ t: 'const ', c: '#86efac' }, { t: 'developer', c: '#4ade80' }, { t: ' = {', c: '#ffffff' }],
  [{ t: '  name', c: '#86efac' }, { t: ': ', c: '#ffffff' }, { t: "'Hassan Yousuf'", c: '#bbf7d0' }, { t: ',', c: '#ffffff' }],
  [{ t: '  location', c: '#86efac' }, { t: ': ', c: '#ffffff' }, { t: "'Pakistan 🇵🇰'", c: '#bbf7d0' }, { t: ',', c: '#ffffff' }],
  [{ t: '  available', c: '#86efac' }, { t: ': ', c: '#ffffff' }, { t: 'true', c: '#4ade80' }, { t: ',', c: '#ffffff' }],
  [{ t: '  passion', c: '#86efac' }, { t: ': ', c: '#ffffff' }, { t: "'Building great things'", c: '#bbf7d0' }, { t: ',', c: '#ffffff' }],
  [{ t: '}', c: '#ffffff' }],
]

function StatCard({ value, label, visible, delay }) {
  const display = useCountUp(value, visible, 1300, delay)
  return (
    <div className="stat-card" style={{
      padding: 'var(--stat-pad, 1.8rem 1.2rem)',
      borderRadius: 16,
      background: 'rgba(10,10,10,.9)',
      border: '1px solid rgba(74,222,128,.18)',
      backdropFilter: 'blur(12px)',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(0,0,0,.28)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(14px)',
      transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s, box-shadow .25s ease, translate .25s ease`,
    }}>
      <div className="stat-sheen" />
      <div className="gval" style={{ fontWeight: 800, fontSize: 'var(--stat-val-size, 2.4rem)', lineHeight: 1, marginBottom: 7, position: 'relative' }}>
        {display}
      </div>
      <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,.5)', letterSpacing: '.03em', position: 'relative' }}>{label}</div>
    </div>
  )
}

export default function About() {
  const { ref, visible } = useInView()
  const w = useWindowWidth()
  const isMobile = w < 640
  const isTablet = w >= 640 && w < 1024

  const anim = (name, delay = 0) => visible
    ? { animation: `${name} .75s cubic-bezier(.16,1,.3,1) ${delay}s both` }
    : { opacity: 0, pointerEvents: 'none' }

  return (
    <>
      <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeLeft { from { opacity:0; transform:translateX(-32px) } to { opacity:1; transform:translateX(0) } }
        @keyframes fadeRight{ from { opacity:0; transform:translateX(32px) } to { opacity:1; transform:translateX(0) } }
        @keyframes popIn    { from { opacity:0; transform:scale(0.88) translateY(14px) } to { opacity:1; transform:scale(1) translateY(0) } }
        @keyframes lineIn   { from { opacity:0; transform:translateX(-8px) } to { opacity:1; transform:translateX(0) } }
        @keyframes shimmer  { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes drift1   { 0%,100%{ transform:translate(0,0) scale(1) } 50%{ transform:translate(-16px,22px) scale(1.08) } }
        @keyframes drift2   { 0%,100%{ transform:translate(0,0) scale(1) } 50%{ transform:translate(18px,-14px) scale(1.05) } }
        @keyframes underlineGrow { from { transform:scaleX(0) } to { transform:scaleX(1) } }
        @keyframes sheen    { 0%{ transform:translateX(-120%) skewX(-15deg) } 100%{ transform:translateX(220%) skewX(-15deg) } }
        @keyframes ringPulse{ 0%{ box-shadow:0 0 0 0 rgba(74,222,128,.35) } 70%{ box-shadow:0 0 0 10px rgba(74,222,128,0) } 100%{ box-shadow:0 0 0 0 rgba(74,222,128,0) } }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }

        .trait-card {
          position: relative;
          box-shadow: 0 4px 16px rgba(0,0,0,.28);
          transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s cubic-bezier(.16,1,.3,1), border-color .3s ease, background .3s ease;
        }
        .trait-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 38px rgba(0,0,0,.6), 0 0 0 1px rgba(74,222,128,.32);
          border-color: rgba(74,222,128,.45) !important;
          background: rgba(74,222,128,.08) !important;
        }
        .trait-icon-wrap { transition: transform .3s cubic-bezier(.34,1.56,.64,1), background .3s ease; }
        .trait-card:hover .trait-icon-wrap { transform: rotate(-6deg) scale(1.08); background: rgba(74,222,128,.22) !important; }

        .stat-card { will-change: transform; }
        .stat-card:hover {
          transform: translateY(-6px) scale(1.025) !important;
          box-shadow: 0 18px 46px rgba(0,0,0,.65), 0 0 0 1px rgba(74,222,128,.4);
          border-color: rgba(74,222,128,.4) !important;
        }
        .stat-sheen {
          position: absolute; top: 0; left: 0; height: 100%; width: 40%;
          background: linear-gradient(100deg, transparent, rgba(74,222,128,.14), transparent);
          pointer-events: none; opacity: 0; transform: translateX(-120%) skewX(-15deg);
        }
        .stat-card:hover .stat-sheen { opacity: 1; animation: sheen 1.1s ease; }

        .gval {
          background: linear-gradient(135deg,#86efac 0%,#4ade80 50%,#86efac 100%);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer 4s ease infinite;
        }
        .gradient-text {
          background: linear-gradient(135deg,#86efac 0%,#4ade80 50%,#86efac 100%);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text;
          animation: shimmer 4s ease infinite;
          position: relative;
        }
        .gradient-underline {
          position: absolute; left: 1px; right: 1px; bottom: -3px; height: 2px;
          background: linear-gradient(90deg,#4ade80,#86efac);
          transform-origin: left center;
          animation: underlineGrow .8s cubic-bezier(.16,1,.3,1) .6s both;
          border-radius: 2px;
        }

        .hire-btn { transition: transform .25s cubic-bezier(.16,1,.3,1), box-shadow .25s ease, filter .25s ease; }
        .hire-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(74,222,128,.45); filter: brightness(1.08); }
        .hire-btn:active { transform: translateY(-1px) scale(.98); }

        .cv-btn { transition: transform .25s cubic-bezier(.16,1,.3,1), background .25s ease, border-color .25s ease; }
        .cv-btn:hover { transform: translateY(-3px); background: rgba(74,222,128,.14) !important; border-color: rgba(74,222,128,.55) !important; }
        .cv-btn:active { transform: translateY(-1px) scale(.98); }

        .code-block { transition: box-shadow .3s ease, border-color .3s ease; }
        .code-block:hover { border-color: rgba(74,222,128,.32) !important; box-shadow: 0 12px 40px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.04); }

        .dot-glow { animation: ringPulse 2.6s ease infinite; }

        .about-grid { display:grid; gap:2.6rem; align-items:start; }
        @media(min-width:1024px){ .about-grid{ grid-template-columns:1fr 1fr; align-items:center; } }
        .traits-grid { display:grid; grid-template-columns:1fr 1fr; gap:.8rem; margin-top:1.6rem; }
        @media(max-width:380px){ .traits-grid{ grid-template-columns:1fr; } }
        .stats-grid { display:grid; grid-template-columns:1fr 1fr; gap:.9rem; }
      `}</style>

      <section
        id="about"
        ref={ref}
        style={{
          padding: isMobile ? '3.5rem 0 4.5rem' : '5.5rem 0 6.5rem',
          position: 'relative',
          overflow: 'hidden',
          background: '#000000',
        }}
      >
        {/* bg accents — same theme, gentle ambient drift added */}
        <div style={{
          position: 'absolute', top: '20%', right: '-8%', width: 380, height: 380,
          background: 'radial-gradient(circle,rgba(74,222,128,.06) 0%,transparent 70%)',
          borderRadius: '9999px', pointerEvents: 'none',
          animation: 'drift1 14s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', left: '-6%', width: 300, height: 300,
          background: 'radial-gradient(circle,rgba(74,222,128,.045) 0%,transparent 70%)',
          borderRadius: '9999px', pointerEvents: 'none',
          animation: 'drift2 17s ease-in-out infinite',
        }} />

        <div style={{ maxWidth: 1180, margin: '0 auto', padding: isMobile ? '0 1.2rem' : '0 2rem' }}>

          {/* Header */}
          <div style={{ marginBottom: isMobile ? '1.6rem' : '2.1rem', ...anim('fadeUp', 0) }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 22, height: 1, background: 'rgba(74,222,128,.6)' }} />
              <span style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(134,239,172,.85)' }}>Who I Am</span>
              <div style={{ width: 22, height: 1, background: 'rgba(74,222,128,.6)' }} />
            </div>
            <h2 style={{
              fontWeight: 800,
              fontSize: isMobile ? '2rem' : isTablet ? '2.6rem' : '3rem',
              letterSpacing: '-.03em', lineHeight: 1, color: '#ffffff', margin: 0,
            }}>
              About <span className="gradient-text" style={{ display: 'inline-block', position: 'relative' }}>
                Me
                {visible && <span className="gradient-underline" />}
              </span>
            </h2>
          </div>

          <div className="about-grid">

            {/* LEFT */}
            <div style={anim('fadeLeft', 0.12)}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p style={{ fontSize: isMobile ? '.95rem' : '1.02rem', lineHeight: 1.8, color: '#ffffff', margin: 0 }}>
                  Hey! I&apos;m{' '}
                  <span style={{ fontWeight: 700, background: 'linear-gradient(90deg,#86efac,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Hassan Yousuf</span>
                  , a Full Stack Developer from Pakistan 🇵🇰 with 3+ years crafting modern web experiences.
                </p>
                <p style={{ fontSize: isMobile ? '.9rem' : '.97rem', lineHeight: 1.8, color: 'rgba(255,255,255,.7)', margin: 0 }}>
                  I specialize in{' '}
                  <span style={{ color: '#86efac', fontWeight: 600 }}>Next.js</span>,{' '}
                  <span style={{ color: '#86efac', fontWeight: 600 }}>React</span>, and{' '}
                  <span style={{ color: '#86efac', fontWeight: 600 }}>Node.js</span> — building everything from
                  sleek landing pages to complex full-stack platforms. Great software lives at the intersection
                  of powerful tech and beautiful design.
                </p>
                <p style={{ fontSize: isMobile ? '.9rem' : '.97rem', lineHeight: 1.8, color: 'rgba(255,255,255,.7)', margin: 0 }}>
                  When not coding, I&apos;m exploring new tech, contributing to open source, or learning something new.
                  Always open to exciting freelance projects and full-time opportunities.
                </p>
              </div>

              {/* Traits */}
              <div className="traits-grid">
                {traits.map((t, i) => (
                  <div key={t.title} className="trait-card" style={{
                    padding: '1rem 1.1rem', borderRadius: 13,
                    background: 'rgba(74,222,128,.05)',
                    border: '1px solid rgba(74,222,128,.2)',
                    ...anim('popIn', 0.25 + i * 0.08),
                  }}>
                    <div className="trait-icon-wrap" style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(74,222,128,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 9 }}>
                      {t.svg}
                    </div>
                    <h4 style={{ fontWeight: 700, fontSize: 12.5, color: '#ffffff', margin: '0 0 4px' }}>{t.title}</h4>
                    <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,.5)', lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div style={anim('fadeRight', 0.2)}>

              {/* Stats */}
              <div className="stats-grid" style={{ '--stat-pad': isMobile ? '1.4rem 1rem' : '1.8rem 1.2rem', '--stat-val-size': isMobile ? '1.9rem' : '2.4rem' }}>
                {stats.map(({ value, label }, i) => (
                  <StatCard key={label} value={value} label={label} visible={visible} delay={0.32 + i * 0.1} />
                ))}
              </div>

              {/* Code block */}
              <div className="code-block" style={{
                marginTop: '1.1rem',
                padding: isMobile ? '.9rem 1rem' : '1.1rem 1.3rem',
                borderRadius: 14,
                background: 'rgba(5,5,5,.95)',
                border: '1px solid rgba(74,222,128,.18)',
                backdropFilter: 'blur(12px)',
                fontFamily: "'Fira Code','Cascadia Code','JetBrains Mono',monospace",
                fontSize: isMobile ? 11.5 : 12.5,
                lineHeight: 1.9,
                boxShadow: '0 8px 32px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.03)',
                ...anim('fadeUp', 0.35),
              }}>
                {/* Chrome */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid rgba(74,222,128,.1)' }}>
                  {['#ff5f57', '#febc2e', '#28c840'].map((c, di) => (
                    <div key={c} className={di === 2 ? 'dot-glow' : ''} style={{ width: 10, height: 10, borderRadius: '9999px', background: c, opacity: .75 }} />
                  ))}
                  <span style={{ marginLeft: 5, fontSize: 10.5, color: 'rgba(255,255,255,.25)', letterSpacing: '.05em' }}>developer.js</span>
                </div>
                {codeLines.map((tokens, li) => (
                  <div key={li} style={{ display: 'flex', ...anim('lineIn', 0.55 + li * 0.08) }}>
                    <span style={{ color: 'rgba(255,255,255,.2)', fontSize: 10.5, minWidth: 20, userSelect: 'none', marginRight: 12, paddingTop: 1 }}>{li + 1}</span>
                    {tokens.map((tk, ti) => <span key={ti} style={{ color: tk.c }}>{tk.t}</span>)}
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', height: 24 }}>
                  <span style={{ color: 'rgba(255,255,255,.2)', fontSize: 10.5, minWidth: 20, marginRight: 12 }}>7</span>
                  <span style={{ display: 'inline-block', width: 2, height: 13, background: '#86efac', borderRadius: 1, animation: 'blink 1s step-end infinite' }} />
                </div>
              </div>

              {/* CTA buttons */}
              <div style={{ marginTop: '1rem', display: 'flex', gap: 10, flexWrap: 'wrap', ...anim('fadeUp', 0.75) }}>
                <a href="#contact" className="hire-btn" style={{
                  flex: 1, minWidth: 110, padding: '11px 18px', borderRadius: 11,
                  background: 'linear-gradient(135deg,#16a34a,#15803d)',
                  color: '#ffffff', fontWeight: 700, fontSize: 13,
                  textDecoration: 'none', textAlign: 'center',
                  boxShadow: '0 4px 18px rgba(22,163,74,.35)',
                }}>Hire Me →</a>
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="cv-btn" style={{
                  flex: 1, minWidth: 110, padding: '11px 18px', borderRadius: 11,
                  border: '1px solid rgba(74,222,128,.28)',
                  background: 'rgba(74,222,128,.06)',
                  color: '#ffffff', fontWeight: 600, fontSize: 13,
                  textDecoration: 'none', textAlign: 'center',
                  backdropFilter: 'blur(8px)',
                }}>Download CV ↓</a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}