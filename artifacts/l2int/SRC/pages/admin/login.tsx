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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/30 mb-5 shadow-lg shadow-amber-400/5">
            <Shield className="text-amber-400" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white font-cinzel tracking-wide">Панель управления</h1>
          <p className="text-sm text-gray-500 mt-1">L2INT.RU Admin</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 border border-[#2a2d3e] bg-[#0e0f1a] rounded-2xl p-6 shadow-xl"
        >
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">Логин</label>
            <input
              type="text"
              value={login}
              onChange={e => setLogin(e.target.value)}
              className="w-full bg-[#1a1b26] border border-[#2a2d3e] focus:border-amber-400/50 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none transition-colors"
              placeholder="admin"
              autoComplete="username"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">Пароль</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#1a1b26] border border-[#2a2d3e] focus:border-amber-400/50 rounded-xl px-4 py-3 pr-12 text-sm text-gray-200 focus:outline-none transition-colors"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors p-1"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2.5">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !login || !password}
            className="w-full bg-amber-400 hover:bg-amber-300 text-black font-bold py-3 rounded-xl transition-colors text-sm disabled:opacity-40 shadow-lg shadow-amber-400/20"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-700 mt-6">
          Для смены логина и пароля откройте файл <code className="text-gray-600 bg-[#1a1b26] px-1.5 py-0.5 rounded">credentials.txt</code>
        </p>
      </div>
    </div>
  );
}
