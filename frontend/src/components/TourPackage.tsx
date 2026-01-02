import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface TourPackageProps {
  title: string;
  duration: string;
  description: string;
  highlights: string[];
  price: {
    from: number;
    category: string;
  };
  image: string;
  onInquire: () => void;
  onViewDetails: () => void;
}

export function TourPackage({ title, duration, description, highlights, price, image, onInquire, onViewDetails }: TourPackageProps) {
  const { t } = useTranslation();
  return (
    <article className="bg-card rounded-lg border shadow-elegant overflow-hidden hover-scale h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={`${title} tour package`}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
          {duration}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display text-xl mb-3">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{description}</p>

        <div className="mb-4 flex-1">
          <h4 className="font-medium text-sm mb-2">{t('tours:highlights')}:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {highlights.slice(0, 4).map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 mt-auto">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">{t('tours:from')}</div>
              <div className="font-bold text-lg">
                ${price.from}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {price.category}
                </span>
              </div>
            </div>
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