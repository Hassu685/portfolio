'use client'
import { useRef, useEffect, useState } from 'react'
import { Mail, MessageSquare, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react'
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
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
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

  return (
    <section
      id="contact"
      className="py-28 relative"
      ref={sectionRef}
      style={{ backgroundColor: '#000000' }}
    >
      {/* Green glow blob */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 lg:w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: 'rgba(134,239,172,0.06)' }}
      />

      <div className="max-w-6xl mx-auto px-6">

        {/* ── Heading ── */}
        <div className={`mb-16 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p
            className="mb-3 text-xs font-mono uppercase tracking-widest"
            style={{ color: '#86efac' }}
          >
            Let&apos;s Talk
          </p>
          <h2 className="font-bold text-4xl md:text-5xl mb-4" style={{ color: '#ffffff' }}>
            Get In{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #86efac 0%, #4ade80 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Touch
            </span>
          </h2>
          <p className="max-w-lg mx-auto text-sm" style={{ color: '#a1a1aa' }}>
            Have a project in mind? Looking for a developer? Or just want to say hi?
            My inbox is always open.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* ── Left info ── */}
          <div
            className={`lg:col-span-2 space-y-6 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            {contactInfo.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-4 p-5 rounded-xl border group transition-all"
                style={{
                  backgroundColor: '#0a0a0a',
                  borderColor: '#1f1f1f',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(134,239,172,0.35)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#1f1f1f'}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: 'rgba(134,239,172,0.08)', border: '1px solid rgba(134,239,172,0.2)' }}
                >
                  <Icon size={18} style={{ color: '#86efac' }} />
                </div>
                <div>
                  <p className="text-xs font-mono mb-0.5" style={{ color: '#71717a' }}>{label}</p>
                  <p
                    className="text-sm transition-colors"
                    style={{ color: '#ffffff' }}
                    onMouseEnter={e => e.target.style.color = '#86efac'}
                    onMouseLeave={e => e.target.style.color = '#ffffff'}
                  >
                    {value}
                  </p>
                </div>
              </a>
            ))}

            {/* Socials */}
            <div
              className="p-5 rounded-xl border"
              style={{ backgroundColor: '#0a0a0a', borderColor: '#1f1f1f' }}
            >
              <p className="text-xs font-mono mb-4" style={{ color: '#71717a' }}>Find me on</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-lg border flex items-center justify-center transition-all hover:-translate-y-1"
                    style={{ backgroundColor: '#111111', borderColor: '#1f1f1f', color: '#71717a' }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = '#86efac'
                      e.currentTarget.style.borderColor = 'rgba(134,239,172,0.4)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = '#71717a'
                      e.currentTarget.style.borderColor = '#1f1f1f'
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div
              className="p-5 rounded-xl"
              style={{ backgroundColor: 'rgba(134,239,172,0.04)', border: '1px solid rgba(134,239,172,0.2)' }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#86efac' }} />
                <span className="text-sm font-medium" style={{ color: '#86efac' }}>Available Now</span>
              </div>
              <p className="text-xs" style={{ color: '#71717a' }}>Open to freelance projects and full-time roles.</p>
            </div>
          </div>

          {/* ── Right form ── */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          >
            <div
              className="p-8 rounded-2xl border"
              style={{ backgroundColor: '#0a0a0a', borderColor: '#1f1f1f' }}
            >

              {/* Success state */}
              {status === 'sent' ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'rgba(134,239,172,0.1)', border: '1px solid rgba(134,239,172,0.3)' }}
                  >
                    <Send size={24} style={{ color: '#86efac' }} />
                  </div>
                  <h3 className="font-semibold text-xl mb-2" style={{ color: '#ffffff' }}>Message Sent!</h3>
                  <p className="text-sm" style={{ color: '#71717a' }}>
                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-5 py-2 rounded-lg border text-sm transition-all"
                    style={{ backgroundColor: '#111111', borderColor: '#1f1f1f', color: '#71717a' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
                    onMouseLeave={e => e.currentTarget.style.color = '#71717a'}
                  >
                    Send another message
                  </button>
                </div>

              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono mb-2" style={{ color: '#71717a' }}>Your Name</label>
                      <input
                        type="text"
                        name="from_name"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none"
                        style={{
                          backgroundColor: '#111111',
                          border: '1px solid #1f1f1f',
                          color: '#ffffff',
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(134,239,172,0.5)'}
                        onBlur={e => e.target.style.borderColor = '#1f1f1f'}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono mb-2" style={{ color: '#71717a' }}>Email Address</label>
                      <input
                        type="email"
                        name="from_email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none"
                        style={{
                          backgroundColor: '#111111',
                          border: '1px solid #1f1f1f',
                          color: '#ffffff',
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(134,239,172,0.5)'}
                        onBlur={e => e.target.style.borderColor = '#1f1f1f'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono mb-2" style={{ color: '#71717a' }}>Message</label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell me about your project or just say hello..."
                      className="w-full px-4 py-3 rounded-xl text-sm transition-all outline-none resize-none"
                      style={{
                        backgroundColor: '#111111',
                        border: '1px solid #1f1f1f',
                        color: '#ffffff',
                      }}
                      onFocus={e => e.target.style.borderColor = 'rgba(134,239,172,0.5)'}
                      onBlur={e => e.target.style.borderColor = '#1f1f1f'}
                    />
                  </div>

                  {/* Error message */}
                  {status === 'error' && (
                    <p className="text-xs font-mono text-center" style={{ color: '#f87171' }}>
                      Kuch masla ho gaya. Dobara try karo ya seedha email bhejo.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: '#86efac',
                      color: '#000000',
                    }}
                    onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.backgroundColor = '#4ade80' }}
                    onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.backgroundColor = '#86efac' }}
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
                        <Send size={16} />
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
    </section>
  )
}