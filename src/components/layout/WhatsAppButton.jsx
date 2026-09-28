import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { SiWhatsapp } from 'react-icons/si';
import { useSite } from '@/context/SiteContext';
import { whatsappLink } from '@/lib/utils';

/**
 * Follows the reader down every page. Shows a short label on wider screens
 * the first few seconds, then settles into a plain round button.
 */
export const WhatsAppButton = () => {
  const { settings } = useSite();
  const reduced = useReducedMotion();
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setShowLabel(true), 1400);
    const hide = setTimeout(() => setShowLabel(false), 7000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  return (
    <div
      className="fixed right-4 z-[60] sm:right-6"
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <motion.a
        href={whatsappLink(settings.whatsapp)}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat on WhatsApp"
        whileHover={reduced ? undefined : { scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="glow-edge flex items-center gap-3 rounded-full border py-3 pl-3 pr-3 shadow-lg"
        style={{ background: 'rgb(var(--paper) / 0.9)', backdropFilter: 'blur(12px)' }}
      >
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full" style={{ background: '#25D366' }}>
          {!reduced ? (
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-ping rounded-full opacity-40"
              style={{ background: '#25D366', animationDuration: '2.6s' }}
            />
          ) : null}
          <SiWhatsapp className="relative h-6 w-6 text-white" aria-hidden="true" />
        </span>

        <AnimatePresence>
          {showLabel ? (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 'auto', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
              className="hidden overflow-hidden whitespace-nowrap pr-2 text-micro sm:block"
            >
              Chat on WhatsApp
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.a>
    </div>
  );
};
