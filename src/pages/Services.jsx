import { ServicesBento } from '@/components/home/ServicesBento';
import { CallToAction } from '@/components/home/CallToAction';
import { MeshBackdrop } from '@/components/ui/MeshBackdrop';
import { TechStack } from '@/components/home/TechStack';
import { usePageTitle } from '@/hooks/usePageTitle';

const steps = [
  {
    title: 'We talk about the problem',
    body: 'What the business needs to happen, who it is for, and what counts as working. No tech talk yet.',
  },
  {
    title: 'You see the shape early',
    body: 'A clickable layout of the main screens before any real building starts, so changes are cheap.',
  },
  {
    title: 'It gets built in slices',
    body: 'You get something to open and use every week, not one big reveal at the end.',
  },
  {
    title: 'It goes live and stays healthy',
    body: 'Launch, then speed checks, fixes and small improvements on an agreed rhythm.',
  },
];

export default function Services() {
  usePageTitle('Services — Blessing Iwebema');

  return (
    <>
      <section className="relative pb-6 pt-20 sm:pt-28">
        <MeshBackdrop />
        <div className="shell">
          <h1 className="max-w-[18ch] text-h1" style={{ fontVariationSettings: "'wght' 620, 'wdth' 86" }}>
            Services
          </h1>
          <p className="mt-6 max-w-reading text-lead text-graphite">
            I take a project from the first conversation to a live product, and stay with
            it afterwards. Front end, back end, mobile, and the admin tools your team runs
            it with.
          </p>
        </div>
      </section>

      <ServicesBento />

      <section className="shell border-t py-24 sm:py-28">
        <h2 className="text-h2">How a project runs</h2>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-xl2 border sm:grid-cols-2 lg:grid-cols-4" style={{ background: 'rgb(var(--line))' }}>
          {steps.map((step, index) => (
            <li key={step.title} className="p-7" style={{ background: 'rgb(var(--paper))' }}>
              <span className="font-display text-micro text-graphite">Step {index + 1}</span>
              <h3 className="mt-3 text-h3">{step.title}</h3>
              <p className="mt-3 text-base text-graphite">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <TechStack />
      <CallToAction />
    </>
  );
}
