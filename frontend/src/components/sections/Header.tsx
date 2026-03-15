import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface HeaderProps {
  onPlanTrip: () => void;
}

export function Header({ onPlanTrip }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container flex h-16 items-center justify-between">
        <a href="#" className="flex items-baseline gap-2">
          <span className="text-xl font-semibold tracking-tight font-display">{t('common:company.name')}</span>
          <span className="text-sm text-muted-foreground">{t('common:company.subtitle')}</span>
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#destinations" className="story-link">{t('common:nav.destinations')}</a>
          <a href="#packages" className="story-link">{t('common:nav.packages')}</a>
          <a href="#services" className="story-link">{t('common:nav.services')}</a>
          <a href="#about" className="story-link">{t('common:nav.about')}</a>
          <a href="#contact" className="story-link">{t('common:nav.contact')}</a>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <div className="hidden md:block">
            <Button variant="hero" onClick={onPlanTrip}>{t('common:buttons.planTrip')}</Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
