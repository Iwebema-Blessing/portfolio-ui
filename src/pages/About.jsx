import { Link } from 'react-router-dom';
import { useSite } from '@/context/SiteContext';
import { Reveal } from '@/components/ui/Reveal';
import { MeshBackdrop } from '@/components/ui/MeshBackdrop';
import { TechStack } from '@/components/home/TechStack';
import { CallToAction } from '@/components/home/CallToAction';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function About() {
  usePageTitle('About — Blessing Iwebema');
  const { settings } = useSite();

  return (
    <>
      <section className="relative pt-20 sm:pt-28">
        <MeshBackdrop />
        <div className="shell grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-end">
          <div>
            <h1 className="max-w-[16ch] text-h1" style={{ fontVariationSettings: "'wght' 620, 'wdth' 86" }}>
              About us
            </h1>
            <p className="mt-6 max-w-reading text-lead text-graphite">
              I am Blessing Iwebema, a web and mobile developer. Three years in, most of
              my work is the same job in different clothes: take something a business
              knows how to do offline and make it work on a screen, quickly and without
              confusing anybody.
            </p>
            <p className="mt-5 max-w-reading text-base text-graphite">
              I work across the whole build. React and React Native on the front, Node on
              the back, Flutter when an app needs to feel native on both stores, and
              MongoDB or PostgreSQL underneath. When a client is already on WordPress or
              PHP, I meet them there instead of asking them to start again.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/portfolio" className="btn btn-solid">
                See the work
              </Link>
              <Link to="/contact" className="btn btn-ghost">
                Talk to me
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Reveal>
              <img
                src="/images/portrait-01.jpeg"
                alt="Blessing Iwebema"
                loading="lazy"
                className="aspect-[4/5] w-full rounded-xl2 border object-cover"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <img
                src="/images/portrait-03.jpeg"
                alt="Blessing Iwebema"
                loading="lazy"
                className="mt-10 aspect-[4/5] w-full rounded-xl2 border object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative mt-24 border-y py-24 sm:py-28">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-h2">The mission</h2>
            <p className="mt-6 max-w-reading text-lead">{settings.mission}</p>
            <ol className="mt-10">
              {(settings.missionPoints || []).map((point, index) => (
                <li key={point} className="flex items-baseline gap-5 border-t py-5 last:border-b">
                  <span className="font-display text-micro text-graphite">{index + 1}</span>
                  <span className="text-lead">{point}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-h2">The vision</h2>
            <p className="mt-6 max-w-reading text-lead">{settings.vision}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: 'Plain answers',
                  body: 'You hear what something costs and how long it takes before work starts, in words you can repeat to your team.',
                },
                {
                  title: 'Built to be handed over',
                  body: 'Clear structure, comments where they help, and an admin area your staff can run without me.',
                },
                {
                  title: 'Performance first',
                  body: 'Tested on a mid range Android phone on a normal network, not just on a fast laptop.',
                },
                {
                  title: 'Remote, steady hours',
                  body: 'Working from Lagos with clients anywhere, with a set time each week for updates.',
                },
              ].map((item) => (
                <article key={item.title} className="glow-edge rounded-xl2 border p-6">
                  <h3 className="text-h3">{item.title}</h3>
                  <p className="mt-3 text-base text-graphite">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TechStack />
      <CallToAction />
    </>
  );
}
