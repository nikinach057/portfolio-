/** Navbar brand — serif “N” mark only (NP lives in the tab favicon) */
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <a
      href="#hero"
      onClick={(e) => {
        e.preventDefault()
        document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' })
      }}
      className={`group inline-flex items-center ${className}`}
      data-cursor="link"
      aria-label="Nachappa PP — home"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] bg-black transition-transform duration-400 group-hover:scale-105">
        <span className="font-serif text-[1.2rem] leading-none text-white">N</span>
      </span>
    </a>
  )
}
