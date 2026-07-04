import { useTranslation } from "react-i18next";
import { Map, Hotel, HeadsetIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";

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
        <Reveal>
          <header className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl">{t('home:services.title')}</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{t('home:services.description')}</p>
          </header>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 120} className="h-full">
              <article className="rounded-2xl border bg-card p-7 md:p-8 shadow-elegant h-full group transition-all duration-300 hover:shadow-lifted hover:-translate-y-1 hover:border-primary/30">
                <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
