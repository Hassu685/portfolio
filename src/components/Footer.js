'use client'
import { ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-8 bg-black border-t border-green-900/30">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-5">

        {/* Brand + copyright */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md flex items-center justify-center font-display font-bold text-xs bg-green-400 text-black">
            H
          </div>
          <span className="font-mono text-xs text-white/45">
            © {new Date().getFullYear()} Hassan Yousuf. All rights reserved.
          </span>
        </div>

        {/* Built with */}
        <div className="flex items-center gap-1.5 font-mono text-xs text-white/45">
          <span>Built with</span>
          <span className="text-green-400">Next.js</span>
          <span className="text-white/25">+</span>
          <span className="text-green-400">Tailwind CSS</span>
        </div>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group flex items-center gap-1.5 font-mono text-xs text-white/45 transition-colors duration-300 hover:text-green-400"
        >
          <span className="hidden sm:inline">Back to top</span>
          <span className="w-7 h-7 rounded-md border border-green-900/40 flex items-center justify-center transition-all duration-300 group-hover:border-green-400/50 group-hover:-translate-y-0.5">
            <ArrowUp size={13} />
          </span>
        </button>
      </div>
    </footer>
  )
}