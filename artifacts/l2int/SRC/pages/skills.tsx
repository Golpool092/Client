import React, { useState } from "react";
import { Zap, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SKILL_CATEGORIES } from "@/lib/skill-data";
import { useI18n } from "@/lib/i18n";

const typeColor: Record<string, string> = {
  active: "bg-red-500/10 text-red-400 border-red-500/30",
  passive: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  toggle: "bg-green-500/10 text-green-400 border-green-500/30",
};

export default function Skills() {
  const { t, lang } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = SKILL_CATEGORIES.map(cat => {
    const skills = cat.skills.filter(s => {
      const name = lang === "ru" ? s.name : s.nameEn;
      const matchSearch = !searchQuery || name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSearch;
    });
    return { ...cat, skills };
  }).filter(c => {
    if (activeCategory !== "all" && c.id !== activeCategory) return false;
    return c.skills.length > 0;
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      <div className="border-b border-border pb-4 sm:pb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-foreground flex items-center gap-2 sm:gap-3">
          <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
          {t("skillsTitle")}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">{t("skillsSubtitle")}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder={t("searchSkillPlaceholder")}
            className="w-full pl-9 h-10 sm:h-12 bg-card border-border focus-visible:ring-primary text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded text-xs font-cinzel font-bold border transition-colors ${
              activeCategory === "all" ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
            }`}
          >
            {lang === "ru" ? "Все" : "All"}
          </button>
          {SKILL_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded text-xs font-cinzel font-bold border transition-colors ${
                activeCategory === cat.id ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary"
              }`}
            >
              {lang === "ru" ? cat.name.split(" / ")[0] : cat.nameEn.split(" / ")[0]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-lg">
          <Zap className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-foreground">{t("nothingFound")}</h3>
          <button className="mt-4 text-primary text-sm hover:underline" onClick={() => setSearchQuery("")}>
            {t("resetSearch")}
          </button>
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          {filtered.map(cat => (
            <section key={cat.id} className="space-y-3">
              <h2 className="font-cinzel font-bold text-base sm:text-xl text-primary border-b border-primary/20 pb-2">
                {lang === "ru" ? cat.name : cat.nameEn}
              </h2>
              <div className="space-y-2">
                {cat.skills.map(skill => (
                  <div
                    key={skill.id}
                    className="bg-card border border-border rounded-lg p-3 sm:p-4 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-start gap-2 sm:gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-cinzel font-bold text-sm sm:text-base text-foreground">
                            {lang === "ru" ? skill.name : skill.nameEn}
                          </h3>
                          <span className={`text-xs px-2 py-0.5 rounded border font-medium ${typeColor[skill.type]}`}>
                            {lang === "ru" ? (skill.type === "active" ? t("active") : skill.type === "passive" ? t("passive") : t("toggle")) : skill.type}
                          </span>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            {t("level")} {skill.level}+
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {skill.mp > 0 && (
                            <span className="text-xs text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2 py-0.5 rounded">
                              MP: {skill.mp}
                            </span>
                          )}
                          {skill.reuse !== "—" && (
                            <span className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded">
                              {lang === "ru" ? "Перезарядка" : "Reuse"}: {skill.reuse}
                            </span>
                          )}
                          {skill.classes.map(cls => (
                            <span key={cls} className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border/50">
                              {cls}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
