import { useEffect, useRef, useState, type FormEvent } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { contact, socialLinks } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

/**
 * Contact — magnetic CTAs, animated fields, closing visual moment.
 * Form is front-end only (mailto) — wire to a service later if needed.
 */
export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [focused, setFocused] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll('[data-reveal]'),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        },
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent('Portfolio inquiry')
    const body = encodeURIComponent(
      `From: ${email}\n\n${message || '(no message)'}`,
    )
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      {/* Closing 3D-adjacent visual — radial bloom */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[50vw] w-[80vw] -translate-x-1/2 translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(201,166,107,0.14),transparent_65%)] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <SectionHeading
          title={contact.heading}
          eyebrow="Contact"
          className="text-center [&_h2]:mx-auto [&_p]:mx-auto"
        />

        <p
          data-reveal
          className="mx-auto mb-12 max-w-xl text-base text-[var(--color-muted)]"
        >
          {contact.body}
        </p>

        <div
          data-reveal
          className="mb-14 grid gap-8 sm:grid-cols-3"
        >
          {[
            { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
            { label: 'Phone', value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, '')}` },
            { label: 'Location', value: contact.location, href: undefined },
          ].map((item) => (
            <div key={item.label}>
              <p className="mb-2 text-[10px] tracking-[0.25em] text-[var(--color-accent)] uppercase">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  className="text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
                  data-cursor="link"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-sm text-[var(--color-text)]">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        <form
          data-reveal
          onSubmit={onSubmit}
          className="mx-auto max-w-lg space-y-4 text-left"
        >
          <label className="block">
            <span className="mb-2 block text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
              Your email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused(null)}
              placeholder="you@example.com"
              className={`w-full border bg-transparent px-4 py-3.5 text-sm text-[var(--color-text)] outline-none transition-colors duration-400 placeholder:text-[var(--color-muted)] ${
                focused === 'email'
                  ? 'border-[var(--color-accent)]'
                  : 'border-[var(--color-border)]'
              }`}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[10px] tracking-[0.2em] text-[var(--color-muted)] uppercase">
              Message
            </span>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused(null)}
              placeholder="Tell me about your project…"
              className={`w-full resize-none border bg-transparent px-4 py-3.5 text-sm text-[var(--color-text)] outline-none transition-colors duration-400 placeholder:text-[var(--color-muted)] ${
                focused === 'message'
                  ? 'border-[var(--color-accent)]'
                  : 'border-[var(--color-border)]'
              }`}
            />
          </label>
          <div className="pt-2 text-center">
            <MagneticButton
              type="submit"
              className="bg-[var(--color-accent)] px-8 py-3.5 text-xs font-semibold tracking-[0.2em] text-[var(--color-void)] uppercase"
            >
              {sent ? 'Opening mail…' : 'Send Message'}
            </MagneticButton>
          </div>
        </form>

        <div data-reveal className="mt-12 flex justify-center gap-8">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-[0.2em] text-[var(--color-muted)] uppercase transition-colors hover:text-[var(--color-accent)]"
              data-cursor="link"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
