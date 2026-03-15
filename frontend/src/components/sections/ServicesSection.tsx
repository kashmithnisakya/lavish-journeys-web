import { useTranslation } from "react-i18next";

export function ServicesSection() {
  const { t } = useTranslation();

  const services = [
    { title: t('home:services.tailored.title'), desc: t('home:services.tailored.description') },
    { title: t('home:services.stays.title'), desc: t('home:services.stays.description') },
    { title: t('home:services.concierge.title'), desc: t('home:services.concierge.description') },
  ];

  return (
    <section id="services" className="bg-secondary/40 py-12 md:py-16">
      <div className="container">
        <header className="mb-6 md:mb-8">
          <h2 className="font-display text-3xl md:text-4xl">{t('home:services.title')}</h2>
          <p className="text-muted-foreground mt-2">{t('home:services.description')}</p>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="rounded-lg border bg-card p-6 shadow-elegant">
              <h3 className="font-display text-xl">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
