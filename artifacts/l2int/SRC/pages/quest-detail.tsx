import React from "react";
import { Link, useParams } from "wouter";
import { QUEST_CATEGORIES } from "../lib/quest-data";
import { ChevronLeft, MapPin, Users, Gift, BookOpen, CheckCircle, AlertCircle, Info } from "lucide-react";

export default function QuestDetailPage() {
  const { id } = useParams<{ id: string }>();

  const quest = QUEST_CATEGORIES.flatMap(c => c.quests).find(q => q.id === id);
  const category = QUEST_CATEGORIES.find(c => c.quests.some(q => q.id === id));

  if (!quest) {
    return (
      <div className="text-center py-24">
        <p className="text-4xl font-bold text-amber-400 font-cinzel mb-3">404</p>
        <p className="text-gray-400 mb-4">Квест не найден</p>
        <Link href="/quests" className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1 justify-center">
          <ChevronLeft size={16} /> Обратно к квестам
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/quests" className="hover:text-amber-400 transition-colors">Квесты</Link>
        <span>/</span>
        {category && <span className="hover:text-amber-400 transition-colors cursor-pointer">{category.title}</span>}
        <span>/</span>
        <span className="text-gray-300 truncate">{quest.title}</span>
      </div>

      <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#1a1420] to-[#0e0f1a] p-6 border-b border-[#2a2d3e]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-white font-cinzel">{quest.title}</h1>
              {quest.titleEn && <p className="text-sm text-gray-500 mt-1 italic">{quest.titleEn}</p>}
            </div>
            <span className={`shrink-0 text-xs px-3 py-1.5 rounded-full font-medium ${
              quest.repeat === "once" ? "bg-blue-400/10 text-blue-400 border border-blue-400/20" :
              quest.repeat === "repeatable" ? "bg-green-400/10 text-green-400 border border-green-400/20" :
              "bg-amber-400/10 text-amber-400 border border-amber-400/20"
            }`}>
              {quest.repeat === "once" ? "Разовый" : quest.repeat === "repeatable" ? "Повторяемый" : "Ежедневный"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#2a2d3e] border-b border-[#2a2d3e]">
          {[
            { icon: BookOpen, label: "Уровень", value: quest.level },
            { icon: Users, label: "Стартовый NPC", value: quest.startNpc.split("(")[0].trim() },
            { icon: MapPin, label: "Локация", value: quest.location.split(",")[0].trim() },
            { icon: Gift, label: "Хроника", value: quest.chronicle || "—" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Icon size={14} className="text-amber-400/60" />
                <span className="text-xs text-gray-600 uppercase tracking-wide">{label}</span>
              </div>
              <p className="text-sm text-gray-300 font-medium">{value}</p>
            </div>
          ))}
        </div>

        <div className="p-6 space-y-6">
          {quest.requirements && (
            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-400/5 border border-blue-400/15">
              <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-blue-400 font-medium mb-1">Требования</p>
                <p className="text-sm text-gray-400">{quest.requirements}</p>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-sm uppercase tracking-wide text-amber-400/70 font-medium mb-3">Описание</h2>
            <p className="text-gray-400 text-sm leading-relaxed">{quest.description}</p>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-wide text-amber-400/70 font-medium mb-3">Прохождение</h2>
            <ol className="space-y-3">
              {quest.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-xs text-amber-400 font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-400/5 border border-amber-400/20">
            <Gift size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-amber-400 font-medium mb-1 uppercase tracking-wide">Награда</p>
              <p className="text-sm text-gray-300">{quest.reward}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-[#13141e] border border-[#2a2d3e]">
            <MapPin size={14} className="text-gray-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-600 mb-1">Стартовый NPC</p>
              <p className="text-sm text-gray-400">{quest.startNpc}</p>
              <p className="text-xs text-gray-600 mt-1">{quest.location}</p>
            </div>
          </div>
        </div>
      </div>

      <Link href="/quests" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-400 transition-colors">
        <ChevronLeft size={16} /> Назад к квестам
      </Link>
    </div>
  );
}
