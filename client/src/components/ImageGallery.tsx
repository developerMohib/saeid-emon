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
    <figure className="w-full flex flex-col items-center justify-center mb-6">
      {/* Thumbnail */}
      <Image
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "95%", height: "auto" }}
        className="rounded-lg shadow-md mb-6 cursor-pointer"
        priority
        onClick={() => setIsOpen(true)}
      />
      <figcaption className="sr-only">{alt}</figcaption>

      {/* Modal */}
      {isOpen && (
        <aside
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Image Preview Modal"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()} // Prevent modal close when clicking image
          >
            <Image
              src={src}
              alt={alt}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
              priority
              className="rounded-lg shadow-lg"
            />

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-4 right-4 text-seRed text-2xl font-bold cursor-pointer"
              aria-label="Close Modal"
            >
              ✖
            </button>
          </div>
        </aside>
      )}
    </figure>
  );
}
