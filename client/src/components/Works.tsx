"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Metadata } from "next";
import Loader from "./Loader";
import useProducts from "@/hooks/useProducts";
import useCheckAuth from "@/hooks/useCheckAuth";

export const metadata: Metadata = {
  title: "Contact | Work with Saeid Hasan Emon",
  description:
    "Get in touch with professional graphics designer Saeid Hasan Emon for your next creative project or collaboration.",
  openGraph: {
    title: "Contact | Saeid Hasan Emon",
    url: "https://www.saeidemon.com/contact",
  },
};

const Works = () => {
  const { data: cardsData, error, isPending, isError } = useProducts();
  const { isAuthenticated, loading } = useCheckAuth();

  if (isPending || loading) return <Loader />;
  if (error || isError)
    return <p className="text-red-600">An error has occurred: {error?.message}</p>;

  return (
    <section
      aria-label="Works Gallery"
      className="p-1 md:grid grid-cols-3 gap-6 justify-items-center"
    >
      {cardsData?.map((card, index) => (
        <article
          key={card._id}
          className="relative overflow-hidden rounded-lg shadow-lg group md:my-0 my-4"
        >
          {/* Image Section */}
          <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <Image
              src={card.images[0]}
              alt={card.title}
              width={900}
              height={900}
              priority={index === 0}
              className="w-80 object-cover"
            />
          </div>

          {/* Overlay Details */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-seBlack/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-seGray text-sm">{card.category}</span>
            <div className="flex justify-between items-center gap-4 text-seWhite">
              <Link href={`/design-details/${card._id}`}>
                <h3 className="text-xl font-semibold hover:underline">{card.title}</h3>
              </Link>
              <Link href={`/design-details/${card._id}`}>
                <button className="rounded-full text-xs font-bold px-3 py-2 bg-seGray/40 backdrop-blur-md hover:bg-seWhite/40 transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </article>
      ))}

      {/* Add Project Card (Authenticated Only) */}
      {isAuthenticated && (
        <article className="w-full h-80 rounded-lg flex items-center justify-center border border-dashed">
          <div className="text-center">
            <Plus className="h-6 w-6 mx-auto mb-4 rounded-full bg-seBlue text-white font-bold" />
            <Link href="/create-project">
              <button className="bg-seSlack/10 border border-seSlack/10 px-2 py-1 rounded-lg cursor-pointer hover:bg-seGray/40 text-sm font-semibold text-seSlack/90 transition-colors">
                Create A Project
              </button>
            </Link>
          </div>
        </article>
      )}
    </section>
  );
};

export default Works;
