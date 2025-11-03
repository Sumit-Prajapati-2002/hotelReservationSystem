import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQItemProps {
  faq: FAQ;
  index: number;
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}

export default function FAQItem({
  faq,
  index,
  openIndex,
  setOpenIndex,
}: FAQItemProps) {
  const isOpen = openIndex === index;

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full flex justify-between items-center py-6 text-left hover:text-amber-600 transition"
      >
        <span className="text-lg font-semibold text-gray-900">
          {faq.question}
        </span>
        {isOpen ? (
          <ChevronUp size={24} className="text-amber-600" />
        ) : (
          <ChevronDown size={24} className="text-gray-600" />
        )}
      </button>

      {isOpen && (
        <div className="pb-6 text-gray-600 animate-fadeIn">
          {faq.answer}
        </div>
      )}
    </div>
  );
}
