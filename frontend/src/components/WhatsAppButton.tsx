import { MessageCircle } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/94701728922"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick("floating_button")}
      className="fixed bottom-20 md:bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
