import { Link } from 'react-router-dom';
import { SiWhatsapp } from 'react-icons/si';
import { useSite } from '@/context/SiteContext';
import { whatsappLink } from '@/lib/utils';
import { MeshBackdrop } from '@/components/ui/MeshBackdrop';

export const CallToAction = () => {
  const { settings } = useSite();

  return (
    <section className="shell py-24 sm:py-28">
      <div className="glow-edge relative overflow-hidden rounded-xl2 border px-7 py-16 text-center sm:px-12">
        <MeshBackdrop intensity="strong" />
        <h2 className="mx-auto max-w-[20ch] text-h2">Tell me what you are trying to build</h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-lead text-graphite">
          Send the idea in a few lines. You will get an honest answer on scope, timing and
          cost, usually the same day.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn btn-solid">
            Send a message
          </Link>
          <a
            href={whatsappLink(settings.whatsapp)}
            target="_blank"
            rel="noreferrer noopener"
            className="btn btn-ghost"
          >
            <SiWhatsapp aria-hidden="true" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
