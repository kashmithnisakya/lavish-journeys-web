import { useState, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import SeoHead from "@/components/SeoHead";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { DestinationsCarousel } from "@/components/sections/DestinationsCarousel";
import { StatsSection } from "@/components/sections/StatsSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { OfflineBanner } from "@/components/OfflineBanner";
import { useTourPackages } from "@/hooks/useTourPackages";
import { trackEvent } from "@/lib/firebase";

const TourPackageModal = lazy(() =>
  import("@/components/TourPackageModal").then(m => ({ default: m.TourPackageModal }))
);
const InquiryModal = lazy(() =>
  import("@/components/InquiryModal").then(m => ({ default: m.InquiryModal }))
);
const ExitIntentPopup = lazy(() =>
  import("@/components/ExitIntentPopup").then(m => ({ default: m.ExitIntentPopup }))
);
const ComparePackages = lazy(() =>
  import("@/components/sections/ComparePackages").then(m => ({ default: m.ComparePackages }))
);

const Index = () => {
  const { t } = useTranslation();
  const { tourPackagesData, tourPackages, loading } = useTourPackages();

  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryTourInfo, setInquiryTourInfo] = useState<{ title: string; duration: string } | null>(null);

  const handleCTA = () => {
    trackEvent("plan_trip_click");
    setIsInquiryModalOpen(true);
  };

  const handleViewDetails = (tourKey: string) => {
    trackEvent("view_tour_details", { tour: tourKey });
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

      <OfflineBanner />
      <Header onPlanTrip={handleCTA} />

      <main id="main-content">
        <HeroSection onPlanTrip={handleCTA} />
        <TrustSignals />
        <StatsSection />
        <DestinationsCarousel />
        <PackagesSection
          tourPackages={tourPackages}
          tourPackagesData={tourPackagesData}
          onInquire={handleCTA}
          onViewDetails={handleViewDetails}
        />
        <ServicesSection />
        <TestimonialsSection />
        <FAQSection />
        <AboutSection onPlanTrip={handleCTA} />
        <ContactSection onPlanTrip={handleCTA} />
      </main>

      <FooterSection />
      <WhatsAppButton />
      <StickyMobileCTA onPlanTrip={handleCTA} />

      <Suspense fallback={null}>
        <ExitIntentPopup onPlanTrip={handleCTA} />

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
