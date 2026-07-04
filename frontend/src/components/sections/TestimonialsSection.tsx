import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";

interface Testimonial {
  name: string;
  country: string;
  rating: number;
  text: string;
  trip: string;
}

function initials(name: string): string {
  return name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials: Testimonial[] = [0, 1, 2].map((i) => ({
    name: t(`home:testimonials.items.${i}.name`),
    country: t(`home:testimonials.items.${i}.country`),
    rating: 5,
    text: t(`home:testimonials.items.${i}.text`),
    trip: t(`home:testimonials.items.${i}.trip`),
  }));

  return (
    <section className="py-14 md:py-20 bg-secondary/50">
      <div className="container">
        <Reveal>
          <header className="mb-10 text-center">
            <h2 className="font-display text-3xl md:text-4xl">{t('home:testimonials.title')}</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{t('home:testimonials.description')}</p>
          </header>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {testimonials.map((item, i) => (
            <Reveal key={item.name} delay={i * 120} className="h-full">
              <figure className="bg-card rounded-2xl border shadow-elegant p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:shadow-lifted hover:-translate-y-1">
                <div className="flex items-center gap-1 mb-4" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                <blockquote className="text-sm md:text-[15px] text-foreground/90 leading-relaxed flex-1">
                  "{item.text}"
                </blockquote>

                <figcaption className="mt-6 pt-5 border-t flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                    {initials(item.name)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">{item.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{item.country} · {item.trip}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
