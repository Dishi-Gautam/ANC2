import { useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HeroSection.css'
import pic1 from '../assets/pic1.jpg'
import pic2 from '../assets/pic2.jpg'
import pic3 from '../assets/pic3.jpg'

gsap.registerPlugin(ScrollTrigger)

const ease = [0.16, 1, 0.3, 1]

const IconCheck = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
		<polyline points="20 6 9 17 4 12" />
	</svg>
)

function RadiatingLines() {
	const canvasRef = useRef(null)
	const raf = useRef(null)
	const time = useRef(0)

	const resize = useCallback(() => {
		const c = canvasRef.current
		if (!c) return
		c.width = c.offsetWidth * devicePixelRatio
		c.height = c.offsetHeight * devicePixelRatio
	}, [])

	useEffect(() => {
		const c = canvasRef.current
		if (!c) return
		const ctx = c.getContext('2d')
		resize()
		window.addEventListener('resize', resize)

		const draw = () => {
			time.current += 0.0015
			const w = c.width
			const h = c.height
			const dpr = devicePixelRatio
			ctx.clearRect(0, 0, w, h)

			const cx = w / 2
			const cy = h * 0.48
			const lineCount = 110
			const maxLen = Math.max(w, h) * 1.2

			ctx.shadowBlur = 6 * dpr
			ctx.shadowColor = 'rgba(170,160,255,0.06)'

			for (let i = 0; i < lineCount; i++) {
				const angle = (i / lineCount) * Math.PI * 2
				const wobble = Math.sin(time.current + i * 0.35) * 0.008
				const a = angle + wobble
				const x2 = cx + Math.cos(a) * maxLen
				const y2 = cy + Math.sin(a) * maxLen

				ctx.beginPath()
				ctx.moveTo(cx, cy)
				ctx.lineTo(x2, y2)
				ctx.strokeStyle = `rgba(255,255,255,${0.06 + Math.sin(time.current * 1.5 + i) * 0.02})`
				ctx.lineWidth = 1.2 * dpr
				ctx.stroke()
			}
			raf.current = requestAnimationFrame(draw)
		}
		draw()
		return () => {
			cancelAnimationFrame(raf.current)
			window.removeEventListener('resize', resize)
		}
	}, [resize])

	return <canvas ref={canvasRef} className="hero-rays" />
}

function ParticleCanvas() {
	const canvasRef = useRef(null)
	const particles = useRef([])
	const raf = useRef(null)
	const mouse = useRef({ x: -9999, y: -9999 })

	const init = useCallback((canvas) => {
		const count = Math.min(50, Math.floor((canvas.width * canvas.height) / 20000))
		particles.current = Array.from({ length: count }, () => ({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			r: Math.random() * 1.2 + 0.3,
			dx: (Math.random() - 0.5) * 0.15,
			dy: (Math.random() - 0.5) * 0.15,
			o: Math.random() * 0.3 + 0.08,
		}))
	}, [])

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return
		const ctx = canvas.getContext('2d')

		const resizeFn = () => {
			canvas.width = canvas.offsetWidth * devicePixelRatio
			canvas.height = canvas.offsetHeight * devicePixelRatio
			ctx.scale(devicePixelRatio, devicePixelRatio)
			init(canvas)
		}
		resizeFn()
		window.addEventListener('resize', resizeFn)

		const onMove = (e) => {
			const r = canvas.getBoundingClientRect()
			mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top }
		}
		canvas.addEventListener('pointermove', onMove)

		const draw = () => {
			const w = canvas.offsetWidth
			const h = canvas.offsetHeight
			ctx.clearRect(0, 0, w, h)

			particles.current.forEach((p) => {
				const mdx = p.x - mouse.current.x
				const mdy = p.y - mouse.current.y
				const dist = Math.sqrt(mdx * mdx + mdy * mdy)
				if (dist < 100) {
					const force = ((100 - dist) / 100) * 0.4
					p.x += (mdx / dist) * force
					p.y += (mdy / dist) * force
				}
				p.x += p.dx
				p.y += p.dy
				if (p.x < -4) p.x = w + 4
				if (p.x > w + 4) p.x = -4
				if (p.y < -4) p.y = h + 4
				if (p.y > h + 4) p.y = -4

				ctx.beginPath()
				ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
				ctx.fillStyle = `rgba(255,255,255,${p.o})`
				ctx.fill()
			})
			raf.current = requestAnimationFrame(draw)
		}
		draw()

		return () => {
			cancelAnimationFrame(raf.current)
			window.removeEventListener('resize', resizeFn)
			canvas.removeEventListener('pointermove', onMove)
		}
	}, [init])

	return <canvas ref={canvasRef} className="hero-particles" />
}

