import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AuthContextType, LoginCredentials, User, RegisterData } from '../types/auth.types';
import { getCurrentUser, loginUser, logoutUser, registerUser } from '../services/auth.service';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setAuthError(null);
    } catch (error) {
      console.error('Session restoration failed:', error);
      setAuthError('Unable to verify your session. Please try again.');
    }
  }, []);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      try {
        const currentUser = await getCurrentUser();

        if (active) {
          setUser(currentUser);
          setAuthError(null);
        }
      } catch {
        if (active) {
          setAuthError('Unable to verify your session. Please try again.');
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const authenticatedUser = await loginUser(credentials);
    setUser(authenticatedUser);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  const register = async (data: RegisterData) => {
    await registerUser(data);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: user !== null,
    isLoading,
    login,
    register,
    authError,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used inside AuthProvider.');
  }

  return context;
}
