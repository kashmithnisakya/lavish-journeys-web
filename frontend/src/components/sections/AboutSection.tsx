import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface AboutSectionProps {
  onPlanTrip: () => void;
}

export function AboutSection({ onPlanTrip }: AboutSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="about" className="container py-12 md:py-16">
      <div className="grid gap-10 md:grid-cols-2 items-center">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">{t('home:about.title')}</h2>
          <p className="text-muted-foreground mt-4">
            {t('home:about.description1')}
          </p>
          <p className="text-muted-foreground mt-4">
            {t('home:about.description2')}
          </p>
          <div className="mt-6">
            <Button variant="premium" onClick={onPlanTrip}>{t('common:buttons.speakSpecialist')}</Button>
          </div>
        </div>
        <div className="rounded-xl bg-gradient-hero p-1 shadow-glow">
          <div className="rounded-lg bg-card p-6">
            <ul className="grid gap-3 text-sm">
              <li>• {t('home:about.benefits.designer')}</li>
              <li>• {t('home:about.benefits.support')}</li>
              <li>• {t('home:about.benefits.transfers')}</li>
              <li>• {t('home:about.benefits.experiences')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
