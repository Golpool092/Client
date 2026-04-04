import React from "react";
import { Link, useParams } from "wouter";
import { RACES } from "../lib/class-data";
import { ChevronLeft } from "lucide-react";

export default function ClassDetailPage() {
  const { id } = useParams<{ id: string }>();
  const race = RACES.find(r => r.id === id);
  if (!race) return <div className="text-center py-24 text-gray-500">Раса не найдена. <Link href="/classes" className="text-amber-400">← Назад</Link></div>;
  return (
    <div className="max-w-2xl">
      <Link href="/classes" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-amber-400 mb-4 transition-colors">
        <ChevronLeft size={15}/> Все классы
      </Link>
      <h1 className="text-2xl font-bold text-white font-cinzel mb-2">{race.name}</h1>
      <p className="text-gray-400 mb-4">{race.description}</p>
      <div className="space-y-2">
        {race.bonuses.map((b, i) => <div key={i} className="flex items-center gap-2 text-sm text-gray-400"><span className="text-amber-400">✦</span>{b}</div>)}
      </div>
    </div>
  );
}
