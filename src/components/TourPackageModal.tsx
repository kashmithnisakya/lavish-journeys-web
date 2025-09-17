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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{tourData.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-4 text-base">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {tourData.duration}
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overview */}
          <div>
            <h3 className="font-semibold mb-2">Tour Overview</h3>
            <p className="text-muted-foreground">{tourData.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-semibold mb-3">Tour Highlights</h3>
            <div className="grid gap-2 md:grid-cols-2">
              {tourData.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <h3 className="font-semibold mb-3">Daily Itinerary</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {tourData.itinerary.map((day, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium">
                      {day.day}
                    </span>
                    <h4 className="font-medium text-sm">{day.title}</h4>
                  </div>
                  <ul className="text-xs text-muted-foreground ml-8 space-y-1">
                    {day.activities.map((activity, actIndex) => (
                      <li key={actIndex}>• {activity}</li>
                    ))}
                  </ul>
                  {day.accommodation && (
                    <p className="text-xs text-accent mt-1 ml-8">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {day.accommodation}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="font-semibold mb-3">Pricing (Half Board Basis)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border rounded-lg">
                <thead>
                  <tr className="bg-secondary">
                    <th className="text-left p-2 border-b">Category</th>
                    <th className="text-center p-2 border-b">3 PAX</th>
                    <th className="text-center p-2 border-b">8 PAX</th>
                    <th className="text-center p-2 border-b">16 PAX</th>
                    <th className="text-center p-2 border-b">32+ PAX</th>
                  </tr>
                </thead>
                <tbody>
                  {tourData.pricing.map((price, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 font-medium">{price.category}</td>
                      <td className="p-2 text-center">${price.pax3}</td>
                      <td className="p-2 text-center">${price.pax8}</td>
                      <td className="p-2 text-center">${price.pax16}</td>
                      <td className="p-2 text-center">${price.pax32}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hotels */}
          <div>
            <h3 className="font-semibold mb-3">Accommodation</h3>
            <div className="grid gap-2 text-sm">
              {tourData.hotels.map((hotel, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-secondary/30 rounded">
                  <div>
                    <span className="font-medium">{hotel.destination}:</span> {hotel.hotel}
                  </div>
                  {hotel.supplement && (
                    <span className="text-xs text-muted-foreground">{hotel.supplement}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Entrance Fees */}
          <div>
            <h3 className="font-semibold mb-3">Entrance Fees</h3>
            <div className="grid gap-1 text-sm md:grid-cols-2">
              {tourData.entranceFees.map((fee, index) => (
                <div key={index} className="flex justify-between p-1">
                  <span>{fee.attraction}</span>
                  <span className="font-medium">${fee.fee}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-green-600">Inclusions</h3>
              <ul className="text-sm space-y-1">
                {tourData.inclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-red-600">Exclusions</h3>
              <ul className="text-sm space-y-1">
                {tourData.exclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button onClick={onInquire} className="flex-1">
              <Users className="w-4 h-4 mr-2" />
              Request Quote
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}