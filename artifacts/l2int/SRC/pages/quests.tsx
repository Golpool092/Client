import React, { useState } from "react";
import { Link } from "wouter";
import { QUEST_CATEGORIES } from "../lib/quest-data";
import { BookOpen, ChevronRight, Search, RefreshCcw, CheckCircle } from "lucide-react";

export default function QuestsPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("all");

  const filtered = QUEST_CATEGORIES.map(cat => ({
    ...cat,
    quests: cat.quests.filter(q =>
      search === "" ||
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      q.startNpc.toLowerCase().includes(search.toLowerCase()) ||
      q.location.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(cat =>
    (selectedCat === "all" || cat.id === selectedCat) && cat.quests.length > 0
  );

  const total = QUEST_CATEGORIES.reduce((acc, cat) => acc + cat.quests.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-cinzel">Квесты</h1>
          <p className="text-gray-500 text-sm mt-1">{total} квестов в базе данных</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Поиск квестов..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-[#0e0f1a] border border-[#2a2d3e] rounded-lg text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-amber-400/50 w-64"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCat("all")}
          className={`px-3 py-1 rounded text-xs font-medium transition-colors ${selectedCat === "all" ? "bg-amber-400 text-black" : "bg-[#1a1b26] text-gray-400 hover:text-gray-200 border border-[#2a2d3e]"}`}
        >
          Все
        </button>
        {QUEST_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.id)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${selectedCat === cat.id ? "bg-amber-400 text-black" : "bg-[#1a1b26] text-gray-400 hover:text-gray-200 border border-[#2a2d3e]"}`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
          <p>Квесты не найдены</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filtered.map(cat => (
            <div key={cat.id}>
              <h2 className="text-xs uppercase tracking-widest text-amber-400/70 font-medium mb-4 px-1">{cat.title}</h2>
              <div className="overflow-hidden rounded-xl border border-[#2a2d3e]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#0c0d18] border-b border-[#2a2d3e]">
                      <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium">Название</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium hidden sm:table-cell">Уровень</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium hidden md:table-cell">Тип</th>
                      <th className="text-left px-4 py-3 text-xs text-gray-500 font-medium hidden lg:table-cell">Локация</th>
                      <th className="text-right px-4 py-3 text-xs text-gray-500 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cat.quests.map((quest, i) => (
                      <tr key={quest.id} className={`border-b border-[#1a1b26] hover:bg-[#12131e] transition-colors ${i % 2 === 0 ? "bg-[#0e0f1a]" : "bg-[#0c0d18]"}`}>
                        <td className="px-4 py-3">
                          <Link href={`/quests/${quest.id}`} className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
                            {quest.title}
                          </Link>
                          {quest.titleEn && (
                            <p className="text-xs text-gray-600 mt-0.5">{quest.titleEn}</p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs hidden sm:table-cell">{quest.level}</td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            quest.repeat === "once" ? "bg-blue-400/10 text-blue-400" :
                            quest.repeat === "repeatable" ? "bg-green-400/10 text-green-400" :
                            "bg-amber-400/10 text-amber-400"
                          }`}>
                            {quest.repeat === "once" ? "Разовый" : quest.repeat === "repeatable" ? "Повторяемый" : "Ежедневный"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell max-w-[180px] truncate">{quest.location}</td>
                        <td className="px-4 py-3 text-right">
                          <Link href={`/quests/${quest.id}`} className="text-gray-600 hover:text-amber-400 transition-colors">
                            <ChevronRight size={16} />
                          </Link>
                        </td>
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
