import React, { useState } from "react";

const faqs = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy on most items. Products must be returned in original condition with the receipt.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to many countries. Shipping rates and times vary depending on your location.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order ships, you’ll receive an email with the tracking number and a link to track it.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "You can change or cancel your order within 12 hours of placing it by contacting our support team.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white dark:bg-black py-12 px-6 md:px-20" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                <span className="text-2xl leading-none">
                  {openIndex === index ? "-" : "+"}
                </span>
              </div>
              {openIndex === index && (
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
