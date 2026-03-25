import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import type { TourPackagesDataType, ProcessedTourPackage } from "@/types/tour";

const tourBadges: { [key: string]: string } = {
  'classical-journey': 'popular',
  'ramayana-luxury': 'bestValue',
  'southern-highlight': 'new',
};

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

const tourCategories: { [key: string]: string } = {
  'classical-journey': 'cultural',
  'classical-explorer': 'cultural',
  'classical-gateway': 'cultural',
  'wonderful-journey': 'cultural',
  'ramayana-trails': 'spiritual',
  'ramayana-luxury': 'spiritual',
  'ramayana-normal': 'spiritual',
  'ramayana-premium': 'spiritual',
  'southern-highlight': 'wildlife',
};

const tourImageMap: { [key: string]: string } = {
  'classical-journey': sigiriya,
  'classical-explorer': ella,
  'classical-gateway': anuradhapura,
  'wonderful-journey': nuwaraEliya,
  'ramayana-trails': ramayana1,
  'ramayana-luxury': ramayana2,
  'ramayana-normal': ramayana3,
  'ramayana-premium': ramayana4,
  'southern-highlight': southernBeach,
};

function getTourImage(key: string): string {
  if (tourImageMap[key]) return tourImageMap[key];
  if (key.includes('wildlife')) return yala;
  if (key.includes('east')) return trincomalee;
  return heroImage;
}

const MAX_RETRIES = 2;

async function fetchWithRetry(url: string, retries = MAX_RETRIES): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      if (attempt === retries) return response;
    } catch (error) {
      if (attempt === retries) throw error;
    }
    await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
  }
  throw new Error('Fetch failed after retries');
}

export function useTourPackages() {
  const { t, i18n } = useTranslation();
  const [tourPackagesData, setTourPackagesData] = useState<TourPackagesDataType>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTourPackages = async () => {
      try {
        const tourFile = i18n.language === 'en'
          ? '/tour-packages.json'
          : `/tour-packages-${i18n.language}.json`;

        const response = await fetchWithRetry(tourFile);

        if (!response.ok) {
          // Fallback to English if language-specific file fails
          if (i18n.language !== 'en') {
            const fallbackResponse = await fetchWithRetry('/tour-packages.json');
            const data = await fallbackResponse.json();
            setTourPackagesData(data);
            return;
          }
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setTourPackagesData(data);
      } catch (error) {
        console.error('Failed to load tour packages:', error);
        // Last resort: try English fallback
        if (i18n.language !== 'en') {
          try {
            const fallback = await fetch('/tour-packages.json');
            const data = await fallback.json();
            setTourPackagesData(data);
            return;
          } catch {
            // ignore fallback failure
          }
        }
        toast.error(t('common:errors.loadFailed'));
      } finally {
        setLoading(false);
      }
    };
    loadTourPackages();
  }, [i18n.language, t]);

  const tourPackages: ProcessedTourPackage[] = useMemo(
    () =>
      Object.entries(tourPackagesData).map(([key, data]) => ({
        key,
        title: data.title,
        duration: data.duration,
        description: data.description,
        highlights: data.highlights,
        price: data.price,
        category: tourCategories[key] || 'cultural',
        image: getTourImage(key),
        badge: tourBadges[key],
      })),
    [tourPackagesData]
  );

  return { tourPackagesData, tourPackages, loading };
}
