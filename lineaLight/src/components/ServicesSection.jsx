import { useEffect, useRef, useContext } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PreviewContext } from './PreviewContext'
import './ServicesSection.css'
import pic1 from '../assets/pic1.jpg'
import pic2 from '../assets/pic2.jpg'
import pic3 from '../assets/pic3.jpg'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    tag: 'A 360° System',
    title: 'Linealight Collection',
    description: 'Light Up your Service, Easy!',
    image: pic1
  },
  {
    tag: 'Tailor-Made Solutions',
    title: 'Custom Projects for Every Space',
    description: 'One Project, One BeSpoke Light',
    image: pic2
  },
  {
    tag: 'Custom Finishes',
    title: 'Finishes Catalogue',
    description: 'Adapt every detail to your project',
    image: pic3
  }
]

function ServicesSection() {
  const sectionRef = useRef(null)
  const { openPreview } = useContext(PreviewContext)

  useEffect(() => {
    const serviceCards = sectionRef.current.querySelectorAll('.service-card')
    
    serviceCards.forEach((card) => {
      const imageWrapper = card.querySelector('.service-image')
      const content = card.querySelector('.service-content')
      
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 80,
          rotationY: -15,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.to(imageWrapper, {
        yPercent: -20,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      })

      gsap.to(content, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section className="services-section" ref={sectionRef}>
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="service-card"
            onClick={() => openPreview(service.image, service.title)}
          >
            <div 
              className="service-image"
              style={{ backgroundImage: `url(${service.image})` }}
            />
            <div className="service-content">
              <span className="service-tag">{service.tag}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesSection
