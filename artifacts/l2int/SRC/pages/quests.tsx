import React, { useState } from "react";
import { Link } from "wouter";
import { useI18n } from "../hooks/useI18n";
import { quests } from "../data/quest-data";
import { BookOpen, ChevronRight, Star, Filter } from "lucide-react";
import AdDisplay from "../components/AdDisplay";

const typeColors: Record<string, string> = {
  main: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  side: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  daily: "text-green-400 bg-green-400/10 border-green-400/30",
  epic: "text-purple-400 bg-purple-400/10 border-purple-400/30",
};

const typeLabels: Record<string, [string, string]> = {
  main: ["Основное", "Main"],
  side: ["Доп.", "Side"],
  daily: ["Ежедневное", "Daily"],
  epic: ["Эпическое", "Epic"],
};

export default function QuestsPage() {
  const { t, lang } = useI18n();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const filtered = quests.filter(q => {
    const name = lang === "ru" ? q.nameRu : q.name;
    const loc = lang === "ru" ? q.locationRu : q.location;
    const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase()) || loc.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || q.type === typeFilter;
    const matchLevel = levelFilter === "all" ||
      (levelFilter === "1-20" && q.minLevel <= 20) ||
      (levelFilter === "21-40" && q.minLevel >= 21 && q.minLevel <= 40) ||
      (levelFilter === "41-60" && q.minLevel >= 41 && q.minLevel <= 60) ||
      (levelFilter === "61+" && q.minLevel >= 61);
    return matchSearch && matchType && matchLevel;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="text-amber-400" size={22} />
        <h1 className="text-2xl font-bold text-white font-cinzel">{t("Задания", "Quests")}</h1>
        <span className="text-xs text-gray-600 bg-[#1a1b26] px-2 py-0.5 rounded">{filtered.length}</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-4">
        <div className="flex items-center gap-2 text-gray-500 shrink-0">
          <Filter size={14} />
          <span className="text-xs">{t("Фильтры", "Filters")}</span>
        </div>
        <input
          type="text"
          placeholder={t("Поиск по названию...", "Search by name...")}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-1.5 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-amber-400/50"
        />
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-amber-400/50"
        >
          <option value="all">{t("Все типы", "All types")}</option>
          <option value="main">{t("Основные", "Main")}</option>
          <option value="side">{t("Дополнительные", "Side")}</option>
          <option value="daily">{t("Ежедневные", "Daily")}</option>
          <option value="epic">{t("Эпические", "Epic")}</option>
        </select>
        <select
          value={levelFilter}
          onChange={e => setLevelFilter(e.target.value)}
          className="bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-amber-400/50"
        >
          <option value="all">{t("Любой уровень", "Any level")}</option>
          <option value="1-20">1–20</option>
          <option value="21-40">21–40</option>
          <option value="41-60">41–60</option>
          <option value="61+">61+</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="space-y-3">
            {filtered.map(quest => (
              <Link key={quest.id} href={`/quests/${quest.id}`} className="block group">
                <div className="border border-[#2a2d3e] hover:border-amber-400/40 bg-[#0e0f1a] rounded-xl p-4 transition-all hover:bg-[#14151f]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${typeColors[quest.type]}`}>
                          {t(typeLabels[quest.type][0], typeLabels[quest.type][1])}
                        </span>
                        <span className="text-xs text-gray-600">Lv.{quest.minLevel}{quest.maxLevel ? `–${quest.maxLevel}` : "+"}</span>
                        {quest.recommended && (
                          <span className="flex items-center gap-0.5 text-xs text-amber-400/70">
                            <Star size={10} fill="currentColor" /> {t("Рекомендуется", "Recommended")}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors">
                        {lang === "ru" ? quest.nameRu : quest.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                        {lang === "ru" ? quest.locationRu : quest.location} · {quest.npc}
                      </p>
                    </div>
                    <ChevronRight size={16} className="text-gray-600 group-hover:text-amber-400 shrink-0 mt-1 transition-colors" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {(lang === "ru" ? quest.rewardsRu : quest.rewards).map((r, i) => (
                      <span key={i} className="text-xs text-amber-400/80 bg-amber-400/5 border border-amber-400/15 px-2 py-0.5 rounded">{r}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-600">
                {t("Ничего не найдено", "Nothing found")}
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-1">
          <AdDisplay position="sidebar-top" page="quests" />
        </div>
      </div>
    </div>
  );
}
