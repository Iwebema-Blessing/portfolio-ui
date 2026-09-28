import { Link } from 'react-router-dom';
import { MeshBackdrop } from '@/components/ui/MeshBackdrop';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page not found — Blessing Iwebema');

  return (
    <section className="relative flex min-h-[70vh] items-center">
      <MeshBackdrop />
      <div className="shell text-center">
        <h1 className="text-h1" style={{ fontVariationSettings: "'wght' 620, 'wdth' 86" }}>
          That page moved
        </h1>
        <p className="mx-auto mt-5 max-w-[48ch] text-lead text-graphite">
          The link is old or the address has a typo. The work and the contact form are
          both a click away.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-solid">
            Back home
          </Link>
          <Link to="/portfolio" className="btn btn-ghost">
            See the work
          </Link>
        </div>
      </div>
    </section>
  );
}
