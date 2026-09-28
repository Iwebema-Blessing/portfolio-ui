import { Link } from 'react-router-dom';
import { services } from '@/data/services';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { cx } from '@/lib/utils';

const spanClass = {
  wide: 'md:col-span-2',
  tall: 'md:row-span-2',
  normal: '',
};

/** Bento grid. Each tile keeps its own size, set in data/services.js. */
export const ServicesBento = ({ limit }) => {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <section className="shell py-24 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead
          title="What I can take off your plate"
          lead="From a one page site to a store, an app and the dashboard behind both."
        />
        {limit ? (
          <Link to="/services" className="btn btn-ghost h-11 px-5 py-0 text-micro">
            All services
          </Link>
        ) : null}
      </div>

      <div className="mt-12 grid auto-rows-[minmax(11rem,auto)] gap-4 md:grid-cols-3">
        {list.map((service, index) => (
          <Reveal
            key={service.id}
            delay={index * 0.05}
            className={cx(spanClass[service.span] || '', 'h-full')}
          >
            <article
              id={service.id}
              className="glow-edge flex h-full scroll-mt-28 flex-col justify-between rounded-xl2 border p-7"
            >
              <div>
                <h3 className="text-h3">{service.title}</h3>
                <p className="mt-4 max-w-reading text-base text-graphite">{service.body}</p>
              </div>
              <ul className="mt-7 flex flex-wrap gap-2">
                {service.points.map((point) => (
                  <li key={point} className="rounded-full border px-3 py-1 text-micro text-graphite">
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
};
