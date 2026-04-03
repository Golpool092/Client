import React from "react";
import { Link } from "wouter";
import { useI18n } from "../hooks/useI18n";
import { BookOpen, Shield, Sword, Package, ChevronRight, Star } from "lucide-react";
import AdDisplay from "../components/AdDisplay";

const features = [
  { icon: BookOpen, href: "/quests", labelRu: "Задания", labelEn: "Quests", descRu: "Полная база заданий с описаниями, наградами и пошаговыми гайдами", descEn: "Complete quest database with descriptions, rewards and step-by-step guides" },
  { icon: Shield, href: "/classes", labelRu: "Классы", labelEn: "Classes", descRu: "Все классы персонажей с характеристиками, умениями и советами", descEn: "All character classes with stats, skills and tips" },
  { icon: Sword, href: "/skills", labelRu: "Умения", labelEn: "Skills", descRu: "Подробная информация по всем умениям: урон, откат, стоимость маны", descEn: "Detailed info on all skills: damage, cooldown, mana cost" },
  { icon: Package, href: "/items", labelRu: "Предметы", labelEn: "Items", descRu: "Оружие, доспехи, аксессуары и расходники с полными характеристиками", descEn: "Weapons, armor, accessories and consumables with full stats" },
];

const news = [
  { date: "2024-03-15", titleRu: "Обновление базы данных предметов", titleEn: "Item database updated", descRu: "Добавлены все предметы S-грейда", descEn: "All S-grade items added" },
  { date: "2024-03-10", titleRu: "Новые задания добавлены", titleEn: "New quests added", descRu: "8 новых квестов в базе данных", descEn: "8 new quests in the database" },
  { date: "2024-03-05", titleRu: "База умений расширена", titleEn: "Skills database expanded", descRu: "Умения для всех классов обновлены", descEn: "Skills for all classes updated" },
];

export default function HomePage() {
  const { t } = useI18n();

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-xl border border-amber-400/20 bg-gradient-to-br from-[#1a1420] via-[#0e0f1a] to-[#0a0b12] p-8 md:p-12">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 80%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 80% 20%, #7c3aed 0%, transparent 50%)" }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Star className="text-amber-400" size={16} />
            <span className="text-xs uppercase tracking-widest text-amber-400/70">{t("Информационный портал", "Information Portal")}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-cinzel">
            L2INT<span className="text-amber-400">.RU</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            {t(
              "Полная база данных Lineage 2 — задания, классы, умения и предметы. Всё необходимое для путешественника по миру Аден.",
              "Complete Lineage 2 database — quests, classes, skills and items. Everything you need for your journey through the world of Aden."
            )}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/quests" className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-black font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
              {t("Начать поиск", "Start searching")}
              <ChevronRight size={16} />
            </Link>
            <Link href="/classes" className="inline-flex items-center gap-2 border border-amber-400/30 text-amber-400 hover:bg-amber-400/10 font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm">
              {t("Выбрать класс", "Choose class")}
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Features grid */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, href, labelRu, labelEn, descRu, descEn }) => (
              <Link key={href} href={href} className="group block border border-[#2a2d3e] hover:border-amber-400/40 bg-[#0e0f1a] rounded-xl p-5 transition-all hover:bg-[#14151f]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-amber-400/10 group-hover:bg-amber-400/20 transition-colors">
                    <Icon size={20} className="text-amber-400" />
                  </div>
                  <span className="font-semibold text-gray-200 group-hover:text-white transition-colors font-cinzel">
                    {t(labelRu, labelEn)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{t(descRu, descEn)}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-amber-400/70 group-hover:text-amber-400 transition-colors">
                  {t("Смотреть", "View")} <ChevronRight size={12} />
                </div>
              </Link>
            ))}
          </div>

          {/* News */}
          <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
            <h2 className="font-bold text-gray-200 mb-4 font-cinzel text-sm uppercase tracking-wide">{t("Последние обновления", "Latest Updates")}</h2>
            <div className="space-y-4">
              {news.map((item, i) => (
                <div key={i} className="flex gap-4 pb-4 border-b border-[#2a2d3e] last:border-0 last:pb-0">
                  <div className="text-xs text-gray-600 shrink-0 pt-0.5 w-20">{item.date}</div>
                  <div>
                    <p className="text-sm font-medium text-gray-300">{t(item.titleRu, item.titleEn)}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{t(item.descRu, item.descEn)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar ads */}
        <div className="lg:col-span-1">
          <AdDisplay position="sidebar-top" page="home" />
        </div>
      </div>

      <AdDisplay position="content-bottom" page="home" className="mt-4" />
    </div>
  );
}
