import { Link } from 'react-router-dom';
import { SiWhatsapp } from 'react-icons/si';
import { navLinks } from '@/data/site';
import { useSite } from '@/context/SiteContext';
import { whatsappLink } from '@/lib/utils';

const serviceLinks = [
  { label: 'Websites', to: '/services#websites' },
  { label: 'Online stores', to: '/services#ecommerce' },
  { label: 'Mobile apps', to: '/services#mobile' },
  { label: 'APIs and dashboards', to: '/services#backend' },
  { label: 'Fixes and upkeep', to: '/services#care' },
];

export const Footer = () => {
  const { settings } = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link to="/" className="font-display text-h3">
            Blessing<span className="text-graphite">.dev</span>
          </Link>
          <p className="mt-4 max-w-[34ch] text-micro text-graphite">
            Web and mobile products built around the business problem first, then the
            interface.
          </p>
          <p className="mt-6 text-micro text-graphite">{settings.location}</p>
        </div>

        <nav aria-label="Pages">
          <h2 className="text-micro text-graphite">Pages</h2>
          <ul className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="link-quiet text-base">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="text-micro text-graphite">Services</h2>
          <ul className="mt-4 space-y-3">
            {serviceLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="link-quiet text-base">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-micro text-graphite">Get in touch</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={`mailto:${settings.email}`} className="link-quiet break-all text-base">
                {settings.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink(settings.whatsapp)}
                target="_blank"
                rel="noreferrer noopener"
                className="link-quiet inline-flex items-center gap-2 text-base"
              >
                <SiWhatsapp aria-hidden="true" /> {settings.whatsapp}
              </a>
            </li>
            <li>
              <Link to="/contact" className="btn btn-ghost mt-3 h-11 px-5 py-0 text-micro">
                Send a message
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="hairline" />

      <div className="shell flex flex-col items-start justify-between gap-3 py-6 text-micro text-graphite sm:flex-row sm:items-center">
        <p>© {year} Blessing Iwebema. All rights reserved.</p>
        <a href="#top" className="link-quiet">
          Back to top
        </a>
      </div>
    </footer>
  );
};
