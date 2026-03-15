import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface AboutSectionProps {
  onPlanTrip: () => void;
}

export function AboutSection({ onPlanTrip }: AboutSectionProps) {
  const { t } = useTranslation();

  const benefits = [
    t('home:about.benefits.designer'),
    t('home:about.benefits.support'),
    t('home:about.benefits.transfers'),
    t('home:about.benefits.experiences'),
  ];

  return (
    <section id="about" className="container py-14 md:py-20">
      <div className="grid gap-12 md:grid-cols-2 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">{t('home:about.title')}</h2>
          <p className="text-muted-foreground mt-5 leading-relaxed">
            {t('home:about.description1')}
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">
            {t('home:about.description2')}
          </p>
          <div className="mt-8">
            <Button variant="premium" size="lg" onClick={onPlanTrip}>{t('common:buttons.speakSpecialist')}</Button>
          </div>
        </div>
        <div className="rounded-2xl bg-card border shadow-elegant p-8">
          <ul className="grid gap-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-4 text-sm">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
