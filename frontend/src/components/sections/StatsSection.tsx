import { useTranslation } from "react-i18next";
import { Calendar, Users, MapPin, Headphones } from "lucide-react";

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
              <div className="text-3xl md:text-4xl font-bold font-display text-white">{stat.value}</div>
              <div className="text-sm mt-1 text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
