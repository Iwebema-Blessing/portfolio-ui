import { useSite } from '@/context/SiteContext';
import { Reveal } from '@/components/ui/Reveal';
import { MeshBackdrop } from '@/components/ui/MeshBackdrop';

/**
 * The mission stays pinned on the left while the vision and the working
 * pictures pass on the right. Sticky is only applied from lg up, where
 * there is room for it to mean anything.
 */
export const MissionVision = () => {
  const { settings } = useSite();

  return (
    <section className="relative border-y py-24 sm:py-32">
      <MeshBackdrop />
      <div className="shell grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-h2">Why I do this</h2>
          <p className="mt-6 max-w-reading text-lead">{settings.mission}</p>

          <ol className="mt-10 space-y-0">
            {(settings.missionPoints || []).map((point, index) => (
              <li
                key={point}
                className="flex items-baseline gap-5 border-t py-5 last:border-b"
              >
                <span className="font-display text-micro text-graphite">{index + 1}</span>
                <span className="text-lead">{point}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-8">
          <Reveal>
            <div className="glow-edge rounded-xl2 border p-8 sm:p-10">
              <h3 className="text-h3">Where this is going</h3>
              <p className="mt-5 text-lead text-graphite">{settings.vision}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            <Reveal delay={0.08}>
              <img
                src="/images/portrait-02.jpeg"
                alt="Blessing Iwebema"
                loading="lazy"
                className="aspect-[4/5] w-full rounded-xl2 border object-cover"
              />
            </Reveal>
            <Reveal delay={0.16}>
              <img
                src="/images/portrait-04.jpeg"
                alt="Blessing Iwebema"
                loading="lazy"
                className="mt-8 aspect-[4/5] w-full rounded-xl2 border object-cover"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
