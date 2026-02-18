import { useEffect, useRef, useContext } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PreviewContext } from './PreviewContext'
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
    <section className="bg-black px-4 py-14 sm:px-6 lg:px-10" ref={sectionRef}>
      <h2 className="mb-8 text-center text-3xl font-medium text-white">Our Services</h2>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="service-card group relative min-h-[420px] cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-950"
            onClick={() => openPreview(service.image, service.title)}
          >
            <div 
              className="service-image absolute inset-0 bg-cover bg-center [transform:translateZ(0)]"
              style={{ backgroundImage: `url(${service.image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/75" />
            <div className="service-content relative z-[2] flex h-full flex-col justify-end p-7">
              <span className="mb-2 text-xs uppercase tracking-[0.12em] text-white/70">{service.tag}</span>
              <h3 className="mb-1 text-2xl font-semibold text-white">{service.title}</h3>
              <p className="text-sm text-white/75">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServicesSection
