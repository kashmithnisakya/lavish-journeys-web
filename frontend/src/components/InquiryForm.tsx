import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { submitInquiry, type InquiryPayload } from "@/lib/api";
import { toast } from "sonner";
import { Mail, User, Phone, MessageSquare, Loader2 } from "lucide-react";

interface InquiryFormProps {
  defaultInquiryType?: string;
  defaultQuestion?: string;
  onSuccess?: () => void;
}

export function InquiryForm({
  defaultInquiryType = "General Inquiry",
  defaultQuestion = "",
  onSuccess
}: InquiryFormProps) {
  const [formData, setFormData] = useState<InquiryPayload>({
    name: "",
    email: "",
    phone: "",
    inquiry_type: defaultInquiryType,
    question: defaultQuestion,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryPayload, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof InquiryPayload, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.question.trim()) {
      newErrors.question = "Please tell us about your inquiry";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setLoading(true);

    try {
      await submitInquiry(formData);
      toast.success("Thank you! We'll get back to you shortly.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        inquiry_type: defaultInquiryType,
        question: "",
      });
      setErrors({});

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Inquiry submission error:", error);
      toast.error("Failed to submit inquiry. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof InquiryPayload, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name" className="flex items-center gap-2">
          <User className="w-4 h-4" />
          Full Name <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="John Doe"
          className={errors.name ? "border-red-500" : ""}
          disabled={loading}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Email Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="john@example.com"
          className={errors.email ? "border-red-500" : ""}
          disabled={loading}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Phone Number <span className="text-red-500">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="+1234567890"
          className={errors.phone ? "border-red-500" : ""}
          disabled={loading}
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="inquiry_type">Inquiry Type</Label>
        <select
          id="inquiry_type"
          value={formData.inquiry_type}
          onChange={(e) => handleChange("inquiry_type", e.target.value)}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Tour Package">Tour Package</option>
          <option value="Custom Trip">Custom Trip</option>
          <option value="Hotel Booking">Hotel Booking</option>
          <option value="Transportation">Transportation</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="question" className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          Your Message <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="question"
          value={formData.question}
          onChange={(e) => handleChange("question", e.target.value)}
          placeholder="Tell us about your travel plans, questions, or special requirements..."
          className={`min-h-[120px] ${errors.question ? "border-red-500" : ""}`}
          disabled={loading}
        />
        {errors.question && <p className="text-sm text-red-500">{errors.question}</p>}
      </div>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          "Submit Inquiry"
        )}
      </Button>
    </form>
  );
}
