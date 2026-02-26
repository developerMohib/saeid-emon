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

  // Animation Variants
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
    <section id='process' className="relative py-12 sm:py-16 bg-transparent overflow-visible">
      {/* Background Glow */}
      <div className="absolute top-[30%] left-[-5%] w-[450px] h-[450px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {/* Semantic Header */}
        <header className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-sm tracking-[0.5em] text-purple-400 uppercase"
          >
            The Craft
          </motion.h2>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold text-white tracking-tight leading-tight my-4"
          >
            Distilling complex values into <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500">
              singular, iconic marks.
            </span>
          </motion.h3>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-sm tracking-[0.5em] text-purple-400 uppercase mb-4"
          >
            Working Process
          </motion.h2>
        </header>

        {/* Bento Grid with staggered animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[200px]"
        >
          {services.map((service, index) => (
            <motion.article
              key={index}
              variants={itemVariants}
              className={`group relative ${service.grid} rounded-4xl border border-white/5 bg-white/2 p-8 overflow-hidden transition-all duration-700 hover:border-blue-500/40 hover:bg-white/4 backdrop-blur-3xl`}
            >
              {/* Inner Glow Detail */}
              <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-32 h-32 bg-blue-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" aria-hidden="true" />

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <div className="text-3xl text-blue-400 mb-6 font-light opacity-80 group-hover:scale-110 group-hover:text-purple-400 transition-all duration-500">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-medium text-white mb-3 tracking-tight">{service.title}</h4>
                  <p className="text-sm text-gray-400/80 leading-relaxed max-w-[260px]">
                    {service.desc}
                  </p>
                </div>

                {/* Designer Detail: The Index Number */}
                <footer className="text-[10px] text-white/20 uppercase tracking-[0.2em]">
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