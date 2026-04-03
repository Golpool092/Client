import React from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Scroll, MapPin, RotateCcw, Gift, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { findQuestById } from "@/lib/quest-data";
import { useI18n } from "@/lib/i18n";

export default function QuestDetail() {
  const [, params] = useRoute("/quests/:id");
  const id = params?.id || "";
  const { t, lang } = useI18n();

  const quest = findQuestById(id);

  const repeatLabel: Record<string, string> = {
    once: lang === "ru" ? "Один раз" : "One time",
    repeatable: lang === "ru" ? "Повторяемый" : "Repeatable",
    daily: lang === "ru" ? "Ежедневный" : "Daily",
  };

  const repeatColor: Record<string, string> = {
    once: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    repeatable: "bg-green-500/10 text-green-400 border-green-500/30",
    daily: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  };

  if (!quest) {
    return (
      <div className="space-y-6 pb-12">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Link href="/quests">
            <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 h-8 w-8">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-cinzel font-bold text-foreground">{t("questsTitle")}</h1>
        </div>
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <Scroll className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-foreground mb-2">Квест не найден</h2>
          <Link href="/quests">
            <Button className="font-cinzel mt-4">{t("backToList")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-start gap-3 border-b border-border pb-4">
        <Link href="/quests">
          <Button variant="ghost" size="icon" className="hover:text-primary hover:bg-primary/10 h-8 w-8 mt-1 shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground mb-1 font-cinzel uppercase tracking-wider">{t("quests")}</p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-cinzel font-bold text-foreground leading-tight">
            {lang === "ru" ? quest.title : quest.titleEn}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-lg p-3 flex flex-col gap-1">
          <span className="text-xs text-muted-foreground font-medium">{t("level")}</span>
          <span className="font-cinzel font-bold text-primary text-sm">{quest.level}</span>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 flex flex-col gap-1">
          <span className="text-xs text-muted-foreground font-medium">{t("repeatability")}</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded border w-fit ${repeatColor[quest.repeat]}`}>
            {repeatLabel[quest.repeat]}
          </span>
        </div>
        <div className="bg-card border border-border rounded-lg p-3 flex flex-col gap-1 col-span-2">
          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
            <User className="w-3 h-3" /> {t("startNpc")}
          </span>
          <span className="font-medium text-foreground text-xs sm:text-sm leading-snug">{quest.startNpc}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2">
          <h3 className="font-cinzel font-bold text-primary text-sm flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {t("location")}
          </h3>
          <p className="text-sm text-foreground">{quest.location}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 flex flex-col gap-2">
          <h3 className="font-cinzel font-bold text-primary text-sm flex items-center gap-2">
            <Gift className="w-4 h-4" /> {t("reward")}
          </h3>
          <p className="text-sm text-foreground">{quest.reward}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 sm:p-5 space-y-2">
        <h3 className="font-cinzel font-bold text-foreground text-base sm:text-lg">{t("questInfo")}</h3>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{quest.description}</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 sm:p-5 space-y-3">
        <h3 className="font-cinzel font-bold text-foreground text-base sm:text-lg flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-primary" />
          {t("howTo")}
        </h3>
        <ol className="space-y-2">
          {quest.steps.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3 group">
              <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mt-0.5">
                <span className="text-xs font-bold text-primary">{idx + 1}</span>
              </div>
              <div className="flex-1 text-sm text-foreground leading-relaxed pt-0.5">{step}</div>
            </li>
          ))}
        </ol>
      </div>

      <div className="pt-2">
        <Link href="/quests">
          <Button variant="outline" className="font-cinzel border-primary/40 hover:border-primary hover:text-primary text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("backToList")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
