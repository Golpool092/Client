import React from "react";
import { Link, useParams } from "wouter";
import { useI18n } from "../hooks/useI18n";
import { findClassById } from "../data/class-data";
import { Shield, ChevronLeft, TrendingUp, ThumbsUp, ThumbsDown, Zap } from "lucide-react";

const raceLabels: Record<string, [string, string]> = {
  Human: ["Человек", "Human"],
  Elf: ["Эльф", "Elf"],
  "Dark Elf": ["Тёмный Эльф", "Dark Elf"],
  Orc: ["Орк", "Orc"],
  Dwarf: ["Гном", "Dwarf"],
};

export default function ClassDetailPage() {
  const params = useParams<{ id: string }>();
  const { t, lang } = useI18n();
  const cls = findClassById(params.id);

  if (!cls) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-500">{t("Класс не найден", "Class not found")}</p>
        <Link href="/classes" className="mt-4 inline-flex items-center gap-2 text-amber-400 hover:underline">
          <ChevronLeft size={14} /> {t("Назад к классам", "Back to classes")}
        </Link>
      </div>
    );
  }

  const name = lang === "ru" ? cls.nameRu : cls.name;
  const description = lang === "ru" ? cls.descriptionRu : cls.description;
  const strengths = lang === "ru" ? cls.strengthsRu : cls.strengths;
  const weaknesses = lang === "ru" ? cls.weaknessesRu : cls.weaknesses;
  const mainSkills = lang === "ru" ? cls.mainSkillsRu : cls.mainSkills;

  const statBars = [
    { label: "STR", value: cls.stats.str, max: 50, color: "bg-red-400" },
    { label: "DEX", value: cls.stats.dex, max: 50, color: "bg-yellow-400" },
    { label: "CON", value: cls.stats.con, max: 50, color: "bg-green-400" },
    { label: "INT", value: cls.stats.int, max: 50, color: "bg-blue-400" },
    { label: "WIT", value: cls.stats.wit, max: 30, color: "bg-purple-400" },
    { label: "MEN", value: cls.stats.men, max: 35, color: "bg-pink-400" },
  ];

  return (
    <div className="max-w-3xl space-y-6">
      <Link href="/classes" className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-400 text-sm transition-colors">
        <ChevronLeft size={14} /> {t("Назад к классам", "Back to classes")}
      </Link>

      <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-400/10 shrink-0">
            <Shield className="text-amber-400" size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-gray-600">{t(raceLabels[cls.race]?.[0] || cls.race, cls.race)}</span>
              <span className="text-gray-700">·</span>
              <span className="text-xs text-gray-600">{t("Тир", "Tier")} {cls.tier}</span>
              <span className="text-gray-700">·</span>
              <span className="text-xs text-gray-600">Lv.{cls.requiredLevel}+</span>
            </div>
            <h1 className="text-2xl font-bold text-white font-cinzel">{name}</h1>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-6">
        <h2 className="font-bold text-gray-200 mb-4 font-cinzel text-sm uppercase tracking-wide flex items-center gap-2">
          <TrendingUp size={16} className="text-amber-400" />
          {t("Характеристики", "Stats")}
        </h2>
        <div className="space-y-3">
          {statBars.map(({ label, value, max, color }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="text-xs text-gray-600 w-8">{label}</span>
              <div className="flex-1 h-2 bg-[#1a1b26] rounded-full overflow-hidden">
                <div
                  className={`h-full ${color} rounded-full transition-all`}
                  style={{ width: `${(value / max) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-6 text-right">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths / Weaknesses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
          <h2 className="font-bold text-gray-200 mb-3 text-sm flex items-center gap-2">
            <ThumbsUp size={14} className="text-green-400" />
            {t("Сильные стороны", "Strengths")}
          </h2>
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-green-400 mt-0.5">+</span> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
          <h2 className="font-bold text-gray-200 mb-3 text-sm flex items-center gap-2">
            <ThumbsDown size={14} className="text-red-400" />
            {t("Слабые стороны", "Weaknesses")}
          </h2>
          <ul className="space-y-2">
            {weaknesses.map((w, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-red-400 mt-0.5">–</span> {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Key skills */}
      <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
        <h2 className="font-bold text-gray-200 mb-4 font-cinzel text-sm uppercase tracking-wide flex items-center gap-2">
          <Zap size={16} className="text-amber-400" />
          {t("Ключевые умения", "Key Skills")}
        </h2>
        <div className="flex flex-wrap gap-2">
          {mainSkills.map((skill, i) => (
            <span key={i} className="text-sm text-amber-400 bg-amber-400/10 border border-amber-400/30 px-3 py-1.5 rounded-lg">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
