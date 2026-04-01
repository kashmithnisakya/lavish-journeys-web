import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface SeoHeadProps {
  title: string;
  description: string;
}

const SUPPORTED_LANGS = ["en", "ru", "hi"];
const SITE_URL = "https://lavishtravelsandtours.online";

const SeoHead: React.FC<SeoHeadProps> = ({ title, description }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.title = title;
    document.documentElement.lang = i18n.language;

    const ensureMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    ensureMeta("name", "description", description);

    // Open Graph updates
    ensureMeta("property", "og:title", title);
    ensureMeta("property", "og:description", description);
    ensureMeta("property", "og:url", window.location.href);
    ensureMeta("property", "og:image", `${SITE_URL}/icons/logo.png`);
    ensureMeta("property", "og:image:width", "1024");
    ensureMeta("property", "og:image:height", "1024");
    ensureMeta("name", "twitter:image", `${SITE_URL}/icons/logo.png`);

    // Canonical tag
    const url = window.location.origin + window.location.pathname;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Hreflang tags
    SUPPORTED_LANGS.forEach((lang) => {
      const hrefAttr = `link[rel="alternate"][hreflang="${lang}"]`;
      let hreflang = document.querySelector(hrefAttr) as HTMLLinkElement | null;
      if (!hreflang) {
        hreflang = document.createElement("link");
        hreflang.rel = "alternate";
        hreflang.hreflang = lang;
        document.head.appendChild(hreflang);
      }
      hreflang.href = `${SITE_URL}/?lang=${lang}`;
    });

    // x-default hreflang
    let xDefault = document.querySelector('link[rel="alternate"][hreflang="x-default"]') as HTMLLinkElement | null;
    if (!xDefault) {
      xDefault = document.createElement("link");
      xDefault.rel = "alternate";
      xDefault.hreflang = "x-default";
      document.head.appendChild(xDefault);
    }
    xDefault.href = SITE_URL;

    // JSON-LD Structured Data — TravelAgency + LocalBusiness
    const scriptId = "ld-json-travelagency";
    let ld = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.id = scriptId;
      document.head.appendChild(ld);
    }
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "Lavish Travels & Tours",
      url: SITE_URL,
      description,
      areaServed: "Sri Lanka",
      telephone: ["+94701728922", "+94770418967"],
      email: "support@lavishtravelsandtours.online",
      address: {
        "@type": "PostalAddress",
        streetAddress: "520/41B, Randunuwatta, North Road",
        addressLocality: "Weerawila",
        addressCountry: "LK",
      },
      logo: `${SITE_URL}/icons/logo.png`,
      image: `${SITE_URL}/icons/logo.png`,
      sameAs: [
        "https://www.facebook.com/profile.php?id=61579323908693",
        "https://wa.me/94701728922",
      ],
      foundingDate: "2018",
      priceRange: "$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "500",
        bestRating: "5",
      },
    };
    ld.text = JSON.stringify(jsonLd);

    // Breadcrumb structured data
    const breadcrumbId = "ld-json-breadcrumb";
    let bcLd = document.getElementById(breadcrumbId) as HTMLScriptElement | null;
    if (!bcLd) {
      bcLd = document.createElement("script");
      bcLd.type = "application/ld+json";
      bcLd.id = breadcrumbId;
      document.head.appendChild(bcLd);
    }
    bcLd.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
      ],
    });
  }, [title, description, i18n.language]);

  return null;
};

export default SeoHead;
