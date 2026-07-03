'use client'
import { useRef, useEffect, useState } from 'react'

const skillGroups = [
  {
    category: 'Frontend',
    tag: '01',
    color: '#86efac',
    skills: [
      { name: 'Next.js', level: 95 },
      { name: 'React.js', level: 92 },
      { name: 'Tailwind CSS', level: 93 },
      { name: 'Framer Motion', level: 80 },
    ],
  },
  {
    category: 'Backend',
    tag: '02',
    color: '#4ade80',
    skills: [
      { name: 'Next.js', level: 87 },
      { name: 'REST APIs', level: 90 },
    ],
  },
  {
    category: 'Database & Tools',
    tag: '03',
    color: '#bbf7d0',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'Git & GitHub', level: 92 },
      { name: 'Docker', level: 68 },
    ],
  },
]

// Small line-icon marks (generic/geometric — not brand logos)
const icons = {
  next: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 8.5 L16 16 M9 8.5 V16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  react: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  js: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M8 4v12a3 3 0 0 1-4.5 2.6" strokeLinecap="round" />
      <path d="M14 4v11.2a2.6 2.6 0 0 0 5.2.2c.1-1-.6-1.8-1.6-2.1l-1-.3c-1-.3-1.7-1-1.6-2.1a2 2 0 0 1 3.6-1" strokeLinecap="round" />
    </svg>
  ),
  mongo: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M12 3c3 3.2 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6.8 5-10Z" strokeLinejoin="round" />
      <path d="M12 14v7" strokeLinecap="round" />
    </svg>
  ),
  tailwind: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}>
      <path d="M4 12c1.5-3.5 3.5-4.5 6-4.5 3 0 4 2.5 6.5 2.5 2 0 3.5-1 4.5-3-1.5 3.5-3.5 4.5-6 4.5-3 0-4-2.5-6.5-2.5-2 0-3.5 1-4.5 3Z" strokeLinejoin="round" />
      <path d="M4 17.5c1.5-3.5 3.5-4.5 6-4.5 3 0 4 2.5 6.5 2.5 2 0 3.5-1 4.5-3" strokeLinejoin="round" />
    </svg>
  ),
}

const techIcons = [
  { name: 'Next.js', icon: 'next' },
  { name: 'React', icon: 'react' },
  { name: 'JavaScript', icon: 'js' },
  { name: 'MongoDB', icon: 'mongo' },
  { name: 'Tailwind', icon: 'tailwind' },
]

