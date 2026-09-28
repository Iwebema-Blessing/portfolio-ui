import { motion, useReducedMotion } from 'framer-motion';

/**
 * One quiet entrance, used only where a section genuinely benefits.
 * Honours the reduced motion setting.
 */
export const Reveal = ({ children, delay = 0, y = 18, className }) => {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};
