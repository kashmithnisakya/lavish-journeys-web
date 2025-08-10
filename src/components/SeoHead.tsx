import React, { useEffect } from "react";

interface SeoHeadProps {
  title: string;
  description: string;
}

const SeoHead: React.FC<SeoHeadProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = title;

    const ensureMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    ensureMeta("description", description);

    // Canonical tag
    const url = window.location.origin + window.location.pathname;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // JSON-LD Structured Data
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
      url: window.location.origin,
      description,
    };
    ld.text = JSON.stringify(jsonLd);
  }, [title, description]);

  return null;
};

export default SeoHead;
