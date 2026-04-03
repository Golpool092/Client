import React, { useEffect, useRef, useState } from "react";
import { useListAds } from "@workspace/api-client-react";
import { X, ExternalLink, Clock } from "lucide-react";

interface AdDisplayProps {
  position: string;
  page?: string;
  className?: string;
}

function formatCountdown(expiresAt: string | null | undefined): string | null {
  if (!expiresAt) return null;
  const diff = new Date(expiresAt).getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  if (days > 0) return `${days}д ${hours}ч`;
  if (hours > 0) return `${hours}ч ${mins}м`;
  return `${mins}м`;
}

export default function AdDisplay({ position, page, className }: AdDisplayProps) {
  const { data: ads } = useListAds({ page, position });
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());
  const showCounts = useRef<Record<number, number>>({});
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(timer);
  }, []);

  if (!ads || ads.length === 0) return null;

  const visible = ads.filter((ad: any) => {
    if (dismissed.has(ad.id)) return false;
    const maxShows = ad.maxShows;
    if (maxShows != null) {
      const count = showCounts.current[ad.id] || 0;
      if (count >= maxShows) return false;
    }
    return true;
  });

  if (visible.length === 0) return null;

  return (
    <div className={`flex flex-col gap-3 ${className || ""}`}>
      {visible.map((ad: any) => {
        const countdown = formatCountdown(ad.expiresAt);

        if (!showCounts.current[ad.id]) {
          showCounts.current[ad.id] = 0;
        }
        showCounts.current[ad.id]++;

        return (
          <div
            key={ad.id}
            className="relative border border-amber-400/20 bg-[#0e0f1a] rounded-lg overflow-hidden group hover:border-amber-400/40 transition-all"
          >
            <button
              onClick={() => setDismissed(prev => new Set([...prev, ad.id]))}
              className="absolute top-2 right-2 z-10 text-gray-600 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>

            {ad.imageUrl && (
              <div className="w-full h-28 overflow-hidden">
                <img
                  src={ad.imageUrl}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-amber-400 leading-snug">{ad.title}</p>
                {countdown && (
                  <span className="flex items-center gap-1 text-xs text-gray-500 shrink-0">
                    <Clock size={11} />
                    {countdown}
                  </span>
                )}
              </div>
              {ad.description && (
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">{ad.description}</p>
              )}
              {ad.linkUrl && (
                <a
                  href={ad.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2"
                >
                  {ad.linkText || ad.linkUrl}
                  <ExternalLink size={11} />
                </a>
              )}
            </div>

            {ad.maxShows != null && (
              <div className="px-3 pb-2">
                <div className="h-0.5 bg-[#2a2d3e] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400/40 transition-all"
                    style={{ width: `${Math.min(100, ((showCounts.current[ad.id] || 0) / ad.maxShows) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
