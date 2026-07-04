import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
import { trackExitIntentShown, trackExitIntentDismissed, trackExitIntentCTA } from "@/lib/analytics";

interface ExitIntentPopupProps {
  onPlanTrip: () => void;
}

export function ExitIntentPopup({ onPlanTrip }: ExitIntentPopupProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("exit-intent-shown")) {
      setHasShown(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Don't fire while another overlay (language dropdown, dialog) is open:
      // stacking a modal dialog on top of an open Radix layer leaves the page
      // with pointer-events:none stuck on <body> when they close out of order.
      const overlayOpen = document.querySelector(
        '[data-radix-popper-content-wrapper], [role="dialog"][data-state="open"]'
      );
      if (e.clientY <= 0 && !hasShown && !overlayOpen) {
        setOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exit-intent-shown", "true");
        trackExitIntentShown();
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  useEffect(() => {
    if (open) return;
    // Safety net: if a teardown race still leaves pointer-events:none on <body>
    // after this dialog closes, clear it so the page never ends up frozen.
    const id = window.setTimeout(() => {
      const dialogStillOpen = document.querySelector('[role="dialog"][data-state="open"]');
      if (!dialogStillOpen && document.body.style.pointerEvents === "none") {
        document.body.style.pointerEvents = "";
      }
    }, 350);
    return () => window.clearTimeout(id);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen && open) trackExitIntentDismissed();
      setOpen(isOpen);
    }}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
          </div>
          <DialogTitle className="font-display text-2xl text-center">
            {t('home:exitIntent.title')}
          </DialogTitle>
          <DialogDescription className="text-center text-base mt-2">
            {t('home:exitIntent.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          <Button
            variant="premium"
            size="lg"
            className="w-full"
            onClick={() => {
              trackExitIntentCTA();
              setOpen(false);
              onPlanTrip();
            }}
          >
            {t('home:exitIntent.cta')}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground"
            onClick={() => {
              trackExitIntentDismissed();
              setOpen(false);
            }}
          >
            {t('home:exitIntent.dismiss')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
