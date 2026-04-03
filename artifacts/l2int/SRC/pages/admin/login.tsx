import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Shield, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const { signIn } = useAuth();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const ok = await signIn(login, password);
    setLoading(false);
    if (!ok) setError("Неверный логин или пароль");
  };

  return (
    <div className="min-h-screen bg-[#0a0b12] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/30 mb-4">
            <Shield className="text-amber-400" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white font-cinzel">Панель управления</h1>
          <p className="text-sm text-gray-500 mt-1">L2INT.RU Admin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Логин</label>
            <input
              type="text"
              value={login}
              onChange={e => setLogin(e.target.value)}
              className="w-full bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-amber-400/50"
              placeholder="admin"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Пароль</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-2 pr-10 text-sm text-gray-300 focus:outline-none focus:border-amber-400/50"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-400 hover:bg-amber-300 text-black font-semibold py-2.5 rounded-lg transition-colors text-sm disabled:opacity-50"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
