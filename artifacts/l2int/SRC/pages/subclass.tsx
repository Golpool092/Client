import React from "react";
import { Link } from "wouter";
import { Shield, Star, ChevronRight } from "lucide-react";

const subclassQuests = [
  { href: "/quests/an-arrogant-search", title: "An Arrogant Search (Самонадеянный поиск)", desc: "Квест для прохода к Байюму. Предшественник квестов на сабкласс." },
  { href: "/quests/fate-whisper", title: "Fate's Whisper (Шепот Судьбы)", desc: "Основной квест для права взятия сабкласса (кроме Kamael)." },
  { href: "/quests/seeds-of-chaos", title: "Seeds of Chaos (Семена Хаоса)", desc: "Квест на сабкласс только для расы Kamael." },
];

const subclassInfo = [
  { label: "Макс. сабклассов", value: "3" },
  { label: "Стартовый уровень", value: "40 (со 2-й профессией)" },
  { label: "Для Noblesse", value: "1 сабкласс до Lv.75" },
  { label: "Для Kamael (2 саба)", value: "Уникальный класс Inspector" },
];

const restrictions = [
  "Нельзя взять сабкласс той же расы что и основной",
  "Нельзя иметь дублирующиеся классы (например два разных Танка людей)",
  "Камаэли не могут брать классы других рас как сабкласс",
  "Нельзя взять класс если уже есть такой же в другом сабе",
];

export default function SubclassPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white font-cinzel mb-1">Subclass — Система Субклассов</h1>
        <p className="text-gray-500 text-sm">Дополнительные классы, Doblesse, Olimpiad</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
          <h2 className="font-bold text-amber-400 font-cinzel text-sm uppercase tracking-wide mb-4">Система субклассов</h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Кроме основного класса, вам позволено иметь ещё до 3 подклассов на одном персонаже. Сабкласс берётся у глав той гильдии, профессию которых хотите получить (Sub-Class / Add Sub-Class). Новый сабкласс вы получаете с 40 уровнем и второй профессией.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {subclassInfo.map(({ label, value }) => (
              <div key={label} className="bg-[#13141e] rounded-lg p-3 border border-[#2a2d3e]">
                <p className="text-xs text-gray-600 mb-1">{label}</p>
                <p className="text-sm font-bold text-amber-400">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
          <h2 className="font-bold text-amber-400 font-cinzel text-sm uppercase tracking-wide mb-4">Ограничения сабклассов</h2>
          <ul className="space-y-2">
            {restrictions.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                {r}
              </li>
            ))}
          </ul>
          <div className="mt-4 p-3 rounded-lg bg-amber-400/5 border border-amber-400/20">
            <p className="text-xs text-amber-400 font-medium mb-1">Смена сабкласса</p>
            <p className="text-xs text-gray-500">Чтобы сменить или удалить сабкласс — подойдите к главе гильдии нужного класса (Sub-Class / Switch Sub-Class).</p>
          </div>
        </div>
      </div>

      <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
        <h2 className="font-bold text-amber-400 font-cinzel text-sm uppercase tracking-wide mb-4">Квесты на сабкласс</h2>
        <div className="space-y-3">
          {subclassQuests.map((q) => (
            <Link key={q.href} href={q.href} className="flex items-center gap-4 p-4 rounded-xl border border-[#2a2d3e] hover:border-amber-400/30 bg-[#0c0d18] hover:bg-[#13141e] transition-all group">
              <div className="flex-1">
                <p className="text-gray-300 font-medium text-sm group-hover:text-amber-400 transition-colors">{q.title}</p>
                <p className="text-xs text-gray-600 mt-0.5">{q.desc}</p>
              </div>
              <ChevronRight size={16} className="text-gray-600 group-hover:text-amber-400 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
        <h2 className="font-bold text-amber-400 font-cinzel text-sm uppercase tracking-wide mb-4">Noblesse — Дворянство</h2>
        <p className="text-sm text-gray-400 leading-relaxed mb-4">
          Если вы прокачали сабкласс до 75 уровня, можно получить <span className="text-amber-400 font-semibold">Noblesse (Дворянство)</span> и участвовать в Олимпиаде.
          Дворянство даёт дополнительные умения, бесплатное воскрешение в деревне и уникальный тиарный аксессуар.
        </p>
        <Link href="/quests/noblesse" className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 transition-colors border border-amber-400/30 px-4 py-2 rounded-lg hover:bg-amber-400/10">
          <Star size={14} /> Квест на Noblesse <ChevronRight size={14} />
        </Link>
      </div>

      <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
        <h2 className="font-bold text-amber-400 font-cinzel text-sm uppercase tracking-wide mb-4">Камаэли — Особые условия</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          Если вы играете Камаэлями и прокачали два сабкласса до 75 уровня, то появляется возможность взять уникальный сабкласс <span className="text-amber-400 font-semibold">Inspector</span>. 
          Для Камаэлей квест на сабкласс — <span className="text-amber-400">Seeds of Chaos</span> (вместо Fate's Whisper).
        </p>
      </div>
    </div>
  );
}
