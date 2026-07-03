'use client'
import { useRef, useEffect, useState } from 'react'
import { ExternalLink, Github, Star, ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'Aromiq — E-Commerce Platform',
    desc: 'A full-featured e-commerce platform with real-time inventory, Stripe payments, admin dashboard, and blazing-fast performance. Built for scale.',
    tags: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind'],
    // Drop your screenshot in /public/projects/ and point this at it,
    // e.g. '/projects/aromiq.png'. Falls back to a styled placeholder
    // automatically if the image is missing or fails to load.
    image: '/projects/aromiq.png',
    github: 'https://github.com',
    live: 'https://www.aromiq.click',
    featured: true,
    year: '2026',
    status: 'Live',
  },
   {
    title: 'Rydeon Platform',
    desc: 'A full-featured platform with real-time inventory, Stripe payments, admin dashboard, and blazing-fast performance. Built for scale.',
    tags: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind'],
    // Drop your screenshot in /public/projects/ and point this at it,
    // e.g. '/projects/aromiq.png'. Falls back to a styled placeholder
    // automatically if the image is missing or fails to load.
    image: '/projects/rydeon.png',
    github: 'https://github.com',
    live: 'https://rydeon-eight.vercel.app/',
    featured: true,
    year: '2026',
    status: 'Live',
  },
]

function ProjectImage({ src, alt }) {
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    return (
      <div className="relative w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(74,222,128,.14),transparent_60%)]">
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }} />
        <span className="relative font-mono text-xs tracking-widest text-green-400/50 uppercase">
          Preview coming soon
        </span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className="w-full h-full object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
      loading="lazy"
    />
  )
}

function ProjectCard({ project, i, visible }) {
  return (
    <div
      className={`group relative rounded-2xl bg-[#0a0a0a] border border-green-900/30 hover:border-green-400/50 overflow-hidden transition-all duration-700 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-15px_rgba(74,222,128,.18)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      style={{ transitionDelay: `${i * 110}ms` }}
    >
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden border-b border-green-900/30">
        <ProjectImage src={project.image} alt={`${project.title} preview`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-80 pointer-events-none" />

        {/* status + featured badges float over image */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {project.featured && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-green-400/30">
              <Star size={10} className="text-green-400" fill="currentColor" />
              <span className="text-green-400 text-xs font-mono">Featured</span>
            </div>
          )}
          <span className="flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full border border-green-400/40 bg-black/60 backdrop-blur-sm text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {project.status}
          </span>
        </div>

        {/* quick-launch icon, appears on hover */}
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-green-400/30 text-green-400 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          <ArrowUpRight size={15} />
        </a>
      </div>

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display font-semibold text-white text-base group-hover:text-green-400 transition-colors leading-snug">
            {project.title}
          </h3>
          <span className="text-white/40 text-xs font-mono shrink-0 ml-3">{project.year}</span>
        </div>

        <p className="text-white/65 text-sm leading-relaxed mb-5 line-clamp-3">
          {project.desc}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-black border border-green-900/40 text-green-400 text-xs font-mono transition-colors group-hover:border-green-400/40"
            >
              {tag}
            </span>
          ))}
        </div>

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

      {/* subtle corner glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-green-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    obs.observe(el)
    const fallback = setTimeout(() => setVisible(true), 1500)
    return () => { obs.disconnect(); clearTimeout(fallback) }
  }, [])

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.featured)

  return (
    <section id="projects" className="py-28 relative bg-black overflow-hidden" ref={ref}>
      {/* ambient bg accents, matches Skills section language */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-green-400/[0.05] blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <p className="inline-flex items-center gap-2 text-green-400/85 text-[10px] font-mono mb-3 tracking-[.18em] uppercase before:content-[''] before:inline-block before:w-[22px] before:h-px before:bg-green-400/60 after:content-[''] after:inline-block after:w-[22px] after:h-px after:bg-green-400/60">
              What I&apos;ve Built
            </p>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight">
              My <span className="bg-gradient-to-r from-green-300 via-green-400 to-green-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_4s_ease_infinite]">Projects</span>
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
            <ProjectCard key={project.title} project={project} i={i} visible={visible} />
          ))}
        </div>

        {/* GitHub CTA */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black border border-green-900/40 text-white/80 hover:text-green-400 hover:border-green-400/60 transition-all font-body text-sm"
          >
            <Github size={16} />
            See all projects on GitHub
            <span className="text-white/40 group-hover:translate-x-0.5 group-hover:text-green-400 transition-all">→</span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
      `}</style>
    </section>
  )
}