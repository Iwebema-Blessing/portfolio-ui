import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks } from '@/data/site';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { AccountIcon } from '@/components/ui/AccountIcon';
import { cx } from '@/lib/utils';

const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
  </svg>
);

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isSignedIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cx(
        'sticky top-0 z-50 transition-all duration-500 ease-glide',
        scrolled && 'backdrop-blur-xl'
      )}
      style={{
        top: 'env(safe-area-inset-top, 0px)',
        background: scrolled ? 'rgb(var(--paper) / 0.72)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgb(var(--line))' : '1px solid transparent',
      }}
    >
      <nav className="shell flex h-[4.5rem] items-center justify-between gap-6">
        <Link to="/" className="font-display text-lg tracking-tight" style={{ fontVariationSettings: "'wght' 700, 'wdth' 88" }}>
          Blessing<span className="text-graphite">.dev</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cx(
                    'relative rounded-full px-4 py-2 text-base transition-colors duration-300',
                    isActive ? 'text-ink' : 'text-graphite hover:text-ink'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border"
                        style={{ background: 'rgb(var(--mist))' }}
                        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                      />
                    ) : null}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="glow-edge flex h-10 w-10 items-center justify-center rounded-full border"
          >
            <motion.span
              key={isDark ? 'moon' : 'sun'}
              initial={{ rotate: -35, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="flex"
            >
              {isDark ? <MoonIcon /> : <SunIcon />}
            </motion.span>
          </button>

          <Link to="/contact" className="btn btn-solid hidden h-10 px-5 py-0 text-micro sm:inline-flex">
            Start a project
          </Link>

          {/* A plain sign in icon, like any site with user accounts.
              It disappears once you are already signed in. */}
          {!isSignedIn ? (
            <Link
              to="/account"
              aria-label="Sign in"
              className="glow-edge hidden h-10 w-10 items-center justify-center rounded-full border sm:flex"
            >
              <AccountIcon className="h-[18px] w-[18px]" />
            </Link>
          ) : null}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="glow-edge flex h-10 w-10 items-center justify-center rounded-full border lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className="absolute left-0 block h-[1.5px] w-4 bg-ink transition-transform duration-300"
                style={{ top: open ? '5.5px' : 0, transform: open ? 'rotate(45deg)' : 'none' }}
              />
              <span
                className="absolute left-0 block h-[1.5px] w-4 bg-ink transition-transform duration-300"
                style={{ bottom: open ? '5.5px' : 0, transform: open ? 'rotate(-45deg)' : 'none' }}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.22, 0.61, 0.36, 1] }}
            className="border-t lg:hidden"
            style={{ background: 'rgb(var(--paper) / 0.97)', backdropFilter: 'blur(18px)' }}
          >
            <ul className="shell flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cx(
                        'block border-b py-4 text-h3',
                        isActive ? 'text-ink' : 'text-graphite'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-5">
                <Link to="/contact" className="btn btn-solid w-full">
                  Start a project
                </Link>
              </li>
              {!isSignedIn ? (
                <li className="pt-3">
                  <Link to="/account" className="flex items-center justify-center gap-2 py-2 text-micro text-graphite">
                    <AccountIcon className="h-4 w-4" /> Sign in
                  </Link>
                </li>
              ) : null}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};
