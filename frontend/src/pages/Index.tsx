import { useState, useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
import { IndexSkeleton } from "@/components/skeletons/IndexSkeleton";
import { useTourPackages } from "@/hooks/useTourPackages";
import { trackPlanTripClick, trackViewTourDetails, initScrollDepthTracking } from "@/lib/analytics";

const InquiryModal = lazy(() =>
  import("@/components/InquiryModal").then(m => ({ default: m.InquiryModal }))
);
const ExitIntentPopup = lazy(() =>
  import("@/components/ExitIntentPopup").then(m => ({ default: m.ExitIntentPopup }))
);

const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { tourPackagesData, tourPackages, loading } = useTourPackages();

  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  useEffect(() => {
    return initScrollDepthTracking();
  }, []);

  const handleCTA = () => {
    trackPlanTripClick("homepage");
    setIsInquiryModalOpen(true);
  };

  const handleViewDetails = (tourKey: string) => {
    trackViewTourDetails(tourKey);
    navigate(`/packages/${tourKey}`);
  };

  if (loading) {
    return <IndexSkeleton />;
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

        <InquiryModal
          open={isInquiryModalOpen}
          onOpenChange={setIsInquiryModalOpen}
          defaultInquiryType={t('forms:inquiryTypes.general')}
          defaultQuestion=""
        />
      </Suspense>
    </div>
  );
};

export default Index;
