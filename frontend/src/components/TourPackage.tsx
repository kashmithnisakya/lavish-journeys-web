import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface TourPackageProps {
  title: string;
  duration: string;
  description: string;
  highlights: string[];
  image: string;
  badge?: string;
  onInquire: () => void;
  onViewDetails: () => void;
}

export function TourPackage({ title, duration, description, highlights, image, badge, onInquire, onViewDetails }: TourPackageProps) {
  const { t } = useTranslation();
  return (
    <article className="bg-card rounded-xl border shadow-elegant overflow-hidden hover-scale h-full flex flex-col group">
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={`${title} tour package`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-card/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
          {duration}
        </div>
        {badge && (
          <div className="absolute top-4 left-4 bg-gradient-gold text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
            {badge}
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">{description}</p>

        <div className="mb-4 flex-1">
          <h4 className="font-medium text-xs uppercase tracking-wider text-muted-foreground mb-2">{t('tours:highlights')}</h4>
          <ul className="text-xs text-muted-foreground space-y-1.5">
            {highlights.slice(0, 4).map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-accent mt-0.5 font-bold">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 mt-auto pt-4 border-t">
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <MessageCircle className="w-4 h-4" />
            <span>{t('tours:contactForPricing')}</span>
          </div>
          <div className="flex gap-2">
            <Button onClick={onViewDetails} variant="outline" size="sm" className="flex-1">
              {t('tours:viewDetails')}
            </Button>
            <Button onClick={onInquire} variant="premium" size="sm" className="flex-1">
              {t('tours:inquireNow')}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
