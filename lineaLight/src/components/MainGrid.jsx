import { useEffect, useRef, useContext } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PreviewContext } from './PreviewContext'
import pic1 from '../assets/pic1.jpg'
import pic2 from '../assets/pic2.jpg'
import pic3 from '../assets/pic3.jpg'

gsap.registerPlugin(ScrollTrigger)

const gridItems = [
  { label: 'Indoor', image: pic1 },
  { label: 'Outdoor', image: pic2 },
  { label: 'Flex lights', image: pic3 },
  { label: 'The Factory', image: pic2 },
  { label: 'Linealight Collection', image: pic1 },
  { label: 'Stilnovo', image: pic3 },
]

function MainGrid() {
  const gridRef = useRef(null)
  const { openPreview } = useContext(PreviewContext)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const items = grid.querySelectorAll('.grid-item')

    const onEnter = (e) => {
      const item = e.currentTarget
      item.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.5), 0 8px 20px rgba(0, 0, 0, 0.3)'
      item.style.zIndex = '4'
      const overlay = item.querySelector('.grid-overlay')
      const shine = item.querySelector('.grid-shine')
      const image = item.querySelector('.grid-image')
      if (overlay) overlay.style.opacity = '0.6'
      if (shine) shine.style.opacity = '1'
      if (image) image.style.transform = 'scale(1.08) translateZ(0)'
    }
    const onMove = (e) => {
      const item = e.currentTarget
      const rect = item.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rotateY = ((x - cx) / cx) * 6
      const rotateX = ((cy - y) / cy) * 4
      item.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
    }
    const onLeave = (e) => {
      const item = e.currentTarget
      item.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      item.style.boxShadow = ''
      item.style.zIndex = ''
      const overlay = item.querySelector('.grid-overlay')
      const shine = item.querySelector('.grid-shine')
      const image = item.querySelector('.grid-image')
      if (overlay) overlay.style.opacity = '1'
      if (shine) shine.style.opacity = '0'
      if (image) image.style.transform = 'translateZ(0)'
    }

    items.forEach((item) => {
      item.addEventListener('mouseenter', onEnter)
      item.addEventListener('mousemove', onMove)
      item.addEventListener('mouseleave', onLeave)
    })

    return () => {
      items.forEach((item) => {
        item.removeEventListener('mouseenter', onEnter)
        item.removeEventListener('mousemove', onMove)
        item.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  useEffect(() => {
    const gridItemElements = gridRef.current.querySelectorAll('.grid-item')

    gridItemElements.forEach((item) => {
      const img = item.querySelector('.grid-image')

      gsap.fromTo(item,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'top 40%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.to(img, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section className="mt-20 grid grid-cols-1 bg-black py-1.5 md:grid-cols-2 xl:grid-cols-3" ref={gridRef}>
      {gridItems.map((item, index) => (
        <div
          key={index}
          className="grid-item relative flex aspect-[4/3] cursor-pointer items-start justify-start overflow-hidden bg-[#111] p-5 [transform:perspective(800px)_rotateX(0deg)_rotateY(0deg)_scale3d(1,1,1)] [transform-style:preserve-3d] transition-[transform,box-shadow] duration-500 [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] md:aspect-[16/9] md:p-6 xl:aspect-[16/10]"
          onClick={() => openPreview(item.image, item.label)}
        >
          <img
            src={item.image}
            alt={item.label}
            className="grid-image pointer-events-none absolute inset-x-0 -inset-y-[10%] h-[120%] w-full object-cover object-center [transform:translateZ(0)] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
            loading="lazy"
            draggable={false}
          />
          <div className="grid-overlay pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/5 to-black/25 transition-opacity duration-300" />
          <div className="grid-shine pointer-events-none absolute inset-0 z-[3] bg-[linear-gradient(125deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.06)_40%,rgba(255,255,255,0)_60%)] opacity-0 transition-opacity duration-300" />
          <span className="label relative z-[2] text-xl font-medium text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.5)] md:text-[22px] xl:text-2xl">{item.label}</span>
        </div>
      ))}
    </section>
  )
}

export default MainGrid
