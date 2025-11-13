import { ChevronDown } from "lucide-react";

export default function FAQItem({ faq, index, openIndex, setOpenIndex }) {
  const isOpen = openIndex === index;

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      {/* Question Button */}
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="w-full flex justify-between items-center py-6 text-left hover:bg-amber-50 px-4 rounded-lg transition-colors group"
      >
        <span className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors pr-4">
          {faq.question}
        </span>
        <div
          className={`transform transition-transform duration-300 flex-shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ChevronDown size={24} className="text-amber-600" />
        </div>
      </button>

      {/* Answer */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pb-6 px-4 text-gray-600 leading-relaxed">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}
