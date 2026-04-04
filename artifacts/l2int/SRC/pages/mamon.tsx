import React from "react";
import { Map } from "lucide-react";

const mamonItems = [
  { name: "Enchant Weapon (S)", type: "Свиток", desc: "Свиток зачарования оружия S-грейда", price: "не продаётся" },
  { name: "Life Stone: Level 76", type: "Камень жизни", desc: "Активирует Soul Crystal уровня 76+", price: "Сеал стоун" },
  { name: "Life Stone: Level 80", type: "Камень жизни", desc: "Активирует Soul Crystal высокого уровня", price: "Сеал стоун" },
  { name: "High-Grade Life Stone: Level 76", type: "Камень жизни", desc: "Камень жизни высокого грейда", price: "Сеал стоун" },
  { name: "High-Grade Life Stone: Level 80", type: "Камень жизни", desc: "Мощный камень жизни", price: "Сеал стоун" },
  { name: "Top-Grade Life Stone: Level 76", type: "Камень жизни", desc: "Топовый камень жизни Lv76", price: "Сеал стоун" },
  { name: "Vesper Noble", type: "Броня", desc: "Части брони Vesper Noble S84 грейда", price: "Заломная монета" },
  { name: "Icarus", type: "Оружие", desc: "Оружие Icarus S84 грейда", price: "Заломная монета" },
];

const necropolis = [
  "Necropolis of Sacrifice (Жертвенный Некрополь)",
  "The Pilgrim's Necropolis (Некрополь Пилигримов)",
  "Necropolis of Worship (Некрополь Послушников)",
  "The Patriot's Necropolis (Некрополь Повстанцев)",
  "Necropolis of Devotion (Молитвенный Некрополь)",
  "Necropolis of Martyrdom (Некрополь Мучеников)",
  "The Saint's Necropolis (Некрополь Святых)",
  "The Disciple's Necropolis (Некрополь Апостолов)",
];

const mammonUpgrade = [
  { from: "C-grade оружие", to: "B-grade оружие", cost: "Кристаллы + Adena" },
  { from: "B-grade оружие", to: "A-grade оружие", cost: "Кристаллы + Adena" },
  { from: "A-grade оружие", to: "S-grade оружие", cost: "Кристаллы + Adena (очень дорого)" },
];

export default function MamonPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white font-cinzel mb-1">Магазин, распечатка и улучшение у Мамона</h1>
        <p className="text-gray-500 text-sm">Merchant of Mammon (Торговец Мамон) — специальный торговец в некрополях</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
          <h2 className="font-bold text-amber-400 font-cinzel text-sm uppercase tracking-wide mb-4">Магазин Merchant of Mammon</h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Мамон Торговец находится во время утверждения печати (доступ только победителям соревнований "7 печатей") в одних из некрополей. Торговцы часто перемещаются, не задерживаясь на одном месте дольше получаса.
          </p>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide mb-2">Некрополи с Мамоном</p>
            <ul className="space-y-1">
              {necropolis.map((n, i) => (
                <li key={i} className="text-sm text-gray-500 flex items-start gap-2">
                  <span className="text-amber-400/50 shrink-0">•</span> {n}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
          <h2 className="font-bold text-amber-400 font-cinzel text-sm uppercase tracking-wide mb-4">Blacksmith of Mammon — Кузнец</h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Кузнец Мамона (Blacksmith of Mammon) находится в тех же некрополях. Он занимается улучшением (распечаткой) предметов — повышением грейда оружия и брони.
          </p>
          <div>
            <p className="text-xs text-gray-600 uppercase tracking-wide mb-3">Улучшение предметов</p>
            <div className="space-y-2">
              {mammonUpgrade.map((u, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500 text-xs">{u.from}</span>
                  <span className="text-amber-400">→</span>
                  <span className="text-gray-300 text-xs">{u.to}</span>
                  <span className="text-gray-600 text-xs ml-auto">{u.cost}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border border-[#2a2d3e] bg-[#0e0f1a] rounded-xl p-5">
        <h2 className="font-bold text-amber-400 font-cinzel text-sm uppercase tracking-wide mb-4">Перечень товаров (что можно купить)</h2>
        <div className="overflow-hidden rounded-lg border border-[#1a1b26]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#0c0d18] border-b border-[#2a2d3e]">
                <th className="text-left px-4 py-2 text-xs text-gray-500 font-medium">Предмет</th>
                <th className="text-left px-4 py-2 text-xs text-gray-500 font-medium">Тип</th>
                <th className="text-left px-4 py-2 text-xs text-gray-500 font-medium hidden md:table-cell">Описание</th>
                <th className="text-left px-4 py-2 text-xs text-gray-500 font-medium">Валюта</th>
              </tr>
            </thead>
            <tbody>
              {mamonItems.map((item, i) => (
                <tr key={i} className={`border-b border-[#1a1b26] hover:bg-[#12131e] ${i % 2 === 0 ? "bg-[#0e0f1a]" : "bg-[#0c0d18]"}`}>
                  <td className="px-4 py-2 text-gray-300 text-xs font-medium">{item.name}</td>
                  <td className="px-4 py-2 text-gray-500 text-xs">{item.type}</td>
                  <td className="px-4 py-2 text-gray-600 text-xs hidden md:table-cell">{item.desc}</td>
                  <td className="px-4 py-2 text-amber-400/70 text-xs">{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border border-amber-400/20 bg-amber-400/5 rounded-xl p-5">
        <h2 className="font-bold text-amber-400 font-cinzel text-sm uppercase tracking-wide mb-3">Система 7 Печатей</h2>
        <p className="text-sm text-gray-400 leading-relaxed">
          Доступ к Мамону (торговцу и кузнецу) есть только у победителей соревнования Семи Печатей (Seven Signs). 
          Каждую неделю идёт борьба между <span className="text-amber-400">Lords of Dawn</span> и <span className="text-purple-400">Revolutionaries of Dusk</span>.
          Победившая сторона получает доступ в Некрополи и к Мамону на время Утверждения Печати.
        </p>
      </div>
    </div>
  );
}
