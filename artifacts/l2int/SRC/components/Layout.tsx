import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Moon, Sun, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AdDisplay } from "./AdDisplay";
import { useI18n } from "@/lib/i18n";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const { t, lang, setLang } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/quests", label: t("quests") },
    { href: "/classes", label: t("classes") },
    { href: "/skills", label: t("skills") },
    { href: "/items", label: t("items") },
  ];

  const toggleLang = () => setLang(lang === "ru" ? "en" : "ru");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
        <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between gap-2">

          <div className="flex items-center gap-2 sm:gap-6">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-primary h-8 w-8">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[260px] border-primary/20 bg-card px-4">
                <div className="flex items-center gap-2 mb-6 mt-2">
                  <span className="font-cinzel text-xl font-bold text-primary">L2INT.RU</span>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-base font-cinzel py-2 px-3 rounded transition-colors hover:text-primary hover:bg-primary/10 ${
                        location === link.href ? "text-primary font-bold bg-primary/10" : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="h-px bg-border my-3" />
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-2 px-3 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span className="font-cinzel text-sm">{t("admin")}</span>
                  </Link>
                  <div className="h-px bg-border my-1" />
                  <button
                    onClick={toggleLang}
                    className="flex items-center gap-2 py-2 px-3 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors text-left"
                  >
                    <Globe className="h-4 w-4" />
                    <span className="font-cinzel text-sm">{lang === "ru" ? "EN" : "RU"}</span>
                  </button>
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center gap-2 py-2 px-3 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors text-left"
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    <span className="font-cinzel text-sm">{theme === "dark" ? t("lightMode") : t("darkMode")}</span>
                  </button>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <span className="font-cinzel text-lg sm:text-2xl font-bold bg-gradient-to-b from-primary via-primary/80 to-primary/40 bg-clip-text text-transparent group-hover:to-primary transition-all">
                L2INT.RU
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-4 lg:gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs lg:text-sm font-cinzel tracking-wider uppercase transition-colors hover:text-primary hover:drop-shadow-[0_0_8px_rgba(201,162,39,0.5)] ${
                    location === link.href ? "text-primary drop-shadow-[0_0_5px_rgba(201,162,39,0.5)]" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <AdDisplay position="header" className="hidden xl:block w-[280px] h-[40px]" />

            <button
              onClick={toggleLang}
              title={t("language")}
              className="flex items-center gap-1 px-2 py-1.5 rounded text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors text-xs font-cinzel font-bold tracking-wider border border-border hover:border-primary/40"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{lang === "ru" ? "EN" : "RU"}</span>
            </button>

            <Link href="/admin" className="hidden sm:flex text-muted-foreground hover:text-primary p-1.5 transition-colors rounded hover:bg-primary/10">
              <User className="h-4 w-4" />
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground hover:text-primary h-8 w-8"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <div className="flex-1 max-w-full min-w-0">
            {children}
          </div>
          <aside className="w-full lg:w-[260px] xl:w-[300px] shrink-0 space-y-6">
            <AdDisplay position="sidebar" />
          </aside>
        </div>
      </main>

      <footer className="border-t border-primary/20 bg-card py-6 sm:py-8 mt-8 sm:mt-12">
        <div className="container mx-auto px-3 sm:px-4">
          <AdDisplay position="footer" className="mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-lg font-bold text-primary">L2INT.RU</span>
              <span className="text-xs text-muted-foreground">© {new Date().getFullYear()}</span>
            </div>
            <p className="text-xs text-muted-foreground text-center sm:text-right max-w-sm">
              {t("copyright")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
