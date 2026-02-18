import './Footer.css'
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaPinterestP, FaSpotify } from 'react-icons/fa'

const socialLinks = [
  { name: 'Instagram', icon: <FaInstagram /> },
  { name: 'Facebook', icon: <FaFacebookF /> },
  { name: 'Twitter', icon: <FaTwitter /> },
  { name: 'Linkedin', icon: <FaLinkedinIn /> },
  { name: 'Youtube', icon: <FaYoutube /> },
  { name: 'Pinterest', icon: <FaPinterestP /> },
  { name: 'Spotify', icon: <FaSpotify /> },
]

const footerData = {
  contacts: {
    title: 'Contacts',
    links: ['Sales Network', 'Press Contacts', 'Contacts']
  },
  resources: {
    title: 'Resources',
    links: ['Catalogues', 'Projects', 'Outdoor', 'Indoor']
  },
  company: {
    title: 'Linea Light Group',
    links: ['Work with us', 'News', 'Events']
  },
  helpful: {
    title: 'Helpful',
    links: ['Research & development', 'Warranty', 'Newsletter', 'Plugin', 'Certificates']
  }
}

function Footer() {
  return (
    <footer className="footer">
      <div className="newsletter-section">
        <div className="newsletter-logo">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="26" stroke="white" strokeWidth="2"/>
            <path d="M28 6C15 6 6 15 6 28C6 41 15 50 28 50V6Z" fill="white"/>
          </svg>
        </div>
        <h2>Subscribe to our newsletter</h2>
        <p>New products and latest trends from lighting.</p>
        <button className="subscribe-btn">Subscribe</button>
      </div>

      <div className="footer-content">
        <div className="footer-column social-column">
          <ul className="social-links">
            {socialLinks.map((item, index) => (
              <li key={index}>
                <a href="#">
                  <span className="social-icon">{item.icon}</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h4>{footerData.contacts.title}</h4>
          <ul>
            {footerData.contacts.links.map((link, index) => (
              <li key={index}><a href="#">{link}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h4>{footerData.resources.title}</h4>
          <ul>
            {footerData.resources.links.map((link, index) => (
              <li key={index}><a href="#">{link}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h4>{footerData.company.title}</h4>
          <ul>
            {footerData.company.links.map((link, index) => (
              <li key={index}><a href="#">{link}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-column">
          <h4>{footerData.helpful.title}</h4>
          <ul>
            {footerData.helpful.links.map((link, index) => (
              <li key={index}><a href="#">{link}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="partners-section">
        <span className="partner">STYLEPARK</span>
        <span className="partner">archiproducts</span>
        <span className="partner archi-expo">Archi<sub>EXPO</sub></span>
      </div>

      <div className="footer-bottom">
        <p className="legal-text">LINEA LIGHT S.R.L. A SOCIO UNICO © 2024 - Company subject to management and coordination by Minulamp S.r.l. Cap. Soc. € 1.000.000 i.v. - R.I. TV/ C.F e P.IVA 01220530263</p>
        <div className="footer-links">
          <a href="#">Credits</a>
          <a href="#">Workspace</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
          <a href="#">Whistleblowing</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
