import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useI18n } from "../hooks/useI18n";
import {
  Sword, Shield, BookOpen, Package, Home, Menu, X, Settings, Globe
} from "lucide-react";

const navItems = [
  { path: "/", icon: Home, label: "Главная", labelEn: "Home" },
  { path: "/quests", icon: BookOpen, label: "Задания", labelEn: "Quests" },
  { path: "/classes", icon: Shield, label: "Классы", labelEn: "Classes" },
  { path: "/skills", icon: Sword, label: "Умения", labelEn: "Skills" },
  { path: "/items", icon: Package, label: "Предметы", labelEn: "Items" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const { lang, setLang, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0b12] text-gray-200 flex flex-col">
      {/* Header */}
      <header className="border-b border-[#2a2d3e] bg-[#0e0f1a] sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-amber-400 hover:text-amber-300"
              onClick={() => setMobileOpen(v => !v)}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link href="/" className="flex items-center gap-2">
              <Sword className="text-amber-400" size={22} />
              <span className="font-bold text-lg tracking-wide text-amber-400 font-cinzel">L2INT.RU</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === "ru" ? "en" : "ru")}
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-amber-400 transition-colors px-2 py-1 rounded border border-transparent hover:border-amber-400/30"
            >
              <Globe size={14} />
              {lang === "ru" ? "EN" : "RU"}
            </button>
            <Link href="/admin" className="text-gray-500 hover:text-amber-400 transition-colors">
              <Settings size={18} />
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-56 border-r border-[#2a2d3e] bg-[#0c0d18] py-6 px-3 sticky top-[57px] h-[calc(100vh-57px)] shrink-0">
          <nav className="flex flex-col gap-1">
            {navItems.map(({ path, icon: Icon, label, labelEn }) => {
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
                  <Icon size={17} className={active ? "text-amber-400" : "text-gray-500"} />
                  {lang === "ru" ? label : labelEn}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto pt-4 border-t border-[#2a2d3e]">
            <p className="text-xs text-gray-600 px-3">Lineage 2 Database</p>
            <p className="text-xs text-gray-700 px-3 mt-1">© 2024 L2INT.RU</p>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileOpen(false)}>
            <div className="absolute inset-0 bg-black/60" />
            <aside
              className="absolute left-0 top-[57px] bottom-0 w-56 bg-[#0c0d18] border-r border-[#2a2d3e] py-6 px-3"
              onClick={e => e.stopPropagation()}
            >
              <nav className="flex flex-col gap-1">
                {navItems.map(({ path, icon: Icon, label, labelEn }) => {
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
                      <Icon size={17} className={active ? "text-amber-400" : "text-gray-500"} />
                      {lang === "ru" ? label : labelEn}
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 p-4 md:p-6">
          {children}
        </main>
      </div>

      <footer className="border-t border-[#2a2d3e] bg-[#0e0f1a] py-4 text-center text-sm text-gray-600">
        L2INT.RU — {t("Информационный сайт Lineage 2", "Lineage 2 Information Database")} © 2024
      </footer>
    </div>
  );
}
