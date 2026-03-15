import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  country: string;
  rating: number;
  text: string;
  trip: string;
}

export function TestimonialsSection() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: t('home:testimonials.items.0.name'),
      country: t('home:testimonials.items.0.country'),
      rating: 5,
      text: t('home:testimonials.items.0.text'),
      trip: t('home:testimonials.items.0.trip'),
    },
    {
      name: t('home:testimonials.items.1.name'),
      country: t('home:testimonials.items.1.country'),
      rating: 5,
      text: t('home:testimonials.items.1.text'),
      trip: t('home:testimonials.items.1.trip'),
    },
    {
      name: t('home:testimonials.items.2.name'),
      country: t('home:testimonials.items.2.country'),
      rating: 5,
      text: t('home:testimonials.items.2.text'),
      trip: t('home:testimonials.items.2.trip'),
    },
  ];

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-14 md:py-20 bg-secondary/50">
      <div className="container">
        <header className="mb-10 text-center">
          <h2 className="font-display text-3xl md:text-4xl">{t('home:testimonials.title')}</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{t('home:testimonials.description')}</p>
        </header>

        <div className="relative max-w-3xl mx-auto">
          <div className="bg-card rounded-2xl border shadow-elegant p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative quote mark */}
            <div className="absolute top-4 left-6 opacity-[0.06]">
              <Quote className="h-24 w-24" />
            </div>

            <div className="relative z-10">
              <p className="text-lg md:text-xl text-foreground/90 leading-relaxed italic mb-8 font-display">
                "{testimonials[current].text}"
              </p>

              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              <div className="font-semibold text-foreground text-lg">{testimonials[current].name}</div>
              <div className="text-sm text-muted-foreground">{testimonials[current].country}</div>
              <div className="text-xs text-primary mt-1.5 font-semibold tracking-wide uppercase">{testimonials[current].trip}</div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2.5 rounded-full border bg-card hover:bg-secondary transition-colors shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-accent" : "w-2 bg-muted-foreground/25"
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2.5 rounded-full border bg-card hover:bg-secondary transition-colors shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
