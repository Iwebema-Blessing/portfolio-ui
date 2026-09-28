import { useCallback, useEffect, useState } from 'react';
import { endpoints } from '@/lib/api';
import { Field, Notice } from '@/components/ui/Field';
import { Spinner } from '@/components/ui/Spinner';
import { hostFromUrl, prettyDate } from '@/lib/utils';
import { usePageTitle } from '@/hooks/usePageTitle';

const blank = {
  url: '',
  title: '',
  summary: '',
  previewImage: '',
  category: 'web',
  tags: '',
  featured: false,
  published: true,
};

export default function Projects() {
  usePageTitle('Projects — Admin');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(blank);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await endpoints.allProjects();
      setItems(response.data || []);
    } catch (problem) {
      setNotice({ tone: 'error', text: problem.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const reset = () => {
    setForm(blank);
    setEditingId(null);
    setErrors({});
  };

  const submit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setErrors({});
    setNotice(null);

    const payload = {
      ...form,
      tags: form.tags
        ? form.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
        : [],
    };
    // Empty strings would overwrite the auto generated values, so drop them.
    ['title', 'summary', 'previewImage'].forEach((key) => {
      if (!payload[key]) delete payload[key];
    });

    try {
      const response = editingId
        ? await endpoints.updateProject(editingId, payload)
        : await endpoints.createProject(payload);
      setNotice({ tone: 'success', text: response.message });
      reset();
      load();
    } catch (problem) {
      const fieldErrors = {};
      (problem.details || []).forEach((item) => {
        fieldErrors[item.field] = item.message;
      });
      setErrors(fieldErrors);
      setNotice({ tone: 'error', text: problem.message });
    } finally {
      setBusy(false);
    }
  };

  const edit = (project) => {
    setEditingId(project._id);
    setForm({
      url: project.url,
      title: project.title,
      summary: project.summary || '',
      previewImage: project.previewImage || '',
      category: project.category,
      tags: (project.tags || []).join(', '),
      featured: project.featured,
      published: project.published,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const togglePublished = async (project) => {
    await endpoints.updateProject(project._id, { published: !project.published });
    load();
  };

  const remove = async (project) => {
    if (!window.confirm(`Remove ${project.title}? This cannot be undone.`)) return;
    await endpoints.deleteProject(project._id);
    setNotice({ tone: 'success', text: 'Project removed' });
    load();
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[22rem_1fr] lg:items-start">
      <form onSubmit={submit} className="glow-edge rounded-xl2 border p-6 lg:sticky lg:top-40">
        <h1 className="text-h3">{editingId ? 'Edit project' : 'Add a project'}</h1>
        <p className="mt-2 text-micro text-graphite">
          Paste the live link and save. The title and the preview picture are filled in
          for you. Fill the rest only if you want to override them.
        </p>

        <div className="mt-6 space-y-4">
          <Field label="Website link" error={errors.url}>
            <input
              className="field"
              placeholder="clientsite.com"
              value={form.url}
              onChange={(event) => setForm({ ...form, url: event.target.value })}
              required
            />
          </Field>

          <Field label="Title" hint="Leave empty to use the domain name" error={errors.title}>
            <input
              className="field"
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
            />
          </Field>

          <Field label="One line about it" hint="Optional" error={errors.summary}>
            <textarea
              className="field min-h-[5rem] resize-y"
              value={form.summary}
              onChange={(event) => setForm({ ...form, summary: event.target.value })}
            />
          </Field>

          <Field label="Category">
            <select
              className="field"
              value={form.category}
              onChange={(event) => setForm({ ...form, category: event.target.value })}
            >
              <option value="web">Website</option>
              <option value="ecommerce">Online store</option>
              <option value="mobile">Mobile app</option>
              <option value="other">Other</option>
            </select>
          </Field>

          <Field label="Tags" hint="Separate with commas">
            <input
              className="field"
              placeholder="React, Node, Stripe"
              value={form.tags}
              onChange={(event) => setForm({ ...form, tags: event.target.value })}
            />
          </Field>

          <Field
            label="Own preview image"
            hint="Optional. A tall screenshot works best for the scroll."
            error={errors.previewImage}
          >
            <input
              className="field"
              placeholder="https://…/screenshot.png"
              value={form.previewImage}
              onChange={(event) => setForm({ ...form, previewImage: event.target.value })}
            />
          </Field>

          <div className="flex flex-wrap gap-5 pt-1">
            <label className="flex items-center gap-2 text-micro">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(event) => setForm({ ...form, published: event.target.checked })}
              />
              Show on the site
            </label>
            <label className="flex items-center gap-2 text-micro">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) => setForm({ ...form, featured: event.target.checked })}
              />
              Feature it
            </label>
          </div>
        </div>

        {notice ? (
          <div className="mt-5">
            <Notice tone={notice.tone}>{notice.text}</Notice>
          </div>
        ) : null}

        <div className="mt-6 flex gap-3">
          <button type="submit" className="btn btn-solid flex-1" disabled={busy}>
            {busy ? 'Saving…' : editingId ? 'Save changes' : 'Add project'}
          </button>
          {editingId ? (
            <button type="button" onClick={reset} className="btn btn-ghost">
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <section>
        <h2 className="text-h3">
          Projects <span className="text-graphite">({items.length})</span>
        </h2>

        <div className="mt-5">
          {loading ? (
            <Spinner label="Loading projects" />
          ) : items.length === 0 ? (
            <div className="rounded-xl2 border border-dashed p-10 text-center">
              <p className="text-lead">Nothing added yet.</p>
              <p className="mt-2 text-micro text-graphite">
                Paste your first site link in the form to start the portfolio.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((project) => (
                <li
                  key={project._id}
                  className="glow-edge flex flex-wrap items-center gap-4 rounded-xl2 border p-4"
                >
                  <div
                    className="h-16 w-24 shrink-0 overflow-hidden rounded-xl border"
                    style={{ background: 'rgb(var(--mist))' }}
                  >
                    {project.previewImage ? (
                      <img
                        src={project.previewImage}
                        alt=""
                        className="h-full w-full object-cover object-top"
                        loading="lazy"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-base font-medium">{project.title}</p>
                    <p className="truncate text-micro text-graphite">
                      {hostFromUrl(project.url)} · added {prettyDate(project.createdAt)}
                    </p>
                    <p className="mt-1 text-micro text-graphite">
                      {project.published ? 'Live on the site' : 'Hidden'}
                      {project.featured ? ' · featured' : ''}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => togglePublished(project)}
                      className="glow-edge rounded-full border px-4 py-2 text-micro"
                    >
                      {project.published ? 'Hide' : 'Show'}
                    </button>
                    <button
                      type="button"
                      onClick={() => edit(project)}
                      className="glow-edge rounded-full border px-4 py-2 text-micro"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(project)}
                      className="glow-edge rounded-full border px-4 py-2 text-micro"
                      style={{ color: '#D64545' }}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
