import { FaInstagram, FaFacebookF, FaLinkedinIn, FaYoutube, FaPinterestP, FaSpotify } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const socialLinks = [
  { name: 'Instagram', icon: <FaInstagram /> },
  { name: 'Facebook', icon: <FaFacebookF /> },
  { name: 'Twitter', icon: <FaXTwitter /> },
  { name: 'Linkedin', icon: <FaLinkedinIn /> },
  { name: 'Youtube', icon: <FaYoutube /> },
  { name: 'Pinterest', icon: <FaPinterestP /> },
  { name: 'Spotify', icon: <FaSpotify /> },
]

const footerColumns = [
  {
    title: 'Contacts',
    links: ['Sales Network', 'Press Contacts', 'Contacts'],
  },
  {
    title: 'Resources',
    links: ['Catalogues', 'Projects', 'Outdoor', 'Indoor'],
  },
  {
    title: 'Linea Light Group',
    links: ['Work with us', 'News', 'Events'],
  },
  {
    title: 'Helpful',
    links: ['Research & development', 'Warranty', 'Newsletter', 'Plugin', 'Certificates'],
  },
]

const bottomLinks = ['Credits', 'Workspace', 'Privacy Policy', 'Cookie Policy', 'Whistleblowing']

function Footer() {
  return (
    <footer className="bg-[#060606] text-white">
      {/* ── newsletter ── */}
      <div className="border-b border-white/[0.07] px-6 py-16 text-center lg:px-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="26" stroke="white" strokeWidth="1.5" />
            <path d="M28 6C15 6 6 15 6 28C6 41 15 50 28 50V6Z" fill="white" />
          </svg>
        </div>
        <h2 className="mt-5 text-[clamp(1.4rem,2.2vw,1.9rem)] font-semibold tracking-[-0.01em]">
          Subscribe to our newsletter
        </h2>
        <p className="mt-2 text-sm text-white/50 sm:text-[15px]">
          New products and latest trends from lighting.
        </p>
        <button className="mt-6 rounded-lg border border-white/20 bg-white px-7 py-2.5 text-sm font-semibold text-black transition-colors duration-200 hover:bg-white/90">
          Subscribe
        </button>
      </div>

      {/* ── links grid ── */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-6 py-14 sm:grid-cols-3 lg:grid-cols-5 lg:px-10">
        {/* social column */}
        <div>
          <ul className="space-y-3">
            {socialLinks.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="inline-flex items-center gap-2.5 text-[13px] text-white/60 transition-colors duration-200 hover:text-white"
                >
                  <span className="text-[15px] text-white/70">{item.icon}</span>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* data columns */}
        {footerColumns.map((col, ci) => (
          <div key={ci}>
            <h4 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.1em] text-white">
              {col.title}
            </h4>
            <ul className="space-y-2.5">
              {col.links.map((link, li) => (
                <li key={li}>
                  <a
                    href="#"
                    className="text-[13px] text-white/55 transition-colors duration-200 hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── partner logos ── */}
      <div className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-10 px-6 py-8 lg:px-10">
          <span className="text-[13px] uppercase tracking-[0.18em] text-white/30">STYLEPARK</span>
          <span className="text-[13px] tracking-[0.04em] text-white/30">archiproducts</span>
          <span className="text-[15px] font-semibold tracking-[0.01em] text-white/30">
            Archi<span className="text-[11px] align-super">EXPO</span>
          </span>
        </div>
      </div>

      {/* ── legal / bottom row ── */}
      <div className="border-t border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-6 text-center lg:px-10">
          <p className="max-w-5xl text-[11px] leading-relaxed text-white/35">
            LINEA LIGHT S.R.L. A SOCIO UNICO © 2024 – Company subject to management and
            coordination by Minulamp S.r.l. Cap. Soc. € 1.000.000 i.v. – R.I. TV/ C.F e P.IVA
            01220530263
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            {bottomLinks.map((link, i) => (
              <a
                key={i}
                href="#"
                className="text-[11px] text-white/50 transition-colors duration-200 hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
