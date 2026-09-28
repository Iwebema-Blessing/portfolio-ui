import { techStack } from '@/data/tech';
import { TechBubble } from './TechBubble';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';

/** The stack as a field of floating bubbles. */
export const TechStack = () => (
  <section className="shell relative py-24 sm:py-32">
    <SectionHead
      title="What I build with"
      lead="Eleven tools I use week to week, on the front end, the back end and on phones."
    />

    <div
      aria-label="Languages and tools"
      className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
    >
      {techStack.map((tech, index) => (
        <Reveal key={tech.id} delay={index * 0.04}>
          <TechBubble tech={tech} index={index} />
        </Reveal>
      ))}
    </div>
  </section>
);
