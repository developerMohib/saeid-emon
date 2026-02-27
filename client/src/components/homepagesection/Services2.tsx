"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';

const Services2 = () => {
  const services = [
    {
      title: "Visual Identity Systems",
      desc: "Comprehensive brand books including typography, color theory, and usage guidelines.",
      grid: "md:col-span-2 md:row-span-1",
      icon: "▢"
    },
    {
      title: "Logo Mark Construction",
      desc: "Hand-crafted vector marks built on mathematical grids for timeless scalability.",
      grid: "md:col-span-1 md:row-span-2",
      icon: "◓"
    },
    {
      title: "Brand Audits",
      desc: "Analyzing your current presence to refine and modernize your visual language.",
      grid: "md:col-span-1 md:row-span-1",
      icon: "⚲"
    },
    {
      title: "Custom Typography",
      desc: "Designing bespoke letterforms that ensure your wordmark is 100% unique.",
      grid: "md:col-span-1 md:row-span-1",
      icon: "Aa"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section id='process' className="relative py-16 sm:py-24 bg-background transition-colors duration-500 overflow-visible">
      {/* Dynamic Background Glow - Uses your accent color variable */}
      <div className="absolute top-[30%] left-[-5%] w-[450px] h-[450px] bg-accent/10 blur-[140px] rounded-full pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <header className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs sm:text-sm tracking-[0.5em] text-accent uppercase font-bold"
          >
            The Craft
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-6xl font-black text-seBlack tracking-tight leading-tight my-6"
          >
            Distilling complex values into <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-seBlue to-seRed">
              singular, iconic marks.
            </span>
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-[10px] sm:text-xs tracking-[0.5em] text-seGray uppercase mb-4 font-semibold"
          >
            Working Process
          </motion.h2>
        </header>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[220px]"
        >
          {services.map((service, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className={`group relative ${service.grid} rounded-4xl border border-seGray/10 bg-seWhite p-8 overflow-hidden transition-all duration-700 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5 backdrop-blur-3xl`}
            >
              {/* Animated Inner Glow Detail */}
              <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-48 h-48 bg-accent/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="text-3xl text-accent mb-6 font-light opacity-80 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    {service.icon}
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-seBlack mb-3 tracking-tight">
                    {service.title}
                  </h4>
                  <p className="text-sm text-seGray leading-relaxed max-w-[280px] font-medium">
                    {service.desc}
                  </p>
                </div>

                <footer className="text-[10px] text-seGray/40 uppercase tracking-[0.3em] font-mono font-bold">
                  Service_0{index + 1}
                </footer>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services2;