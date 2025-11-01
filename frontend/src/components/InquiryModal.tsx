import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InquiryForm } from "@/components/InquiryForm";

interface InquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultInquiryType?: string;
  defaultQuestion?: string;
  title?: string;
  description?: string;
}

export function InquiryModal({
  open,
  onOpenChange,
  defaultInquiryType,
  defaultQuestion,
  title = "Plan Your Trip",
  description = "Fill out the form below and our travel specialists will get back to you shortly.",
}: InquiryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{title}</DialogTitle>
          <DialogDescription className="text-base">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <InquiryForm
            defaultInquiryType={defaultInquiryType}
            defaultQuestion={defaultQuestion}
            onSuccess={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
