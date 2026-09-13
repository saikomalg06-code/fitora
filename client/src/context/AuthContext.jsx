import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('fitora_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('fitora_token') || null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Sync token to localStorage and verify
  useEffect(() => {
    if (token) {
      localStorage.setItem('fitora_token', token);
      // Fetch fresh profile
      setLoadingProfile(true);
      fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            setUser(data.data);
            localStorage.setItem('fitora_user', JSON.stringify(data.data));
          } else {
            // Invalid session
            logout();
          }
        })
        .catch(() => {})
        .finally(() => setLoadingProfile(false));
    } else {
      localStorage.removeItem('fitora_token');
      localStorage.removeItem('fitora_user');
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Login failed. Please verify credentials.');
    }

    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('fitora_token', data.token);
    localStorage.setItem('fitora_user', JSON.stringify(data.user));
    setIsAuthModalOpen(false);
    return data;
  };

  const register = async (name, email, password) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Registration failed.');
    }

    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('fitora_token', data.token);
    localStorage.setItem('fitora_user', JSON.stringify(data.user));
    setIsAuthModalOpen(false);
    return data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('fitora_token');
    localStorage.removeItem('fitora_user');
  };

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        loadingProfile,
        login,
        register,
        logout,
        isAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
