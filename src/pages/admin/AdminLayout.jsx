import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { cx } from '@/lib/utils';

const adminLinks = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/projects', label: 'Projects' },
  { to: '/admin/messages', label: 'Messages' },
  { to: '/admin/site', label: 'Site text' },
  { to: '/admin/account', label: 'Account' },
];

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate('/account', { replace: true });
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b backdrop-blur-xl" style={{ background: 'rgb(var(--paper) / 0.8)' }}>
        <div className="shell flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-display text-base">
              Blessing<span className="text-graphite">.dev</span>
            </Link>
            <span className="text-micro text-graphite">Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleTheme} className="glow-edge rounded-full border px-4 py-2 text-micro">
              {isDark ? 'Light' : 'Dark'}
            </button>
            <button type="button" onClick={signOut} className="glow-edge rounded-full border px-4 py-2 text-micro">
              Sign out
            </button>
          </div>
        </div>
        <nav className="shell rail flex gap-1 overflow-x-auto pb-3">
          {adminLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cx(
                  'shrink-0 rounded-full border px-4 py-2 text-micro transition-colors',
                  isActive ? 'text-paper' : 'text-graphite hover:text-ink'
                )
              }
              style={({ isActive }) => (isActive ? { background: 'rgb(var(--ink))' } : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="shell py-10">
        <p className="mb-8 text-micro text-graphite">Signed in as {user?.email}</p>
        <Outlet />
      </main>
    </div>
  );
};
