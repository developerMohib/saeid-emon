'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import Image from 'next/image';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel = ({ slides, options }: PropType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()]);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
    return () => {
      emblaApi.off('reInit', onSelect).off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full container mx-auto">
      {/* Viewport: Uses var colors for border and bg */}
      <div 
        className="overflow-hidden rounded-3xl border border-seGray/20 bg-seWhite transition-colors duration-500" 
        ref={emblaRef}
      >
        <div className="flex">
          {slides.map((index) => (
            <div className="relative flex-[0_0_100%] min-w-0" key={index}>
              <Image
                width={1200}
                height={800}
                className="w-full h-auto object-contain block"
                src={`https://picsum.photos/1200/800?v=${index}`}
                alt={`Project ${index}`}
                priority={index === 0}
              />
              
              {/* Dynamic Overlay: Dark gradient in dark mode, Light gradient in light mode */}
              <div className="absolute inset-0  pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8 z-10">
                <p className="text-accent text-[10px] tracking-[0.4em] uppercase mb-1 font-bold">
                  Project _ 0{index + 1}
                </p>
                <h4 className="text-seBlack text-2xl md:text-4xl font-black tracking-tight uppercase">
                  Brand Mark
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-8 flex gap-2 z-20">
          <NavButton onClick={scrollPrev} disabled={prevBtnDisabled} direction="left" />
          <NavButton onClick={scrollNext} disabled={nextBtnDisabled} direction="right" />
        </div>
      </div>
    </div>
  );
};

/* --- Sub-Component: NavButton --- */
const NavButton = ({ onClick, disabled, direction }: { onClick: () => void; disabled: boolean; direction: 'left' | 'right' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`
      p-2 md:p-3 rounded-full border border-seGray/20 
      bg-seBlack text-seWhite 
      transition-all duration-300
      hover:bg-seRed hover:text-white hover:scale-110
      disabled:opacity-20 disabled:grayscale disabled:scale-100
    `}
  >
    {direction === 'left' ? <FiArrowLeft size={18} /> : <FiArrowRight size={18} />}
  </button>
);

export default EmblaCarousel;