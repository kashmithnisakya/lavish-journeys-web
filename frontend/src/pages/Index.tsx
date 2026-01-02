import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TourPackage } from "@/components/TourPackage";
import { TourPackageModal } from "@/components/TourPackageModal";
import { InquiryModal } from "@/components/InquiryModal";
import SeoHead from "@/components/SeoHead";
import heroImage from "@/assets/cover.jpg";
import ella from "@/assets/ella.jpg";
import sigiriya from "@/assets/sigiriya.jpg";
import nuwaraEliya from "@/assets/nuwara_eliya.jpg";
import yala from "@/assets/yala.jpg";
import southernBeach from "@/assets/southern_beach.jpg";
import trincomalee from "@/assets/trincomalee.jpg";
import anuradhapura from "@/assets/anuradhapura.jpg";
import ramayana1 from "@/assets/ramayana_1.jpg";
import ramayana2 from "@/assets/ramayan_2.jpg";
import ramayana3 from "@/assets/ramayana_3.jpg";
import ramayana4 from "@/assets/ramayana_4.jpg";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TourPackageData {
  title: string;
  duration: string;
  description: string;
  highlights: string[];
  price: {
    from: number;
    category: string;
  };
  image?: string;
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
    accommodation?: string;
  }>;
  pricing: Array<{
    category: string;
    pax3: number;
    pax8: number;
    pax16: number;
    pax32: number;
  }>;
  inclusions: string[];
  exclusions: string[];
  hotels: Array<{
    destination: string;
    hotel: string;
    supplement?: string;
  }>;
  entranceFees: Array<{
    attraction: string;
    fee: number;
  }>;
}

interface TourPackagesDataType {
  [key: string]: TourPackageData;
}

