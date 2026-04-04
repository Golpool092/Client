import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Sword, Shield, BookOpen, Package, Home, Menu, X, BookMarked, Users, Map
} from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Главная" },
  { path: "/quests", icon: BookOpen, label: "Квесты" },
  { path: "/guides", icon: BookMarked, label: "Гайды" },
  { path: "/classes", icon: Users, label: "Классы" },
  { path: "/skills", icon: Sword, label: "Умения" },
  { path: "/items", icon: Package, label: "Предметы" },
  { path: "/subclass", icon: Shield, label: "Сабкласс" },
  { path: "/mamon", icon: Map, label: "Мамон" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0b12] text-gray-200 flex flex-col">
      <header className="border-b border-[#2a2d3e] bg-[#0e0f1a] sticky top-0 z-50 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-amber-400 hover:text-amber-300"
              onClick={() => setMobileOpen(v => !v)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link href="/" className="flex items-center gap-2 group">
              <Sword className="text-amber-400 group-hover:text-amber-300 transition-colors" size={22} />
              <span className="font-bold text-lg tracking-wide text-amber-400 font-cinzel group-hover:text-amber-300 transition-colors">
                L2INT<span className="text-amber-300/60">.RU</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navItems.slice(1, 5).map(({ path, label }) => {
              const active = location === path || (path !== "/" && location.startsWith(path));
              return (
                <Link
                  key={path}
                  href={path}
                  className={`px-3 py-1.5 rounded text-sm transition-all ${
                    active
                      ? "text-amber-400 bg-amber-400/10"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        <aside className="hidden md:flex flex-col w-52 border-r border-[#2a2d3e] bg-[#0c0d18] py-6 px-3 sticky top-[57px] h-[calc(100vh-57px)] shrink-0 overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {navItems.map(({ path, icon: Icon, label }) => {
              const active = location === path || (path !== "/" && location.startsWith(path));
              return (
                <Link
                  key={path}
                  href={path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-amber-400/10 text-amber-400 border-l-2 border-amber-400"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }`}
                >
                  <Icon size={16} className={active ? "text-amber-400" : "text-gray-500"} />
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto pt-4 border-t border-[#2a2d3e]">
            <p className="text-xs text-gray-600 px-3">Lineage 2 Interlude / Gracia</p>
            <p className="text-xs text-gray-700 px-3 mt-1">© 2024 L2INT.RU</p>
          </div>
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
            <div className="absolute inset-0 bg-black/60" />
            <aside
              className="absolute left-0 top-[57px] bottom-0 w-56 bg-[#0c0d18] border-r border-[#2a2d3e] py-6 px-3 overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-1">
                {navItems.map(({ path, icon: Icon, label }) => {
                  const active = location === path || (path !== "/" && location.startsWith(path));
                  return (
                    <Link
                      key={path}
                      href={path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        active
                          ? "bg-amber-400/10 text-amber-400 border-l-2 border-amber-400"
                          : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                      }`}
                    >
                      <Icon size={16} className={active ? "text-amber-400" : "text-gray-500"} />
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        <main className="flex-1 min-w-0 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>

      <footer className="border-t border-[#2a2d3e] bg-[#0e0f1a] py-4 text-center text-sm text-gray-600">
        L2INT.RU — Информационный сайт Lineage 2 © 2024
      </footer>
    </div>
  );
}
