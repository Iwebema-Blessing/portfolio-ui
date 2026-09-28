import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MeshBackdrop } from '@/components/ui/MeshBackdrop';
import { useSite } from '@/context/SiteContext';

/**
 * The one orchestrated moment on the site.
 *
 * Three layers sit on top of each other: the workspace banner, the headline
 * over its empty middle, and the portrait pulled up with a negative margin so
 * it breaks the band instead of sitting under it.
 */
export const Hero = () => {
  const { settings } = useSite();
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bandY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '-7%']);

  const rise = (delay) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.22, 0.61, 0.36, 1] },
        };

  return (
    <section ref={sectionRef} className="relative overflow-hidden pb-4 pt-8 sm:pt-12">
      <MeshBackdrop intensity="strong" />

      {/* Layer 1 — the workspace band, with room kept clear in the middle. */}
      <div className="shell">
        <motion.div
          style={reduced ? undefined : { y: bandY }}
          className="relative overflow-hidden rounded-xl2 border"
        >
          <img
            src="/images/hero-desk.png"
            alt=""
            aria-hidden="true"
            className="h-[26rem] w-full object-cover object-center sm:h-[32rem] lg:h-[36rem] dark:opacity-[0.72] dark:contrast-[1.05]"
            fetchPriority="high"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(70% 60% at 50% 45%, rgb(var(--paper) / 0.86), rgb(var(--paper) / 0.35) 70%, transparent)',
            }}
          />

          {/* Layer 2 — the headline, centred in the clear space. */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-5 text-center sm:px-10">
              <motion.p {...rise(0.05)} className="text-micro text-graphite">
                {settings.location}
              </motion.p>

              <motion.h1
                {...rise(0.16)}
                className="mx-auto mt-4 max-w-[17ch] text-h1"
                style={{ fontVariationSettings: "'wght' 620, 'wdth' 86" }}
              >
                {settings.headline}
              </motion.h1>

              <motion.p
                {...rise(0.3)}
                className="mx-auto mt-6 max-w-[52ch] text-lead text-graphite"
              >
                {settings.subline}
              </motion.p>

              <motion.div {...rise(0.44)} className="mt-9 flex flex-wrap justify-center gap-3">
                <Link to="/contact" className="btn btn-solid">
                  Start a project
                </Link>
                <Link to="/portfolio" className="btn btn-ghost">
                  See the work
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Layer 3 — the portrait overlaps the band above and the facts below. */}
      <div className="shell relative">
        <div className="grid items-end gap-8 md:grid-cols-[minmax(0,22rem)_1fr]">
          {/* Outer element carries the scroll parallax, inner one the entrance,
              so the two transforms never overwrite each other. */}
          <motion.div
            style={reduced ? undefined : { y: portraitY }}
            className="relative z-10 -mt-24 sm:-mt-32 md:-mt-40"
          >
            <motion.figure
              initial={reduced ? undefined : { opacity: 0, y: 40 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
              className="glow-edge relative overflow-hidden rounded-xl2 border"
            >
              <img
                src="/images/portrait-suit.png"
                alt="Blessing Iwebema"
                className="aspect-[3/4] w-full object-cover"
              />
              <figcaption
                className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t p-4 text-micro backdrop-blur-md"
                style={{ background: 'rgb(var(--paper) / 0.8)' }}
              >
                <span className="font-medium">Blessing Iwebema</span>
                <span className="text-graphite">Web &amp; mobile developer</span>
              </figcaption>
            </motion.figure>
          </motion.div>

          <div className="pb-2 md:pb-10">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
              {[
                { value: '3 yrs', label: 'Building for the web and mobile' },
                { value: '11', label: 'Languages and tools in daily use' },
                { value: 'Remote', label: 'Working with teams anywhere' },
              ].map((fact) => (
                <div key={fact.label}>
                  <dt className="font-display text-h3" style={{ fontVariationSettings: "'wght' 600" }}>
                    {fact.value}
                  </dt>
                  <dd className="mt-2 max-w-[22ch] text-micro text-graphite">{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};
