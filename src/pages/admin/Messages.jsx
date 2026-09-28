import { useCallback, useEffect, useState } from 'react';
import { endpoints } from '@/lib/api';
import { Spinner } from '@/components/ui/Spinner';
import { prettyDate, whatsappLink } from '@/lib/utils';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function Messages() {
  usePageTitle('Messages — Admin');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await endpoints.messages();
      setItems(response.data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleRead = async (item) => {
    await endpoints.markMessage(item._id, !item.read);
    load();
  };

  const remove = async (item) => {
    if (!window.confirm(`Remove the message from ${item.name}?`)) return;
    await endpoints.deleteMessage(item._id);
    load();
  };

  if (loading) return <Spinner label="Loading messages" />;

  return (
    <div>
      <h1 className="text-h2">Messages</h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-xl2 border border-dashed p-10 text-center">
          <p className="text-lead">No messages yet.</p>
          <p className="mt-2 text-micro text-graphite">
            Anything sent through the contact form lands here.
          </p>
        </div>
      ) : (
        <ul className="mt-8 space-y-4">
          {items.map((item) => (
            <li
              key={item._id}
              className="glow-edge rounded-xl2 border p-6"
              style={item.read ? undefined : { borderColor: 'rgb(var(--ink) / 0.35)' }}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-lead">
                    {item.name}
                    {item.read ? null : (
                      <span className="ml-3 rounded-full border px-3 py-1 text-micro">New</span>
                    )}
                  </p>
                  <p className="mt-1 text-micro text-graphite">
                    {item.email}
                    {item.phone ? ` · ${item.phone}` : ''} · {prettyDate(item.createdAt)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`mailto:${item.email}?subject=${encodeURIComponent(
                      `Re: ${item.subject || 'your message'}`
                    )}`}
                    className="glow-edge rounded-full border px-4 py-2 text-micro"
                  >
                    Reply by email
                  </a>
                  {item.phone ? (
                    <a
                      href={whatsappLink(item.phone, `Hi ${item.name}, thanks for your message.`)}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="glow-edge rounded-full border px-4 py-2 text-micro"
                    >
                      WhatsApp
                    </a>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => toggleRead(item)}
                    className="glow-edge rounded-full border px-4 py-2 text-micro"
                  >
                    {item.read ? 'Mark unread' : 'Mark read'}
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(item)}
                    className="glow-edge rounded-full border px-4 py-2 text-micro"
                    style={{ color: '#D64545' }}
                  >
                    Remove
                  </button>
                </div>
              </div>

              {item.subject ? <p className="mt-4 text-base font-medium">{item.subject}</p> : null}
              <p className="mt-2 max-w-reading whitespace-pre-line text-base text-graphite">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
