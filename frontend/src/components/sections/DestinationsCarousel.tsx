import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel } from "@/hooks/useCarousel";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Destination } from "@/types/tour";

import ella from "@/assets/ella.jpg";
import sigiriya from "@/assets/sigiriya.jpg";
import nuwaraEliya from "@/assets/nuwara_eliya.jpg";
import yala from "@/assets/yala.jpg";
import southernBeach from "@/assets/southern_beach.jpg";
import trincomalee from "@/assets/trincomalee.jpg";
import anuradhapura from "@/assets/anuradhapura.jpg";
import ramayana1 from "@/assets/ramayana_1.jpg";

export function DestinationsCarousel() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const sliderRef = useRef<HTMLDivElement>(null);

  const destinations: Destination[] = [
    { img: sigiriya, title: t('home:destinations.sigiriya.title'), desc: t('home:destinations.sigiriya.description') },
    { img: ella, title: t('home:destinations.kandy.title'), desc: t('home:destinations.kandy.description') },
    { img: nuwaraEliya, title: t('home:destinations.nuwaraEliya.title'), desc: t('home:destinations.nuwaraEliya.description') },
    { img: anuradhapura, title: t('home:destinations.ancientCities.title'), desc: t('home:destinations.ancientCities.description') },
    { img: ella, title: t('home:destinations.ella.title'), desc: t('home:destinations.ella.description') },
    { img: yala, title: t('home:destinations.wildlife.title'), desc: t('home:destinations.wildlife.description') },
    { img: ramayana1, title: t('home:destinations.ramayana.title'), desc: t('home:destinations.ramayana.description') },
    { img: southernBeach, title: t('home:destinations.southern.title'), desc: t('home:destinations.southern.description') },
    { img: trincomalee, title: t('home:destinations.trincomalee.title'), desc: t('home:destinations.trincomalee.description') },
  ];

  const { currentSlide, nextSlide, prevSlide, goToSlide } = useCarousel(destinations.length);

  return (
    <section id="destinations" className="container py-12 md:py-16">
      <header className="mb-6 md:mb-8 text-center">
        <h2 className="font-display text-3xl md:text-4xl">{t('home:destinations.title')}</h2>
        <p className="text-muted-foreground mt-2 max-w-3xl mx-auto">
          {t('home:destinations.description')}
        </p>
      </header>

      <div className="relative py-4 sm:py-8">
        <div className="overflow-visible" ref={sliderRef} style={{ perspective: isMobile ? '1000px' : '2000px', perspectiveOrigin: 'center center' }}>
          <div className="relative h-[450px] sm:h-[580px] md:h-[720px] lg:h-[840px] flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {(isMobile ? [-1, 0, 1] : [-2, -1, 0, 1, 2]).map((offset) => {
              const index = (currentSlide + offset + destinations.length) % destinations.length;
              const d = destinations[index];
              const isCenter = offset === 0;
              const isNearCenter = Math.abs(offset) === 1;

              const rotationAngle = offset * (isMobile ? 35 : 28);
              const radius = isMobile ? 280 : 650;
              const translateX = Math.sin((rotationAngle * Math.PI) / 180) * radius;
              const translateZ = Math.cos((rotationAngle * Math.PI) / 180) * radius - radius;

              const getMarginLeft = () => {
                if (isMobile) {
                  return isCenter ? '-140px' : (offset < 0 ? '-120px' : '-100px');
                }
                return isCenter ? '-260px' : isNearCenter ? (offset < 0 ? '-230px' : '-210px') : (offset < 0 ? '-200px' : '-180px');
              };

              const getMarginTop = () => isMobile ? '-200px' : '-320px';

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

        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-4 md:-translate-x-6 bg-background/90 hover:bg-background border rounded-full p-2 sm:p-3 md:p-4 shadow-lg transition-all hover:scale-110 z-30"
          aria-label="Previous destination"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-4 md:translate-x-6 bg-background/90 hover:bg-background border rounded-full p-2 sm:p-3 md:p-4 shadow-lg transition-all hover:scale-110 z-30"
          aria-label="Next destination"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>

        <div className="flex justify-center items-center mt-4 sm:mt-6 md:mt-8 px-4">
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
  );
}
