import { Button } from "@/components/ui/button";
import SeoHead from "@/components/SeoHead";
import heroImage from "@/assets/hero-lavish.jpg";
import ella from "@/assets/destination-ella.jpg";
import galle from "@/assets/destination-galle.jpg";
import sigiriya from "@/assets/destination-sigiriya.jpg";
import { toast } from "sonner";

const Index = () => {
  const handleCTA = () => {
    toast("Thanks! A travel specialist will reach out shortly.");
  };

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
            <a href="#services" className="story-link">Services</a>
            <a href="#about" className="story-link">About</a>
            <a href="#contact" className="story-link">Contact</a>
          </div>
          <div className="hidden md:block">
            <Button variant="hero" onClick={handleCTA}>Plan Your Trip</Button>
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
              className="h-[60vh] md:h-[72vh] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-hero opacity-60" />
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

        {/* Destinations */}
        <section id="destinations" className="container py-16 md:py-24">
          <header className="mb-8 md:mb-12">
            <h2 className="font-display text-3xl md:text-4xl">Sri Lanka Highlights</h2>
            <p className="text-muted-foreground mt-2">Handpicked regions for unforgettable island adventures.</p>
          </header>
          <div className="grid gap-6 md:grid-cols-3">
            {[{img:ella, title:'Ella & Tea Country', desc:'Mist‑kissed hills, tea estates, scenic trains.'}, {img:galle, title:'Galle Fort & Southern Coast', desc:'Colonial charm, boutique stays, golden beaches.'}, {img:sigiriya, title:'Cultural Triangle', desc:'Sigiriya, Dambulla & ancient capitals.'}].map((d) => (
              <article key={d.title} className="rounded-lg border bg-card shadow-elegant overflow-hidden hover-scale">
                <img src={d.img} alt={`${d.title} luxury travel`} loading="lazy" className="h-48 w-full object-cover" />
                <div className="p-5">
                  <h3 className="font-display text-xl">{d.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{d.desc}</p>
                </div>
              </article>
            ))}
          </div>
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
          <div className="container text-center">
            <h2 className="font-display text-3xl md:text-4xl">Ready for your Sri Lanka escape?</h2>
            <p className="text-muted-foreground mt-2">Tell us your Sri Lanka dream — we’ll handle the rest.</p>
            <div className="mt-6">
              <Button variant="hero" size="lg" onClick={handleCTA}>Plan Your Trip</Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Lavish Travels & Tours. All rights reserved.</p>
          <nav className="flex gap-6">
            <a href="#about" className="hover:underline">About</a>
            <a href="#services" className="hover:underline">Services</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Index;
