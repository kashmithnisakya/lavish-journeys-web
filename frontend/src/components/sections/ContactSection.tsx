import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
import { trackFacebookClick, trackWhatsAppClick } from "@/lib/analytics";

interface ContactSectionProps {
  onPlanTrip: () => void;
}

export function ContactSection({ onPlanTrip }: ContactSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-14 md:py-20 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl">{t('home:contact.title')}</h2>
          <p className="text-muted-foreground mt-3">{t('home:contact.description')}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-elegant border">
            <h3 className="font-display text-xl mb-6">{t('home:contact.information')}</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{t('home:contact.address.label')}</p>
                  <p className="text-muted-foreground text-sm">{t('home:contact.address.line1')}<br />{t('home:contact.address.line2')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{t('home:contact.phone.label')}</p>
                  <p className="text-muted-foreground text-sm">{t('home:contact.phone.numbers')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{t('home:contact.email.label')}</p>
                  <a href={`mailto:${t('home:contact.email.address')}`} className="text-primary hover:underline text-sm">{t('home:contact.email.address')}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-8 shadow-elegant border">
            <h3 className="font-display text-xl mb-6">{t('home:contact.connect')}</h3>
            <div className="space-y-4">
              <a
                href="https://www.facebook.com/profile.php?id=61579323908693&locale=eu_ES"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackFacebookClick("contact_section")}
                className="flex items-center gap-4 p-4 border rounded-xl hover:bg-secondary/60 transition-all hover:shadow-sm"
              >
                <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  f
                </div>
                <span className="font-medium text-sm">{t('home:contact.facebook')}</span>
              </a>

              <a
                href="https://wa.me/94701728922"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("contact_section")}
                className="flex items-center gap-4 p-4 border rounded-xl hover:bg-secondary/60 transition-all hover:shadow-sm"
              >
                <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  W
                </div>
                <span className="font-medium text-sm">{t('home:contact.whatsapp')}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Button variant="hero" size="lg" onClick={onPlanTrip}>{t('common:buttons.planTrip')}</Button>
        </div>
      </div>
    </section>
  );
}
