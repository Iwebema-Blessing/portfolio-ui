import { useMemo, useState } from 'react';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { Spinner } from '@/components/ui/Spinner';
import { Reveal } from '@/components/ui/Reveal';
import { MeshBackdrop } from '@/components/ui/MeshBackdrop';
import { CallToAction } from '@/components/home/CallToAction';
import { useProjects } from '@/hooks/useProjects';
import { usePageTitle } from '@/hooks/usePageTitle';
import { cx } from '@/lib/utils';

const filters = [
  { id: 'all', label: 'Everything' },
  { id: 'web', label: 'Websites' },
  { id: 'ecommerce', label: 'Stores' },
  { id: 'mobile', label: 'Apps' },
  { id: 'other', label: 'Other' },
];

export default function Portfolio() {
  usePageTitle('Portfolio — Blessing Iwebema');
  const [active, setActive] = useState('all');
  const { projects, loading, error } = useProjects({ limit: 50 });

  const shown = useMemo(
    () => (active === 'all' ? projects : projects.filter((item) => item.category === active)),
    [projects, active]
  );

  return (
    <>
      <section className="relative pb-6 pt-20 sm:pt-28">
        <MeshBackdrop />
        <div className="shell">
          <h1 className="max-w-[18ch] text-h1" style={{ fontVariationSettings: "'wght' 620, 'wdth' 86" }}>
            Work that is live
          </h1>
          <p className="mt-6 max-w-reading text-lead text-graphite">
            Every card previews the real site. Hover to read down the page without
            leaving, click to open it.
          </p>
        </div>
      </section>

      <section className="shell py-14">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              role="tab"
              aria-selected={active === filter.id}
              onClick={() => setActive(filter.id)}
              className={cx(
                'glow-edge rounded-full border px-5 py-2 text-micro transition-colors duration-300',
                active === filter.id ? 'text-paper' : 'text-graphite hover:text-ink'
              )}
              style={active === filter.id ? { background: 'rgb(var(--ink))' } : undefined}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {loading ? (
            <Spinner label="Loading projects" />
          ) : error ? (
            <p className="text-micro text-graphite">{error}</p>
          ) : shown.length === 0 ? (
            <div className="rounded-xl2 border border-dashed p-12 text-center">
              <p className="text-lead">Nothing here yet under this filter.</p>
              <p className="mt-2 text-micro text-graphite">Try another one.</p>
            </div>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((project, index) => (
                <li key={project._id}>
                  <Reveal delay={(index % 3) * 0.06}>
                    <ProjectCard project={project} frameHeight="14rem" />
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CallToAction />
    </>
  );
}
