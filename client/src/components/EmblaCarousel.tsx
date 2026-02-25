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
    <div className="relative w-full max-w-7xl mx-auto px-4">
      {/* Viewport: Removed h-screen, added overflow-hidden */}
      <div className="overflow-hidden rounded-4xl border border-white/10 bg-[#0a0a0a]" ref={emblaRef}>
        <div className="flex">
          {slides.map((index) => (
            <div className="relative flex-[0_0_100%] min-w-0" key={index}>
              {/* Image with height auto behavior */}
              <Image
                width={1200}
                height={800}
                className="w-full h-auto object-contain block" // h-auto makes the container follow image height
                src={`https://picsum.photos/1200/800?v=${index}`}
                alt={`Project ${index}`}
                priority={index === 0}
              />
              
              {/* Minimalist Overlay for Info */}
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-8 z-10">
                <p className="text-seBlack text-[10px] tracking-[0.4em] uppercase mb-2">
                  Project _ 0{index + 1}
                </p>
                <h4 className="text-seBlack text-2xl md:text-4xl font-bold tracking-tight">
                  BRAND MARK
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Controls: Positioned Bottom Right OF THE IMAGE CONTAINER */}
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-8 flex gap-2 z-20 pointer-events-auto">
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
      p-2 md:p-3 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-white 
      transition-all duration-300
      hover:bg-seRed hover:border-seGray
      disabled:opacity-10 disabled:grayscale
    `}
  >
    {direction === 'left' ? <FiArrowLeft size={20} /> : <FiArrowRight size={20} />}
  </button>
);

export default EmblaCarousel;