"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
    <section className="relative py-16 sm:py-24 bg-background transition-colors duration-500 overflow-visible">
      {/* Background Glows - Linked to your seBlue and accent variables */}
      <div className="absolute top-[50%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-seBlue/10 blur-[150px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-accent/10 blur-[130px] rounded-full pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-6">
        <header className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm tracking-[0.4em] text-seBlue uppercase mb-4 font-bold"
          >
            Common Inquiries
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-seBlack tracking-tight"
          >
            Everything you <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-seBlue">need to know.</span>
          </motion.h3>
        </header>

        {/* FAQ List */}
        <dl className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl border border-seGray/10 bg-seWhite backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-accent/30 shadow-sm"
            >
              <dt>
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none group"
                >
                  <span className="text-base sm:text-lg font-bold text-seBlack/90 group-hover:text-accent transition-colors">
                    {faq.question}
                  </span>
                  <span className="ml-4 shrink-0 text-accent">
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {openIndex === index ? <FiMinus size={20} /> : <FiPlus size={20} />}
                    </motion.div>
                  </span>
                </button>
              </dt>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.dd
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="p-6 pt-0 text-seGray leading-relaxed border-t border-seGray/5 mt-2 font-medium">
                      {faq.answer}
                    </div>
                  </motion.dd>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </dl>

        {/* Footer Detail */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-seGray text-sm font-medium">
            Still have questions?{" "}
            <a href="#" className="text-seBlue border-b-2 border-seBlue/20 hover:text-accent hover:border-accent transition-all font-bold">
              Shoot me a DM.
            </a>
          </p>
        </motion.footer>
      </div>
    </section>
  );
};

export default FAQSection;