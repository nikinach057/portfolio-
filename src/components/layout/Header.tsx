import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, socialLinks } from '@/data/content'
import { GitHubIcon, LinkedInIcon } from '@/components/ui/SocialIcons'
import { BrandMark } from '@/components/ui/BrandMark'

/**
 * Header — brand (N mark + NP) left, socials, section nav right.
 */
export function Header({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed top-0 right-0 left-0 z-[100] transition-[background,backdrop-filter] duration-500 ${
        scrolled || open
          ? 'bg-[rgba(8,8,10,0.85)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-10">
        <div className="flex items-center gap-6">
          <BrandMark />

          <div className="hidden items-center gap-5 sm:flex">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-[11px] tracking-[0.15em] text-[var(--color-muted)] uppercase transition-colors hover:text-[var(--color-accent)]"
                data-cursor="link"
              >
                {s.label === 'LinkedIn' ? (
                  <LinkedInIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
                ) : (
                  <GitHubIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
                )}
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                go(link.href)
              }}
              className="text-[11px] font-medium tracking-[0.22em] text-[var(--color-muted)] uppercase transition-colors duration-300 hover:text-[var(--color-text)]"
              data-cursor="link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          data-cursor="link"
        >
          <span
            className={`block h-px w-5 bg-[var(--color-text)] transition-transform duration-400 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-5 bg-[var(--color-text)] transition-opacity duration-300 ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-px w-5 bg-[var(--color-text)] transition-transform duration-400 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 top-full border-t border-[var(--color-border)] bg-[var(--color-void)] lg:hidden"
          >
            <nav className="flex flex-col px-6 py-8">
              <div className="mb-6 flex gap-6 sm:hidden">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs tracking-[0.15em] text-[var(--color-muted)] uppercase"
                    data-cursor="link"
                  >
                    {s.label === 'LinkedIn' ? <LinkedInIcon /> : <GitHubIcon />}
                    {s.label}
                  </a>
                ))}
              </div>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => {
                    e.preventDefault()
                    go(link.href)
                  }}
                  className="font-display border-b border-[var(--color-border)] py-4 text-2xl font-semibold tracking-tight text-[var(--color-text)]"
                  data-cursor="link"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
