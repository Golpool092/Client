import React from "react";
import { Link } from "wouter";
import { BookOpen, Shield, Sword, Package, ChevronRight, Star, Map, Users, BookMarked } from "lucide-react";

const features = [
  { icon: BookOpen, href: "/quests", label: "Квесты", desc: "Полная база квестов с описаниями, наградами и пошаговыми прохождениями" },
  { icon: BookMarked, href: "/guides", label: "Гайды", desc: "Более 100 подробных гайдов по всем аспектам игры" },
  { icon: Users, href: "/classes", label: "Классы", desc: "Все классы персонажей: умения, характеристики, дерево профессий" },
  { icon: Sword, href: "/skills", label: "Умения", desc: "База умений: урон, откат, стоимость маны для каждого класса" },
  { icon: Package, href: "/items", label: "Предметы", desc: "Оружие, доспехи, украшения и расходники с характеристиками" },
  { icon: Shield, href: "/subclass", label: "Сабкласс", desc: "Система субклассов, квесты, Noblesse и Олимпиада" },
  { icon: Map, href: "/mamon", label: "Мамон", desc: "Магазин, распечатка и улучшение предметов у Мамона" },
];

const news = [
  { date: "2024-03-15", title: "Обновление базы предметов S84", desc: "Добавлены все предметы S84-грейда с полными характеристиками" },
  { date: "2024-03-10", title: "Новые гайды по профессиям", desc: "Добавлены подробные гайды на 3-ю и 4-ю профессии" },
  { date: "2024-03-05", title: "Квест на Фрею", desc: "Добавлено полное прохождение квестов Фреи (Gracia Final)" },
  { date: "2024-02-28", title: "База умений расширена", desc: "Умения для всех классов обновлены до актуальной версии" },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-xl border border-amber-400/20 bg-gradient-to-br from-[#1a1420] via-[#0e0f1a] to-[#0a0b12] p-8 md:p-12">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #7c3aed 0%, transparent 50%)" }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Star className="text-amber-400" size={16} />
            <span className="text-xs uppercase tracking-widest text-amber-400/70">Информационный портал Lineage 2</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-cinzel">
            L2INT<span className="text-amber-400">.RU</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            Полная база данных Lineage 2 — квесты, классы, умения, предметы и гайды. Всё необходимое для путешественника по миру Аден.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/quests" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
              Квесты <ChevronRight size={16} />
            </Link>
            <Link href="/guides" className="inline-flex items-center gap-2 border border-amber-400/30 text-amber-400 hover:bg-amber-400/10 font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
              Гайды
            </Link>
            <Link href="/classes" className="inline-flex items-center gap-2 border border-gray-600 text-gray-300 hover:bg-white/5 font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
              Классы
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, href, label, desc }) => (
              <Link key={href} href={href} className="group block border border-[#2a2d3e] hover:border-amber-400/40 bg-[#0e0f1a] rounded-xl p-5 transition-all hover:bg-[#14151f]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-amber-400/10 group-hover:bg-amber-400/20 transition-colors">
                    <Icon size={20} className="text-amber-400" />
                  </div>
                  <span className="font-semibold text-gray-200 group-hover:text-white transition-colors font-cinzel">
                    {label}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-amber-400/70 group-hover:text-amber-400 transition-colors">
                  Смотреть <ChevronRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
            <h2 className="font-bold text-gray-200 mb-4 font-cinzel text-sm uppercase tracking-wide">Последние обновления</h2>
            <div className="space-y-4">
              {news.map((item, i) => (
                <div key={i} className="pb-3 border-b border-[#2a2d3e] last:border-0 last:pb-0">
                  <p className="text-xs text-gray-600 mb-1">{item.date}</p>
                  <p className="text-sm font-medium text-gray-300">{item.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
            <h2 className="font-bold text-amber-400 mb-3 font-cinzel text-sm uppercase tracking-wide">Быстрый доступ</h2>
            <div className="space-y-2">
              {[
                { href: "/quests", label: "► Профессиональные квесты" },
                { href: "/subclass", label: "► Квесты на Sab-class" },
                { href: "/guides", label: "► Гайды по классам" },
                { href: "/mamon", label: "► Магазин Мамона" },
                { href: "/items", label: "► Предметы S-грейда" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="block text-sm text-gray-400 hover:text-amber-400 transition-colors py-1">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
