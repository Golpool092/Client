import React, { useState } from "react";
import { useI18n } from "../hooks/useI18n";
import { skills } from "../data/skill-data";
import { Sword, Filter, Zap, Clock, BarChart2 } from "lucide-react";
import AdDisplay from "../components/AdDisplay";

const elementColors: Record<string, string> = {
  fire: "text-red-400 bg-red-400/10 border-red-400/30",
  water: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  wind: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
  earth: "text-yellow-600 bg-yellow-600/10 border-yellow-600/30",
  dark: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  holy: "text-yellow-300 bg-yellow-300/10 border-yellow-300/30",
  none: "text-gray-400 bg-gray-400/10 border-gray-400/30",
};

const typeLabels: Record<string, [string, string]> = {
  active: ["Активное", "Active"],
  passive: ["Пассивное", "Passive"],
  toggle: ["Переключение", "Toggle"],
  aura: ["Аура", "Aura"],
};

const elementLabels: Record<string, [string, string]> = {
  fire: ["Огонь", "Fire"],
  water: ["Вода", "Water"],
  wind: ["Ветер", "Wind"],
  earth: ["Земля", "Earth"],
  dark: ["Тьма", "Dark"],
  holy: ["Свет", "Holy"],
  none: ["Нейтральный", "None"],
};

export default function SkillsPage() {
  const { t, lang } = useI18n();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [elementFilter, setElementFilter] = useState("all");

  const filtered = skills.filter(s => {
    const name = lang === "ru" ? s.nameRu : s.name;
    const className = lang === "ru" ? s.classNameRu : s.className;
    const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase()) || className.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || s.type === typeFilter;
    const matchEl = elementFilter === "all" || s.element === elementFilter;
    return matchSearch && matchType && matchEl;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Sword className="text-amber-400" size={22} />
        <h1 className="text-2xl font-bold text-white font-cinzel">{t("Умения", "Skills")}</h1>
        <span className="text-xs text-gray-600 bg-[#1a1b26] px-2 py-0.5 rounded">{filtered.length}</span>
      </div>

      <div className="flex flex-wrap gap-3 border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-4">
        <div className="flex items-center gap-2 text-gray-500 shrink-0">
          <Filter size={14} />
        </div>
        <input
          type="text"
          placeholder={t("Поиск по умению или классу...", "Search by skill or class...")}
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
          {Object.entries(typeLabels).map(([k, [ru, en]]) => (
            <option key={k} value={k}>{t(ru, en)}</option>
          ))}
        </select>
        <select
          value={elementFilter}
          onChange={e => setElementFilter(e.target.value)}
          className="bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-amber-400/50"
        >
          <option value="all">{t("Все элементы", "All elements")}</option>
          {Object.entries(elementLabels).map(([k, [ru, en]]) => (
            <option key={k} value={k}>{t(ru, en)}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-3">
          {filtered.map(skill => (
            <div key={skill.id} className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${elementColors[skill.element || "none"]}`}>
                      {t(elementLabels[skill.element || "none"][0], elementLabels[skill.element || "none"][1])}
                    </span>
                    <span className="text-xs text-gray-600">{t(typeLabels[skill.type][0], typeLabels[skill.type][1])}</span>
                    <span className="text-xs text-gray-600">{t("Макс. уровень", "Max Lv")}: {skill.maxLevel}</span>
                  </div>
                  <h3 className="font-semibold text-gray-200 font-cinzel">{lang === "ru" ? skill.nameRu : skill.name}</h3>
                  <p className="text-xs text-amber-400/70 mt-0.5">{lang === "ru" ? skill.classNameRu : skill.className}</p>
                </div>
                <div className="shrink-0">
                  <div className="p-2 bg-amber-400/10 rounded-lg">
                    <Zap size={18} className="text-amber-400" />
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-3">
                {lang === "ru" ? skill.descriptionRu : skill.description}
              </p>
              <div className="flex flex-wrap gap-4 border-t border-[#2a2d3e] pt-3">
                {skill.mpCost > 0 && (
                  <div className="flex items-center gap-1.5">
                    <BarChart2 size={13} className="text-blue-400" />
                    <span className="text-xs text-gray-500">{t("Мана", "MP")}: <span className="text-blue-400 font-medium">{skill.mpCost}</span></span>
                  </div>
                )}
                {skill.castTime > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-gray-500" />
                    <span className="text-xs text-gray-500">{t("Время каста", "Cast")}: <span className="text-gray-300 font-medium">{skill.castTime}s</span></span>
                  </div>
                )}
                {skill.cooldown > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-orange-400" />
                    <span className="text-xs text-gray-500">{t("Откат", "CD")}: <span className="text-orange-400 font-medium">{skill.cooldown}s</span></span>
                  </div>
                )}
                {skill.range > 0 && (
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500">{t("Дальность", "Range")}: <span className="text-gray-300 font-medium">{skill.range}</span></span>
                  </div>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {(lang === "ru" ? skill.effectsRu : skill.effects).map((e, i) => (
                  <span key={i} className="text-xs text-green-400 bg-green-400/5 border border-green-400/20 px-2 py-0.5 rounded">{e}</span>
                ))}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-600">{t("Ничего не найдено", "Nothing found")}</div>
          )}
        </div>
        <div className="lg:col-span-1">
          <AdDisplay position="sidebar-top" page="skills" />
        </div>
      </div>
    </div>
  );
}
