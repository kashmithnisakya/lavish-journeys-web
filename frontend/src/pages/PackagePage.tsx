import { useState, useEffect, lazy, Suspense } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTourPackages } from "@/hooks/useTourPackages";
import { Header } from "@/components/sections/Header";
import { FooterSection } from "@/components/sections/FooterSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PackagePageSkeleton } from "@/components/skeletons/PackagePageSkeleton";
import SeoHead from "@/components/SeoHead";
import { Button } from "@/components/ui/button";
import {
  Clock,
  MapPin,
  Users,
  Star,
  MessageCircle,
  ArrowLeft,
  Share2,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Building2,
  CalendarDays,
  Compass,
} from "lucide-react";
import { trackPackagePageView, trackPackageShare, trackPlanTripClick } from "@/lib/analytics";

const InquiryModal = lazy(() =>
  import("@/components/InquiryModal").then((m) => ({ default: m.InquiryModal }))
);

export default function PackagePage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { tourPackagesData, tourPackages, loading } = useTourPackages();

  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<number | null>(null);

  const tourData = slug ? tourPackagesData[slug] : undefined;
  const processedTour = tourPackages.find((p) => p.key === slug);

  useEffect(() => {
    if (slug && tourData) {
      trackPackagePageView(slug);
    }
  }, [slug, tourData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleCTA = () => {
    trackPlanTripClick("package_page");
    setIsInquiryModalOpen(true);
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = tourData?.title || "Tour Package";

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        trackPackageShare(slug!, "native");
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      trackPackageShare(slug!, "clipboard");
    }
  };

  if (loading) return <PackagePageSkeleton />;

  if (!tourData || !slug) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-4">
        <h1 className="font-display text-3xl">Package not found</h1>
        <p className="text-muted-foreground">The tour package you're looking for doesn't exist.</p>
        <Button asChild variant="premium">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoHead
        title={`${tourData.title} | Lavish Travels & Tours`}
        description={tourData.description.slice(0, 160)}
      />

      <Header onPlanTrip={handleCTA} />

      <main>
        {/* ─── Hero Banner ─── */}
        {processedTour && (
          <div className="relative h-[320px] sm:h-[400px] md:h-[480px] overflow-hidden">
            <img
              src={processedTour.image}
              alt={`${tourData.title} tour`}
              className="w-full h-full object-cover scale-105 brightness-95 dark:brightness-70 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 container pb-8 md:pb-12">
              {/* Breadcrumb on hero */}
              <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-4">
                <Link to="/" className="hover:text-white/90 transition-colors">
                  {t("common:nav.home", "Home")}
                </Link>
                <ChevronRight className="w-3 h-3" />
                <Link to="/#packages" className="hover:text-white/90 transition-colors">
                  {t("common:nav.packages")}
                </Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/80">{tourData.title}</span>
              </nav>

              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white drop-shadow-lg leading-tight">
                {tourData.title}
              </h1>

              {/* Meta pills */}
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                  <Clock className="w-4 h-4" />
                  {tourData.duration}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                  <Compass className="w-4 h-4" />
                  {tourData.itinerary.length} {t("tours:destinations", "Destinations")}
                </span>
                {processedTour.badge && (
                  <span className="bg-gradient-gold text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                    {t(`common:badges.${processedTour.badge}`)}
                  </span>
                )}
              </div>

              {/* Action buttons on hero */}
              <div className="flex flex-wrap gap-3 mt-6">
                <Button onClick={handleCTA} variant="premium" size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t("tours:requestQuote")}
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleShare}
                  className="text-white border border-white/25 hover:bg-white/15 backdrop-blur-sm"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {t("common:buttons.share", "Share")}
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="container py-8 md:py-14 max-w-5xl">

          {/* ─── Quick Stats Bar ─── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 -mt-8 md:-mt-12 relative z-10">
            {[
              { icon: CalendarDays, label: t("tours:duration", "Duration"), value: tourData.duration },
              { icon: MapPin, label: t("tours:destinations", "Destinations"), value: `${tourData.itinerary.length} ${t("tours:places", "Places")}` },
              { icon: Building2, label: t("tours:hotels"), value: `${tourData.hotels.length} ${t("tours:hotels")}` },
              { icon: Star, label: t("tours:highlights"), value: `${tourData.highlights.length} ${t("tours:experiences", "Experiences")}` },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-card border rounded-xl p-4 md:p-5 shadow-elegant text-center hover:shadow-lifted transition-all duration-300 hover:-translate-y-1"
              >
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">{stat.label}</p>
                <p className="font-semibold text-sm text-foreground">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* ─── Overview ─── */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center shadow-sm">
                <Compass className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl">{t("tours:overview")}</h2>
            </div>
            <div className="bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border border-primary/10 rounded-2xl p-6 md:p-8">
              <p className="text-foreground leading-relaxed text-base md:text-lg">{tourData.description}</p>
            </div>
          </section>

          {/* ─── Highlights ─── */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center shadow-sm">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl">{t("tours:highlights")}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {tourData.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 p-4 bg-card border rounded-xl hover:shadow-elegant hover:border-accent/30 transition-all duration-300"
                >
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Star className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-sm md:text-base text-foreground leading-relaxed pt-1">{highlight}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Itinerary Timeline ─── */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center shadow-sm">
                <CalendarDays className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl">{t("tours:itinerary")}</h2>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/10 hidden sm:block" />

              <div className="space-y-4">
                {tourData.itinerary.map((day, index) => {
                  const isExpanded = activeDay === index;
                  return (
                    <div key={index} className="relative sm:pl-14">
                      {/* Timeline dot */}
                      <div className="hidden sm:flex absolute left-0 top-4 w-10 h-10 md:w-12 md:h-12 bg-gradient-hero text-white rounded-full items-center justify-center text-sm font-bold shadow-md z-10 ring-4 ring-background">
                        {day.day}
                      </div>

                      <div
                        className={`bg-card border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-elegant ${
                          isExpanded ? "shadow-elegant ring-1 ring-primary/20" : ""
                        }`}
                        onClick={() => setActiveDay(isExpanded ? null : index)}
                      >
                        <div className="p-4 md:p-5 flex items-center gap-3">
                          <div className="sm:hidden w-9 h-9 bg-gradient-hero text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm flex-shrink-0">
                            {day.day}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base md:text-lg text-primary truncate">
                              {day.title}
                            </h3>
                            {!isExpanded && day.activities.length > 0 && (
                              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                                {day.activities[0]}
                              </p>
                            )}
                          </div>
                          <ChevronRight
                            className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                              isExpanded ? "rotate-90" : ""
                            }`}
                          />
                        </div>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="px-4 md:px-5 pb-4 md:pb-5 pt-0 border-t border-border/50">
                            <div className="space-y-2.5 mt-3">
                              {day.activities.map((activity, actIndex) => (
                                <div key={actIndex} className="flex items-start gap-3">
                                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                                  <p className="text-sm text-foreground leading-relaxed">{activity}</p>
                                </div>
                              ))}
                            </div>
                            {day.accommodation && (
                              <div className="mt-4 pt-3 border-t border-border/50">
                                <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                                  <MapPin className="w-4 h-4" />
                                  {day.accommodation}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ─── Hotels ─── */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-hero rounded-full flex items-center justify-center shadow-sm">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="font-display text-2xl md:text-3xl">{t("tours:hotels")}</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {tourData.hotels.map((hotel, index) => (
                <div
                  key={index}
                  className="group bg-card border rounded-xl p-5 hover:shadow-elegant hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-semibold text-primary text-sm">{hotel.destination}</span>
                  </div>
                  <p className="text-foreground font-medium text-sm">{hotel.hotel}</p>
                  {hotel.supplement && (
                    <p className="text-xs text-muted-foreground mt-1.5 italic">{hotel.supplement}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ─── Inclusions & Exclusions ─── */}
          <section className="mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-6 md:p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="font-bold text-lg text-emerald-700 dark:text-emerald-400">
                    {t("tours:inclusions")}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {tourData.inclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/50 rounded-2xl p-6 md:p-7">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 bg-rose-500 rounded-full flex items-center justify-center shadow-sm">
                    <XCircle className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="font-bold text-lg text-rose-700 dark:text-rose-400">
                    {t("tours:exclusions")}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {tourData.exclusions.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <XCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ─── Bottom CTA ─── */}
          <section className="pt-8 border-t">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleCTA} variant="premium" size="lg" className="flex-1 text-base py-6">
                <Users className="w-5 h-5 mr-2" />
                {t("tours:requestQuote")}
              </Button>
              <Button variant="outline" size="lg" asChild className="px-8 py-6">
                <Link to="/#packages">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("common:buttons.viewAllPackages", "View All Packages")}
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </main>

      <FooterSection />
      <WhatsAppButton />

      <Suspense fallback={null}>
        <InquiryModal
          open={isInquiryModalOpen}
          onOpenChange={setIsInquiryModalOpen}
          defaultInquiryType={t("forms:inquiryTypes.tourPackage")}
          defaultQuestion={t("forms:tourInquiry", {
            title: tourData.title,
            duration: tourData.duration,
          })}
        />
      </Suspense>
    </div>
  );
}