const Index = () => {
  const { t, i18n } = useTranslation();
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryTourInfo, setInquiryTourInfo] = useState<{ title: string; duration: string } | null>(null);
  const [tourPackagesData, setTourPackagesData] = useState<TourPackagesDataType>({});
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const destinations = [
    {img:sigiriya, title:t('home:destinations.sigiriya.title'), desc:t('home:destinations.sigiriya.description')},
    {img:ella, title:t('home:destinations.kandy.title'), desc:t('home:destinations.kandy.description')},
    {img:nuwaraEliya, title:t('home:destinations.nuwaraEliya.title'), desc:t('home:destinations.nuwaraEliya.description')},
    {img:anuradhapura, title:t('home:destinations.ancientCities.title'), desc:t('home:destinations.ancientCities.description')},
    {img:ella, title:t('home:destinations.ella.title'), desc:t('home:destinations.ella.description')},
    {img:yala, title:t('home:destinations.wildlife.title'), desc:t('home:destinations.wildlife.description')},
    {img:ramayana1, title:t('home:destinations.ramayana.title'), desc:t('home:destinations.ramayana.description')},
    {img:southernBeach, title:t('home:destinations.southern.title'), desc:t('home:destinations.southern.description')},
    {img:trincomalee, title:t('home:destinations.trincomalee.title'), desc:t('home:destinations.trincomalee.description')}
  ];

  useEffect(() => {
    const loadTourPackages = async () => {
      try {
        const tourFile = i18n.language === 'en'
          ? '/tour-packages.json'
          : `/tour-packages-${i18n.language}.json`;
        const response = await fetch(tourFile);
        const data = await response.json();
        setTourPackagesData(data);
      } catch (error) {
        console.error('Failed to load tour packages:', error);
        toast.error(t('common:errors.loadFailed'));
      } finally {
        setLoading(false);
      }
    };
    loadTourPackages();
  }, [i18n.language, t]);

  // Handle responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlide = destinations.length - 1;
      return prev >= maxSlide ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlide = destinations.length - 1;
      return prev <= 0 ? maxSlide : prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        const maxSlide = destinations.length - 1;
        return prev >= maxSlide ? 0 : prev + 1;
      });
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [destinations.length]);


  const handleCTA = () => {
    setIsInquiryModalOpen(true);
  };

  const handleViewDetails = (tourKey: string) => {
    setSelectedTour(tourKey);
    setIsModalOpen(true);
  };

  // Tour categories mapping
  const tourCategories: { [key: string]: string } = {
    'classical-journey': 'cultural',
    'classical-explorer': 'cultural',
    'classical-gateway': 'cultural',
    'wonderful-journey': 'cultural',
    'ramayana-trails': 'spiritual',
    'ramayana-luxury': 'spiritual',
    'ramayana-normal': 'spiritual',
    'ramayana-premium': 'spiritual',
    'southern-highlight': 'wildlife'
  };

  const categories = [
    { id: 'all', name: t('common:categories.all') },
    { id: 'cultural', name: t('common:categories.cultural') },
    { id: 'spiritual', name: t('common:categories.spiritual') },
    { id: 'wildlife', name: t('common:categories.wildlife') }
  ];

  // Convert JSON data to array format for rendering
  const tourPackages = Object.entries(tourPackagesData).map(([key, data]: [string, TourPackageData]) => ({
    key,
    title: data.title,
    duration: data.duration,
    description: data.description,
    highlights: data.highlights,
    price: data.price,
    category: tourCategories[key] || 'cultural',
    image: key === 'classical-journey' ? sigiriya :
           key === 'classical-explorer' ? ella :
           key === 'classical-gateway' ? anuradhapura :
           key === 'wonderful-journey' ? nuwaraEliya :
           key === 'ramayana-trails' ? ramayana1 :
           key === 'ramayana-luxury' ? ramayana2 :
           key === 'ramayana-normal' ? ramayana3 :
           key === 'ramayana-premium' ? ramayana4 :
           key === 'southern-highlight' ? southernBeach :
           key.includes('wildlife') ? yala :
           key.includes('east') ? trincomalee : heroImage
  }));

  // Filter packages by category
  const filteredPackages = selectedCategory === 'all'
    ? tourPackages
    : tourPackages.filter(pkg => pkg.category === selectedCategory);

  // Get package count per category
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return tourPackages.length;
    return tourPackages.filter(pkg => pkg.category === categoryId).length;
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

      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <nav className="container flex h-16 items-center justify-between">
          <a href="#" className="flex items-baseline gap-2">
            <span className="text-xl font-semibold tracking-tight font-display">{t('common:company.name')}</span>
            <span className="text-sm text-muted-foreground">{t('common:company.subtitle')}</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#destinations" className="story-link">{t('common:nav.destinations')}</a>
            <a href="#packages" className="story-link">{t('common:nav.packages')}</a>
            <a href="#services" className="story-link">{t('common:nav.services')}</a>
            <a href="#about" className="story-link">{t('common:nav.about')}</a>
            <a href="#contact" className="story-link">{t('common:nav.contact')}</a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            <div className="hidden md:block">
              <Button variant="hero" onClick={handleCTA}>{t('common:buttons.planTrip')}</Button>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImage}
              alt="Lavish Sri Lanka luxury travel hero — tea country at sunrise"
              className="h-[500px] sm:h-[60vh] md:h-[72vh] w-full object-cover brightness-105 contrast-105 saturate-110 dark:brightness-90 dark:contrast-150 dark:saturate-125 dark:hue-rotate-15"
            />
            <div className="absolute inset-0 bg-gradient-hero opacity-50 dark:opacity-65" />
            <div className="absolute inset-0 bg-black/5 dark:bg-black/25" />
          </div>
          <div className="container relative z-10 flex h-[500px] sm:h-[60vh] md:h-[72vh] items-center px-4 sm:px-6">
            <div className="max-w-2xl animate-enter w-full">
              <h1 className="font-display text-3xl sm:text-4xl md:text-6xl leading-tight">{t('home:hero.title')}</h1>
              <p className="mt-3 sm:mt-4 text-gray-900 dark:text-muted-foreground text-sm sm:text-base md:text-lg">
                {t('home:hero.subtitle')}
              </p>
              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3">
                <Button variant="hero" size="lg" onClick={handleCTA} className="hover-scale w-full sm:w-auto">{t('common:buttons.startPlanning')}</Button>
                <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                  <a href="#destinations">{t('common:buttons.exploreDestinations')}</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Slider */}
        <section id="destinations" className="container py-12 md:py-16">
          <header className="mb-6 md:mb-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl">{t('home:destinations.title')}</h2>
            <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
              {t('home:destinations.description')}
            </p>
          </header>

          <div className="relative py-4 sm:py-8">
            {/* Slider Container */}
            <div className="overflow-visible" ref={sliderRef} style={{ perspective: isMobile ? '1000px' : '2000px', perspectiveOrigin: 'center center' }}>
              <div className="relative h-[450px] sm:h-[580px] md:h-[720px] lg:h-[840px] flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {/* Show 5 slides on desktop, 3 on mobile: 2 left/1 left, center, 2 right/1 right */}
                {(isMobile ? [-1, 0, 1] : [-2, -1, 0, 1, 2]).map((offset) => {
                  const index = (currentSlide + offset + destinations.length) % destinations.length;
                  const d = destinations[index];
                  const isCenter = offset === 0;
                  const isNearCenter = Math.abs(offset) === 1;

                  // Circular carousel positioning - responsive
                  const rotationAngle = offset * (isMobile ? 35 : 28); // Degrees of rotation
                  const radius = isMobile ? 280 : 650; // Radius of the circle - responsive
                  const translateX = Math.sin((rotationAngle * Math.PI) / 180) * radius;
                  const translateZ = Math.cos((rotationAngle * Math.PI) / 180) * radius - radius;

                  // Responsive margin calculations
                  const getMarginLeft = () => {
                    if (isMobile) {
                      return isCenter ? '-140px' : (offset < 0 ? '-120px' : '-100px');
                    }
                    return isCenter ? '-260px' : isNearCenter ? (offset < 0 ? '-230px' : '-210px') : (offset < 0 ? '-200px' : '-180px');
                  };

                  const getMarginTop = () => {
                    if (isMobile) {
                      return '-200px';
                    }
                    return '-320px';
                  };

                  return (
                    <article
                      key={`${index}-${offset}`}
                      className={`absolute transition-all duration-1000 ease-out ${
                        isCenter
                          ? 'w-[280px] sm:w-80 md:w-96 lg:w-[520px] opacity-100 z-20'
                          : isNearCenter
                          ? 'w-[240px] sm:w-72 md:w-80 lg:w-[420px] opacity-70 z-10 hover:opacity-85'
                          : 'w-[200px] md:w-64 lg:w-96 opacity-40 z-0 hover:opacity-60'
                      }`}
                      style={{
                        transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${-rotationAngle}deg) scale(${isCenter ? '1' : isNearCenter ? '0.85' : '0.7'})`,
                        transformStyle: 'preserve-3d',
                        transitionProperty: 'all',
                        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                        left: '50%',
                        top: '50%',
                        marginLeft: getMarginLeft(),
                        marginTop: getMarginTop(),
                      }}
                    >
                      <div className={`bg-card overflow-hidden rounded-xl transition-all duration-1000 flex flex-col ${
                        isCenter
                          ? 'shadow-2xl ring-2 ring-primary/40 shadow-primary/10'
                          : isNearCenter
                          ? 'shadow-xl'
                          : 'shadow-md'
                      }`}
                      style={{ backfaceVisibility: 'hidden', height: isMobile ? '400px' : '640px' }}
                      >
                        <img
                          src={d.img}
                          alt={`${d.title} luxury travel`}
                          loading="lazy"
                          className="w-full object-cover flex-shrink-0"
                          style={{ height: isMobile ? '280px' : '480px' }}
                        />
                        <div className={`p-3 sm:p-4 flex-1 flex flex-col transition-all duration-700 ${isCenter ? 'md:p-6' : 'md:p-4'}`}>
                          <h3 className={`font-display transition-all duration-700 ${
                            isCenter ? 'text-base sm:text-xl md:text-2xl' : isNearCenter ? 'text-sm sm:text-base md:text-lg' : 'text-xs md:text-sm'
                          }`}>{d.title}</h3>
                          <div className={`overflow-hidden transition-all duration-700 ${
                            isCenter ? 'max-h-40 opacity-100 mt-1 sm:mt-2' : 'max-h-0 opacity-0 mt-0'
                          }`}>
                            <p className="text-xs sm:text-sm md:text-base text-muted-foreground">{d.desc}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-4 md:-translate-x-6 bg-background/90 hover:bg-background border rounded-full p-2 sm:p-3 md:p-4 shadow-lg transition-all hover:scale-110 z-30"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-4 md:translate-x-6 bg-background/90 hover:bg-background border rounded-full p-2 sm:p-3 md:p-4 shadow-lg transition-all hover:scale-110 z-30"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            </button>

            {/* Position Indicator */}
            <div className="flex justify-center items-center mt-4 sm:mt-6 md:mt-8 px-4">
              {/* Dots Indicator */}
              <div className="flex justify-center items-center gap-1.5 sm:gap-2">
                {destinations.map((d, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-primary w-8 sm:w-10 h-2.5 sm:h-3 shadow-lg shadow-primary/30'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50 w-2.5 sm:w-3 h-2.5 sm:h-3 hover:scale-125'
                    }`}
                    aria-label={`Go to ${d.title}`}
                    title={d.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tour Packages */}
        <section id="packages" className="container py-12 md:py-16">
          <header className="mb-6 md:mb-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl">{t('home:packages.title')}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              {t('home:packages.description')}
            </p>
          </header>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
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
          </div>

          {/* Tour Package Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {filteredPackages.map((pkg, index) => (
              <TourPackage
                key={index}
                title={pkg.title}
                duration={pkg.duration}
                description={pkg.description}
                highlights={pkg.highlights}
                price={pkg.price}
                image={pkg.image}
                onInquire={handleCTA}
                onViewDetails={() => handleViewDetails(pkg.key)}
              />
            ))}
          </div>

          {/* No results message */}
          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">{t('common:labels.noPackages')}</p>
            </div>
          )}
        </section>

        {/* Services */}
        <section id="services" className="bg-secondary/40 py-12 md:py-16">
          <div className="container">
            <header className="mb-6 md:mb-8">
              <h2 className="font-display text-3xl md:text-4xl">{t('home:services.title')}</h2>
              <p className="text-muted-foreground mt-2">{t('home:services.description')}</p>
            </header>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {title:t('home:services.tailored.title'), desc:t('home:services.tailored.description')},
                {title:t('home:services.stays.title'), desc:t('home:services.stays.description')},
                {title:t('home:services.concierge.title'), desc:t('home:services.concierge.description')},
              ].map((s) => (
                <article key={s.title} className="rounded-lg border bg-card p-6 shadow-elegant">
                  <h3 className="font-display text-xl">{s.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="container py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl">{t('home:about.title')}</h2>
              <p className="text-muted-foreground mt-4">
                {t('home:about.description1')}
              </p>
              <p className="text-muted-foreground mt-4">
                {t('home:about.description2')}
              </p>
              <div className="mt-6">
                <Button variant="premium" onClick={handleCTA}>{t('common:buttons.speakSpecialist')}</Button>
              </div>
            </div>
            <div className="rounded-xl bg-gradient-hero p-1 shadow-glow">
              <div className="rounded-lg bg-card p-6">
                <ul className="grid gap-3 text-sm">
                  <li>• {t('home:about.benefits.designer')}</li>
                  <li>• {t('home:about.benefits.support')}</li>
                  <li>• {t('home:about.benefits.transfers')}</li>
                  <li>• {t('home:about.benefits.experiences')}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-secondary/40 py-12 md:py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl">{t('home:contact.title')}</h2>
              <p className="text-muted-foreground mt-2">{t('home:contact.description')}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="bg-card rounded-lg p-6 shadow-elegant">
                <h3 className="font-display text-xl mb-4">{t('home:contact.information')}</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">{t('home:contact.address.label')}</p>
                    <p className="text-muted-foreground">{t('home:contact.address.line1')}<br/>{t('home:contact.address.line2')}</p>
                  </div>
                  <div>
                    <p className="font-medium">{t('home:contact.phone.label')}</p>
                    <p className="text-muted-foreground">{t('home:contact.phone.numbers')}</p>
                  </div>
                  <div>
                    <p className="font-medium">{t('home:contact.email.label')}</p>
                    <a href={`mailto:${t('home:contact.email.address')}`} className="text-primary hover:underline">{t('home:contact.email.address')}</a>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-elegant">
                <h3 className="font-display text-xl mb-4">{t('home:contact.connect')}</h3>
                <div className="space-y-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61579323908693&locale=eu_ES"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      f
                    </div>
                    <span>{t('home:contact.facebook')}</span>
                  </a>

                  <a
                    href="https://wa.me/94701728922"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      W
                    </div>
                    <span>{t('home:contact.whatsapp')}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button variant="hero" size="lg" onClick={handleCTA}>{t('common:buttons.planTrip')}</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-8">
          <div className="grid gap-6 md:grid-cols-3 text-sm">
            <div>
              <h4 className="font-semibold mb-3">{t('common:company.fullName')}</h4>
              <p className="text-muted-foreground">{t('common:company.tagline')}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">{t('home:footer.contactInfo')}</h4>
              <div className="text-muted-foreground space-y-1">
                <p>{t('home:contact.address.line1')}</p>
                <p>{t('home:contact.address.line2')}</p>
                <p>{t('home:contact.phone.numbers')}</p>
                <a href={`mailto:${t('home:contact.email.address')}`} className="hover:text-primary">{t('home:contact.email.address')}</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">{t('home:footer.followUs')}</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61579323908693&locale=eu_ES"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  Facebook
                </a>
                <a
                  href="https://wa.me/94701728922"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>{t('common:copyright', { year: new Date().getFullYear() })}</p>
            <nav className="flex gap-6">
              <a href="#packages" className="hover:underline">{t('common:nav.packages')}</a>
              <a href="#about" className="hover:underline">{t('common:nav.about')}</a>
              <a href="#services" className="hover:underline">{t('common:nav.services')}</a>
              <a href="#contact" className="hover:underline">{t('common:nav.contact')}</a>
            </nav>
          </div>
        </div>
      </footer>

      {/* Tour Package Modal */}
      {selectedTour && (
        <TourPackageModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          tourData={tourPackagesData[selectedTour as keyof typeof tourPackagesData]}
          onInquire={() => {
            const tourData = tourPackagesData[selectedTour as keyof typeof tourPackagesData];
            setInquiryTourInfo({
              title: tourData.title,
              duration: tourData.duration
            });
            setIsModalOpen(false);
            handleCTA();
          }}
        />
      )}

      {/* Inquiry Modal */}
      <InquiryModal
        open={isInquiryModalOpen}
        onOpenChange={(open) => {
          setIsInquiryModalOpen(open);
          if (!open) {
            setInquiryTourInfo(null);
          }
        }}
        defaultInquiryType={inquiryTourInfo ? t('forms:inquiryTypes.tourPackage') : t('forms:inquiryTypes.general')}
        defaultQuestion={inquiryTourInfo ? t('forms:tourInquiry', { title: inquiryTourInfo.title, duration: inquiryTourInfo.duration }) : ""}
      />
    </div>
  );
};

export default Index;
