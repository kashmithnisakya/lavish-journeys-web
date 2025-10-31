import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { TourPackage } from "@/components/TourPackage";
import { TourPackageModal } from "@/components/TourPackageModal";
import SeoHead from "@/components/SeoHead";
import heroImage from "@/assets/hero-lavish.jpg";
import ella from "@/assets/destination-ella.jpg";
import galle from "@/assets/destination-galle.jpg";
import sigiriya from "@/assets/destination-sigiriya.jpg";
import nuwaraEliya from "@/assets/nuwara_eliya.jpg";
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
  const [selectedTour, setSelectedTour] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tourPackagesData, setTourPackagesData] = useState<TourPackagesDataType>({});
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const sliderRef = useRef<HTMLDivElement>(null);

  const destinations = [
    {img:sigiriya, title:'Sigiriya & Dambulla', desc:'Iconic Lion Rock fortress with ancient frescoes, 1st century BC cave temples with 150+ Buddha statues.'},
    {img:ella, title:'Kandy - Cultural Capital', desc:'Sacred Temple of the Tooth, Royal Botanical Gardens, colonial architecture, traditional Kandyan dance.'},
    {img:nuwaraEliya, title:'Nuwara Eliya - Little England', desc:'Cool climate hill station, tea plantations and factories, Horton Plains World\'s End, Victorian architecture.'},
    {img:heroImage, title:'Ancient Cities', desc:'Anuradhapura and Polonnaruwa UNESCO sites, 2,250-year-old sacred Bo tree, ancient stupas and palaces.'},
    {img:ella, title:'Ella & Hill Country', desc:'Scenic train journeys through tea estates, Little Adam\'s Peak trek, Nine Arch Bridge, mountain views.'},
    {img:galle, title:'Wildlife & National Parks', desc:'Yala leopard safari, Wilpattu elephants, Udawalawe wildlife, Sinharaja rainforest, whale watching.'},
    {img:sigiriya, title:'Ramayana Trail', desc:'Sacred Hindu temples: Munneswaram, Koneshwaram, Seetha Amman, Bhakta Hanuman with spiritual significance.'},
    {img:galle, title:'Southern Coast', desc:'Historic Galle Fort, Unawatuna and Mirissa beaches, turtle hatcheries, Madu River mangroves, water sports.'},
    {img:heroImage, title:'Trincomalee & East Coast', desc:'Ancient Koneshwaram Temple, pristine beaches, Pigeon Island, snorkeling, diving, less-crowded coastal paradise.'}
  ];

  useEffect(() => {
    const loadTourPackages = async () => {
      try {
        const response = await fetch('/tour-packages.json');
        const data = await response.json();
        setTourPackagesData(data);
      } catch (error) {
        console.error('Failed to load tour packages:', error);
        toast.error('Failed to load tour packages');
      } finally {
        setLoading(false);
      }
    };
    loadTourPackages();
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
    toast("Thanks! A travel specialist will reach out shortly.");
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
    { id: 'all', name: 'All Tours' },
    { id: 'cultural', name: 'Cultural & Heritage' },
    { id: 'spiritual', name: 'Spiritual & Ramayana' },
    { id: 'wildlife', name: 'Wildlife & Nature' }
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
           key === 'southern-highlight' ? galle : heroImage
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
          <p className="mt-4 text-muted-foreground">Loading tour packages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SeoHead
        title="Lavish Travels & Tours — Luxury Travel Sri Lanka"
        description="Bespoke journeys across tea country, heritage forts, and golden coasts in Sri Lanka."
      />

      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <nav className="container flex h-16 items-center justify-between">
          <a href="#" className="flex items-baseline gap-2">
            <span className="text-xl font-semibold tracking-tight font-display">Lavish</span>
            <span className="text-sm text-muted-foreground">Travels & Tours</span>
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#destinations" className="story-link">Destinations</a>
            <a href="#packages" className="story-link">Packages</a>
            <a href="#services" className="story-link">Services</a>
            <a href="#about" className="story-link">About</a>
            <a href="#contact" className="story-link">Contact</a>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden md:block">
              <Button variant="hero" onClick={handleCTA}>Plan Your Trip</Button>
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
              className="h-[60vh] md:h-[72vh] w-full object-cover brightness-105 contrast-105 saturate-110 dark:brightness-90 dark:contrast-150 dark:saturate-125 dark:hue-rotate-15"
            />
            <div className="absolute inset-0 bg-gradient-hero opacity-50 dark:opacity-65" />
            <div className="absolute inset-0 bg-black/5 dark:bg-black/25" />
          </div>
          <div className="container relative z-10 flex h-[60vh] md:h-[72vh] items-center">
            <div className="max-w-2xl animate-enter">
              <h1 className="font-display text-4xl md:text-6xl leading-tight">Elegance Across Sri Lanka</h1>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                Bespoke journeys across tea country, heritage forts, and golden coasts — crafted by experts.
              </p>
              <div className="mt-6 flex gap-3">
                <Button variant="hero" size="lg" onClick={handleCTA} className="hover-scale">Start Planning</Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#destinations">Explore Destinations</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Slider */}
        <section id="destinations" className="container py-16 md:py-24">
          <header className="mb-8 md:mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl">Discover Sri Lanka</h2>
            <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
              Explore the pearl of the Indian Ocean - from ancient kingdoms and sacred temples to misty mountains, wildlife reserves, and pristine beaches.
            </p>
          </header>

          <div className="relative py-12">
            {/* Slider Container */}
            <div className="overflow-visible" ref={sliderRef} style={{ perspective: '2000px', perspectiveOrigin: 'center center' }}>
              <div className="relative h-[650px] md:h-[700px] lg:h-[750px] flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {/* Show previous, current, and next slides in circular arrangement */}
                {[-1, 0, 1].map((offset) => {
                  const index = (currentSlide + offset + destinations.length) % destinations.length;
                  const d = destinations[index];
                  const isCenter = offset === 0;

                  // Circular carousel positioning
                  const rotationAngle = offset * 40; // Degrees of rotation
                  const radius = 550; // Radius of the circle - increased for wider feel
                  const translateX = Math.sin((rotationAngle * Math.PI) / 180) * radius;
                  const translateZ = Math.cos((rotationAngle * Math.PI) / 180) * radius - radius;

                  return (
                    <article
                      key={`${index}-${offset}`}
                      className={`absolute transition-all duration-1000 ease-out ${
                        isCenter
                          ? 'w-80 md:w-96 lg:w-[450px] opacity-100 z-20'
                          : 'w-64 md:w-80 lg:w-96 opacity-60 hover:opacity-80'
                      }`}
                      style={{
                        transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${-rotationAngle}deg) scale(${isCenter ? '1' : '0.85'})`,
                        transformStyle: 'preserve-3d',
                        transitionProperty: 'all',
                        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                        left: '50%',
                        top: '50%',
                        marginLeft: isCenter ? '-225px' : offset < 0 ? '-200px' : '-180px',
                        marginTop: '-280px',
                      }}
                    >
                      <div className={`bg-card overflow-hidden rounded-xl h-full transition-all duration-1000 ${
                        isCenter
                          ? 'shadow-2xl ring-2 ring-primary/40 shadow-primary/10'
                          : 'shadow-lg'
                      }`}
                      style={{ backfaceVisibility: 'hidden' }}
                      >
                        <img
                          src={d.img}
                          alt={`${d.title} luxury travel`}
                          loading="lazy"
                          className="w-full object-cover aspect-[3/4] transition-transform duration-1000"
                        />
                        <div className={`p-4 transition-all duration-700 ${isCenter ? 'md:p-6' : 'md:p-4'}`}>
                          <h3 className={`font-display transition-all duration-700 ${
                            isCenter ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
                          }`}>{d.title}</h3>
                          <div className={`overflow-hidden transition-all duration-700 ${
                            isCenter ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                          }`}>
                            <p className="text-sm md:text-base text-muted-foreground">{d.desc}</p>
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
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-background/90 hover:bg-background border rounded-full p-3 md:p-4 shadow-lg transition-all hover:scale-110 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-background/90 hover:bg-background border rounded-full p-3 md:p-4 shadow-lg transition-all hover:scale-110 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {destinations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Tour Packages */}
        <section id="packages" className="container py-16 md:py-24">
          <header className="mb-8 md:mb-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl">Curated Tour Packages</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              Expertly crafted journeys that showcase Sri Lanka's finest destinations, cultural heritage, and natural wonders.
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
              <p className="text-muted-foreground text-lg">No packages found in this category.</p>
            </div>
          )}
        </section>

        {/* Services */}
        <section id="services" className="bg-secondary/40 py-16 md:py-24">
          <div className="container">
            <header className="mb-8 md:mb-12">
              <h2 className="font-display text-3xl md:text-4xl">White‑Glove Services</h2>
              <p className="text-muted-foreground mt-2">From inspiration to return, we handle every detail.</p>
            </header>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {title:'Tailor‑Made Itineraries', desc:'Designed around your pace and passions.'},
                {title:'Handpicked Stays', desc:'Luxury hotels, villas, and private retreats.'},
                {title:'Concierge Support', desc:'VIP transfers, experiences, and on‑trip care.'},
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
        <section id="about" className="container py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl">Your Journey, Perfected</h2>
              <p className="text-muted-foreground mt-4">
                For over a decade, Lavish Travels & Tours has curated refined escapes across Sri Lanka. Our specialists combine insider access with meticulous planning to deliver effortless, elegant travel.
              </p>
              <div className="mt-6">
                <Button variant="premium" onClick={handleCTA}>Speak to a Specialist</Button>
              </div>
            </div>
            <div className="rounded-xl bg-gradient-hero p-1 shadow-glow">
              <div className="rounded-lg bg-card p-6">
                <ul className="grid gap-3 text-sm">
                  <li>• Dedicated travel designer</li>
                  <li>• 24/7 concierge support</li>
                  <li>• VIP airport transfers</li>
                  <li>• Exclusive experiences</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-secondary/40 py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl">Ready for your Sri Lanka escape?</h2>
              <p className="text-muted-foreground mt-2">Tell us your Sri Lanka dream — we'll handle the rest.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
              <div className="bg-card rounded-lg p-6 shadow-elegant">
                <h3 className="font-display text-xl mb-4">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">520/41B, Randunuwatta, North Road<br/>Weerawila, Sri Lanka</p>
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+94 70 172 8922 | +94 77 041 8967</p>
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:support@lavishtravelsandtours.online" className="text-primary hover:underline">support@lavishtravelsandtours.online</a>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-elegant">
                <h3 className="font-display text-xl mb-4">Connect With Us</h3>
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
                    <span>Follow us on Facebook</span>
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
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button variant="hero" size="lg" onClick={handleCTA}>Plan Your Trip</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-8">
          <div className="grid gap-6 md:grid-cols-3 text-sm">
            <div>
              <h4 className="font-semibold mb-3">Lavish Travels & Tours</h4>
              <p className="text-muted-foreground">Bespoke luxury journeys across Sri Lanka</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Contact Info</h4>
              <div className="text-muted-foreground space-y-1">
                <p>520/41B, Randunuwatta, North Road</p>
                <p>Weerawila, Sri Lanka</p>
                <p>+94 70 172 8922 | +94 77 041 8967</p>
                <a href="mailto:support@lavishtravelsandtours.online" className="hover:text-primary">support@lavishtravelsandtours.online</a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Follow Us</h4>
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
            <p>© {new Date().getFullYear()} Lavish Travels & Tours. All rights reserved.</p>
            <nav className="flex gap-6">
              <a href="#packages" className="hover:underline">Packages</a>
              <a href="#about" className="hover:underline">About</a>
              <a href="#services" className="hover:underline">Services</a>
              <a href="#contact" className="hover:underline">Contact</a>
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
            setIsModalOpen(false);
            handleCTA();
          }}
        />
      )}
    </div>
  );
};

export default Index;
