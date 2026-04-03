import React, { createContext, useContext, useState, useEffect } from "react";

type Lang = "ru" | "en";

interface I18nContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (ru: string, en: string) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "ru",
  setLang: () => {},
  t: (ru) => ru,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const stored = localStorage.getItem("l2int-lang");
    return (stored as Lang) || "ru";
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("l2int-lang", l);
  };

  const t = (ru: string, en: string) => lang === "ru" ? ru : en;

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
