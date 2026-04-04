import React, { useState } from "react";
import { Link } from "wouter";
import { RACES } from "../lib/class-data";
import { ChevronRight, Shield, Users } from "lucide-react";

function renderTree(nodes: any[], depth = 0): React.ReactNode {
  return nodes.map((node, i) => (
    <div key={i} className={`${depth > 0 ? "ml-5 pl-3 border-l border-[#2a2d3e]" : ""} mt-2`}>
      <div className={`flex items-start gap-3 p-2.5 rounded-lg ${depth === 0 ? "bg-[#13141e] border border-[#2a2d3e]" : "hover:bg-[#13141e]"} transition-colors`}>
        <div className={`shrink-0 w-2 h-2 rounded-full mt-1.5 ${depth === 0 ? "bg-amber-400" : depth === 1 ? "bg-amber-400/50" : "bg-amber-400/20"}`} />
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${depth === 0 ? "text-amber-400" : "text-gray-300"}`}>{node.name}</p>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="text-xs text-gray-600">Lv. {node.level}+</span>
            <span className="text-xs text-gray-500">{node.role}</span>
          </div>
        </div>
      </div>
      {node.children && renderTree(node.children, depth + 1)}
    </div>
  ));
}

export default function ClassesPage() {
  const [selectedRace, setSelectedRace] = useState(RACES[0].id);
  const race = RACES.find(r => r.id === selectedRace)!;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-cinzel">Классы персонажей</h1>
        <p className="text-gray-500 text-sm mt-1">Дерево профессий для всех рас Lineage 2</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {RACES.map(r => (
          <button
            key={r.id}
            onClick={() => setSelectedRace(r.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedRace === r.id
                ? "bg-amber-400 text-black"
                : "bg-[#0e0f1a] border border-[#2a2d3e] text-gray-400 hover:text-gray-200 hover:border-amber-400/30"
            }`}
          >
            {r.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Shield size={18} className="text-amber-400" />
              <h2 className="font-bold text-gray-200 font-cinzel">{race.name}</h2>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{race.description}</p>
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Особенности расы</p>
              <ul className="space-y-1.5">
                {race.bonuses.map((bonus, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-amber-400 shrink-0">✦</span> {bonus}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
            <h2 className="text-sm uppercase tracking-wide text-amber-400/70 font-medium mb-4">Дерево профессий</h2>
            <div className="space-y-3">
              {renderTree(race.paths)}
            </div>
          </div>
        </div>
      </div>

      <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
        <h2 className="text-sm uppercase tracking-wide text-amber-400/70 font-medium mb-4">Все расы — краткое описание</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {RACES.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRace(r.id)}
              className={`text-left p-4 rounded-lg border transition-all ${
                selectedRace === r.id
                  ? "border-amber-400/40 bg-amber-400/5"
                  : "border-[#2a2d3e] hover:border-amber-400/20 hover:bg-[#13141e]"
              }`}
            >
              <p className="font-medium text-gray-300 text-sm mb-1">{r.name}</p>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">{r.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
