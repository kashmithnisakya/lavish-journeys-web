import { useState, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import SeoHead from "@/components/SeoHead";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { DestinationsCarousel } from "@/components/sections/DestinationsCarousel";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { useTourPackages } from "@/hooks/useTourPackages";

const TourPackageModal = lazy(() =>
  import("@/components/TourPackageModal").then(m => ({ default: m.TourPackageModal }))
);
const InquiryModal = lazy(() =>
  import("@/components/InquiryModal").then(m => ({ default: m.InquiryModal }))
);

const Index = () => {
  const { t } = useTranslation();
  const { tourPackagesData, tourPackages, loading } = useTourPackages();

  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryTourInfo, setInquiryTourInfo] = useState<{ title: string; duration: string } | null>(null);

  const handleCTA = () => setIsInquiryModalOpen(true);

  const handleViewDetails = (tourKey: string) => {
    setSelectedTour(tourKey);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">{t('common:labels.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoHead
        title={t('home:seo.title')}
        description={t('home:seo.description')}
      />

      <Header onPlanTrip={handleCTA} />

      <main>
        <HeroSection onPlanTrip={handleCTA} />
        <DestinationsCarousel />
        <PackagesSection
          tourPackages={tourPackages}
          onInquire={handleCTA}
          onViewDetails={handleViewDetails}
        />
        <ServicesSection />
        <AboutSection onPlanTrip={handleCTA} />
        <ContactSection onPlanTrip={handleCTA} />
      </main>

      <FooterSection />

      <Suspense fallback={null}>
        {selectedTour && (
          <TourPackageModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            tourData={tourPackagesData[selectedTour as keyof typeof tourPackagesData]}
            onInquire={() => {
              const tourData = tourPackagesData[selectedTour as keyof typeof tourPackagesData];
              setInquiryTourInfo({
                title: tourData.title,
                duration: tourData.duration,
              });
              setIsModalOpen(false);
              handleCTA();
            }}
          />
        )}

        <InquiryModal
          open={isInquiryModalOpen}
          onOpenChange={(open) => {
            setIsInquiryModalOpen(open);
            if (!open) setInquiryTourInfo(null);
          }}
          defaultInquiryType={inquiryTourInfo ? t('forms:inquiryTypes.tourPackage') : t('forms:inquiryTypes.general')}
          defaultQuestion={inquiryTourInfo ? t('forms:tourInquiry', { title: inquiryTourInfo.title, duration: inquiryTourInfo.duration }) : ""}
        />
      </Suspense>
    </div>
  );
};

export default Index;
