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

export default function About() {
  const { ref, visible } = useInView()
  const w = useWindowWidth()
  const isMobile = w < 640
  const isTablet = w >= 640 && w < 1024

  const anim = (name, delay = 0) => visible
    ? { animation: `${name} 0.6s ease ${delay}s both` }
    : { opacity: 0, pointerEvents: 'none' }

  return (
    <>
      <style>{`
        @keyframes fadeUp   { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeLeft { from { opacity:0; transform:translateX(-28px) } to { opacity:1; transform:translateX(0) } }
        @keyframes fadeRight{ from { opacity:0; transform:translateX(28px) } to { opacity:1; transform:translateX(0) } }
        @keyframes popIn    { from { opacity:0; transform:scale(0.9) translateY(10px) } to { opacity:1; transform:scale(1) translateY(0) } }
        @keyframes lineIn   { from { opacity:0; transform:translateX(-6px) } to { opacity:1; transform:translateX(0) } }
        @keyframes shimmer  { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        .trait-card { transition: transform .22s ease, box-shadow .22s ease; }
        .trait-card:hover { transform: translateY(-4px); box-shadow: 0 12px 36px rgba(0,0,0,.6), 0 0 0 1px rgba(74,222,128,.3); }
        .stat-card  { transition: transform .22s ease, box-shadow .22s ease; }
        .stat-card:hover  { transform: translateY(-5px) scale(1.02); box-shadow: 0 16px 44px rgba(0,0,0,.6), 0 0 0 1px rgba(74,222,128,.35); }
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
        }
        .hire-btn { transition: transform .22s, box-shadow .22s; }
        .hire-btn:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(74,222,128,.4); }
        .cv-btn { transition: transform .22s, background .22s, border-color .22s; }
        .cv-btn:hover { transform:translateY(-2px); background:rgba(74,222,128,.12)!important; border-color:rgba(74,222,128,.5)!important; }
        .about-grid { display:grid; gap:3rem; align-items:start; }
        @media(min-width:1024px){ .about-grid{ grid-template-columns:1fr 1fr; align-items:center; } }
        .traits-grid { display:grid; grid-template-columns:1fr 1fr; gap:.8rem; margin-top:1.6rem; }
        @media(max-width:380px){ .traits-grid{ grid-template-columns:1fr; } }
        .stats-grid { display:grid; grid-template-columns:1fr 1fr; gap:.9rem; }
      `}</style>

      <section
        id="about"
        ref={ref}
        style={{
          padding: isMobile ? '4rem 0 5rem' : '6rem 0 7rem',
          position: 'relative',
          overflow: 'hidden',
          background: '#000000',
        }}
      >
        {/* bg accent */}
        <div style={{ position: 'absolute', top: '20%', right: '-8%', width: 380, height: 380, background: 'radial-gradient(circle,rgba(74,222,128,.06) 0%,transparent 70%)', borderRadius: '9999px', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1180, margin: '0 auto', padding: isMobile ? '0 1.2rem' : '0 2rem' }}>

          {/* Header */}
          <div style={{ marginBottom: isMobile ? '2.2rem' : '3.5rem', ...anim('fadeUp', 0) }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 22, height: 1, background: 'rgba(74,222,128,.6)' }} />
              <span style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(134,239,172,.85)' }}>Who I Am</span>
              <div style={{ width: 22, height: 1, background: 'rgba(74,222,128,.6)' }} />
            </div>
            <h2 style={{
              fontWeight: 800,
              fontSize: isMobile ? '2rem' : isTablet ? '2.6rem' : '3rem',
              letterSpacing: '-.03em', lineHeight: 1, color: '#ffffff', margin: 0,
            }}>
              About <span className="gradient-text">Me</span>
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
                    ...anim('popIn', 0.25 + i * 0.07),
                  }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(74,222,128,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 9 }}>
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
              <div className="stats-grid">
                {stats.map(({ value, label }, i) => (
                  <div key={label} className="stat-card" style={{
                    padding: isMobile ? '1.4rem 1rem' : '1.8rem 1.2rem',
                    borderRadius: 16,
                    background: 'rgba(10,10,10,.9)',
                    border: '1px solid rgba(74,222,128,.18)',
                    backdropFilter: 'blur(12px)',
                    textAlign: 'center',
                    ...anim('popIn', 0.3 + i * 0.08),
                  }}>
                    <div className="gval" style={{ fontWeight: 800, fontSize: isMobile ? '1.9rem' : '2.4rem', lineHeight: 1, marginBottom: 7 }}>
                      {value}
                    </div>
                    <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,.5)', letterSpacing: '.03em' }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Code block */}
              <div style={{
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
              }}>
                {/* Chrome */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid rgba(74,222,128,.1)' }}>
                  {['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '9999px', background: c, opacity: .75 }} />)}
                  <span style={{ marginLeft: 5, fontSize: 10.5, color: 'rgba(255,255,255,.25)', letterSpacing: '.05em' }}>developer.js</span>
                </div>
                {codeLines.map((tokens, li) => (
                  <div key={li} style={{ display: 'flex', ...anim('lineIn', 0.45 + li * 0.06) }}>
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
              <div style={{ marginTop: '1rem', display: 'flex', gap: 10, flexWrap: 'wrap', ...anim('fadeUp', 0.65) }}>
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