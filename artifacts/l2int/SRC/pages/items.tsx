import React, { useState } from "react";
import { ITEM_CATEGORIES, Item } from "../lib/item-data";
import { Package, Search } from "lucide-react";

function GradeBadge({ grade }: { grade: Item["grade"] }) {
  const colors: Record<string, string> = {
    "S84": "bg-red-500/20 text-red-400",
    "S80": "bg-red-400/20 text-red-400",
    "S": "bg-red-400/15 text-red-400",
    "A": "bg-orange-400/15 text-orange-400",
    "B": "bg-yellow-400/15 text-yellow-400",
    "C": "bg-blue-400/15 text-blue-400",
    "D": "bg-gray-400/15 text-gray-400",
    "No Grade": "bg-gray-400/10 text-gray-500",
    "Special": "bg-purple-400/15 text-purple-400",
  };
  return <span className={`text-xs px-2 py-0.5 rounded font-bold ${colors[grade] || "bg-gray-400/10 text-gray-500"}`}>{grade}</span>;
}

function TypeBadge({ type }: { type: Item["type"] }) {
  const labels: Record<string, string> = { weapon: "Оружие", armor: "Броня", jewelry: "Украшение", etc: "Разное", consumable: "Расходник" };
  return <span className="text-xs text-gray-600">{labels[type] || type}</span>;
}

export default function ItemsPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");

  const grades = ["S", "A", "B", "C", "D", "No Grade", "Special"];

  const filtered = ITEM_CATEGORIES.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      (gradeFilter === "all" || item.grade === gradeFilter) &&
      (search === "" || item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()))
    )
  })).filter(cat => (selectedCat === "all" || cat.id === selectedCat) && cat.items.length > 0);

  const total = ITEM_CATEGORIES.reduce((a, c) => a + c.items.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-cinzel">Предметы</h1>
          <p className="text-gray-500 text-sm mt-1">{total} предметов в базе данных</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Поиск предметов..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-[#0e0f1a] border border-[#2a2d3e] rounded-lg text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-amber-400/50 w-64"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setSelectedCat("all")} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${selectedCat === "all" ? "bg-amber-400 text-black" : "bg-[#1a1b26] text-gray-400 border border-[#2a2d3e] hover:text-gray-200"}`}>Все</button>
        {ITEM_CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setSelectedCat(cat.id)} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${selectedCat === cat.id ? "bg-amber-400 text-black" : "bg-[#1a1b26] text-gray-400 border border-[#2a2d3e] hover:text-gray-200"}`}>{cat.name}</button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setGradeFilter("all")} className={`px-3 py-1 rounded text-xs font-bold transition-colors ${gradeFilter === "all" ? "bg-amber-400 text-black" : "bg-[#1a1b26] text-gray-400 border border-[#2a2d3e]"}`}>Все грейды</button>
        {grades.map(g => (
          <button key={g} onClick={() => setGradeFilter(g)} className={`px-3 py-1 rounded text-xs font-bold transition-colors ${gradeFilter === g ? "bg-amber-400 text-black" : "bg-[#1a1b26] text-gray-400 border border-[#2a2d3e]"}`}>{g}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <Package size={40} className="mx-auto mb-3 opacity-30" />
          <p>Предметы не найдены</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filtered.map(cat => (
            <div key={cat.id}>
              <h2 className="text-xs uppercase tracking-widest text-amber-400/70 font-medium mb-4">{cat.name}</h2>
              <div className="overflow-hidden rounded-xl border border-[#2a2d3e]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#0c0d18] border-b border-[#2a2d3e]">
                      <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Название</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Грейд</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium hidden md:table-cell">Тип</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium hidden lg:table-cell">Характеристики</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium hidden xl:table-cell">Классы</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium hidden lg:table-cell">Цена</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.items.map((item, i) => (
                      <tr key={item.id} className={`border-b border-[#1a1b26] hover:bg-[#12131e] transition-colors ${i % 2 === 0 ? "bg-[#0e0f1a]" : "bg-[#0c0d18]"}`}>
                        <td className="px-4 py-3">
                          <p className="text-gray-300 font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">{item.description.slice(0, 60)}...</p>
                        </td>
                        <td className="px-4 py-3"><GradeBadge grade={item.grade} /></td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <TypeBadge type={item.type} />
                          {item.subtype && <p className="text-xs text-gray-600 mt-0.5">{item.subtype}</p>}
                        </td>
                        <td className="px-4 py-3 hidden lg:table-cell text-xs text-gray-500">
                          {item.pAtk && <span>P.Atk: <span className="text-red-400">{item.pAtk}</span> </span>}
                          {item.mAtk && <span>M.Atk: <span className="text-blue-400">{item.mAtk}</span> </span>}
                          {item.pDef && <span>P.Def: <span className="text-green-400">{item.pDef}</span></span>}
                        </td>
                        <td className="px-4 py-3 hidden xl:table-cell text-xs text-gray-600 max-w-[150px] truncate">{item.classes}</td>
                        <td className="px-4 py-3 hidden lg:table-cell text-xs text-amber-400/70">{item.price || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
