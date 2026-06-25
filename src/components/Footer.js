export default function Footer() {
  return (
    <footer
      className="py-8"
      style={{ backgroundColor: '#000000', borderTop: '1px solid #1f1f1f' }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs"
            style={{ backgroundColor: '#86efac', color: '#000000' }}
          >
            H
          </div>
          <span className="font-mono text-xs" style={{ color: '#71717a' }}>
            © {new Date().getFullYear()} Hassan Yousuf. All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono text-xs" style={{ color: '#71717a' }}>
          <span>Built with</span>
          <span className="mx-1" style={{ color: '#86efac' }}>Next.js</span>
          <span>+</span>
          <span className="mx-1" style={{ color: '#86efac' }}>Tailwind CSS</span>
          <span>❤️</span>
        </div>
      </div>
    </footer>
  )
}