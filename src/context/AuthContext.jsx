import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { endpoints, tokenStore } from '@/lib/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  // null while unknown, then true/false once /auth/status answers.
  const [registrationOpen, setRegistrationOpen] = useState(null);

  useEffect(() => {
    let active = true;

    const restore = async () => {
      if (!tokenStore.get()) {
        setChecking(false);
        return;
      }
      try {
        const response = await endpoints.me();
        if (active) setUser(response.data);
      } catch {
        tokenStore.clear();
      } finally {
        if (active) setChecking(false);
      }
    };

    restore();
    return () => {
      active = false;
    };
  }, []);

  const refreshRegistrationStatus = useCallback(async () => {
    try {
      const response = await endpoints.authStatus();
      setRegistrationOpen(Boolean(response.data.open));
    } catch {
      // If this fails we simply do not offer sign up — sign in still works.
      setRegistrationOpen(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    const response = await endpoints.login(credentials);
    tokenStore.set(response.data.token);
    setUser(response.data.user);
    return response.data.user;
  }, []);

  const register = useCallback(async (payload) => {
    const response = await endpoints.register(payload);
    return response.data;
  }, []);

  const verifyAccount = useCallback(async (payload) => {
    const response = await endpoints.verifyAccount(payload);
    tokenStore.set(response.data.token);
    setUser(response.data.user);
    setRegistrationOpen(false);
    return response.data.user;
  }, []);

  const resendCode = useCallback(async (payload) => {
    const response = await endpoints.resendCode(payload);
    return response.message;
  }, []);

  const logout = useCallback(async () => {
    try {
      await endpoints.logout();
    } catch {
      /* the local session still needs clearing */
    }
    tokenStore.clear();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      checking,
      isSignedIn: Boolean(user),
      registrationOpen,
      refreshRegistrationStatus,
      login,
      register,
      verifyAccount,
      resendCode,
      logout,
    }),
    [
      user,
      checking,
      registrationOpen,
      refreshRegistrationStatus,
      login,
      register,
      verifyAccount,
      resendCode,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};
