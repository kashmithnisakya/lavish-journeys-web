import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/cover.jpg";

interface HeroSectionProps {
  onPlanTrip: () => void;
}

export function HeroSection({ onPlanTrip }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Lavish Sri Lanka luxury travel hero — tea country at sunrise"
          className="h-[500px] sm:h-[60vh] md:h-[72vh] w-full object-cover brightness-105 contrast-105 saturate-110 dark:brightness-90 dark:contrast-150 dark:saturate-125 dark:hue-rotate-15"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-50 dark:opacity-65" />
        <div className="absolute inset-0 bg-black/5 dark:bg-black/25" />
      </div>
      <div className="container relative z-10 flex h-[500px] sm:h-[60vh] md:h-[72vh] items-center px-4 sm:px-6">
        <div className="max-w-2xl animate-enter w-full">
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl leading-tight">{t('home:hero.title')}</h1>
          <p className="mt-3 sm:mt-4 text-gray-900 dark:text-muted-foreground text-sm sm:text-base md:text-lg">
            {t('home:hero.subtitle')}
          </p>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3">
            <Button variant="hero" size="lg" onClick={onPlanTrip} className="hover-scale w-full sm:w-auto">{t('common:buttons.startPlanning')}</Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <a href="#destinations">{t('common:buttons.exploreDestinations')}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
