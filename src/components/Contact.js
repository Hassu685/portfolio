'use client'
import { useRef, useEffect, useState } from 'react'
import { Mail, MessageSquare, MapPin, Send, Github, Linkedin, Twitter, CheckCircle2 } from 'lucide-react'
import emailjs from '@emailjs/browser'

// ── EmailJS credentials — inhe apne values se replace karo ──
const EMAILJS_SERVICE_ID = 'hassan_12'
const EMAILJS_TEMPLATE_ID = 'template_258l6r8'
const EMAILJS_PUBLIC_KEY = 'g_LSJWyn41QnIxqD7'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hassanyousuf608@gmail.com', href: 'mailto:hassanyousuf608@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'Pakistan 🇵🇰', href: '#' },
  { icon: MessageSquare, label: 'Response Time', value: 'Within 24 hours', href: '#' },
]

const socials = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const formRef = useRef(null)

  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState(null)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    const fallback = setTimeout(() => setVisible(true), 1500)
    return () => { obs.disconnect(); clearTimeout(fallback) }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const inputBase =
    'w-full px-4 py-3.5 rounded-xl text-sm bg-[#0d0d0d] border text-white placeholder:text-white/25 outline-none transition-all duration-300'

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-black overflow-hidden"
      ref={sectionRef}
    >
      {/* Ambient background, matches rest of site */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-green-400/[0.06] blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      <div className="max-w-6xl mx-auto px-6 relative">

        {/* ── Heading ── */}
        <div
          className={`mb-16 md:mb-20 text-center transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <p className="inline-flex items-center gap-2 text-green-400/85 text-[10px] font-mono mb-4 tracking-[.18em] uppercase before:content-[''] before:inline-block before:w-[22px] before:h-px before:bg-green-400/60 after:content-[''] after:inline-block after:w-[22px] after:h-px after:bg-green-400/60">
            Let&apos;s Talk
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white tracking-tight mb-4">
            Get In{' '}
            <span className="bg-gradient-to-r from-green-300 via-green-400 to-green-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_4s_ease_infinite]">
              Touch
            </span>
          </h2>
          <p className="max-w-lg mx-auto text-sm text-white/50 font-body leading-relaxed">
            Have a project in mind? Looking for a developer? Or just want to say hi —
            my inbox is always open.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8">

          {/* ── Left info ── */}
          <div
            className={`lg:col-span-2 space-y-4 transition-all duration-700 ease-out delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
          >
            {contactInfo.map(({ icon: Icon, label, value, href }, idx) => (
              <a
                key={label}
                href={href}
                className="group flex items-center gap-4 p-5 rounded-xl bg-[#0a0a0a] border border-green-900/30 hover:border-green-400/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-18px_rgba(74,222,128,.25)]"
                style={{ transitionDelay: visible ? `${150 + idx * 90}ms` : '0ms' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-green-400/[0.08] border border-green-400/20 group-hover:bg-green-400/[0.14] group-hover:border-green-400/40 transition-all duration-300">
                  <Icon size={17} className="text-green-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-mono text-white/40 mb-0.5 tracking-wide uppercase">{label}</p>
                  <p className="text-sm text-white/85 group-hover:text-green-400 transition-colors duration-300 truncate">
                    {value}
                  </p>
                </div>
              </a>
            ))}

            {/* Socials */}
            <div className="p-5 rounded-xl bg-[#0a0a0a] border border-green-900/30">
              <p className="text-[11px] font-mono text-white/40 mb-4 tracking-wide uppercase">Find me on</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-lg border border-green-900/40 bg-black flex items-center justify-center text-white/50 transition-all duration-300 hover:-translate-y-1 hover:text-green-400 hover:border-green-400/50"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="p-5 rounded-xl bg-green-400/[0.04] border border-green-400/20">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-sm font-medium text-green-400 font-display">Available Now</span>
              </div>
              <p className="text-xs text-white/45 font-body leading-relaxed">
                Open to freelance projects and full-time roles.
              </p>
            </div>
          </div>

          {/* ── Right form ── */}
          <div
            className={`lg:col-span-3 transition-all duration-700 ease-out delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
          >
            <div className="relative p-6 sm:p-8 rounded-2xl bg-[#0a0a0a] border border-green-900/30 overflow-hidden">
              {/* corner glow, matches project cards */}
              <div className="pointer-events-none absolute -top-16 -right-16 w-40 h-40 rounded-full bg-green-400/10 blur-2xl" />

              {/* Success state */}
              {status === 'sent' ? (
                <div className="relative flex flex-col items-center justify-center py-14 sm:py-16 text-center animate-[fadeIn_.5s_ease-out]">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 bg-green-400/10 border border-green-400/30 animate-[popIn_.5s_cubic-bezier(0.34,1.56,0.64,1)]">
                    <CheckCircle2 size={28} className="text-green-400" />
                  </div>
                  <h3 className="font-display font-semibold text-xl text-white mb-2">Message Sent!</h3>
                  <p className="text-sm text-white/45 font-body max-w-xs">
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-7 px-5 py-2.5 rounded-lg border border-green-900/40 bg-black text-white/60 text-sm font-body transition-all duration-300 hover:text-green-400 hover:border-green-400/50"
                  >
                    Send another message
                  </button>
                </div>

              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="relative space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-mono text-white/40 mb-2 tracking-wide uppercase">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="from_name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        placeholder="Hassan Yousuf"
                        className={`${inputBase} ${focused === 'name'
                          ? 'border-green-400/60 shadow-[0_0_0_3px_rgba(74,222,128,.08)]'
                          : 'border-green-900/30'
                          }`}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-white/40 mb-2 tracking-wide uppercase">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="from_email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        placeholder="hassan@example.com"
                        className={`${inputBase} ${focused === 'email'
                          ? 'border-green-400/60 shadow-[0_0_0_3px_rgba(74,222,128,.08)]'
                          : 'border-green-900/30'
                          }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-white/40 mb-2 tracking-wide uppercase">
                      Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      placeholder="Tell me about your project or just say hello..."
                      className={`${inputBase} resize-none ${focused === 'message'
                        ? 'border-green-400/60 shadow-[0_0_0_3px_rgba(74,222,128,.08)]'
                        : 'border-green-900/30'
                        }`}
                    />
                  </div>

                  {/* Error message */}
                  {status === 'error' && (
                    <p className="text-xs font-mono text-center text-red-400/90 animate-[fadeIn_.3s_ease-out]">
                      Kuch masla ho gaya. Dobara try karo ya seedha email bhejo.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group relative w-full py-3.5 rounded-xl font-display font-medium text-sm text-black bg-green-400 flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 hover:bg-green-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-green-400"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(.6) }
          100% { opacity: 1; transform: scale(1) }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  )
}