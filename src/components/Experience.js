'use client'
import { useRef, useEffect, useState } from 'react'
import { Briefcase, GraduationCap } from 'lucide-react'

const experiences = [
  {
    type: 'work',
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions',
    period: 'Jan 2024 – Present',
    desc: 'Leading development of enterprise web applications, architecting scalable Next.js solutions, mentoring junior developers, and driving technical decisions.',
    tags: ['Next.js', 'TypeScript', 'AWS', 'PostgreSQL'],
  },
  {
    type: 'work',
    title: 'Full Stack Developer',
    company: 'Digital Agency Pvt Ltd',
    period: 'Mar 2022 – Dec 2023',
    desc: 'Built and maintained 10+ client projects ranging from e-commerce platforms to SaaS dashboards. Improved site performance by 40% through optimization.',
    tags: ['React', 'Node.js', 'MongoDB', 'Docker'],
  },
  {
    type: 'work',
    title: 'Frontend Developer',
    company: 'Freelance',
    period: 'Jan 2021 – Feb 2022',
    desc: 'Worked with international clients to build responsive, pixel-perfect websites and web applications. Delivered 20+ projects on time and within budget.',
    tags: ['React', 'JavaScript', 'Tailwind', 'Firebase'],
  },
  {
    type: 'edu',
    title: 'BS Computer Science',
    company: 'University of Engineering & Technology',
    period: '2017 – 2021',
    desc: 'Graduated with honors. Specialized in software engineering and web technologies. Led the university coding club.',
    tags: ['CS Fundamentals', 'Algorithms', 'Data Structures'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="experience" className="py-28 relative bg-black" ref={ref}>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-green-400/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6">
        <div className={`mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-green-400 text-sm font-mono mb-3 tracking-wide uppercase">My Journey</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Experience &amp; <span className="text-green-400">Education</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-green-900/40" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`relative pl-16 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Icon dot */}
                <div className="absolute left-0 top-0 w-12 h-12 rounded-xl flex items-center justify-center border-2 border-green-400/40 bg-green-400/10">
                  {exp.type === 'work'
                    ? <Briefcase size={18} className="text-green-400" />
                    : <GraduationCap size={18} className="text-green-400" />
                  }
                </div>

                {/* Card */}
                <div className="p-6 rounded-2xl bg-black border border-green-900/30 hover:border-green-400/50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-display font-semibold text-white">{exp.title}</h3>
                      <p className="text-sm text-green-400">{exp.company}</p>
                    </div>
                    <span className="font-mono text-xs text-white/60 border border-green-900/40 px-3 py-1 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed mb-4">{exp.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-xs font-mono border border-green-400/30 bg-green-400/10 text-green-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}