import { useState, useEffect, useRef } from 'react'
import { motion as Motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

const links = ['Home', 'About Us', 'Contact', 'Products']
const smooth = [0.22, 1, 0.36, 1]

function MagneticLink({ children, href, onClick }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 25 })
  const springY = useSpring(y, { stiffness: 200, damping: 25 })
  const [hovered, setHovered] = useState(false)

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.25)
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.3)
  }

  const reset = () => { x.set(0); y.set(0); setHovered(false) }

  return (
    <Motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="relative block cursor-pointer select-none px-1 py-2 no-underline"
    >
      <span className="flex overflow-hidden">
        {children.split('').map((char, i) => (
          <Motion.span
            key={i}
            className="inline-block text-sm font-medium tracking-[0.05em]"
            initial={false}
            animate={{
              y: hovered ? -1 : 0,
              color: hovered ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)',
            }}
            transition={{
              y: { delay: i * 0.018, duration: 0.35, ease: smooth },
              color: { delay: i * 0.018, duration: 0.3, ease: smooth },
            }}
          >
            {char}
          </Motion.span>
        ))}
      </span>

      <Motion.span
        className="pointer-events-none absolute bottom-0 left-1/2 h-[1.5px] rounded-full bg-white"
        style={{ originX: 0.5 }}
        initial={false}
        animate={{
          width: hovered ? '100%' : '0%',
          x: '-50%',
          opacity: hovered ? 1 : 0,
          boxShadow: hovered
            ? '0 0 8px rgba(255,255,255,0.5), 0 0 18px rgba(255,255,255,0.15)'
            : '0 0 0px rgba(255,255,255,0)',
        }}
        transition={{ duration: 0.5, ease: smooth }}
      />

      <Motion.span
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial-[at_center] from-white to-transparent"
        initial={false}
        animate={{
          width: hovered ? 60 : 0,
          height: hovered ? 60 : 0,
          opacity: hovered ? 0.06 : 0,
        }}
        transition={{ duration: 0.6, ease: smooth }}
      />
    </Motion.a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      if (y < 60) setVisible(true)
      else if (y > lastY.current + 6) setVisible(false)
      else if (y < lastY.current - 6) setVisible(true)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Motion.nav
      className="fixed left-0 right-0 top-0 z-[100] px-4 py-3 sm:px-6"
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: visible ? 0 : -110,
        opacity: visible ? 1 : 0,
        filter: visible ? 'blur(0px)' : 'blur(6px)',
      }}
      transition={{
        y: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        filter: { duration: 0.6, ease: 'easeOut' },
      }}
    >
      <div
        className={`z-[100] mx-auto flex w-full max-w-7xl items-center justify-between rounded-2xl border px-6 py-4 transition-all duration-700 sm:px-10 ${
          scrolled
            ? 'border-white/10 bg-black/50 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl'
            : 'border-white/5 bg-black/25 shadow-[0_6px_24px_rgba(8,10,15,0.45)] backdrop-blur-xl'
        }`}
      >

        <Motion.a
          href="#"
          className="relative select-none text-lg font-bold tracking-[-0.025em] text-white no-underline sm:text-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: smooth }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>
            LOREM
            <span className="font-light opacity-50">IPSUM</span>
          </span>
          <Motion.span
            className="pointer-events-none absolute inset-0 rounded-lg bg-radial-[circle_at_center] from-white to-transparent"
            whileHover={{ opacity: 0.08 }}
            initial={{ opacity: 0 }}
          />
        </Motion.a>

        <ul className="hidden list-none items-center gap-8 md:flex">
          {links.map((link, i) => (
            <Motion.li
              key={link}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: smooth }}
            >
              <MagneticLink href={`#${link.toLowerCase()}`}>
                {link}
              </MagneticLink>
            </Motion.li>
          ))}
        </ul>

        <Motion.button
          className="relative flex cursor-pointer flex-col gap-1.5 border-none bg-transparent p-2 md:hidden"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: smooth }}
        >
          <Motion.span
            className="block h-[1.5px] origin-center bg-white/70"
            animate={menuOpen ? { rotate: 45, y: 4, width: 18 } : { rotate: 0, y: 0, width: 20 }}
            transition={{ duration: 0.4, ease: smooth }}
          />
          <Motion.span
            className="block h-[1.5px] origin-center bg-white/70"
            style={{ width: 12 }}
            animate={menuOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: smooth }}
          />
          <Motion.span
            className="block h-[1.5px] origin-center bg-white/70"
            animate={menuOpen ? { rotate: -45, y: -4, width: 18 } : { rotate: 0, y: 0, width: 20 }}
            transition={{ duration: 0.4, ease: smooth }}
          />
        </Motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <Motion.div
            className="mx-auto mt-2 w-full max-w-7xl rounded-2xl border border-white/10 bg-black/80 p-5 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.5, ease: smooth }}
          >
            <ul className="flex list-none flex-col gap-1">
              {links.map((link, i) => (
                <Motion.li
                  key={link}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.45, ease: smooth }}
                >
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="block border-b border-white/5 py-2.5 text-sm font-medium tracking-[0.05em] text-white/60 no-underline transition-colors duration-300 hover:text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link}
                  </a>
                </Motion.li>
              ))}
            </ul>
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.nav>
  )
}
