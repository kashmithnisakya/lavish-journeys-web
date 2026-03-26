import { useTranslation } from "react-i18next";
import { trackFacebookClick, trackWhatsAppClick } from "@/lib/analytics";

export function FooterSection() {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-3 text-sm">
          <div>
            <h4 className="font-display text-lg mb-3">{t('common:company.fullName')}</h4>
            <p className="text-muted-foreground leading-relaxed">{t('common:company.tagline')}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-xs uppercase tracking-wider text-muted-foreground">{t('home:footer.contactInfo')}</h4>
            <div className="text-muted-foreground space-y-1.5">
              <p>{t('home:contact.address.line1')}</p>
              <p>{t('home:contact.address.line2')}</p>
              <p>{t('home:contact.phone.numbers')}</p>
              <a href={`mailto:${t('home:contact.email.address')}`} className="hover:text-primary transition-colors">{t('home:contact.email.address')}</a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-xs uppercase tracking-wider text-muted-foreground">{t('home:footer.followUs')}</h4>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61579323908693&locale=eu_ES"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackFacebookClick("footer")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Facebook
              </a>
              <a
                href="https://wa.me/94701728922"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("footer")}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{t('common:copyright', { year: new Date().getFullYear() })}</p>
          <nav className="flex gap-6">
            <a href="/#packages" className="hover:text-primary transition-colors">{t('common:nav.packages')}</a>
            <a href="/#about" className="hover:text-primary transition-colors">{t('common:nav.about')}</a>
            <a href="/#services" className="hover:text-primary transition-colors">{t('common:nav.services')}</a>
            <a href="/#contact" className="hover:text-primary transition-colors">{t('common:nav.contact')}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
