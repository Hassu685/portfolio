'use client'
import { useRef, useEffect, useState } from 'react'

const skillGroups = [
  {
    category: 'Frontend',
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
    color: '#4ade80',
    skills: [
      { name: 'Next.js', level: 87 },
      { name: 'REST APIs', level: 90 },
    ],
  },
  {
    category: 'Database & Tools',
    color: '#bbf7d0',
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'Git & GitHub', level: 92 },
      { name: 'Docker', level: 68 },
    ],
  },
]

const techIcons = [
  { name: 'Next.js', bg: '#ffffff0d', text: 'NX' },
  { name: 'React', bg: '#86efac15', text: 'Re' },
  { name: 'JavaScript', bg: '#ffffff0d', text: 'JS' },
  { name: 'MongoDB', bg: '#4ade8015', text: 'Mo' },
  { name: 'Tailwind', bg: '#86efac15', text: 'TW' },
]

function SkillBar({ name, level, color, visible, delay }) {
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontSize: 13.5, color: '#ffffff', fontFamily: 'inherit' }}>{name}</span>
        <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,.45)', fontFamily: 'monospace' }}>{level}%</span>
      </div>
      <div style={{ height: 6, background: 'rgba(255,255,255,.07)', borderRadius: 9999, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            borderRadius: 9999,
            transition: 'width 1s ease-out',
            width: visible ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}99)`,
            boxShadow: visible ? `0 0 10px ${color}55` : 'none',
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const anim = (delay = 0) => ({
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(28px)',
  })

  return (
    <>
      <style>{`
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        .gradient-text {
          background: linear-gradient(135deg,#86efac 0%,#4ade80 50%,#86efac 100%);
          background-size: 200% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s ease infinite;
        }
        .tech-pill {
          transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
        }
        .tech-pill:hover {
          transform: translateY(-3px);
          border-color: rgba(74,222,128,.4) !important;
          box-shadow: 0 6px 20px rgba(74,222,128,.15);
        }
        .skill-card {
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .skill-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 44px rgba(0,0,0,.5), 0 0 0 1px rgba(74,222,128,.25);
        }
        .section-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-family: monospace;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: rgba(134,239,172,.85);
        }
        .section-label::before,
        .section-label::after {
          content: '';
          display: inline-block;
          width: 22px;
          height: 1px;
          background: rgba(74,222,128,.6);
        }
      `}</style>

      <section
        id="skills"
        ref={ref}
        style={{
          padding: '7rem 0',
          position: 'relative',
          overflow: 'hidden',
          background: '#000000',
        }}
      >
        {/* bg accent */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: 380, height: 380, background: 'radial-gradient(circle,rgba(74,222,128,.05) 0%,transparent 70%)', borderRadius: '9999px', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 1.5rem' }}>

          {/* Header */}
          <div style={{ marginBottom: '4rem', ...anim(0) }}>
            <p className="section-label" style={{ marginBottom: 12 }}>What I Know</p>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-.03em', lineHeight: 1, color: '#ffffff', margin: 0 }}>
              My <span className="gradient-text">Skills</span>
            </h2>
          </div>

          {/* Tech icon pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: '4rem', ...anim(100) }}>
            {techIcons.map(({ name, bg, text }) => (
              <div
                key={name}
                className="tech-pill"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 16px', borderRadius: 10,
                  border: '1px solid rgba(74,222,128,.18)',
                  background: bg,
                  cursor: 'default',
                }}
              >
                <div style={{
                  width: 24, height: 24, borderRadius: 6,
                  background: 'rgba(74,222,128,.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontFamily: 'monospace', fontWeight: 700,
                  color: '#86efac',
                }}>
                  {text}
                </div>
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,.65)' }}>{name}</span>
              </div>
            ))}
          </div>

          {/* Skill bars grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '2rem' }}>
            {skillGroups.map(({ category, color, skills }, gi) => (
              <div
                key={category}
                className="skill-card"
                style={{
                  padding: '1.6rem 1.4rem',
                  borderRadius: 16,
                  background: 'rgba(10,10,10,.85)',
                  border: '1px solid rgba(74,222,128,.15)',
                  backdropFilter: 'blur(12px)',
                  ...anim(gi * 150),
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.4rem' }}>
                  <div style={{ width: 3, height: 22, borderRadius: 9999, background: color }} />
                  <h3 style={{ fontWeight: 700, fontSize: 14.5, color: '#ffffff', margin: 0 }}>{category}</h3>
                </div>
                {skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name + i}
                    {...skill}
                    color={color}
                    visible={visible}
                    delay={gi * 150 + i * 80}
                  />
                ))}
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}