import React, { useState } from "react";
import { Sword, Search, Shield, Gem } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ITEMS, GRADES, type ItemGrade } from "@/lib/item-data";
import { useI18n } from "@/lib/i18n";

const gradeColor: Record<string, string> = {
  "No Grade": "text-gray-400 border-gray-400/40 bg-gray-400/10",
  "D": "text-orange-400 border-orange-400/40 bg-orange-400/10",
  "C": "text-yellow-400 border-yellow-400/40 bg-yellow-400/10",
  "B": "text-blue-400 border-blue-400/40 bg-blue-400/10",
  "A": "text-purple-400 border-purple-400/40 bg-purple-400/10",
  "S": "text-red-400 border-red-400/40 bg-red-400/10",
  "S80": "text-red-300 border-red-300/40 bg-red-300/10",
  "S84": "text-rose-300 border-rose-300/40 bg-rose-300/10",
};

const categoryIcon = {
  weapon: <Sword className="w-4 h-4" />,
  armor: <Shield className="w-4 h-4" />,
  jewelry: <Gem className="w-4 h-4" />,
  shield: <Shield className="w-4 h-4" />,
};

export default function Items() {
  const { t, lang } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGrade, setActiveGrade] = useState<ItemGrade | "all">("all");
  const [activeCategory, setActiveCategory] = useState<"all" | "weapon" | "armor" | "jewelry">("all");

  const filtered = ITEMS.filter(item => {
    const name = lang === "ru" ? item.name : item.nameEn;
    const matchSearch = !searchQuery || name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGrade = activeGrade === "all" || item.grade === activeGrade;
    const matchCat = activeCategory === "all" || item.category === activeCategory;
    return matchSearch && matchGrade && matchCat;
  });

  const categories = [
    { id: "all", label: lang === "ru" ? "Все" : "All" },
    { id: "weapon", label: lang === "ru" ? t("weapons") : t("weapons") },
    { id: "armor", label: lang === "ru" ? t("armor") : t("armor") },
    { id: "jewelry", label: lang === "ru" ? t("jewelry") : t("jewelry") },
  ] as const;

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      <div className="border-b border-border pb-4 sm:pb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-foreground flex items-center gap-2 sm:gap-3">
          <Sword className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
          {t("itemsTitle")}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">{t("itemsSubtitle")}</p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="search"
          placeholder={t("searchItemPlaceholder")}
          className="w-full pl-9 h-10 sm:h-12 bg-card border-border focus-visible:ring-primary text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded text-xs font-cinzel font-bold border transition-colors ${
                activeCategory === cat.id ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveGrade("all")}
            className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${
              activeGrade === "all" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50"
            }`}
          >
            {lang === "ru" ? "Все грейды" : "All grades"}
          </button>
          {GRADES.map(grade => (
            <button
              key={grade}
              onClick={() => setActiveGrade(grade)}
              className={`px-3 py-1 rounded text-xs font-bold border transition-colors ${
                activeGrade === grade
                  ? `${gradeColor[grade]} border-current`
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-lg">
          <Sword className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-foreground">{t("nothingFound")}</h3>
          <button
            className="mt-4 text-primary text-sm hover:underline"
            onClick={() => { setSearchQuery(""); setActiveGrade("all"); setActiveCategory("all"); }}
          >
            {t("resetSearch")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {filtered.map(item => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-lg p-3 sm:p-4 hover:border-primary/40 transition-colors space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-muted-foreground shrink-0">{categoryIcon[item.category]}</span>
                  <h3 className="font-cinzel font-bold text-sm text-foreground leading-snug truncate">
                    {lang === "ru" ? item.name : item.nameEn}
                  </h3>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded border shrink-0 ${gradeColor[item.grade]}`}>
                  {item.grade}
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {item.pAtk !== undefined && item.pAtk > 0 && (
                  <span className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                    {t("pAtk")}: {item.pAtk}
                  </span>
                )}
                {item.mAtk !== undefined && item.mAtk > 0 && (
                  <span className="text-xs text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2 py-0.5 rounded">
                    {t("mAtk")}: {item.mAtk}
                  </span>
                )}
                {item.pDef !== undefined && item.pDef > 0 && (
                  <span className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded">
                    {t("pDef")}: {item.pDef}
                  </span>
                )}
                {item.critical && (
                  <span className="text-xs text-orange-400 bg-orange-400/10 border border-orange-400/20 px-2 py-0.5 rounded">
                    Crit: {item.critical}
                  </span>
                )}
                {item.atkSpd && (
                  <span className="text-xs text-purple-400 bg-purple-400/10 border border-purple-400/20 px-2 py-0.5 rounded">
                    {t("speed")}: {item.atkSpd}
                  </span>
                )}
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              <p className="text-xs text-primary/70 italic">
                📍 {item.where}
              </p>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center pt-2">
        {lang === "ru" ? `Показано ${filtered.length} из ${ITEMS.length} предметов` : `Showing ${filtered.length} of ${ITEMS.length} items`}
      </p>
    </div>
  );
}
