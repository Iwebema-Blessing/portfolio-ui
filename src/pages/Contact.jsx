import { useState } from 'react';
import { SiWhatsapp } from 'react-icons/si';
import { endpoints } from '@/lib/api';
import { useSite } from '@/context/SiteContext';
import { whatsappLink } from '@/lib/utils';
import { Field, Notice } from '@/components/ui/Field';
import { MeshBackdrop } from '@/components/ui/MeshBackdrop';
import { usePageTitle } from '@/hooks/usePageTitle';

const emptyForm = { name: '', email: '', phone: '', subject: '', body: '', website: '' };

export default function Contact() {
  usePageTitle('Contact — Blessing Iwebema');
  const { settings } = useSite();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setStatus({ state: 'sending', message: '' });
    setErrors({});

    try {
      const response = await endpoints.sendMessage(form);
      setForm(emptyForm);
      setStatus({ state: 'sent', message: response.message });
    } catch (problem) {
      const fieldErrors = {};
      (problem.details || []).forEach((item) => {
        fieldErrors[item.field] = item.message;
      });
      setErrors(fieldErrors);
      setStatus({ state: 'error', message: problem.message });
    }
  };

  return (
    <>
      <section className="relative pt-20 sm:pt-28">
        <MeshBackdrop />
        <div className="shell">
          <h1 className="max-w-[16ch] text-h1" style={{ fontVariationSettings: "'wght' 620, 'wdth' 86" }}>
            Contact us
          </h1>
          <p className="mt-6 max-w-reading text-lead text-graphite">
            Tell me what you want to build and roughly when you need it. Short is fine.
          </p>
        </div>
      </section>

      <section className="shell grid gap-10 py-16 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <form onSubmit={submit} noValidate className="glow-edge rounded-xl2 border p-7 sm:p-9">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" error={errors.name}>
              <input
                className="field"
                value={form.name}
                onChange={update('name')}
                autoComplete="name"
                required
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                className="field"
                type="email"
                value={form.email}
                onChange={update('email')}
                autoComplete="email"
                required
              />
            </Field>
            <Field label="Phone or WhatsApp" hint="Optional" error={errors.phone}>
              <input
                className="field"
                value={form.phone}
                onChange={update('phone')}
                autoComplete="tel"
              />
            </Field>
            <Field label="What is it about" hint="Optional" error={errors.subject}>
              <input className="field" value={form.subject} onChange={update('subject')} />
            </Field>
          </div>

          <Field label="Your message" error={errors.body} className="mt-5">
            <textarea
              className="field min-h-[9rem] resize-y"
              value={form.body}
              onChange={update('body')}
              required
            />
          </Field>

          {/* Hidden from people, tempting to bots. */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={form.website}
            onChange={update('website')}
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn btn-solid" disabled={status.state === 'sending'}>
              {status.state === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            <a
              href={whatsappLink(settings.whatsapp)}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-ghost"
            >
              <SiWhatsapp aria-hidden="true" /> WhatsApp instead
            </a>
          </div>

          {status.message ? (
            <div className="mt-6">
              <Notice tone={status.state === 'sent' ? 'success' : 'error'}>{status.message}</Notice>
            </div>
          ) : null}
        </form>

        <aside className="space-y-4">
          <div className="glow-edge rounded-xl2 border p-7">
            <h2 className="text-h3">Reach me directly</h2>
            <ul className="mt-5 space-y-4">
              <li>
                <span className="block text-micro text-graphite">Email</span>
                <a href={`mailto:${settings.email}`} className="break-all text-lead link-quiet">
                  {settings.email}
                </a>
              </li>
              <li>
                <span className="block text-micro text-graphite">WhatsApp</span>
                <a
                  href={whatsappLink(settings.whatsapp)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-lead link-quiet"
                >
                  {settings.whatsapp}
                </a>
              </li>
              <li>
                <span className="block text-micro text-graphite">Based in</span>
                <span className="text-lead">{settings.location}</span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl2 border border-dashed p-7">
            <h2 className="text-h3">What happens next</h2>
            <p className="mt-3 text-base text-graphite">
              You get a reply within a day with questions, a rough cost range and the
              earliest start date. No obligation attached.
            </p>
          </div>
        </aside>
      </section>
    </>
  );
}
