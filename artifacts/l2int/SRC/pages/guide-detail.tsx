import React from "react";
import { Link, useParams } from "wouter";
import { GUIDES } from "../lib/guide-data";
import { ChevronLeft, Clock, Tag } from "lucide-react";

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("## ")) {
      return <h3 key={i} className="text-base font-bold text-amber-400 mt-5 mb-2 font-cinzel">{line.slice(3)}</h3>;
    }
    if (line.startsWith("- **")) {
      const match = line.match(/^- \*\*(.+?)\*\* — (.+)$/);
      if (match) {
        return (
          <div key={i} className="flex items-start gap-2 my-1">
            <span className="text-amber-400/60 shrink-0 mt-0.5">•</span>
            <p className="text-sm text-gray-400"><span className="text-gray-300 font-medium">{match[1]}</span> — {match[2]}</p>
          </div>
        );
      }
    }
    if (line.startsWith("- ")) {
      return (
        <div key={i} className="flex items-start gap-2 my-1">
          <span className="text-amber-400/60 shrink-0 mt-0.5">•</span>
          <p className="text-sm text-gray-400">{line.slice(2)}</p>
        </div>
      );
    }
    if (line.trim() === "") return <br key={i} />;
    return <p key={i} className="text-sm text-gray-400 leading-relaxed my-1.5">{line}</p>;
  });
}

export default function GuideDetailPage() {
  const { id } = useParams<{ id: string }>();
  const guide = GUIDES.find(g => g.id === id);

  if (!guide) {
    return (
      <div className="text-center py-24">
        <p className="text-4xl font-bold text-amber-400 font-cinzel mb-3">404</p>
        <p className="text-gray-400 mb-4">Гайд не найден</p>
        <Link href="/guides" className="text-amber-400 hover:text-amber-300 text-sm flex items-center gap-1 justify-center">
          <ChevronLeft size={16} /> К списку гайдов
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link href="/guides" className="hover:text-amber-400 transition-colors">Гайды</Link>
        <span>/</span>
        <span className="text-gray-300 truncate">{guide.title}</span>
      </div>

      <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#1a1420] to-[#0e0f1a] p-6 border-b border-[#2a2d3e]">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-amber-400/70 font-medium bg-amber-400/10 px-2 py-0.5 rounded">{guide.category}</span>
            {guide.level && <span className="text-xs text-gray-600">Lv. {guide.level}</span>}
            {guide.readTime && (
              <span className="text-xs text-gray-600 flex items-center gap-1">
                <Clock size={10} /> {guide.readTime}
              </span>
            )}
          </div>
          <h1 className="text-xl font-bold text-white font-cinzel">{guide.title}</h1>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">{guide.brief}</p>
        </div>

        <div className="p-6 space-y-2">
          {guide.content.map((section, i) => (
            <div key={i}>
              {renderMarkdown(section)}
            </div>
          ))}
        </div>

        <div className="px-6 pb-6">
          <div className="flex flex-wrap gap-1 items-center">
            <Tag size={12} className="text-gray-600 mr-1" />
            {guide.tags.map(tag => (
              <span key={tag} className="text-xs bg-[#1a1b26] text-gray-500 px-2 py-0.5 rounded">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <Link href="/guides" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-amber-400 transition-colors">
        <ChevronLeft size={16} /> К списку гайдов
      </Link>
    </div>
  );
}
