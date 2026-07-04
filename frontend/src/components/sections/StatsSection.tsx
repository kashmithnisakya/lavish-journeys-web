import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Users, MapPin, Headphones } from "lucide-react";

/** Counts up from 0 to the number in `value` when scrolled into view.
 *  Non-numeric parts stay as a suffix: "500+" -> 500 & "+", "24/7" -> 24 & "/7". */
function AnimatedStat({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      setCount(target);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 1800;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold tracking-tight text-white tabular-nums">
      {target === null ? value : `${count}${suffix}`}
    </div>
  );
}

export function StatsSection() {
  const { t } = useTranslation();

  const stats = [
    { value: t('home:stats.items.experience.value'), label: t('home:stats.items.experience.label'), icon: Calendar },
    { value: t('home:stats.items.travelers.value'), label: t('home:stats.items.travelers.label'), icon: Users },
    { value: t('home:stats.items.destinations.value'), label: t('home:stats.items.destinations.label'), icon: MapPin },
    { value: t('home:stats.items.support.value'), label: t('home:stats.items.support.label'), icon: Headphones },
  ];

  return (
    <section className="py-14 md:py-16 bg-gradient-hero">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/15 mb-3 group-hover:bg-white/25 transition-colors">
                <stat.icon className="h-6 w-6 text-white/90" />
              </div>
              <AnimatedStat value={stat.value} />
              <div className="text-sm mt-1 text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
