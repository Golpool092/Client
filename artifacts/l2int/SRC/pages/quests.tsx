import React, { useState } from "react";
import { Link } from "wouter";
import { Search, Scroll, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { QUEST_CATEGORIES } from "@/lib/quest-data";
import { useI18n } from "@/lib/i18n";

export default function Quests() {
  const { t, lang } = useI18n();
  const searchParams = new URLSearchParams(window.location.search);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

  const filteredCategories = QUEST_CATEGORIES.map(category => {
    const quests = searchQuery
      ? category.quests.filter(q =>
          (lang === "ru" ? q.title : q.titleEn).toLowerCase().includes(searchQuery.toLowerCase())
        )
      : category.quests;
    return { ...category, quests };
  }).filter(c => c.quests.length > 0);

  const repeatLabel: Record<string, string> = {
    once: lang === "ru" ? "Один раз" : "One time",
    repeatable: lang === "ru" ? "Повторяемый" : "Repeatable",
    daily: lang === "ru" ? "Ежедневный" : "Daily",
  };

  const repeatColor: Record<string, string> = {
    once: "text-amber-400",
    repeatable: "text-green-400",
    daily: "text-blue-400",
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      <div className="border-b border-border pb-4 sm:pb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-foreground flex items-center gap-2 sm:gap-3">
          <Scroll className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
          {t("questsTitle")}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">{t("questsSubtitle")}</p>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
        </div>
        <Input
          type="search"
          placeholder={t("searchQuestPlaceholder")}
          className="w-full pl-9 sm:pl-10 h-10 sm:h-12 bg-card border-border focus-visible:ring-primary text-sm sm:text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredCategories.length === 0 ? (
        <div className="text-center py-16 bg-card border border-border rounded-lg">
          <Search className="w-10 h-10 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-bold text-foreground">{t("nothingFound")}</h3>
          <button
            className="mt-4 text-primary text-sm hover:underline"
            onClick={() => setSearchQuery("")}
          >
            {t("resetSearch")}
          </button>
        </div>
      ) : (
        <div className="space-y-8 sm:space-y-10">
          {filteredCategories.map(category => (
            <section key={category.id} className="space-y-3 sm:space-y-4">
              <h2 className="text-base sm:text-xl font-cinzel font-bold text-primary border-b border-primary/20 pb-2">
                {lang === "ru" ? category.title : category.titleEn}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {category.quests.map(quest => (
                  <Link key={quest.id} href={`/quests/${quest.id}`} className="group block">
                    <div className="bg-card border border-border rounded-lg p-3 sm:p-4 hover:border-primary/50 hover:shadow-[0_0_15px_rgba(201,162,39,0.1)] transition-all h-full flex flex-col justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {lang === "ru" ? quest.title : quest.titleEn}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded">
                            {t("level")}: {quest.level}
                          </span>
                          <span className={`text-xs font-medium ${repeatColor[quest.repeat]}`}>
                            {repeatLabel[quest.repeat]}
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
