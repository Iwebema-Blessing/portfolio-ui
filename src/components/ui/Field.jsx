import { cx } from '@/lib/utils';

export const Field = ({ label, hint, error, children, className }) => (
  <label className={cx('block', className)}>
    <span className="mb-2 block text-micro text-graphite">{label}</span>
    {children}
    {error ? (
      <span className="mt-2 block text-micro" style={{ color: '#D64545' }}>
        {error}
      </span>
    ) : hint ? (
      <span className="mt-2 block text-micro text-graphite">{hint}</span>
    ) : null}
  </label>
);

export const Notice = ({ tone = 'info', children }) => {
  if (!children) return null;
  const tones = {
    info: 'border-line',
    error: 'border-[#D64545]/40',
    success: 'border-[#3E9E62]/40',
  };
  return (
    <div className={cx('rounded-2xl border px-4 py-3 text-micro', tones[tone])}>{children}</div>
  );
};
