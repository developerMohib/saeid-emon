import React from 'react';
import { EmblaOptionsType } from 'embla-carousel'
import EmblaCarousel from './EmblaCarousel';
const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 }
const SLIDE_COUNT = 5
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

const Banner2 = () => {
  return (
    <section className="relative overflow-hidden bg-transparent py-24 sm:py-32 w-full">
      {/* Background Mesh Gradient - Using overflow-hidden on parent to kill X-Scroll */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-full sm:w-[50%] h-[50%] rounded-full bg-purple-600 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-full sm:w-[50%] h-[50%] rounded-full bg-blue-600 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:items-center">

          {/* Left Column: Typography & CTA */}
          <div>
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-widest uppercase text-purple-400 mb-6">
              Available for Freelance
            </span>
            {/* Changed text-white to text-seBlack based on your CSS variable */}
            <h1 className="text-3xl font-extrabold tracking-tight text-seBlack sm:text-6xl">
              Design That <br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500"> Works Harder</span><br /> Than Works.
            </h1>
            {/* Using seGray for secondary text */}
            <p className="mt-6 text-lg leading-8 text-seGray max-w-md">
              Distilling brand values into iconic marks and modern apparel through intentional, grid-based design.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a href="#work" className="rounded-md bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-white/90">
                View Work
              </a>
              {/* Linked to your seBlack variable */}
              <a href="#process" className="text-sm font-semibold leading-6 text-seBlack group flex items-center">
                The Process
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Element */}
          <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto">

            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner2;