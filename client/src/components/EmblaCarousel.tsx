'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
import Image from 'next/image';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import useGetBrand from '@/hooks/useBrandingApi';
import Loader from './Loader';

// Use the options you defined
const OPTIONS: EmblaOptionsType = { loop: true, duration: 30 };

const EmblaCarousel = () => {
  const { data: brandData, isPending, error } = useGetBrand();

  // Pass OPTIONS and Fade plugin correctly
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [Fade()]);
  
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

  if (isPending) return <Loader />;

  if (error) {
    return (
      <section role="alert" className="flex justify-center items-center min-h-64">
        <p className="text-seRed text-lg font-bold">
          An error has occurred: {error?.message || "Failed to load projects"}
        </p>
      </section>
    );
  }

  return (
    <div className="relative w-full container mx-auto px-4">
      <div
        className="overflow-hidden rounded-3xl border border-seGray/20 bg-seWhite transition-colors duration-500 shadow-xl"
        ref={emblaRef}
      >
        <div className="flex">
          {brandData?.map((brand, index: number) => (
            <div className="relative flex-[0_0_100%] min-w-0" key={brand._id || index}>
              {/* Image Container with fixed aspect ratio for stability */}
              <div className="relative aspect-4/3 w-full">
                <Image
                  fill
                  src={brand.img} // Corrected from brand.image1
                  alt={brand.name} // Corrected from Brand Mark
                  className="object-cover block"
                  priority={index === 0}
                  sizes="(max-width: 1280px) 100vw, 1200px"
                />
              </div>

              {/* Dynamic Overlay: Gradient for text readability */}
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-12 z-10">
                <p className="text-accent text-[10px] md:text-xs tracking-[0.4em] uppercase mb-2 font-bold">
                  Project _ 0{index + 1}
                </p>
                <h4 className="text-white text-2xl md:text-5xl font-black tracking-tight uppercase leading-none">
                  {brand.name} {/* Dynamically show "Jersey", etc. */}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-12 flex gap-3 z-20">
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
      p-3 md:p-4 rounded-full border border-white/10 
      bg-black/40 text-white backdrop-blur-md
      transition-all duration-300
      hover:bg-seRed hover:border-seRed hover:scale-110
      disabled:opacity-10 disabled:grayscale disabled:scale-100 disabled:cursor-not-allowed
    `}
  >
    {direction === 'left' ? <FiArrowLeft size={20} /> : <FiArrowRight size={20} />}
  </button>
);

export default EmblaCarousel;