function useCountUp(level, visible, delay = 0, duration = 1200) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!visible) return
    let raf, start
    const timeout = setTimeout(() => {
      const step = (ts) => {
        if (!start) start = ts
        const progress = Math.min((ts - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        setValue(Math.round(eased * level))
        if (progress < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, delay)
    return () => { clearTimeout(timeout); if (raf) cancelAnimationFrame(raf) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])
  return value
}

function SkillBar({ name, level, color, visible, delay }) {
  const count = useCountUp(level, visible, delay)
  return (
    <div style={{ marginBottom: '1.3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 13.5, color: '#ffffff', fontFamily: 'inherit', fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,.45)', fontFamily: 'monospace' }}>
          {String(count).padStart(2, '0')}%
        </span>
      </div>
      <div style={{ height: 6, background: 'rgba(255,255,255,.06)', borderRadius: 9999, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            borderRadius: 9999,
            transition: 'width 1.2s cubic-bezier(.16,1,.3,1)',
            width: visible ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            boxShadow: visible ? `0 0 12px ${color}66` : 'none',
            transitionDelay: `${delay}ms`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.6), transparent)',
            transform: 'translateX(-100%)',
            animation: visible ? 'barShine 2.4s ease-in-out 1' : 'none',
            animationDelay: `${delay + 500}ms`,
          }} />
        </div>
      </div>
    </div>
  )
}

function SkillCard({ group, gi, visible }) {
  return (
    <div
      className="skill-card"
      style={{
        padding: '1.7rem 1.5rem',
        borderRadius: 18,
        background: '#0a0a0a',
        border: '1px solid rgba(74,222,128,.14)',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity .7s cubic-bezier(.16,1,.3,1) ${gi * 150}ms, transform .7s cubic-bezier(.16,1,.3,1) ${gi * 150}ms, border-color .3s ease, box-shadow .3s ease`,
      }}
    >
      {/* ambient corner glow, sits behind content */}
      <div style={{
        position: 'absolute', width: 160, height: 160, borderRadius: '9999px',
        background: `radial-gradient(circle, ${group.color}1f, transparent 70%)`,
        top: -60, right: -60, pointerEvents: 'none',
      }} />

      <span style={{
        position: 'absolute', top: 16, right: 18,
        fontFamily: 'monospace', fontSize: 11, letterSpacing: '.1em',
        color: 'rgba(255,255,255,.22)',
      }}>{group.tag}</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem' }}>
        <div className="card-dot" style={{ width: 8, height: 8, borderRadius: 9999, background: group.color }} />
        <h3 style={{ fontWeight: 700, fontSize: 15, color: '#ffffff', margin: 0, letterSpacing: '-.01em' }}>
          {group.category}
        </h3>
      </div>

      {group.skills.map((skill, i) => (
        <SkillBar
          key={skill.name + i}
          {...skill}
          color={group.color}
          visible={visible}
          delay={gi * 150 + i * 90}
        />
      ))}
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Fallback: if the section is already in view on mount (e.g. no scroll
    // happens before paint), don't wait forever on the observer.
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)

    // Safety net so content never gets stuck hidden.
    const fallback = setTimeout(() => setVisible(true), 1500)

    return () => { obs.disconnect(); clearTimeout(fallback) }
  }, [])

  const anim = (delay = 0) => ({
    transition: `opacity 0.7s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.7s cubic-bezier(.16,1,.3,1) ${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
  })

  // Repeat the set enough times that the track is always wider than the
  // viewport — otherwise the loop runs out of content, leaving a blank gap
  // right before it jumps back to the start. 6 copies comfortably covers
  // ultra-wide screens too.
  const MARQUEE_REPEATS = 6
  const marqueeItems = Array.from({ length: MARQUEE_REPEATS }, () => techIcons).flat()

  return (
    <>
      <style>{`
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes barShine { 0%{transform:translateX(-100%)} 100%{transform:translateX(220%)} }
        @keyframes floatBlob {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-16px,20px) scale(1.07); }
        }
        @keyframes pulseDot {
          0%,100% { box-shadow: 0 0 0 0 rgba(74,222,128,.55); }
          50% { box-shadow: 0 0 0 6px rgba(74,222,128,0); }
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-16.6667%); }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .marquee-track { animation: marqueeScroll 26s linear infinite; will-change: transform; }
        .marquee-wrap:hover .marquee-track { animation-play-state: paused; }
        .marquee-wrap {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent);
        }
        .tech-pill {
          transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .tech-pill:hover {
          transform: translateY(-3px);
          border-color: rgba(74,222,128,.45) !important;
          box-shadow: 0 8px 22px rgba(74,222,128,.18);
        }
        .tech-pill:hover .tech-icon-box { transform: rotate(-6deg) scale(1.08); color: #4ade80; }
        .tech-icon-box { transition: transform .25s ease, color .25s ease; }
        .skill-card:hover {
          transform: translateY(-6px) !important;
          border-color: rgba(74,222,128,.35) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,.5), 0 0 0 1px rgba(74,222,128,.25);
        }
        .skill-card:hover .card-dot { animation: pulseDot 1.4s ease-out infinite; }
        .section-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 10px; font-family: monospace; letter-spacing: .18em;
          text-transform: uppercase; color: rgba(134,239,172,.85);
        }
        .section-label::before, .section-label::after {
          content: ''; display: inline-block; width: 22px; height: 1px;
          background: rgba(74,222,128,.6);
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track, .tech-pill, .skill-card, .card-dot, [style*="animation"] {
            animation: none !important; transition: none !important;
          }
        }
      `}</style>

      <section
        id="skills"
        ref={ref}
        style={{ padding: '7.5rem 0', position: 'relative', overflow: 'hidden', background: '#000000' }}
      >
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.35,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
        }} />

        <div style={{
          position: 'absolute', top: 0, right: 0, width: 420, height: 420,
          background: 'radial-gradient(circle,rgba(74,222,128,.06) 0%,transparent 70%)',
          borderRadius: '9999px', pointerEvents: 'none', animation: 'floatBlob 10s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: -80, left: -80, width: 320, height: 320,
          background: 'radial-gradient(circle,rgba(134,239,172,.05) 0%,transparent 70%)',
          borderRadius: '9999px', pointerEvents: 'none', animation: 'floatBlob 12s ease-in-out infinite 1s',
        }} />

        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 1.5rem', position: 'relative' }}>

          <div style={{ marginBottom: '1.2rem', ...anim(0) }}>
            <p className="section-label" style={{ marginBottom: 14 }}>What I Know</p>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(2rem,5vw,3.1rem)', letterSpacing: '-.03em', lineHeight: 1, color: '#ffffff', margin: 0 }}>
              My <span style={{
                background: 'linear-gradient(135deg,#86efac 0%,#4ade80 50%,#86efac 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                animation: 'shimmer 4s ease infinite',
              }}>Skills</span>
            </h2>
            <p style={{ marginTop: 16, maxWidth: 480, fontSize: 14.5, lineHeight: 1.6, color: 'rgba(255,255,255,.5)', fontFamily: 'inherit' }}>
              Tools and technologies I use to design, build, and ship products end to end.
            </p>
          </div>

          <div className="marquee-wrap" style={{ marginBottom: '4rem', ...anim(120) }}>
            <div className="marquee-track" style={{ display: 'flex', gap: 10, width: 'max-content' }}>
              {marqueeItems.map(({ name, icon }, i) => (
                <div
                  key={name + i}
                  className="tech-pill"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 16px', borderRadius: 10,
                    border: '1px solid rgba(74,222,128,.18)',
                    background: 'rgba(255,255,255,.02)',
                    cursor: 'default', flexShrink: 0,
                  }}
                >
                  <div className="tech-icon-box" style={{
                    width: 24, height: 24, borderRadius: 6, background: 'rgba(74,222,128,.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86efac',
                  }}>
                    {icons[icon]({ width: 14, height: 14 })}
                  </div>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,.65)', whiteSpace: 'nowrap' }}>{name}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.75rem' }}>
            {skillGroups.map((group, gi) => (
              <SkillCard key={group.category} group={group} gi={gi} visible={visible} />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}