import { useEffect, useRef, useContext } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PreviewContext } from './PreviewContext'
import pic1 from '../assets/pic1.jpg'
import pic2 from '../assets/pic2.jpg'
import pic3 from '../assets/pic3.jpg'


const catalogues = [
  { type: 'Catalogue', title: 'MAESTRO', subtitle: 'quattro.1', image: pic1 },
  { type: 'Brochure', category: 'BOLLARDS', title: 'BUZZER_Q', subtitle: '2025', image: pic2 },
  { type: 'Brochure', category: 'BOLLARDS', title: 'BOND PRO', subtitle: '2025', image: pic3 },
  { type: 'Catalogue', title: 'PRODUCT', subtitle: 'Series', image: pic1 },
  { type: 'Brochure', title: 'OUTDOOR', subtitle: '2025', image: pic2 },
  { type: 'Catalogue', title: 'INDOOR', subtitle: '2025', image: pic3 },
]

function SwipeSection() {
  const containerRef = useRef(null)
  const sectionRef = useRef(null)
  const { openPreview } = useContext(PreviewContext)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    // enable hover effects on all pointer types (kept rAF throttling for performance)
    const cards = section.querySelectorAll('.card')
    const frameByCard = new WeakMap()

    const onMove = (e) => {
      const card = e.currentTarget
      const existingFrame = frameByCard.get(card)
      if (existingFrame) cancelAnimationFrame(existingFrame)

      const frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const cx = rect.width / 2
        const cy = rect.height / 2
        const rotateY = ((x - cx) / cx) * 8
        const rotateX = ((cy - y) / cy) * 6
        card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
      })

      frameByCard.set(card, frame)
    }
    const onEnter = (e) => {
      const card = e.currentTarget
      card.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.45), 0 10px 24px rgba(0, 0, 0, 0.3)'
      card.style.zIndex = '4'
      const shine = card.querySelector('.card-shine')
      const image = card.querySelector('.card-image')
      if (shine) shine.style.opacity = '1'
      if (image) image.style.transform = 'scale(1.1) translateZ(0)'
    }
    const onLeave = (e) => {
      const card = e.currentTarget
      const frame = frameByCard.get(card)
      if (frame) cancelAnimationFrame(frame)
      frameByCard.delete(card)
      card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      card.style.boxShadow = ''
      card.style.zIndex = ''
      const shine = card.querySelector('.card-shine')
      const image = card.querySelector('.card-image')
      if (shine) shine.style.opacity = '0'
      if (image) image.style.transform = 'translateZ(0)'
    }

    cards.forEach((card) => {
      card.addEventListener('pointerenter', onEnter)
      card.addEventListener('pointermove', onMove)
      card.addEventListener('pointerleave', onLeave)
    })

    return () => {
      cards.forEach((card) => {
        const frame = frameByCard.get(card)
        if (frame) cancelAnimationFrame(frame)
        card.removeEventListener('pointerenter', onEnter)
        card.removeEventListener('pointermove', onMove)
        card.removeEventListener('pointerleave', onLeave)
      })
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll('.card')

      cards.forEach((card) => {
        const cardImage = card.querySelector('.card-image')

        gsap.fromTo(card,
          {
            opacity: 0,
            x: 50,
            rotationY: 15
          },
          {
            opacity: 1,
            x: 0,
            rotationY: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'left 90%',
              toggleActions: 'play none none reverse'
            }
          }
        )

        gsap.to(cardImage, {
          scale: 1.15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        })
      })
    }, section)

    return () => {
      ctx.revert()
    }
  }, [])

  const scroll = (direction) => {
    if (!containerRef.current) return
    containerRef.current.scrollBy({
      left: direction === 'right' ? 350 : -350,
      behavior: 'smooth'
    })
  }

  return (
    <section className="bg-[#0a0a0a] px-4 py-10 sm:px-5 md:px-8 md:py-14 lg:px-10 lg:py-20" ref={sectionRef}>
      <div className="mb-8 flex items-center justify-between sm:mb-6">
        <h2 className="text-[22px] font-medium text-white md:text-[26px] lg:text-[28px]">Catalogues & Brochures</h2>
        <div className="flex gap-3">
          <button
            onClick={() => scroll('left')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black md:h-11 md:w-11"
            aria-label="Scroll left"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black md:h-11 md:w-11"
            aria-label="Scroll right"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex gap-5 overflow-x-auto pb-2 [scroll-snap-type:x_mandatory] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden" ref={containerRef}>
        {catalogues.map((item, index) => (
          <div key={index} className="swipe-item shrink-0 basis-[280px] [perspective:1000px] md:basis-[300px] lg:basis-[320px] [scroll-snap-align:start]">
            <div
              className="card relative flex h-[380px] flex-col overflow-hidden rounded-2xl text-white [transform:perspective(700px)_rotateX(0deg)_rotateY(0deg)_scale3d(1,1,1)] [transform-style:preserve-3d] transition-[transform,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] lg:h-[420px]"
              onClick={() => openPreview(item.image, item.title)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="card-image pointer-events-none absolute inset-0 h-full w-full object-cover object-center [transform:translateZ(0)] transition-transform duration-500"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
              <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
              <div className="card-shine pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(125deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.08)_40%,rgba(255,255,255,0)_60%)] opacity-0 transition-opacity duration-300" />
              <div className="service-content relative z-[3] flex h-full flex-col p-7">
                <span className="text-sm opacity-80">{item.type}</span>
                {item.category && <span className="text-xs uppercase tracking-[1px] text-zinc-400">{item.category}</span>}
                <div className="mt-auto">
                  <h3 className="mb-1 text-2xl font-bold lg:text-[28px]">{item.title}</h3>
                  <p className="text-[15px] opacity-80 lg:text-base">{item.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SwipeSection
