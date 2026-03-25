import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onPlanTrip: () => void;
}

export function Header({ onPlanTrip }: HeaderProps) {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "#destinations", label: t('common:nav.destinations') },
    { href: "#packages", label: t('common:nav.packages') },
    { href: "#services", label: t('common:nav.services') },
    { href: "#about", label: t('common:nav.about') },
    { href: "#contact", label: t('common:nav.contact') },
  ];

  const menuId = "mobile-nav-menu";

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 border-b">
      {/* Skip navigation link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        {t('common:aria.skipToContent')}
      </a>

      <nav className="container flex h-16 items-center justify-between" aria-label="Main navigation">
        <a href="#" className="flex items-baseline gap-2">
          <span className="text-xl font-semibold tracking-tight font-display text-primary">{t('common:company.name')}</span>
          <span className="text-sm text-muted-foreground hidden sm:inline">{t('common:company.subtitle')}</span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="story-link text-foreground/80 hover:text-foreground transition-colors">{link.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <div className="hidden md:block ml-1">
            <Button variant="premium" size="sm" onClick={onPlanTrip}>{t('common:buttons.planTrip')}</Button>
          </div>
          <button
            className="md:hidden p-2 rounded-md hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls={menuId}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id={menuId}
        role="navigation"
        aria-label="Mobile navigation"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-80 border-t" : "max-h-0"
        }`}
      >
        <div className="container py-4 flex flex-col gap-1 bg-background/95 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="py-2.5 px-4 rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 mt-2 border-t">
            <Button variant="premium" onClick={() => { onPlanTrip(); handleNavClick(); }} className="w-full">
              {t('common:buttons.planTrip')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
