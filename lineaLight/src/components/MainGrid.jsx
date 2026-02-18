import { useEffect, useRef, useContext } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PreviewContext } from './ImagePreview'
import './MainGrid.css'
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
      item.classList.add('is-hovering')
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
      item.classList.remove('is-hovering')
      item.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
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
    <section className="main-grid" ref={gridRef}>
      {gridItems.map((item, index) => (
        <div
          key={index}
          className="grid-item"
          onClick={() => openPreview(item.image, item.label)}
        >
          <img
            src={item.image}
            alt={item.label}
            className="grid-image"
            loading="lazy"
            draggable={false}
          />
          <div className="grid-overlay" />
          <div className="grid-shine" />
          <span className="label">{item.label}</span>
        </div>
      ))}
    </section>
  )
}

export default MainGrid
