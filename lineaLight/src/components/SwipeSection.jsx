import { useEffect, useRef, useContext } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PreviewContext } from './ImagePreview'
import './SwipeSection.css'
import pic1 from '../assets/pic1.jpg'
import pic2 from '../assets/pic2.jpg'
import pic3 from '../assets/pic3.jpg'

gsap.registerPlugin(ScrollTrigger)

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
    const cards = sectionRef.current.querySelectorAll('.card')

    const onMove = (e) => {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const rotateY = ((x - cx) / cx) * 8
      const rotateX = ((cy - y) / cy) * 6
      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`
    }
    const onEnter = (e) => {
      e.currentTarget.classList.add('is-hovering')
    }
    const onLeave = (e) => {
      const card = e.currentTarget
      card.classList.remove('is-hovering')
      card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    }

    cards.forEach((card) => {
      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
    })

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  useEffect(() => {
    const cards = sectionRef.current.querySelectorAll('.card')
    
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
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
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
    <section className="swipe-section" ref={sectionRef}>
      <div className="swipe-header">
        <h2>Catalogues & Brochures</h2>
        <div className="swipe-controls">
          <button onClick={() => scroll('left')} className="swipe-btn" aria-label="Scroll left">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button onClick={() => scroll('right')} className="swipe-btn" aria-label="Scroll right">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="swipe-container" ref={containerRef}>
        {catalogues.map((item, index) => (
          <div key={index} className="swipe-item">
            <div className="card" onClick={() => openPreview(item.image, item.title)}>
              <div 
                className="card-image"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="card-shine" />
              <div className="card-content">
                <span className="card-type">{item.type}</span>
                {item.category && <span className="card-category">{item.category}</span>}
                <div className="card-bottom">
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
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
