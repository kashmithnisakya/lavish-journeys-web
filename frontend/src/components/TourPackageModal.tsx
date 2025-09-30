import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clock, MapPin, Users, Star } from "lucide-react";

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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{tourData.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-4 text-base">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {tourData.duration}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Overview */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border rounded-xl p-6">
            <h3 className="font-bold mb-4 text-lg text-primary">Tour Overview</h3>
            <p className="text-foreground leading-relaxed text-base">{tourData.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-bold mb-4 text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Tour Highlights
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {tourData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg hover:shadow-sm transition-shadow">
                  <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-foreground leading-relaxed">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Daily Itinerary</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {tourData.itinerary.map((day, index) => (
                <div key={index} className="bg-gradient-to-br from-secondary/20 to-secondary/5 border rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
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
                      <div className="flex items-center gap-2 text-sm font-medium text-accent">
                        <MapPin className="w-4 h-4" />
                        <span>{day.accommodation}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 border rounded-xl p-6">
            <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Pricing (Half Board Basis)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-0 rounded-lg overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
                    <th className="text-left p-4 font-semibold">Category</th>
                    <th className="text-center p-4 font-semibold">3 PAX</th>
                    <th className="text-center p-4 font-semibold">8 PAX</th>
                    <th className="text-center p-4 font-semibold">16 PAX</th>
                    <th className="text-center p-4 font-semibold">32+ PAX</th>
                  </tr>
                </thead>
                <tbody>
                  {tourData.pricing.map((price, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? 'bg-secondary/20' : 'bg-background'} hover:bg-secondary/40 transition-colors`}>
                      <td className="p-4 font-medium text-foreground">{price.category}</td>
                      <td className="p-4 text-center font-bold text-primary">${price.pax3}</td>
                      <td className="p-4 text-center font-bold text-primary">${price.pax8}</td>
                      <td className="p-4 text-center font-bold text-primary">${price.pax16}</td>
                      <td className="p-4 text-center font-bold text-primary">${price.pax32}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hotels */}
          <div>
            <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              Premium Accommodation
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {tourData.hotels.map((hotel, index) => (
                <div key={index} className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-4 hover:shadow-md transition-all hover:border-accent/40">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="font-semibold text-accent">{hotel.destination}</span>
                    </div>
                    <p className="text-foreground font-medium ml-4">{hotel.hotel}</p>
                    {hotel.supplement && (
                      <p className="text-xs text-muted-foreground ml-4 italic">{hotel.supplement}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Entrance Fees */}
          <div>
            <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Entrance Fees & Activities
            </h3>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {tourData.entranceFees.map((fee, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg hover:shadow-sm transition-shadow">
                  <span className="text-sm font-medium text-foreground">{fee.attraction}</span>
                  <span className="font-bold text-yellow-600 dark:text-yellow-400">${fee.fee}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-lg text-green-700 dark:text-green-400 flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                What's Included
              </h3>
              <ul className="space-y-3">
                {tourData.inclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1 font-bold">✓</span>
                    <span className="text-sm text-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <h3 className="font-bold mb-4 text-lg text-red-700 dark:text-red-400 flex items-center gap-2">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✗</span>
                </div>
                Not Included
              </h3>
              <ul className="space-y-3">
                {tourData.exclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-red-500 mt-1 font-bold">✗</span>
                    <span className="text-sm text-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-border/50">
            <Button onClick={onInquire} size="lg" className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary font-semibold shadow-lg hover:shadow-xl transition-all">
              <Users className="w-5 h-5 mr-2" />
              Request Custom Quote
            </Button>
            <Button variant="outline" size="lg" onClick={() => onOpenChange(false)} className="px-8 border-2 hover:bg-secondary">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}