import { useTranslation } from "react-i18next";
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
  title,
  description,
}: InquiryModalProps) {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{title || t('modal:inquiry.title')}</DialogTitle>
          <DialogDescription className="text-base">
            {description || t('modal:inquiry.description')}
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
