import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface StickyMobileCTAProps {
  onPlanTrip: () => void;
}

export function StickyMobileCTA({ onPlanTrip }: StickyMobileCTAProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-md border-t shadow-lifted p-3 animate-fade-in">
      <Button
        variant="premium"
        size="lg"
        onClick={onPlanTrip}
        className="w-full"
      >
        {t('common:buttons.planTrip')}
      </Button>
    </div>
  );
}
