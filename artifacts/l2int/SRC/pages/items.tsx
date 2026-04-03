import React, { useState } from "react";
import { useI18n } from "../hooks/useI18n";
import { items } from "../data/item-data";
import { Package, Filter } from "lucide-react";
import AdDisplay from "../components/AdDisplay";

const gradeColors: Record<string, string> = {
  none: "text-gray-400 bg-gray-400/10 border-gray-400/20",
  D: "text-gray-300 bg-gray-300/10 border-gray-300/20",
  C: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  B: "text-green-400 bg-green-400/10 border-green-400/20",
  A: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  S: "text-red-400 bg-red-400/10 border-red-400/20",
};

const typeLabels: Record<string, [string, string]> = {
  weapon: ["Оружие", "Weapon"],
  armor: ["Доспехи", "Armor"],
  accessory: ["Аксессуар", "Accessory"],
  consumable: ["Расходник", "Consumable"],
  material: ["Материал", "Material"],
  scroll: ["Свиток", "Scroll"],
};

export default function ItemsPage() {
  const { t, lang } = useI18n();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");

  const filtered = items.filter(item => {
    const name = lang === "ru" ? item.nameRu : item.name;
    const matchSearch = !search || name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "all" || item.type === typeFilter;
    const matchGrade = gradeFilter === "all" || item.grade === gradeFilter;
    return matchSearch && matchType && matchGrade;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Package className="text-amber-400" size={22} />
        <h1 className="text-2xl font-bold text-white font-cinzel">{t("Предметы", "Items")}</h1>
        <span className="text-xs text-gray-600 bg-[#1a1b26] px-2 py-0.5 rounded">{filtered.length}</span>
      </div>

      <div className="flex flex-wrap gap-3 border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-4">
        <div className="flex items-center gap-2 text-gray-500 shrink-0">
          <Filter size={14} />
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
          {Object.entries(typeLabels).map(([k, [ru, en]]) => (
            <option key={k} value={k}>{t(ru, en)}</option>
          ))}
        </select>
        <select
          value={gradeFilter}
          onChange={e => setGradeFilter(e.target.value)}
          className="bg-[#1a1b26] border border-[#2a2d3e] rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-amber-400/50"
        >
          <option value="all">{t("Любой грейд", "Any grade")}</option>
          {["none", "D", "C", "B", "A", "S"].map(g => (
            <option key={g} value={g}>{g === "none" ? t("Без грейда", "No grade") : `Grade ${g}`}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(item => (
              <div key={item.id} className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${gradeColors[item.grade]}`}>
                        {item.grade === "none" ? t("Без грейда", "No grade") : `Grade ${item.grade}`}
                      </span>
                      <span className="text-xs text-gray-600">{t(typeLabels[item.type][0], typeLabels[item.type][1])}</span>
                    </div>
                    <h3 className="font-semibold text-gray-200">{lang === "ru" ? item.nameRu : item.name}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">Lv.{item.level}+ · {item.weight} {t("ед. веса", "weight")}</p>
                  </div>
                  <Package size={16} className="text-amber-400/50 shrink-0 mt-1" />
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
                  {lang === "ru" ? item.descriptionRu : item.description}
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.entries(item.stats).slice(0, 4).map(([k, v]) => (
                    <div key={k} className="flex justify-between items-center bg-[#1a1b26] rounded px-2 py-1">
                      <span className="text-xs text-gray-600">{k}</span>
                      <span className="text-xs text-amber-400 font-medium">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[#2a2d3e] flex items-center justify-between">
                  <span className="text-xs text-gray-500">{t("Цена", "Price")}:</span>
                  <span className="text-sm font-bold text-amber-400">{item.price.toLocaleString()} ₳</span>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-16 text-gray-600">
                {t("Ничего не найдено", "Nothing found")}
              </div>
            )}
          </div>
        </div>
        <div className="lg:col-span-1">
          <AdDisplay position="sidebar-top" page="items" />
        </div>
      </div>
    </div>
  );
}
