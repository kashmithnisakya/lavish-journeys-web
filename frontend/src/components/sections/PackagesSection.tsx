import { useState, useMemo, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { TourPackage } from "@/components/TourPackage";
import type { ProcessedTourPackage, TourCategory, TourPackagesDataType } from "@/types/tour";

const ComparePackages = lazy(() =>
  import("@/components/sections/ComparePackages").then(m => ({ default: m.ComparePackages }))
);

const badgeTranslationKeys: { [key: string]: string } = {
  popular: 'common:badges.popular',
  bestValue: 'common:badges.bestValue',
  new: 'common:badges.new',
};

interface PackagesSectionProps {
  tourPackages: ProcessedTourPackage[];
  tourPackagesData: TourPackagesDataType;
  onInquire: () => void;
  onViewDetails: (tourKey: string) => void;
}

export function PackagesSection({ tourPackages, tourPackagesData, onInquire, onViewDetails }: PackagesSectionProps) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories: TourCategory[] = [
    { id: 'all', name: t('common:categories.all') },
    { id: 'cultural', name: t('common:categories.cultural') },
    { id: 'spiritual', name: t('common:categories.spiritual') },
    { id: 'wildlife', name: t('common:categories.wildlife') },
  ];

  const filteredPackages = useMemo(
    () => selectedCategory === 'all'
      ? tourPackages
      : tourPackages.filter(pkg => pkg.category === selectedCategory),
    [selectedCategory, tourPackages]
  );

  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return tourPackages.length;
    return tourPackages.filter(pkg => pkg.category === categoryId).length;
  };

  return (
    <section id="packages" className="container py-12 md:py-16">
      <header className="mb-6 md:mb-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl">{t('home:packages.title')}</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          {t('home:packages.description')}
        </p>
      </header>

      <div className="flex flex-wrap justify-center items-center gap-3 mb-10">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-full border-2 font-medium transition-all hover:scale-105 flex items-center gap-2 ${
              selectedCategory === category.id
                ? 'bg-primary text-primary-foreground border-primary shadow-lg'
                : 'bg-card border-border hover:border-primary/50'
            }`}
          >
            <span>{category.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              selectedCategory === category.id
                ? 'bg-primary-foreground/20'
                : 'bg-muted'
            }`}>
              {getCategoryCount(category.id)}
            </span>
          </button>
        ))}
        <Suspense fallback={null}>
          <ComparePackages tourPackages={tourPackages} tourPackagesData={tourPackagesData} />
        </Suspense>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {filteredPackages.map((pkg, index) => (
          <TourPackage
            key={index}
            title={pkg.title}
            duration={pkg.duration}
            description={pkg.description}
            highlights={pkg.highlights}
            image={pkg.image}
            badge={pkg.badge ? t(badgeTranslationKeys[pkg.badge] || '') : undefined}
            onInquire={onInquire}
            onViewDetails={() => onViewDetails(pkg.key)}
          />
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">{t('common:labels.noPackages')}</p>
        </div>
      )}
    </section>
  );
}
