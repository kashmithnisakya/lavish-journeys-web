import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = t('home:faq.items', { returnObjects: true }) as FAQItem[];

  return (
    <section id="faq" className="py-14 md:py-20 bg-secondary/30">
      <div className="container max-w-3xl">
        <header className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl">{t('home:faq.title')}</h2>
          <p className="text-muted-foreground mt-3">{t('home:faq.description')}</p>
        </header>

        <div className="space-y-3" role="list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              role="listitem"
              className="bg-card border rounded-xl overflow-hidden shadow-sm"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/30 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-sm pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
