import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Field, Notice } from '@/components/ui/Field';
import { MeshBackdrop } from '@/components/ui/MeshBackdrop';
import { AccountIcon } from '@/components/ui/AccountIcon';
import { usePageTitle } from '@/hooks/usePageTitle';
import { cx } from '@/lib/utils';

const RESEND_COOLDOWN = 45;

/**
 * One page, three steps: sign in, create account, verify by email.
 *
 * It looks like an ordinary account page any site might have. Sign up is
 * only ever offered while no account exists yet — once the one owner
 * account is created, the "Create account" tab quietly stops appearing,
 * even to someone who reloads this page or checks the API directly.
 */
export default function Account() {
  usePageTitle('Sign in');
  const auth = useAuth();
  const { isSignedIn, checking, registrationOpen, refreshRegistrationStatus } = auth;
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState('signin'); // 'signin' | 'signup' | 'verify'
  const [signinForm, setSigninForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [code, setCode] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    refreshRegistrationStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  if (!checking && isSignedIn) {
    return <Navigate to={location.state?.from || '/admin'} replace />;
  }

  const signIn = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await auth.login(signinForm);
      navigate(location.state?.from || '/admin', { replace: true });
    } catch (problem) {
      setError(problem.message);
    } finally {
      setBusy(false);
    }
  };

  const signUp = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await auth.register(signupForm);
      setPendingEmail(signupForm.email);
      setMode('verify');
      setCooldown(RESEND_COOLDOWN);
    } catch (problem) {
      setError(problem.message);
    } finally {
      setBusy(false);
    }
  };

  const verify = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await auth.verifyAccount({ email: pendingEmail, code });
      navigate('/admin', { replace: true });
    } catch (problem) {
      setError(problem.message);
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    if (cooldown > 0) return;
    setError('');
    try {
      const message = await auth.resendCode({ email: pendingEmail });
      setNotice(message);
      setCooldown(RESEND_COOLDOWN);
    } catch (problem) {
      setError(problem.message);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-5 py-16">
      <MeshBackdrop intensity="strong" />
      <div className="glow-edge w-full max-w-md rounded-xl2 border p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border">
          <AccountIcon className="h-5 w-5" />
        </div>

        {mode === 'verify' ? (
          <form onSubmit={verify} className="mt-6">
            <h1 className="text-h2">Check your email</h1>
            <p className="mt-3 text-micro text-graphite">
              Enter the 6 digit code sent to {pendingEmail}.
            </p>

            <div className="mt-6">
              <Field label="Verification code">
                <input
                  className="field text-center tracking-[0.4em]"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={code}
                  onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))}
                  required
                />
              </Field>
            </div>

            {error ? (
              <div className="mt-5">
                <Notice tone="error">{error}</Notice>
              </div>
            ) : notice ? (
              <div className="mt-5">
                <Notice tone="success">{notice}</Notice>
              </div>
            ) : null}

            <button type="submit" className="btn btn-solid mt-6 w-full" disabled={busy || code.length !== 6}>
              {busy ? 'Checking…' : 'Verify and continue'}
            </button>

            <button
              type="button"
              onClick={resend}
              disabled={cooldown > 0}
              className="mt-4 w-full text-center text-micro text-graphite disabled:opacity-50"
            >
              {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
            </button>
          </form>
        ) : (
          <>
            <div className="mt-6 flex gap-1 rounded-full border p-1">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError('');
                }}
                className={cx(
                  'flex-1 rounded-full py-2 text-micro transition-colors',
                  mode === 'signin' ? 'text-paper' : 'text-graphite'
                )}
                style={mode === 'signin' ? { background: 'rgb(var(--ink))' } : undefined}
              >
                Sign in
              </button>
              {registrationOpen ? (
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError('');
                  }}
                  className={cx(
                    'flex-1 rounded-full py-2 text-micro transition-colors',
                    mode === 'signup' ? 'text-paper' : 'text-graphite'
                  )}
                  style={mode === 'signup' ? { background: 'rgb(var(--ink))' } : undefined}
                >
                  Create account
                </button>
              ) : null}
            </div>

            {mode === 'signin' ? (
              <form onSubmit={signIn} className="mt-6">
                <h1 className="text-h2">Welcome back</h1>
                <div className="mt-6 space-y-5">
                  <Field label="Email">
                    <input
                      className="field"
                      type="email"
                      autoComplete="username"
                      value={signinForm.email}
                      onChange={(event) => setSigninForm({ ...signinForm, email: event.target.value })}
                      required
                    />
                  </Field>
                  <Field label="Password">
                    <input
                      className="field"
                      type="password"
                      autoComplete="current-password"
                      value={signinForm.password}
                      onChange={(event) =>
                        setSigninForm({ ...signinForm, password: event.target.value })
                      }
                      required
                    />
                  </Field>
                </div>

                {error ? (
                  <div className="mt-5">
                    <Notice tone="error">{error}</Notice>
                  </div>
                ) : null}

                <button type="submit" className="btn btn-solid mt-7 w-full" disabled={busy}>
                  {busy ? 'Signing in…' : 'Sign in'}
                </button>
              </form>
            ) : (
              <form onSubmit={signUp} className="mt-6">
                <h1 className="text-h2">Create your account</h1>
                <div className="mt-6 space-y-5">
                  <Field label="Name">
                    <input
                      className="field"
                      autoComplete="name"
                      value={signupForm.name}
                      onChange={(event) => setSignupForm({ ...signupForm, name: event.target.value })}
                      required
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      className="field"
                      type="email"
                      autoComplete="username"
                      value={signupForm.email}
                      onChange={(event) => setSignupForm({ ...signupForm, email: event.target.value })}
                      required
                    />
                  </Field>
                  <Field label="Password" hint="8+ characters, with an uppercase letter and a number">
                    <input
                      className="field"
                      type="password"
                      autoComplete="new-password"
                      value={signupForm.password}
                      onChange={(event) =>
                        setSignupForm({ ...signupForm, password: event.target.value })
                      }
                      required
                    />
                  </Field>
                </div>

                {error ? (
                  <div className="mt-5">
                    <Notice tone="error">{error}</Notice>
                  </div>
                ) : null}

                <button type="submit" className="btn btn-solid mt-7 w-full" disabled={busy}>
                  {busy ? 'Creating account…' : 'Create account'}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
