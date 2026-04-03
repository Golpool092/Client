import React from "react";
import { useListAds } from "@workspace/api-client-react";
import { getListAdsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface AdDisplayProps {
  position: string;
  className?: string;
}

export function AdDisplay({ position, className = "" }: AdDisplayProps) {
  const { data: ads } = useListAds({ query: { queryKey: getListAdsQueryKey() } });

  if (!ads) return null;

  const activeAds = ads.filter(ad => ad.active && ad.position === position);

  if (activeAds.length === 0) return null;

  const ad = activeAds[Math.floor(Math.random() * activeAds.length)];

  if (position === "header") {
    return (
      <a
        href={ad.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`block group overflow-hidden rounded border border-primary/20 hover:border-primary/50 transition-colors ${className}`}
      >
        <div className="relative w-full h-full bg-card flex items-center justify-between px-3">
          {ad.imageUrl && (
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
              <img src={ad.imageUrl} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="relative z-10 flex items-center gap-2 w-full">
            <span className="text-xs font-bold text-primary px-1 border border-primary/30 rounded bg-background/50">AD</span>
            <span className="text-xs font-semibold truncate flex-1">{ad.title}</span>
            <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={ad.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`block group ${className}`}
    >
      <Card className="overflow-hidden border-primary/20 group-hover:border-primary/60 transition-all bg-card/50 hover:bg-card hover:shadow-[0_0_15px_rgba(201,162,39,0.15)]">
        {ad.imageUrl && (
          <div className="w-full aspect-[4/3] bg-muted relative overflow-hidden">
            <img src={ad.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute top-2 left-2 bg-background/80 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-primary uppercase border border-primary/30">
              Реклама
            </div>
          </div>
        )}
        <CardContent className="p-3 sm:p-4">
          {!ad.imageUrl && (
            <div className="mb-2 inline-block bg-primary/10 px-2 py-0.5 rounded text-[10px] font-bold text-primary uppercase border border-primary/30">
              Реклама
            </div>
          )}
          <h4 className="font-cinzel font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">{ad.title}</h4>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{ad.description}</p>
          <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-primary">
            {ad.linkText || "Подробнее"} <ExternalLink className="w-3 h-3" />
          </div>
        </CardContent>
      </Card>
    </a>
  );
}
