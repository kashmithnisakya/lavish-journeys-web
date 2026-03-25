import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeftRight, Clock, Star, MapPin } from "lucide-react";
import type { ProcessedTourPackage, TourPackagesDataType } from "@/types/tour";

interface ComparePackagesProps {
  tourPackages: ProcessedTourPackage[];
  tourPackagesData: TourPackagesDataType;
}

export function ComparePackages({ tourPackages, tourPackagesData }: ComparePackagesProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<[string, string]>(["", ""]);

  const pkg1 = selected[0] ? tourPackagesData[selected[0]] : null;
  const pkg2 = selected[1] ? tourPackagesData[selected[1]] : null;

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="gap-2"
      >
        <ArrowLeftRight className="w-4 h-4" />
        {t('tours:compare.button')}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {t('tours:compare.title')}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <select
              value={selected[0]}
              onChange={(e) => setSelected([e.target.value, selected[1]])}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">{t('tours:compare.selectPackage')}</option>
              {tourPackages.map((pkg) => (
                <option key={pkg.key} value={pkg.key} disabled={pkg.key === selected[1]}>
                  {pkg.title}
                </option>
              ))}
            </select>
            <select
              value={selected[1]}
              onChange={(e) => setSelected([selected[0], e.target.value])}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">{t('tours:compare.selectPackage')}</option>
              {tourPackages.map((pkg) => (
                <option key={pkg.key} value={pkg.key} disabled={pkg.key === selected[0]}>
                  {pkg.title}
                </option>
              ))}
            </select>
          </div>

          {pkg1 && pkg2 ? (
            <div className="space-y-6">
              {/* Duration */}
              <div className="grid grid-cols-2 gap-4">
                {[pkg1, pkg2].map((pkg, i) => (
                  <div key={i} className="bg-card border rounded-lg p-4">
                    <h3 className="font-display text-lg mb-3">{pkg.title}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {pkg.duration}
                      </div>
                      <p className="text-muted-foreground line-clamp-3">{pkg.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent" />
                  {t('tours:highlights')}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[pkg1, pkg2].map((pkg, i) => (
                    <ul key={i} className="space-y-1.5">
                      {pkg.highlights.map((h, j) => (
                        <li key={j} className="text-xs flex items-start gap-2">
                          <span className="text-accent font-bold mt-0.5">•</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>

              {/* Hotels */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {t('tours:hotels')}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {[pkg1, pkg2].map((pkg, i) => (
                    <ul key={i} className="space-y-1.5">
                      {pkg.hotels.map((h, j) => (
                        <li key={j} className="text-xs">
                          <span className="font-medium text-primary">{h.destination}:</span>{" "}
                          <span className="text-muted-foreground">{h.hotel}</span>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>

              {/* Inclusions count */}
              <div className="grid grid-cols-2 gap-4">
                {[pkg1, pkg2].map((pkg, i) => (
                  <div key={i} className="bg-secondary/30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{pkg.inclusions.length}</div>
                    <div className="text-xs text-muted-foreground">{t('tours:inclusions')}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <ArrowLeftRight className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>{t('tours:compare.selectBoth')}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
