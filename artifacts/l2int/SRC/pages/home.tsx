import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ChevronRight, Shield, Sword, Scroll, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdDisplay } from "@/components/AdDisplay";
import { useI18n } from "@/lib/i18n";

const FEATURED_QUESTS_RU = [
  { id: "subclass", title: "Квест на сабкласс", type: "Особые", level: "75+" },
  { id: "freya", title: "Квесты на Фрею", type: "Особые", level: "82+" },
  { id: "pailaka-3", title: "Пайлака — Раненый Дракон", type: "Пайлака", level: "73-77" },
  { id: "antharas", title: "Квест на Антараса", type: "Эпик", level: "80+" },
];

const FEATURED_QUESTS_EN = [
  { id: "subclass", title: "Sub-class Quest", type: "Special", level: "75+" },
  { id: "freya", title: "Freya Quests", type: "Special", level: "82+" },
  { id: "pailaka-3", title: "Pailaka — Injured Dragon", type: "Pailaka", level: "73-77" },
  { id: "antharas", title: "Antharas Quest", type: "Epic", level: "80+" },
];

const NEWS_RU = [
  { id: 1, date: "15.03.2025", title: "Обновление базы: квесты Interlude", summary: "Добавлены подробные прохождения всех квестов эпохи Interlude, включая Пайлака." },
  { id: 2, date: "01.03.2025", title: "Гайд: быстрая прокачка SA 11-14", summary: "Оптимальные локации и тактики для прокачки Кристалла Души до максимума." },
  { id: 3, date: "15.02.2025", title: "Новый раздел: дерево классов", summary: "Добавлено подробное дерево классов для всех 6 рас с бонусами и описаниями." },
  { id: 4, date: "01.02.2025", title: "База предметов S-грейда", summary: "Обновлена таблица оружия и брони S-грейда с характеристиками и источниками." },
];

const NEWS_EN = [
  { id: 1, date: "15.03.2025", title: "Database update: Interlude quests", summary: "Full walkthroughs for all Interlude era quests including Pailaka added." },
  { id: 2, date: "01.03.2025", title: "Guide: fast SA Crystal leveling 11-14", summary: "Optimal locations and tactics for maxing out your Soul Crystal." },
  { id: 3, date: "15.02.2025", title: "New section: class trees", summary: "Detailed class trees for all 6 races with bonuses and descriptions." },
  { id: 4, date: "01.02.2025", title: "S-grade item database", summary: "Updated S-grade weapons and armor table with stats and sources." },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const { t, lang } = useI18n();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) setLocation(`/quests?q=${encodeURIComponent(searchQuery)}`);
  };

  const featuredQuests = lang === "ru" ? FEATURED_QUESTS_RU : FEATURED_QUESTS_EN;
  const news = lang === "ru" ? NEWS_RU : NEWS_EN;

  return (
    <div className="space-y-8 sm:space-y-12 pb-12">
      <section className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] rounded-xl overflow-hidden border border-primary/30 shadow-[0_0_30px_rgba(201,162,39,0.15)] flex flex-col justify-center items-center text-center p-4 sm:p-6">
        <div className="absolute inset-0 bg-black/65 z-10" />
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/hero-bg.png"
            alt="Lineage 2"
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2070&auto=format&fit=crop';
            }}
          />
        </div>
        <div className="relative z-20 max-w-3xl space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-cinzel font-bold text-white tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <span className="text-primary drop-shadow-[0_0_10px_rgba(201,162,39,0.5)]">L2INT.RU</span>
            <br />
            <span className="text-2xl sm:text-3xl md:text-4xl">{t("knowledgeBase")}</span>
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-gray-300 font-medium max-w-xl mx-auto drop-shadow-md">
            {t("heroSubtitle")}
          </p>
          <form onSubmit={handleSearch} className="relative max-w-lg mx-auto mt-4 sm:mt-8 flex w-full gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                type="search"
                placeholder={t("searchPlaceholder")}
                className="w-full pl-9 pr-3 h-11 sm:h-14 bg-background/90 backdrop-blur border-primary/40 focus-visible:ring-primary text-sm sm:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="h-11 sm:h-14 px-4 sm:px-8 font-cinzel font-bold text-sm sm:text-base tracking-wider shrink-0">
              {t("find")}
            </Button>
          </form>
        </div>
      </section>

      <AdDisplay position="content" className="w-full" />

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {[
          { href: "/quests", icon: <Scroll className="w-6 h-6 sm:w-8 sm:h-8" />, label: t("quests"), desc: lang === "ru" ? "Прохождения, профы, сабкласс" : "Walkthroughs, profs, sub-class" },
          { href: "/classes", icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />, label: t("classes"), desc: lang === "ru" ? "Дерево профессий всех рас" : "Class tree for all races" },
          { href: "/skills", icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />, label: t("skills"), desc: lang === "ru" ? "База умений всех классов" : "Skills database for all classes" },
          { href: "/items", icon: <Sword className="w-6 h-6 sm:w-8 sm:h-8" />, label: t("items"), desc: lang === "ru" ? "Оружие, броня, бижутерия" : "Weapons, armor, jewelry" },
        ].map(({ href, icon, label, desc }) => (
          <Link key={href} href={href} className="group">
            <div className="h-full bg-card border border-primary/20 rounded-lg p-3 sm:p-6 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(201,162,39,0.15)] transition-all cursor-pointer flex flex-col items-center text-center gap-2 sm:gap-4">
              <div className="p-2 sm:p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                {icon}
              </div>
              <h3 className="font-cinzel text-sm sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">{label}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-snug hidden sm:block">{desc}</p>
            </div>
          </Link>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <section className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-lg sm:text-2xl font-cinzel font-bold text-foreground flex items-center gap-2">
              <div className="w-1 h-5 sm:h-6 bg-primary" />
              {t("popularQuests")}
            </h2>
            <Link href="/quests" className="text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 flex items-center">
              {t("allQuests")} <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {featuredQuests.map(quest => (
              <Link key={quest.id} href={`/quests/${quest.id}`} className="group block">
                <div className="bg-card border border-border rounded-md p-3 sm:p-4 hover:border-primary/40 hover:bg-card/80 transition-colors h-full flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-sm bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {quest.type}
                    </span>
                    <span className="text-xs font-bold text-destructive shrink-0">{quest.level}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-foreground mt-1 group-hover:text-primary transition-colors leading-snug">
                    {quest.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <h2 className="text-lg sm:text-2xl font-cinzel font-bold text-foreground flex items-center gap-2">
              <div className="w-1 h-5 sm:h-6 bg-primary" />
              {t("siteNews")}
            </h2>
          </div>
          <div className="space-y-3">
            {news.map(item => (
              <div key={item.id} className="bg-card border border-border rounded-md p-3 sm:p-4 flex flex-col hover:border-primary/30 transition-colors">
                <span className="text-xs text-muted-foreground mb-1">{item.date}</span>
                <h4 className="text-sm sm:text-base font-bold text-foreground hover:text-primary cursor-pointer transition-colors leading-snug mb-1">
                  {item.title}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
