'use client'
import { useRef, useEffect, useState } from 'react'
import { ExternalLink, Github, Star } from 'lucide-react'

const projects = [
  {
    title: 'Aromiq — E-Commerce Platform',
    desc: 'A full-featured e-commerce platform with real-time inventory, Stripe payments, admin dashboard, and blazing-fast performance. Built for scale.',
    tags: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind'],
    github: 'https://github.com',
    live: 'https://www.aromiq.click',
    featured: true,
    year: '2024',
    status: 'Live',
  },
]

export default function Projects() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.featured)

  return (
    <section id="projects" className="py-28 relative bg-black" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <p className="text-green-400 text-sm font-mono mb-3 tracking-wide uppercase">What I&apos;ve Built</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
              My <span className="text-green-400">Projects</span>
            </h2>
          </div>
          <div className="flex gap-2">
            {(['all', 'featured']).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-display capitalize transition-all border ${filter === f
                    ? 'bg-green-400 text-black border-green-400'
                    : 'bg-black border-green-900/40 text-white hover:text-green-400 hover:border-green-400/60'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className={`group relative p-6 rounded-2xl bg-black border border-green-900/30 hover:border-green-400/50 overflow-hidden transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Glow overlay on hover */}
              <div className="absolute inset-0 bg-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10">
                {/* Top meta */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    {project.featured && (
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-400/10 border border-green-400/30">
                        <Star size={10} className="text-green-400" fill="currentColor" />
                        <span className="text-green-400 text-xs font-mono">Featured</span>
                      </div>
                    )}
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full border border-green-400/40 bg-green-400/10 text-green-400">
                      {project.status}
                    </span>
                  </div>
                  <span className="text-white/50 text-xs font-mono">{project.year}</span>
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-white text-base mb-2 group-hover:text-green-400 transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed mb-5 line-clamp-3">
                  {project.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-black border border-green-900/40 text-green-400 text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-green-900/30">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white/70 hover:text-green-400 text-xs font-body transition-colors"
                  >
                    <Github size={14} />
                    Source
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-body transition-colors text-green-400 hover:text-green-300"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black border border-green-900/40 text-white/80 hover:text-green-400 hover:border-green-400/60 transition-all font-body text-sm"
          >
            <Github size={16} />
            See all projects on GitHub
            <span className="text-white/40">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}