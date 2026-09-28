import { useEffect, useState } from 'react';
import { endpoints } from '@/lib/api';
import { useSite } from '@/context/SiteContext';
import { Field, Notice } from '@/components/ui/Field';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function SiteText() {
  usePageTitle('Site text — Admin');
  const { settings, setSettings } = useSite();
  const [form, setForm] = useState(settings);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => setForm(settings), [settings]);

  const update = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setNotice(null);

    const payload = {
      headline: form.headline,
      subline: form.subline,
      mission: form.mission,
      vision: form.vision,
      email: form.email,
      whatsapp: form.whatsapp,
      location: form.location,
      missionPoints: (Array.isArray(form.missionPoints)
        ? form.missionPoints
        : String(form.missionPoints || '').split('\n')
      )
        .map((point) => point.trim())
        .filter(Boolean),
    };

    try {
      const response = await endpoints.updateSettings(payload);
      setSettings((current) => ({ ...current, ...response.data }));
      setNotice({ tone: 'success', text: response.message });
    } catch (problem) {
      setNotice({ tone: 'error', text: problem.message });
    } finally {
      setBusy(false);
    }
  };

  const pointsText = Array.isArray(form.missionPoints)
    ? form.missionPoints.join('\n')
    : form.missionPoints || '';

  return (
    <form onSubmit={submit} className="max-w-3xl">
      <h1 className="text-h2">Site text</h1>
      <p className="mt-3 max-w-reading text-base text-graphite">
        These words show on the home page, the about page and the footer. Save and the
        site updates straight away.
      </p>

      <div className="mt-8 space-y-5">
        <Field label="Headline">
          <textarea className="field min-h-[4.5rem] resize-y" value={form.headline || ''} onChange={update('headline')} />
        </Field>
        <Field label="Line under the headline">
          <textarea className="field min-h-[5rem] resize-y" value={form.subline || ''} onChange={update('subline')} />
        </Field>
        <Field label="Mission">
          <textarea className="field min-h-[6rem] resize-y" value={form.mission || ''} onChange={update('mission')} />
        </Field>
        <Field label="Mission points" hint="One per line">
          <textarea
            className="field min-h-[6rem] resize-y"
            value={pointsText}
            onChange={(event) => setForm({ ...form, missionPoints: event.target.value.split('\n') })}
          />
        </Field>
        <Field label="Vision">
          <textarea className="field min-h-[6rem] resize-y" value={form.vision || ''} onChange={update('vision')} />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email">
            <input className="field" type="email" value={form.email || ''} onChange={update('email')} />
          </Field>
          <Field label="WhatsApp number" hint="With the country code">
            <input className="field" value={form.whatsapp || ''} onChange={update('whatsapp')} />
          </Field>
        </div>

        <Field label="Where you are">
          <input className="field" value={form.location || ''} onChange={update('location')} />
        </Field>
      </div>

      {notice ? (
        <div className="mt-6">
          <Notice tone={notice.tone}>{notice.text}</Notice>
        </div>
      ) : null}

      <button type="submit" className="btn btn-solid mt-7" disabled={busy}>
        {busy ? 'Saving…' : 'Save changes'}
      </button>
    </form>
  );
}
