import React, { useState } from "react";
import { Link } from "wouter";
import { useI18n } from "../hooks/useI18n";
import { classes } from "../data/class-data";
import { Shield, ChevronRight, Filter } from "lucide-react";
import AdDisplay from "../components/AdDisplay";

const typeColors: Record<string, string> = {
  fighter: "text-red-400 bg-red-400/10 border-red-400/30",
  mage: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  priest: "text-green-400 bg-green-400/10 border-green-400/30",
  rogue: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
};

const typeLabels: Record<string, [string, string]> = {
  fighter: ["Боец", "Fighter"],
  mage: ["Маг", "Mage"],
  priest: ["Жрец", "Priest"],
  rogue: ["Разбойник", "Rogue"],
};

const raceLabels: Record<string, [string, string]> = {
  Human: ["Человек", "Human"],
  Elf: ["Эльф", "Elf"],
  "Dark Elf": ["Тёмный Эльф", "Dark Elf"],
  Orc: ["Орк", "Orc"],
  Dwarf: ["Гном", "Dwarf"],
};

export default function ClassesPage() {
  const { t, lang } = useI18n();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [raceFilter, setRaceFilter] = useState("all");

  const filtered = classes.filter(c => {
    const name = lang === "ru" ? c.nameRu : c.name;
    const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || c.type === typeFilter;
    const matchRace = raceFilter === "all" || c.race === raceFilter;
    return matchSearch && matchType && matchRace;
  });

  const races = [...new Set(classes.map(c => c.race))];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="text-amber-400" size={22} />
        <h1 className="text-2xl font-bold text-white font-cinzel">{t("Классы", "Classes")}</h1>
        <span className="text-xs text-gray-600 bg-[#1a1b26] px-2 py-0.5 rounded">{filtered.length}</span>
      </div>

      <div className="flex flex-wrap gap-3 border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-4">
        <div className="flex items-center gap-2 text-gray-500 shrink-0">
          <Filter size={14} />
          <span className="text-xs">{t("Фильтры", "Filters")}</span>
        </div>
        <input
          type="text"
          placeholder={t("Поиск по классу...", "Search by class...")}
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
          value={raceFilter}
          onChange={e => setRaceFilter(e.target.value)}
          className="bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-amber-400/50"
        >
          <option value="all">{t("Все расы", "All races")}</option>
          {races.map(r => (
            <option key={r} value={r}>{t(raceLabels[r]?.[0] || r, r)}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(cls => (
              <Link key={cls.id} href={`/classes/${cls.id}`} className="block group">
                <div className="border border-[#2a2d3e] hover:border-amber-400/40 bg-[#0e0f1a] rounded-xl p-5 transition-all hover:bg-[#14151f] h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${typeColors[cls.type]}`}>
                          {t(typeLabels[cls.type][0], typeLabels[cls.type][1])}
                        </span>
                        <span className="text-xs text-gray-600">{t("Тир", "Tier")} {cls.tier}</span>
                      </div>
                      <h3 className="font-semibold text-gray-200 group-hover:text-white transition-colors font-cinzel">
                        {lang === "ru" ? cls.nameRu : cls.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5">{t(raceLabels[cls.race]?.[0] || cls.race, cls.race)} · Lv.{cls.requiredLevel}+</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-600 group-hover:text-amber-400 shrink-0 transition-colors" />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {lang === "ru" ? cls.descriptionRu : cls.description}
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2 pt-3 border-t border-[#2a2d3e]">
                    <div className="text-center">
                      <p className="text-xs text-gray-600">STR</p>
                      <p className="text-sm font-bold text-amber-400">{cls.stats.str}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">INT</p>
                      <p className="text-sm font-bold text-blue-400">{cls.stats.int}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600">CON</p>
                      <p className="text-sm font-bold text-green-400">{cls.stats.con}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-16 text-gray-600">
                {t("Ничего не найдено", "Nothing found")}
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-1">
          <AdDisplay position="sidebar-top" page="classes" />
        </div>
      </div>
    </div>
  );
}
