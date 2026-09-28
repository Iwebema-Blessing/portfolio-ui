import { cx } from '@/lib/utils';

/** Heading plus optional supporting line. No decorative eyebrow labels. */
export const SectionHead = ({ title, lead, align = 'left', className, children }) => (
  <div
    className={cx(
      'max-w-reading',
      align === 'center' && 'mx-auto text-center',
      className
    )}
  >
    <h2 className="text-h2">{title}</h2>
    {lead ? <p className="mt-4 text-lead text-graphite">{lead}</p> : null}
    {children}
  </div>
);
