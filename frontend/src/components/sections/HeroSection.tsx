import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
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
          className="h-[520px] sm:h-[60vh] md:h-[75vh] w-full object-cover scale-105 brightness-105 contrast-105 saturate-110 dark:brightness-75 dark:contrast-125 dark:saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>
      <div className="container relative z-10 flex h-[520px] sm:h-[60vh] md:h-[75vh] items-center px-4 sm:px-6">
        <div className="max-w-2xl animate-enter w-full">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
            <span className="text-white/90 text-xs sm:text-sm tracking-widest uppercase font-medium">{t('common:company.tagline')}</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-tight text-white drop-shadow-lg">{t('home:hero.title')}</h1>
          <p className="mt-4 sm:mt-5 text-white/85 text-sm sm:text-base md:text-lg max-w-xl leading-relaxed">
            {t('home:hero.subtitle')}
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
            <Button variant="premium" size="lg" onClick={onPlanTrip} className="w-full sm:w-auto">{t('common:buttons.startPlanning')}</Button>
            <Button size="lg" asChild className="w-full sm:w-auto bg-white/15 backdrop-blur-sm text-white border border-white/25 hover:bg-white/25 font-medium">
              <a href="#destinations">{t('common:buttons.exploreDestinations')}</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <a
        href="#destinations"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors group"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase hidden sm:block">{t('common:buttons.exploreDestinations')}</span>
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
