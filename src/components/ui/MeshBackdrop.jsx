import { cx } from '@/lib/utils';

/**
 * Soft radial mesh that sits behind text. Purely decorative, so it is
 * hidden from screen readers and never catches a pointer.
 */
export const MeshBackdrop = ({ className, intensity = 'normal' }) => {
  const alpha = intensity === 'strong' ? 0.22 : 0.12;

  return (
    <div
      aria-hidden="true"
      className={cx('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
    >
      <div
        className="absolute left-1/2 top-0 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgb(var(--mesh-b) / ${alpha}), transparent 62%)`,
        }}
      />
      <div
        className="absolute -right-32 top-1/3 h-[30rem] w-[30rem] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgb(var(--mesh-a) / ${alpha * 0.55}), transparent 65%)`,
        }}
      />
      <div
        className="absolute -left-40 bottom-0 h-[26rem] w-[26rem] rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgb(var(--mesh-b) / ${alpha * 0.7}), transparent 60%)`,
        }}
      />
    </div>
  );
};
