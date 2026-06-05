import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getToken,
  saveToken,
  removeToken,
} from "../services/authStorage";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;

  login: (token: string) => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType | null>(
    null
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getToken();

      setIsAuthenticated(!!token);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (
    token: string
  ) => {
    await saveToken(token);

    setIsAuthenticated(true);
  };

  const logout = async () => {
    await removeToken();

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}