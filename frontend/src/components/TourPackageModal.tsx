import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clock, MapPin, Users, Star, MessageCircle } from "lucide-react";

interface TourPackageData {
  title: string;
  duration: string;
  description: string;
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    activities: string[];
    accommodation?: string;
  }[];
  pricing: {
    category: string;
    pax3: number;
    pax8: number;
    pax16: number;
    pax32: number;
  }[];
  inclusions: string[];
  exclusions: string[];
  hotels: {
    destination: string;
    hotel: string;
    supplement?: string;
  }[];
  entranceFees: {
    attraction: string;
    fee: number;
  }[];
}

interface TourPackageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tourData: TourPackageData;
  onInquire: () => void;
}

export function TourPackageModal({ open, onOpenChange, tourData, onInquire }: TourPackageModalProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{tourData.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-4 text-base">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-accent" />
              {tourData.duration}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Overview */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-6">
            <h3 className="font-bold mb-4 text-lg text-primary">{t('tours:overview')}</h3>
            <p className="text-foreground leading-relaxed text-base">{tourData.description}</p>
          </div>

          {/* Contact for Pricing Banner */}
          <div className="bg-accent/10 border border-accent/20 rounded-xl p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-accent" />
              <h3 className="font-bold text-lg text-accent">{t('tours:pricingCTA.title')}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{t('tours:pricingCTA.description')}</p>
            <Button onClick={onInquire} variant="premium" size="sm">
              <Users className="w-4 h-4 mr-2" />
              {t('tours:requestQuote')}
            </Button>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-bold mb-4 text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-accent" />
              {t('tours:highlights')}
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {tourData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-accent/5 border border-accent/10 rounded-lg hover:bg-accent/10 transition-colors">
                  <Star className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">{t('tours:itinerary')}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {tourData.itinerary.map((day, index) => (
                <div key={index} className="bg-secondary/30 border rounded-xl p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-hero text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                      {day.day}
                    </div>
                    <h4 className="font-semibold text-base text-primary">{day.title}</h4>
                  </div>
                  <div className="space-y-2">
                    {day.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></span>
                        <p className="text-sm text-foreground leading-relaxed">{activity}</p>
                      </div>
                    ))}
                  </div>
                  {day.accommodation && (
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <div className="flex items-center gap-2 text-sm font-medium text-primary">
                        <MapPin className="w-4 h-4" />
                        <span>{day.accommodation}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Hotels */}
          <div>
            <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {t('tours:hotels')}
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {tourData.hotels.map((hotel, index) => (
                <div key={index} className="bg-primary/5 border border-primary/10 rounded-lg p-4 hover:bg-primary/8 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="font-semibold text-primary text-sm">{hotel.destination}</span>
                    </div>
                    <p className="text-foreground font-medium ml-4 text-sm">{hotel.hotel}</p>
                    {hotel.supplement && (
                      <p className="text-xs text-muted-foreground ml-4 italic">{hotel.supplement}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-lg text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                {t('tours:inclusions')}
              </h3>
              <ul className="space-y-3">
                {tourData.inclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-emerald-500 mt-1 font-bold">✓</span>
                    <span className="text-sm text-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-lg text-rose-700 dark:text-rose-400 flex items-center gap-2">
                <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✗</span>
                </div>
                {t('tours:exclusions')}
              </h3>
              <ul className="space-y-3">
                {tourData.exclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-rose-500 mt-1 font-bold">✗</span>
                    <span className="text-sm text-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <Button onClick={onInquire} variant="premium" size="lg" className="flex-1">
              <Users className="w-5 h-5 mr-2" />
              {t('tours:requestQuote')}
            </Button>
            <Button variant="outline" size="lg" onClick={() => onOpenChange(false)} className="px-8">
              {t('common:buttons.close')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
