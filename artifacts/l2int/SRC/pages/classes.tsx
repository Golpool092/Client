import React, { useState } from "react";
import { Shield, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RACES, type ClassNode } from "@/lib/class-data";
import { useI18n } from "@/lib/i18n";

function ClassTree({ nodes, lang, depth = 0 }: { nodes: ClassNode[]; lang: string; depth?: number }) {
  const colors = [
    "border-primary/60 bg-primary/10 text-primary",
    "border-amber-500/50 bg-amber-500/10 text-amber-400",
    "border-blue-400/50 bg-blue-400/10 text-blue-300",
    "border-green-400/50 bg-green-400/10 text-green-300",
  ];
  const color = colors[Math.min(depth, colors.length - 1)];

  return (
    <div className={`space-y-2 ${depth > 0 ? "ml-3 sm:ml-6 mt-2 pl-3 sm:pl-4 border-l border-border" : ""}`}>
      {nodes.map((node, idx) => (
        <div key={idx} className="space-y-2">
          <div className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 px-3 py-2 sm:py-2.5 rounded-lg border ${color}`}>
            <div className="flex items-center gap-2">
              {depth > 0 && <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-60" />}
              <span className="font-cinzel font-bold text-xs sm:text-sm leading-snug">
                {lang === "ru" ? node.name : node.nameEn}
              </span>
            </div>
            <div className="flex items-center gap-2 pl-5 sm:pl-0">
              <span className="text-xs text-muted-foreground px-2 py-0.5 bg-background/40 rounded border border-border/50">
                {node.level}+
              </span>
              <span className="text-xs text-muted-foreground opacity-70">{node.role}</span>
            </div>
          </div>
          {node.children && node.children.length > 0 && (
            <ClassTree nodes={node.children} lang={lang} depth={depth + 1} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Classes() {
  const { t, lang } = useI18n();
  const [activeRace, setActiveRace] = useState("human");

  const currentRace = RACES.find(r => r.id === activeRace) || RACES[0];

  return (
    <div className="space-y-6 sm:space-y-8 pb-12">
      <div className="border-b border-border pb-4 sm:pb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-cinzel font-bold text-foreground flex items-center gap-2 sm:gap-3">
          <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
          {t("classesTitle")}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2">{t("classesSubtitle")}</p>
      </div>

      <Tabs defaultValue="human" value={activeRace} onValueChange={setActiveRace} className="w-full">
        <TabsList className="w-full justify-start h-auto flex-wrap bg-card border border-border p-1 gap-1">
          {RACES.map(race => (
            <TabsTrigger
              key={race.id}
              value={race.id}
              className="font-cinzel font-bold text-xs sm:text-sm px-2 sm:px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {lang === "ru" ? race.name.split(" ")[0] : race.nameEn}
            </TabsTrigger>
          ))}
        </TabsList>

        {RACES.map(race => (
          <TabsContent key={race.id} value={race.id} className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <div className="bg-card border border-border rounded-lg p-4 sm:p-5 space-y-3">
              <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-primary">
                {lang === "ru" ? race.name : race.nameEn}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {lang === "ru" ? race.description : race.descriptionEn}
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {(lang === "ru" ? race.bonuses : race.bonusesEn).map((bonus, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 bg-primary/10 text-primary border border-primary/30 rounded-full"
                  >
                    {bonus}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-cinzel font-bold text-base sm:text-lg text-foreground border-b border-border pb-2">
                {t("classPath")}
              </h3>
              {race.paths.map((path, i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-4 sm:p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <h4 className="font-cinzel font-bold text-sm sm:text-base text-foreground">
                      {lang === "ru" ? path.name : path.nameEn}
                    </h4>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{path.role}</span>
                  </div>
                  {path.children && (
                    <ClassTree nodes={path.children} lang={lang} depth={0} />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
