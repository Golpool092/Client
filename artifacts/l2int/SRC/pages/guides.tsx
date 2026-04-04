import React, { useState } from "react";
import { Link } from "wouter";
import { GUIDES, GUIDE_CATEGORIES } from "../lib/guide-data";
import { BookMarked, ChevronRight, Clock, Search } from "lucide-react";

export default function GuidesPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const filtered = GUIDES.filter(g =>
    (selectedCat === "all" || g.category === selectedCat) &&
    (search === "" || g.title.toLowerCase().includes(search.toLowerCase()) || g.brief.toLowerCase().includes(search.toLowerCase()) || g.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-cinzel">Гайды</h1>
          <p className="text-gray-500 text-sm mt-1">{GUIDES.length} гайдов в базе</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input
            type="text"
            placeholder="Поиск гайдов..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-[#0e0f1a] border border-[#2a2d3e] rounded-lg text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-amber-400/50 w-64"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setSelectedCat("all")} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${selectedCat === "all" ? "bg-amber-400 text-black" : "bg-[#1a1b26] text-gray-400 border border-[#2a2d3e] hover:text-gray-200"}`}>Все</button>
        {GUIDE_CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setSelectedCat(cat)} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${selectedCat === cat ? "bg-amber-400 text-black" : "bg-[#1a1b26] text-gray-400 border border-[#2a2d3e] hover:text-gray-200"}`}>{cat}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <BookMarked size={40} className="mx-auto mb-3 opacity-30" />
          <p>Гайды не найдены</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(guide => (
            <Link key={guide.id} href={`/guides/${guide.id}`} className="group border border-[#2a2d3e] hover:border-amber-400/30 bg-[#0e0f1a] hover:bg-[#13141e] rounded-xl p-5 transition-all block">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-amber-400/70 font-medium bg-amber-400/10 px-2 py-0.5 rounded">{guide.category}</span>
                {guide.level && <span className="text-xs text-gray-600">Lv. {guide.level}</span>}
                {guide.readTime && (
                  <span className="text-xs text-gray-600 flex items-center gap-1 ml-auto">
                    <Clock size={10} /> {guide.readTime}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-gray-200 group-hover:text-amber-400 transition-colors text-sm mb-2 leading-snug">{guide.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{guide.brief}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {guide.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-xs bg-[#1a1b26] text-gray-600 px-2 py-0.5 rounded">{tag}</span>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs text-amber-400/50 group-hover:text-amber-400 transition-colors">
                Читать гайд <ChevronRight size={11} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
