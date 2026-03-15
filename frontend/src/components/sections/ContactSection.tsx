import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface ContactSectionProps {
  onPlanTrip: () => void;
}

export function ContactSection({ onPlanTrip }: ContactSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="contact" className="bg-secondary/40 py-12 md:py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl">{t('home:contact.title')}</h2>
          <p className="text-muted-foreground mt-2">{t('home:contact.description')}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="bg-card rounded-lg p-6 shadow-elegant">
            <h3 className="font-display text-xl mb-4">{t('home:contact.information')}</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium">{t('home:contact.address.label')}</p>
                <p className="text-muted-foreground">{t('home:contact.address.line1')}<br />{t('home:contact.address.line2')}</p>
              </div>
              <div>
                <p className="font-medium">{t('home:contact.phone.label')}</p>
                <p className="text-muted-foreground">{t('home:contact.phone.numbers')}</p>
              </div>
              <div>
                <p className="font-medium">{t('home:contact.email.label')}</p>
                <a href={`mailto:${t('home:contact.email.address')}`} className="text-primary hover:underline">{t('home:contact.email.address')}</a>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-elegant">
            <h3 className="font-display text-xl mb-4">{t('home:contact.connect')}</h3>
            <div className="space-y-4">
              <a
                href="https://www.facebook.com/profile.php?id=61579323908693&locale=eu_ES"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  f
                </div>
                <span>{t('home:contact.facebook')}</span>
              </a>

              <a
                href="https://wa.me/94701728922"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  W
                </div>
                <span>{t('home:contact.whatsapp')}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button variant="hero" size="lg" onClick={onPlanTrip}>{t('common:buttons.planTrip')}</Button>
        </div>
      </div>
    </section>
  );
}
