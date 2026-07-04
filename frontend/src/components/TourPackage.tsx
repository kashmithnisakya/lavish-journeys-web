import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, MessageCircle } from "lucide-react";

interface TourPackageProps {
  tourKey: string;
  title: string;
  duration: string;
  description: string;
  highlights: string[];
  image: string;
  badge?: string;
  onInquire: () => void;
  onViewDetails: () => void;
}

export function TourPackage({ tourKey, title, duration, description, highlights, image, badge, onInquire, onViewDetails }: TourPackageProps) {
  const { t } = useTranslation();
  const firstHighlight = highlights[0]?.split(":")[0];

  return (
    <article className="bg-card rounded-2xl border shadow-elegant overflow-hidden h-full flex flex-col group transition-all duration-300 hover:shadow-lifted hover:-translate-y-1">
      <Link to={`/packages/${tourKey}`} className="relative h-56 overflow-hidden block">
        <img
          src={image}
          alt={`${title} tour package`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-card/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-semibold tracking-wide flex items-center gap-1.5">
          <Clock className="h-3 w-3" />
          {duration}
        </div>
        {badge && (
          <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
            {badge}
          </div>
        )}
        {firstHighlight && (
          <div className="absolute bottom-3 left-4 right-4 flex items-center gap-1.5 text-white/90 text-xs font-medium">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{firstHighlight}</span>
          </div>
        )}
      </Link>

      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <Link to={`/packages/${tourKey}`}>
          <h3 className="text-lg font-semibold tracking-tight leading-snug hover:text-primary transition-colors">{title}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mt-2 line-clamp-2 leading-relaxed">{description}</p>

        <div className="mt-auto pt-5">
          <div className="mb-4 flex items-center gap-1.5 text-sm text-primary font-medium">
            <MessageCircle className="h-4 w-4" />
            {t('tours:contactForPricing')}
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
