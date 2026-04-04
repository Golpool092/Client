import React, { useState } from "react";
import { SKILL_CATEGORIES, Skill } from "../lib/skill-data";
import { Sword, Search, Zap, Eye, ToggleLeft } from "lucide-react";

function SkillTypeBadge({ type }: { type: Skill["type"] }) {
  const config = {
    active: { label: "Активный", className: "bg-blue-400/10 text-blue-400" },
    passive: { label: "Пассивный", className: "bg-green-400/10 text-green-400" },
    toggle: { label: "Переключаемый", className: "bg-purple-400/10 text-purple-400" },
  };
  const { label, className } = config[type];
  return <span className={`text-xs px-2 py-0.5 rounded-full ${className}`}>{label}</span>;
}

export default function SkillsPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filtered = SKILL_CATEGORIES.map(cat => ({
    ...cat,
    skills: cat.skills.filter(s =>
      (typeFilter === "all" || s.type === typeFilter) &&
      (search === "" || s.name.toLowerCase().includes(search.toLowerCase()) || s.classes.some(c => c.toLowerCase().includes(search.toLowerCase())))
    )
  })).filter(cat => (selectedCat === "all" || cat.id === selectedCat) && cat.skills.length > 0);

  const total = SKILL_CATEGORIES.reduce((a, c) => a + c.skills.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-cinzel">Умения</h1>
          <p className="text-gray-500 text-sm mt-1">{total} умений в базе данных</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Поиск умений или класса..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-[#0e0f1a] border border-[#2a2d3e] rounded-lg text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-amber-400/50 w-64"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setSelectedCat("all")} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${selectedCat === "all" ? "bg-amber-400 text-black" : "bg-[#1a1b26] text-gray-400 border border-[#2a2d3e] hover:text-gray-200"}`}>Все категории</button>
        {SKILL_CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setSelectedCat(cat.id)} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${selectedCat === cat.id ? "bg-amber-400 text-black" : "bg-[#1a1b26] text-gray-400 border border-[#2a2d3e] hover:text-gray-200"}`}>{cat.name}</button>
        ))}
      </div>

      <div className="flex gap-2">
        {[
          { id: "all", label: "Все типы" },
          { id: "active", label: "Активные" },
          { id: "passive", label: "Пассивные" },
          { id: "toggle", label: "Переключаемые" },
        ].map(({ id, label }) => (
          <button key={id} onClick={() => setTypeFilter(id)} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${typeFilter === id ? "bg-blue-400/20 text-blue-400 border border-blue-400/30" : "bg-[#1a1b26] text-gray-500 border border-[#2a2d3e] hover:text-gray-300"}`}>{label}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <Sword size={40} className="mx-auto mb-3 opacity-30" />
          <p>Умения не найдены</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filtered.map(cat => (
            <div key={cat.id}>
              <h2 className="text-xs uppercase tracking-widest text-amber-400/70 font-medium mb-4">{cat.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cat.skills.map(skill => (
                  <div key={skill.id} className="border border-[#2a2d3e] bg-[#0e0f1a] hover:bg-[#13141e] rounded-xl p-4 transition-colors">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="font-medium text-gray-200 text-sm">{skill.name}</p>
                        <p className="text-xs text-gray-600">{skill.nameEn}</p>
                      </div>
                      <SkillTypeBadge type={skill.type} />
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3">{skill.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      {skill.type !== "passive" && (
                        <>
                          <span className="text-gray-600">MP: <span className="text-blue-400">{skill.mp}</span></span>
                          <span className="text-gray-600">Откат: <span className="text-amber-400">{skill.reuse}</span></span>
                        </>
                      )}
                      <span className="text-gray-600">Lv. <span className="text-gray-400">{skill.level}+</span></span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {skill.classes.map((cls, i) => (
                        <span key={i} className="text-xs bg-[#1a1b26] text-gray-500 px-2 py-0.5 rounded">{cls}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
