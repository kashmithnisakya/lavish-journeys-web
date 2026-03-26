import { trackEvent } from "./firebase";

// ─── CTA & Navigation ───────────────────────────────────────
export const trackPlanTripClick = (source: string) =>
  trackEvent("plan_trip_click", { source });

export const trackViewTourDetails = (tourKey: string) =>
  trackEvent("view_tour_details", { tour: tourKey });

export const trackInquireNow = (tourKey?: string) =>
  trackEvent("inquire_now", tourKey ? { tour: tourKey } : undefined);

// ─── Form Submissions ───────────────────────────────────────
export const trackFormSubmitSuccess = (inquiryType: string) =>
  trackEvent("form_submit_success", { inquiry_type: inquiryType });

export const trackFormSubmitError = (error: string) =>
  trackEvent("form_submit_error", { error });

// ─── Social / External Links ────────────────────────────────
export const trackWhatsAppClick = (source: string) =>
  trackEvent("whatsapp_click", { source });

export const trackFacebookClick = (source: string) =>
  trackEvent("facebook_click", { source });

// ─── Language ───────────────────────────────────────────────
export const trackLanguageSwitch = (from: string, to: string) =>
  trackEvent("language_switch", { from, to });

// ─── Carousel ───────────────────────────────────────────────
export const trackCarouselInteraction = (action: string, destination: string) =>
  trackEvent("carousel_interaction", { action, destination });

// ─── Exit Intent ────────────────────────────────────────────
export const trackExitIntentShown = () =>
  trackEvent("exit_intent_shown");

export const trackExitIntentDismissed = () =>
  trackEvent("exit_intent_dismissed");

export const trackExitIntentCTA = () =>
  trackEvent("exit_intent_cta_click");

// ─── Scroll Depth ───────────────────────────────────────────
const firedDepths = new Set<number>();

export function initScrollDepthTracking() {
  const thresholds = [25, 50, 75, 100];

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;
    const percent = Math.round((window.scrollY / scrollHeight) * 100);

    for (const t of thresholds) {
      if (percent >= t && !firedDepths.has(t)) {
        firedDepths.add(t);
        trackEvent("scroll_depth", { percent: t });
      }
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}

// ─── Tour Package Page ──────────────────────────────────────
export const trackPackagePageView = (tourKey: string) =>
  trackEvent("package_page_view", { tour: tourKey });

export const trackPackageShare = (tourKey: string, method: string) =>
  trackEvent("package_share", { tour: tourKey, method });
