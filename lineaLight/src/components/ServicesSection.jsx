import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import pic1 from '../assets/pic1.jpg'
import pic2 from '../assets/pic2.jpg'
import pic3 from '../assets/pic3.jpg'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    tag: 'A 360° System',
    title: 'Linealight\nCollection',
    description:
      'Your complete lighting ecosystem designed for seamless integration across every architectural space.',
    image: pic1,
  },
  {
    tag: 'Tailor-Made Solutions',
    title: 'Custom Projects\nfor Every Space',
    description:
      'One Project, One Bespoke Light. Precision-crafted solutions tailored to your unique requirements.',
    image: pic2,
  },
  {
    tag: 'Custom Finishes',
    title: 'Finishes\nCatalogue',
    description:
      'Adapt every detail to your project with our extensive range of custom finishes and premium materials.',
    image: pic3,
  },
  {
    tag: 'Smart Integration',
    title: 'Intelligent\nLighting Control',
    description:
      'Seamlessly connect your lighting with modern smart-home and building-management systems for effortless control.',
    image: pic1,
  },
  {
    tag: 'Sustainable Design',
    title: 'Energy Efficient\nSolutions',
    description:
      'Award-winning designs that reduce energy consumption while delivering exceptional illumination quality.',
    image: pic2,
  },
]

function ServicesSection() {
  const wrapperRef = useRef(null)
  const pinRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const pin = pinRef.current
    if (!wrapper || !pin) return

    const ctx = gsap.context(() => {
      const textPanels = pin.querySelectorAll('.svc-text')
      const imagePanels = pin.querySelectorAll('.svc-img')
      const bars = pin.querySelectorAll('.svc-bar')
      const count = services.length

      /* ---------- initial state ---------- */
      textPanels.forEach((p, i) => {
        if (i > 0) gsap.set(p, { autoAlpha: 0, y: 40 })
      })
      imagePanels.forEach((p, i) => {
        if (i > 0) gsap.set(p, { autoAlpha: 0, scale: 1.04 })
      })
      bars.forEach((b, i) => {
        gsap.set(b, { scaleX: i === 0 ? 1 : 0, opacity: i === 0 ? 1 : 0.3 })
      })

      /* ---------- build timeline ---------- */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: `+=${count * 100}vh`,
          pin: pin,
          scrub: 0.5,
          anticipatePin: 1,
        },
      })

      for (let i = 0; i < count - 1; i++) {
        const pos = i
        // fade-out current text + image
        tl.to(textPanels[i], { autoAlpha: 0, y: -30, duration: 0.4, ease: 'power2.in' }, pos)
        tl.to(imagePanels[i], { autoAlpha: 0, scale: 1.06, duration: 0.5, ease: 'power2.in' }, pos)
        tl.to(bars[i], { scaleX: 0, opacity: 0.3, duration: 0.35 }, pos)

        // fade-in next
        tl.fromTo(
          textPanels[i + 1],
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.45, ease: 'power3.out' },
          pos + 0.3,
        )
        tl.fromTo(
          imagePanels[i + 1],
          { autoAlpha: 0, scale: 1.04 },
          { autoAlpha: 1, scale: 1, duration: 0.55, ease: 'power3.out' },
          pos + 0.3,
        )
        tl.to(bars[i + 1], { scaleX: 1, opacity: 1, duration: 0.45 }, pos + 0.3)
      }
    }, wrapper)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef}>
      <div
        ref={pinRef}
        className="relative flex h-screen w-full items-center overflow-hidden bg-[#0a0a0a]"
      >
        {/* ───── right: full-bleed image ───── */}
        <div className="pointer-events-none absolute inset-0">
          {services.map((s, i) => (
            <div key={i} className="svc-img absolute inset-0">
              <img
                src={s.image}
                alt={s.title.replace('\n', ' ')}
                className="h-full w-full object-cover"
                loading={i < 2 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
          {/* gradient overlay: left fade for text readability + subtle top/bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/85 via-[42%] to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]/40" />
        </div>

        {/* ───── left: text panel ───── */}
        <div className="relative z-10 flex w-full flex-col justify-center px-6 sm:px-10 lg:w-[48%] lg:px-16 xl:px-24">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.15em] text-white/60">Our Services</h3>
          <div className="relative min-h-[280px] sm:min-h-[320px]">
            {services.map((s, i) => (
              <div
                key={i}
                className={`svc-text ${i > 0 ? 'absolute inset-0' : ''}`}
              >
                <span className="mb-6 inline-block rounded-full border border-white px-4 py-1.5 text-[15px] font-semibold tracking-wide text-white">
                  {s.tag}
                </span>

                <h2 className="mb-5 whitespace-pre-line text-[clamp(2rem,4.5vw,3.6rem)] font-bold leading-[1.1] tracking-[-0.025em] text-white">
                  {s.title}
                </h2>

                <p className="max-w-[420px] text-[clamp(0.88rem,1.08vw,1.06rem)] leading-[1.8] text-white/80">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          {/* progress bars */}
          <div className="mt-12 flex flex-col gap-2">
            {services.map((_, i) => (
              <div
                key={i}
                className="svc-bar h-[2.5px] w-[36px] origin-left rounded-full bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesSection
