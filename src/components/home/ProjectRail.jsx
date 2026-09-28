import { Link } from 'react-router-dom';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { SectionHead } from '@/components/ui/SectionHead';
import { Spinner } from '@/components/ui/Spinner';
import { useProjects } from '@/hooks/useProjects';

/**
 * Horizontal rail of recent work. Each card previews its own site on hover;
 * the rail itself scrolls sideways with a swipe, a trackpad or the keyboard.
 */
export const ProjectRail = () => {
  const { projects, loading, error } = useProjects({ limit: 8 });

  return (
    <section className="relative py-24 sm:py-32">
      <div className="shell flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          title="Recent work"
          lead="Hover a card to scroll through the whole page, click to open the live site."
        />
        <Link to="/portfolio" className="btn btn-ghost h-11 px-5 py-0 text-micro">
          All projects
        </Link>
      </div>

      <div className="mt-12">
        {loading ? (
          <div className="shell">
            <Spinner label="Loading projects" />
          </div>
        ) : error ? (
          <div className="shell">
            <p className="text-micro text-graphite">{error}</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="shell">
            <div className="rounded-xl2 border border-dashed p-10 text-center">
              <p className="text-lead">No projects are published yet.</p>
              <p className="mt-2 text-micro text-graphite">
                Sign in to the admin area and paste a site link to add the first one.
              </p>
            </div>
          </div>
        ) : (
          <ul
            className="rail flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6"
            style={{ paddingInline: 'var(--shell-pad)', scrollPaddingInline: 'var(--shell-pad)' }}
          >
            {projects.map((project) => (
              <li
                key={project._id}
                className="w-[19rem] shrink-0 snap-start sm:w-[23rem] lg:w-[26rem]"
              >
                <ProjectCard project={project} frameHeight="15rem" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
