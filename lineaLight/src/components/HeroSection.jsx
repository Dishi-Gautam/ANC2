import { useEffect, useRef, useCallback } from 'react'
import { motion as Motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

	return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full blur-[3px] contrast-[1.12] saturate-105" />
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

	return <canvas ref={canvasRef} className="absolute inset-0 z-[1] h-full w-full" />
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
		<section
			className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-visible bg-[radial-gradient(ellipse_100%_80%_at_50%_35%,#161616_0%,#0a0a0a_45%,#000_100%)] px-4 pb-20 pt-[clamp(120px,16vh,180px)]"
			ref={sectionRef}
		>
			<RadiatingLines />
			<ParticleCanvas />

			<Motion.h1
				className="z-[3] mb-5 text-center text-[clamp(2.4rem,5.2vw,4.4rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white"
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease, delay: 0.25 }}
			>
				Contemporary lighting
				<br />
				solutions crafted for you
			</Motion.h1>

			<Motion.p
				className="z-[3] mb-8 max-w-[500px] text-center text-[clamp(0.9rem,1.15vw,1.08rem)] font-normal leading-[1.75] tracking-[0.01em] text-white/40"
				initial={{ opacity: 0, y: 18 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease, delay: 0.45 }}
			>
				Innovative indoor &amp; outdoor lighting designed with precision,
				<br className="hidden sm:block" />
				engineered for modern architectural spaces.
			</Motion.p>

			<Motion.div
				className="z-[3] mb-7 flex flex-wrap justify-center gap-3"
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease, delay: 0.6 }}
			>
				<a
					href="#contact"
					className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-[9px] border border-white/90 bg-white px-6 py-2.5 text-[0.88rem] font-semibold tracking-[0.005em] text-black transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:bg-white/90 hover:shadow-[0_4px_20px_rgba(255,255,255,0.12)]"
				>
					Contact us <span className="text-[1.05em] transition-transform duration-300 group-hover:translate-x-[3px]">&rarr;</span>
				</a>
				<a
					href="#products"
					className="group inline-flex items-center gap-1.5 whitespace-nowrap rounded-[9px] border border-white/15 bg-white/5 px-6 py-2.5 text-[0.88rem] font-semibold tracking-[0.005em] text-white/80 backdrop-blur-md transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-px hover:border-white/25 hover:bg-white/10"
				>
					Explore products <span className="text-[1.05em] transition-transform duration-300 group-hover:translate-x-[3px]">&rarr;</span>
				</a>
			</Motion.div>

			<Motion.div
				className="z-[3] mb-0 flex flex-wrap items-center justify-center gap-6"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.8, ease, delay: 0.75 }}
			>
				{features.map((f) => (
					<span key={f} className="inline-flex items-center gap-1.5 text-[0.78rem] font-medium tracking-[0.02em] text-white/35">
						<IconCheck /> {f}
					</span>
				))}
			</Motion.div>

			<div className="hero-cards-fan relative z-[3] mt-[clamp(40px,6vh,72px)] flex h-[280px] w-full max-w-[520px] items-center justify-center [perspective:1200px] md:h-[340px] md:max-w-[700px]" ref={cardsRef}>
				{imageCards.map(({ image, label }, i) => (
					<div
						key={i}
						className="hero-img-card absolute h-[230px] w-[160px] cursor-pointer overflow-hidden rounded-[14px] shadow-[0_12px_40px_rgba(0,0,0,0.45),0_2px_12px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_18px_56px_rgba(0,0,0,0.5),0_4px_18px_rgba(0,0,0,0.3)] md:h-[280px] md:w-[200px] md:rounded-[18px]"
						style={{ opacity: 0, transform: 'translateY(46px) scale(0.72)', visibility: 'hidden' }}
					>
						<img src={image} alt={label} draggable={false} className="pointer-events-none block h-full w-full select-none object-cover" />
						<div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
						<span className="absolute bottom-4 left-4 right-4 z-[2] text-[0.82rem] font-semibold tracking-[0.02em] text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.5)]">{label}</span>
					</div>
				))}

				<div className="pointer-events-none absolute left-1/2 top-1/2 -z-[1] h-[240px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.015)_40%,transparent_70%)] blur-[30px] md:h-[320px] md:w-[480px]" />
			</div>

			<div className="pointer-events-none absolute bottom-0 left-0 z-[5] h-[140px] w-full bg-gradient-to-t from-black to-transparent" />
		</section>
	)
}

