"use client"
import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is included in a Brand Identity package?",
      answer: "Beyond just a logo, you receive a full visual system: primary and secondary marks, a custom color palette, typography pairings, and a brand style guide to ensure consistency across all platforms."
    },
    {
      question: "I need a Jersey design. Do you provide tech packs?",
      answer: "Yes. For teamwear and apparel, I provide print-ready vector files and technical mockups that you can send directly to your manufacturer for production."
    },
    {
      question: "How long does the logo design process take?",
      answer: "Typically, a custom brand identity takes 1-2 weeks. This allows time for research, sketching, grid construction, and refinement based on your feedback."
    },
    {
      question: "In what formats will I receive my files?",
      answer: "You will receive high-resolution files in multiple formats: AI (Vector), EPS, SVG, PNG (transparent), and PDF. Perfect for everything from social media to large-scale printing."
    },
    {
      question: "Do you handle the printing for business cards and merch?",
      answer: "I specialize in the design and preparation of the files. I provide industry-standard 'bleed' and 'CMYK' files that any professional printer can use to get perfect results."
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-transparent overflow-visible">
      {/* Background Glows - Matching the previous sections */}
      <div className="absolute top-[50%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono tracking-[0.4em] text-blue-400 uppercase mb-4">Common Inquiries</h2>
          <h3 className="text-4xl font-bold text-white tracking-tight">Everything you <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500">need to know.</span></h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="rounded-2xl border border-white/5 bg-white/2 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-white/10"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? 0 : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-white/90">{faq.question}</span>
                <span className="ml-4 shrink-0 text-purple-400 transition-transform duration-300">
                  {openIndex === index ? <FiMinus size={20} /> : <FiPlus size={20} />}
                </span>
              </button>

              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Designer Signature Detail */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm font-mono italic">Still have questions? <a href="#" className="text-blue-400 border-b border-blue-400/30 hover:text-purple-400 transition-colors">Shoot me a DM.</a></p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;