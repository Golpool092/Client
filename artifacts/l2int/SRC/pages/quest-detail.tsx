import React from "react";
import { Link, useParams } from "wouter";
import { useI18n } from "../hooks/useI18n";
import { findQuestById } from "../data/quest-data";
import { BookOpen, MapPin, User, ChevronLeft, Gift, CheckCircle2, Star } from "lucide-react";

const typeColors: Record<string, string> = {
  main: "text-amber-400 bg-amber-400/10 border-amber-400/30",
  side: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  daily: "text-green-400 bg-green-400/10 border-green-400/30",
  epic: "text-purple-400 bg-purple-400/10 border-purple-400/30",
};

const typeLabels: Record<string, [string, string]> = {
  main: ["Основное задание", "Main Quest"],
  side: ["Дополнительное задание", "Side Quest"],
  daily: ["Ежедневное задание", "Daily Quest"],
  epic: ["Эпическое задание", "Epic Quest"],
};

export default function QuestDetailPage() {
  const params = useParams<{ id: string }>();
  const { t, lang } = useI18n();
  const quest = findQuestById(params.id);

  if (!quest) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-500">{t("Задание не найдено", "Quest not found")}</p>
        <Link href="/quests" className="mt-4 inline-flex items-center gap-2 text-amber-400 hover:underline">
          <ChevronLeft size={14} /> {t("Назад к заданиям", "Back to quests")}
        </Link>
      </div>
    );
  }

  const name = lang === "ru" ? quest.nameRu : quest.name;
  const location = lang === "ru" ? quest.locationRu : quest.location;
  const description = lang === "ru" ? quest.descriptionRu : quest.description;
  const rewards = lang === "ru" ? quest.rewardsRu : quest.rewards;
  const steps = lang === "ru" ? quest.stepsRu : quest.steps;

  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/quests" className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-400 text-sm transition-colors">
        <ChevronLeft size={14} /> {t("Назад к заданиям", "Back to quests")}
      </Link>

      <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-400/10 shrink-0">
            <BookOpen className="text-amber-400" size={24} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className={`text-xs px-2 py-0.5 rounded-full border ${typeColors[quest.type]}`}>
                {t(typeLabels[quest.type][0], typeLabels[quest.type][1])}
              </span>
              {quest.recommended && (
                <span className="flex items-center gap-1 text-xs text-amber-400/70">
                  <Star size={11} fill="currentColor" /> {t("Рекомендуется", "Recommended")}
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white font-cinzel">{name}</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-[#1a1b26] rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">{t("Уровень", "Level")}</p>
            <p className="text-sm font-semibold text-gray-200">
              {quest.minLevel}{quest.maxLevel ? `–${quest.maxLevel}` : "+"}
            </p>
          </div>
          <div className="bg-[#1a1b26] rounded-lg p-3 flex items-start gap-2">
            <MapPin size={14} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-600 mb-1">{t("Локация", "Location")}</p>
              <p className="text-sm font-semibold text-gray-200">{location}</p>
            </div>
          </div>
          <div className="bg-[#1a1b26] rounded-lg p-3 flex items-start gap-2">
            <User size={14} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-gray-600 mb-1">NPC</p>
              <p className="text-sm font-semibold text-gray-200">{quest.npc}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-400 leading-relaxed text-sm border-t border-[#2a2d3e] pt-4">{description}</p>
      </div>

      {/* Steps */}
      <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-6">
        <h2 className="font-bold text-gray-200 mb-4 font-cinzel text-sm uppercase tracking-wide flex items-center gap-2">
          <CheckCircle2 size={16} className="text-amber-400" />
          {t("Шаги выполнения", "Quest Steps")}
        </h2>
        <ol className="space-y-3">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs flex items-center justify-center font-bold">
                {i + 1}
              </span>
              <p className="text-sm text-gray-400 leading-relaxed pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Rewards */}
      <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-6">
        <h2 className="font-bold text-gray-200 mb-4 font-cinzel text-sm uppercase tracking-wide flex items-center gap-2">
          <Gift size={16} className="text-amber-400" />
          {t("Награды", "Rewards")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {rewards.map((r, i) => (
            <span key={i} className="text-sm text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1.5 rounded-lg">
              {r}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
