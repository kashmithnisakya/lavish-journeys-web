import { useTranslation } from "react-i18next";
import { Map, Hotel, HeadsetIcon } from "lucide-react";

export function ServicesSection() {
  const { t } = useTranslation();

  const services = [
    { title: t('home:services.tailored.title'), desc: t('home:services.tailored.description'), icon: Map },
    { title: t('home:services.stays.title'), desc: t('home:services.stays.description'), icon: Hotel },
    { title: t('home:services.concierge.title'), desc: t('home:services.concierge.description'), icon: HeadsetIcon },
  ];

  return (
    <section id="services" className="py-14 md:py-20">
      <div className="container">
        <header className="mb-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl">{t('home:services.title')}</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{t('home:services.description')}</p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="rounded-xl border bg-card p-8 shadow-elegant hover-scale group text-center">
              <div className="mb-5 inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-gold text-white shadow-md">
                <s.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
