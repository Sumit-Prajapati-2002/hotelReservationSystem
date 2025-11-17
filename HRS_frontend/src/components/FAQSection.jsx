"use client";
import { useEffect, useState } from "react";
import FAQItem from "./FAQItem";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("http://localhost:3000/FAQ/five");
        if (!res.ok) throw new Error("Failed to fetch FAQs");

        const data = await res.json();
        if (!data.success) throw new Error("Failed to load FAQs");

        setFaqs(data.faqs);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) return <p className="text-center">Loading FAQs...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <section
      id="faq"
      className="py-20 px-4 bg-gradient-to-br from-amber-50 to-orange-50"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Find answers to common questions about your stay
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {faqs.length === 0 ? (
            <p className="text-center text-gray-600">No FAQs found.</p>
          ) : (
            faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                faq={faq}
                index={idx}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
