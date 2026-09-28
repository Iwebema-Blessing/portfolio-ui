import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { endpoints } from '@/lib/api';
import { Spinner } from '@/components/ui/Spinner';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function Dashboard() {
  usePageTitle('Overview — Admin');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    Promise.all([endpoints.allProjects(), endpoints.messages()])
      .then(([projects, messages]) => {
        setStats({
          total: projects.data.length,
          live: projects.data.filter((item) => item.published).length,
          messages: messages.data.length,
          unread: messages.meta?.unread ?? 0,
        });
      })
      .catch(() => setStats({ total: 0, live: 0, messages: 0, unread: 0 }));
  }, []);

  if (!stats) return <Spinner label="Loading your numbers" />;

  const cards = [
    { label: 'Projects added', value: stats.total, to: '/admin/projects' },
    { label: 'Live on the site', value: stats.live, to: '/admin/projects' },
    { label: 'Messages received', value: stats.messages, to: '/admin/messages' },
    { label: 'Not read yet', value: stats.unread, to: '/admin/messages' },
  ];

  return (
    <div>
      <h1 className="text-h2">Overview</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} to={card.to} className="glow-edge rounded-xl2 border p-6">
            <p className="font-display text-h2">{card.value}</p>
            <p className="mt-2 text-micro text-graphite">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link to="/admin/projects" className="glow-edge rounded-xl2 border p-7">
          <h2 className="text-h3">Add a project</h2>
          <p className="mt-2 text-base text-graphite">
            Paste a site link and it appears in the portfolio with its own preview.
          </p>
        </Link>
        <Link to="/admin/site" className="glow-edge rounded-xl2 border p-7">
          <h2 className="text-h3">Change the site text</h2>
          <p className="mt-2 text-base text-graphite">
            Headline, mission, vision and contact details, without touching the code.
          </p>
        </Link>
      </div>
    </div>
  );
}
