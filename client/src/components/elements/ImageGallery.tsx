"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

export default function ImageGallery({ src, alt }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex justify-center mb-6">
      {/* Thumbnail */}
      
      <Image
        src={src}
        alt={alt}
        width={900}
        height={600}
        className="rounded-lg shadow-md mb-6 cursor-pointer"
        onClick={() => setIsOpen(true)}
      />

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-5xl w-full p-4">
            <Image
              src={src}
              alt={alt}
              width={1600}
              height={1000}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-4 right-4 text-seRed text-2xl font-bold"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
