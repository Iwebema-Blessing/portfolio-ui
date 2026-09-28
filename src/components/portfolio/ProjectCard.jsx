import { useState } from 'react';
import { cx, hostFromUrl } from '@/lib/utils';

/**
 * A project as a card.
 *
 * The preview is a tall screenshot inside a short frame. On hover or
 * keyboard focus the image slides from its top to its bottom, so the whole
 * page is seen without leaving the card. Clicking opens the live site.
 *
 * The scroll is CSS only (see .shot-frame in styles/index.css), which keeps
 * it smooth on phones and free for the main thread.
 */
export const ProjectCard = ({ project, frameHeight = '14rem', className }) => {
  const [failed, setFailed] = useState(false);
  const host = hostFromUrl(project.url);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noreferrer noopener"
      className={cx(
        'glow-edge group block overflow-hidden rounded-xl2 border bg-paper',
        className
      )}
    >
      <div
        className="shot-frame bg-mist"
        style={{ height: frameHeight, '--frame-h': frameHeight }}
      >
        {failed || !project.previewImage ? (
          <div className="flex h-full w-full items-center justify-center px-6 text-center">
            <span className="font-display text-h3 text-graphite">{host}</span>
          </div>
        ) : (
          <img
            src={project.previewImage}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}

        {/* Reads as a hint the first time, fades out once the pointer is in. */}
        <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-line bg-paper/85 px-3 py-1 text-micro text-graphite opacity-100 backdrop-blur transition-opacity duration-300 group-hover:opacity-0">
          Hover to scroll
        </span>
      </div>

      <div className="flex items-start justify-between gap-4 border-t p-5">
        <div className="min-w-0">
          <h3 className="truncate text-h3">{project.title}</h3>
          <p className="mt-1 truncate text-micro text-graphite">{host}</p>
          {project.summary ? (
            <p className="mt-3 line-clamp-2 text-micro text-graphite">{project.summary}</p>
          ) : null}
        </div>
        <span
          aria-hidden="true"
          className="mt-1 shrink-0 text-graphite transition-transform duration-500 ease-glide group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </span>
      </div>

      {project.tags?.length ? (
        <div className="flex flex-wrap gap-2 px-5 pb-5">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded-full border px-3 py-1 text-micro text-graphite">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </a>
  );
};
