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
    <footer className="border-t border-white/10 bg-black px-4 pb-8 pt-14 text-white sm:px-6 lg:px-10">
      <div className="mx-auto mb-10 max-w-7xl rounded-3xl border border-white/10 bg-zinc-950/70 p-8 text-center backdrop-blur-xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="26" stroke="white" strokeWidth="2"/>
            <path d="M28 6C15 6 6 15 6 28C6 41 15 50 28 50V6Z" fill="white"/>
          </svg>
        </div>
        <h2 className="mb-2 text-2xl font-semibold sm:text-3xl">Subscribe to our newsletter</h2>
        <p className="mb-5 text-sm text-white/70 sm:text-base">New products and latest trends from lighting.</p>
        <button className="rounded-lg border border-white/20 bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90">
          Subscribe
        </button>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 border-b border-white/10 pb-10 md:grid-cols-2 xl:grid-cols-5">
        <div>
          <ul className="space-y-2">
            {socialLinks.map((item, index) => (
              <li key={index}>
                <a href="#" className="inline-flex items-center gap-2 text-sm text-white/75 transition hover:text-white">
                  <span className="text-white/85">{item.icon}</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-white">{footerData.contacts.title}</h4>
          <ul className="space-y-2">
            {footerData.contacts.links.map((link, index) => (
              <li key={index}><a href="#" className="text-sm text-white/70 transition hover:text-white">{link}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-white">{footerData.resources.title}</h4>
          <ul className="space-y-2">
            {footerData.resources.links.map((link, index) => (
              <li key={index}><a href="#" className="text-sm text-white/70 transition hover:text-white">{link}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-white">{footerData.company.title}</h4>
          <ul className="space-y-2">
            {footerData.company.links.map((link, index) => (
              <li key={index}><a href="#" className="text-sm text-white/70 transition hover:text-white">{link}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.08em] text-white">{footerData.helpful.title}</h4>
          <ul className="space-y-2">
            {footerData.helpful.links.map((link, index) => (
              <li key={index}><a href="#" className="text-sm text-white/70 transition hover:text-white">{link}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 py-6 text-sm uppercase tracking-[0.08em] text-white/45">
        <span>STYLEPARK</span>
        <span>archiproducts</span>
        <span>Archi<sub>EXPO</sub></span>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
        <p className="max-w-4xl text-xs leading-6 text-white/45">LINEA LIGHT S.R.L. A SOCIO UNICO © 2024 - Company subject to management and coordination by Minulamp S.r.l. Cap. Soc. € 1.000.000 i.v. - R.I. TV/ C.F e P.IVA 01220530263</p>
        <div className="flex flex-wrap gap-4 text-xs text-white/65">
          <a href="#" className="transition hover:text-white">Credits</a>
          <a href="#" className="transition hover:text-white">Workspace</a>
          <a href="#" className="transition hover:text-white">Privacy Policy</a>
          <a href="#" className="transition hover:text-white">Cookie Policy</a>
          <a href="#" className="transition hover:text-white">Whistleblowing</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
