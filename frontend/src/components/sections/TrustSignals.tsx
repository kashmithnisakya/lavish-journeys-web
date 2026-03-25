import { useTranslation } from "react-i18next";
import { Shield, Award, Clock, HeartHandshake } from "lucide-react";

export function TrustSignals() {
  const { t } = useTranslation();

  const signals = [
    {
      icon: Award,
      title: t('home:trust.booking.title'),
      description: t('home:trust.booking.description'),
    },
    {
      icon: Shield,
      title: t('home:trust.licensed.title'),
      description: t('home:trust.licensed.description'),
    },
    {
      icon: HeartHandshake,
      title: t('home:trust.satisfaction.title'),
      description: t('home:trust.satisfaction.description'),
    },
    {
      icon: Clock,
      title: t('home:trust.support.title'),
      description: t('home:trust.support.description'),
    },
  ];

  return (
    <section className="py-10 bg-primary/5 border-y border-primary/10">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {signals.map((signal, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <signal.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm">{signal.title}</h3>
              <p className="text-xs text-muted-foreground">{signal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
