import React from "react";
import { useAuth } from "../../hooks/useAuth";
import AdminLoginPage from "./login";
import AdminDashboard from "./dashboard";

export default function AdminPage() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0b12] flex items-center justify-center">
        <div className="text-amber-400 animate-pulse text-sm">Загрузка...</div>
      </div>
    );
  }

  return isAuthenticated ? <AdminDashboard /> : <AdminLoginPage />;
}