const imageCards = [
	{ image: pic1, label: 'Indoor Collection', rotate: -12, x: -260 },
	{ image: pic2, label: 'Outdoor Series', rotate: -4, x: -90 },
	{ image: pic3, label: 'Linea Light Group', rotate: 4, x: 90 },
	{ image: pic1, label: 'Stilnovo', rotate: 12, x: 260 },
]

export default function HeroSection() {
	const features = ['Energy efficient', 'Award-winning design', 'Global delivery']
	const sectionRef = useRef(null)
	const cardsRef = useRef(null)

	useEffect(() => {
		const section = sectionRef.current
		const cardsContainer = cardsRef.current
		const cardEls = cardsContainer?.querySelectorAll('.hero-img-card')
		if (!section || !cardEls?.length) return

		const ctx = gsap.context(() => {
			cardEls.forEach((card, i) => {
				gsap.set(card, {
					autoAlpha: 0,
					scale: 0.72,
					x: 0,
					rotation: 0,
					y: 46,
					zIndex: imageCards.length - i,
				})
			})

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: section,
					start: 'top top',
					end: '+=800',
					scrub: 0.6,
				},
			})
			cardEls.forEach((card, i) => {
				const offset = 0.12 + i * 0.28
				tl.to(card, {
					autoAlpha: 1,
					scale: 1,
					y: 0,
					x: imageCards[i].x,
					rotation: imageCards[i].rotate,
					zIndex: imageCards.length + i,
					duration: 1,
					ease: 'power3.out',
				}, offset)
			})

			tl.to(cardsContainer, {
				y: -8,
				duration: 0.3,
				ease: 'power1.inOut',
			}, '>')
		}, section)

		return () => {
			ctx.revert()
		}
	}, [])

	return (
		<section className="hero-section" ref={sectionRef}>
			<RadiatingLines />
			<ParticleCanvas />

			<motion.h1
				className="hero-title"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease, delay: 0.25 }}
			>
				Contemporary lighting
				<br />
				solutions crafted for you
			</motion.h1>

			<motion.p
				className="hero-sub"
				initial={{ opacity: 0, y: 18 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease, delay: 0.45 }}
			>
				Innovative indoor &amp; outdoor lighting designed with precision,
				<br className="hero-br-desktop" />
				engineered for modern architectural spaces.
			</motion.p>

			<motion.div
				className="hero-ctas"
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease, delay: 0.6 }}
			>
				<a href="#contact" className="hero-btn hero-btn-primary">
					Contact us <span className="hero-btn-arrow">&rarr;</span>
				</a>
				<a href="#products" className="hero-btn hero-btn-secondary">
					Explore products <span className="hero-btn-arrow">&rarr;</span>
				</a>
			</motion.div>

			<motion.div
				className="hero-trust"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, ease, delay: 0.75 }}
			>
				{features.map((f) => (
					<span key={f} className="hero-trust-item">
						<IconCheck /> {f}
					</span>
				))}
			</motion.div>

			<div className="hero-cards-fan" ref={cardsRef}>
				{imageCards.map(({ image, label }, i) => (
					<div key={i} className="hero-img-card" style={{ opacity: 0, transform: 'translateY(46px) scale(0.72)', visibility: 'hidden' }}>
						<img src={image} alt={label} draggable={false} />
						<div className="hero-img-card-overlay" />
						<span className="hero-img-card-label">{label}</span>
					</div>
				))}

				<div className="hero-cards-glow" />
			</div>

			<div className="hero-bottom-fade" />
		</section>
	)
}

