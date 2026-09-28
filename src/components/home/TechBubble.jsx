import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

/**
 * One floating bubble holding a brand coloured logo.
 * The logo is an SVG, so it stays sharp at any size and takes its own colour.
 * Hovering lifts the bubble, grows the logo and lights the edge.
 */
export const TechBubble = ({ tech, index = 0 }) => {
  const { isDark } = useTheme();
  const reduced = useReducedMotion();
  const { Icon, name, note, color, darkColor } = tech;
  const tint = isDark && darkColor ? darkColor : color;

  // Each bubble drifts on its own clock so the group never pulses in unison.
  const drift = reduced
    ? {}
    : {
        animate: { y: [0, index % 2 === 0 ? -9 : -14, 0] },
        transition: {
          duration: 5.2 + (index % 5) * 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.22,
        },
      };

  return (
    <motion.div
      {...drift}
      whileHover={reduced ? undefined : { scale: 1.09, y: -12 }}
      whileFocus={reduced ? undefined : { scale: 1.09, y: -12 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      className="group"
    >
      <div
        tabIndex={0}
        aria-label={`${name}. ${note}`}
        className="glow-edge relative flex h-full flex-col items-center justify-center gap-3 rounded-bubble border bg-paper/70 px-4 py-6 text-center backdrop-blur-sm"
      >
        {/* A faint wash of the logo's own colour, only while hovered. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-bubble opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 22%, ${tint}22, transparent 68%)`,
          }}
        />
        <Icon
          aria-hidden="true"
          className="relative h-9 w-9 transition-transform duration-500 ease-glide group-hover:scale-125 sm:h-10 sm:w-10"
          style={{ color: tint }}
        />
        <span className="relative text-micro font-medium">{name}</span>
        <span className="relative max-h-0 overflow-hidden text-micro leading-snug text-graphite opacity-0 transition-all duration-500 ease-glide group-hover:max-h-16 group-hover:opacity-100 group-focus-within:max-h-16 group-focus-within:opacity-100">
          {note}
        </span>
      </div>
    </motion.div>
  );
};
