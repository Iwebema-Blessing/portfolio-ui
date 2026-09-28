import { useState } from 'react';
import { endpoints, tokenStore } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Field, Notice } from '@/components/ui/Field';
import { usePageTitle } from '@/hooks/usePageTitle';

export default function Account() {
  usePageTitle('Account — Admin');
  const { user, setUser } = useAuth();

  const [details, setDetails] = useState({ name: user?.name || '', email: user?.email || '' });
  const [detailNotice, setDetailNotice] = useState(null);

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordNotice, setPasswordNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  const saveDetails = async (event) => {
    event.preventDefault();
    setDetailNotice(null);
    try {
      const response = await endpoints.updateAccount(details);
      setUser(response.data);
      setDetailNotice({ tone: 'success', text: response.message });
    } catch (problem) {
      setDetailNotice({ tone: 'error', text: problem.message });
    }
  };

  const savePassword = async (event) => {
    event.preventDefault();
    setBusy(true);
    setPasswordErrors({});
    setPasswordNotice(null);

    try {
      const response = await endpoints.changePassword(passwords);
      tokenStore.set(response.data.token);
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordNotice({ tone: 'success', text: response.message });
    } catch (problem) {
      const fieldErrors = {};
      (problem.details || []).forEach((item) => {
        fieldErrors[item.field] = item.message;
      });
      setPasswordErrors(fieldErrors);
      setPasswordNotice({ tone: 'error', text: problem.message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid max-w-4xl gap-8 md:grid-cols-2">
      <form onSubmit={saveDetails} className="glow-edge rounded-xl2 border p-7">
        <h1 className="text-h3">Your details</h1>
        <div className="mt-6 space-y-5">
          <Field label="Name">
            <input
              className="field"
              value={details.name}
              onChange={(event) => setDetails({ ...details, name: event.target.value })}
            />
          </Field>
          <Field label="Email" hint="This is what you sign in with">
            <input
              className="field"
              type="email"
              value={details.email}
              onChange={(event) => setDetails({ ...details, email: event.target.value })}
            />
          </Field>
        </div>
        {detailNotice ? (
          <div className="mt-5">
            <Notice tone={detailNotice.tone}>{detailNotice.text}</Notice>
          </div>
        ) : null}
        <button type="submit" className="btn btn-solid mt-6 w-full">
          Save details
        </button>
      </form>

      <form onSubmit={savePassword} className="glow-edge rounded-xl2 border p-7">
        <h2 className="text-h3">Change password</h2>
        <p className="mt-2 text-micro text-graphite">
          At least 8 characters with an uppercase letter, a lowercase letter and a number.
        </p>
        <div className="mt-6 space-y-5">
          <Field label="Current password" error={passwordErrors.currentPassword}>
            <input
              className="field"
              type="password"
              autoComplete="current-password"
              value={passwords.currentPassword}
              onChange={(event) =>
                setPasswords({ ...passwords, currentPassword: event.target.value })
              }
              required
            />
          </Field>
          <Field label="New password" error={passwordErrors.newPassword}>
            <input
              className="field"
              type="password"
              autoComplete="new-password"
              value={passwords.newPassword}
              onChange={(event) => setPasswords({ ...passwords, newPassword: event.target.value })}
              required
            />
          </Field>
          <Field label="New password again" error={passwordErrors.confirmPassword}>
            <input
              className="field"
              type="password"
              autoComplete="new-password"
              value={passwords.confirmPassword}
              onChange={(event) =>
                setPasswords({ ...passwords, confirmPassword: event.target.value })
              }
              required
            />
          </Field>
        </div>
        {passwordNotice ? (
          <div className="mt-5">
            <Notice tone={passwordNotice.tone}>{passwordNotice.text}</Notice>
          </div>
        ) : null}
        <button type="submit" className="btn btn-solid mt-6 w-full" disabled={busy}>
          {busy ? 'Saving…' : 'Change password'}
        </button>
      </form>
    </div>
  );
}
