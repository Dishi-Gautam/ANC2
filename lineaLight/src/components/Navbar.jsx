import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import './Navbar.css'

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
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="mag-link"
    >
      <span className="mag-link-chars">
        {children.split('').map((char, i) => (
          <motion.span
            key={i}
            className="mag-link-char"
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
          </motion.span>
        ))}
      </span>

      <motion.span
        className="mag-link-underline"
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

      <motion.span
        className="mag-link-halo"
        initial={false}
        animate={{
          width: hovered ? 60 : 0,
          height: hovered ? 60 : 0,
          opacity: hovered ? 0.06 : 0,
        }}
        transition={{ duration: 0.6, ease: smooth }}
      />
    </motion.a>
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
    <motion.nav
      className="navbar"
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
      <div className={`navbar-inner${scrolled ? ' scrolled' : ''}`}>

        <motion.a
          href="#"
          className="navbar-logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: smooth }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>LOREM<span className="navbar-logo-dim">IPSUM</span></span>
          <motion.span
            className="navbar-logo-glow"
            whileHover={{ opacity: 0.08 }}
            initial={{ opacity: 0 }}
          />
        </motion.a>

        <ul className="navbar-links">
          {links.map((link, i) => (
            <motion.li
              key={link}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: smooth }}
            >
              <MagneticLink href={`#${link.toLowerCase()}`}>
                {link}
              </MagneticLink>
            </motion.li>
          ))}
        </ul>

        <motion.button
          className="navbar-hamburger"
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: smooth }}
        >
          <motion.span
            className="navbar-hamburger-line"
            animate={menuOpen ? { rotate: 45, y: 4, width: 18 } : { rotate: 0, y: 0, width: 20 }}
            transition={{ duration: 0.4, ease: smooth }}
          />
          <motion.span
            className="navbar-hamburger-line"
            style={{ width: 12 }}
            animate={menuOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: smooth }}
          />
          <motion.span
            className="navbar-hamburger-line"
            animate={menuOpen ? { rotate: -45, y: -4, width: 18 } : { rotate: 0, y: 0, width: 20 }}
            transition={{ duration: 0.4, ease: smooth }}
          />
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar-mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.5, ease: smooth }}
          >
            <ul>
              {links.map((link, i) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.45, ease: smooth }}
                >
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="navbar-mobile-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
