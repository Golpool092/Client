import React, { createContext, useContext, useState, useEffect } from "react";
import { useGetMe, useLogin, useLogout } from "@workspace/api-client-react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: string | null;
  signIn: (login: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: null,
  signIn: async () => false,
  signOut: async () => {},
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, refetch } = useGetMe({ query: { retry: false } });
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  const isAuthenticated = !!(data as any)?.authenticated;
  const userLogin = (data as any)?.login ?? null;

  const signIn = async (login: string, password: string): Promise<boolean> => {
    try {
      await loginMutation.mutateAsync({ data: { login, password } });
      await refetch();
      return true;
    } catch {
      return false;
    }
  };

  const signOut = async () => {
    try {
      await logoutMutation.mutateAsync({});
      await refetch();
    } catch {}
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login: userLogin,
      signIn,
      signOut,
      loading: isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
