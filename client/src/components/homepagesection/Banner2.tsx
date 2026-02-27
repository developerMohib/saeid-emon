"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { EmblaOptionsType } from 'embla-carousel';
import Link from 'next/link';
import EmblaCarousel from '../EmblaCarousel';

const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Banner2 = () => {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 w-full transition-colors duration-500">
      {/* Dynamic Mesh Gradient - Using opacity to keep it subtle in both modes */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 dark:opacity-40 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-full sm:w-[50%] h-[50%] rounded-full bg-accent blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-full sm:w-[50%] h-[50%] rounded-full bg-seBlue blur-[120px]" />
      </div>

      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:items-center">

          <header>
            <motion.span
              custom={0} initial="hidden" animate="visible" variants={fadeInUp}
              className="inline-block rounded-full border border-seGray/20 bg-seGray/5 px-3 py-1 text-xs font-bold tracking-widest uppercase text-accent mb-6"
            >
              Available for Freelance
            </motion.span>

            <motion.h1
              custom={1} initial="hidden" animate="visible" variants={fadeInUp}
              className="text-4xl font-black tracking-tight text-seBlack sm:text-7xl leading-[1.1]"
            >
              Design That <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-seBlue to-seRed">
                Works Harder
              </span><br />
              Than Works.
            </motion.h1>

            <motion.p
              custom={2} initial="hidden" animate="visible" variants={fadeInUp}
              className="mt-6 text-lg leading-8 text-seGray max-w-md font-medium"
            >
              Distilling brand values into iconic marks and modern apparel through intentional, grid-based design.
            </motion.p>

            <motion.nav
              custom={3} initial="hidden" animate="visible" variants={fadeInUp}
              className="mt-10 flex flex-wrap items-center gap-6"
            >
              <Link href="/all-designs" className="rounded-xl bg-seBlack px-8 py-4 text-sm font-bold text-seWhite transition-all hover:bg-seRed hover:scale-105 active:scale-95 shadow-lg">
                View Work
              </Link>

              <Link href="#process" className="text-sm font-bold uppercase tracking-widest leading-6 text-seBlack group flex items-center gap-2">
                The Process
                <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </Link>
            </motion.nav>
          </header>

          <motion.aside
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative w-full max-w-[500px] mx-auto lg:ml-auto"
          >
            <div className="rounded-3xl overflow-hidden border border-seGray/10 bg-seWhite shadow-2xl">
              <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            </div>
          </motion.aside>

        </div>
      </div>
    </section>
  );
};

export default Banner2;