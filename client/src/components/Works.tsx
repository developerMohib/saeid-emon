"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Loader2 } from "lucide-react";
import type { Metadata } from "next";
import useProducts from "@/hooks/useProducts";
import useCheckAuth from "@/hooks/useCheckAuth";
import Loader from "./Loader";

export const metadata: Metadata = {
  title: "Contact | Work with Saeid Emon",
  description: "Get in touch with professional graphics designer Saeid Emon for your next creative project or collaboration.",
  openGraph: {
    title: "Contact | Saeid Emon",
    url: "https://www.saeidemon.com/contact",
  },
};

const Works = () => {
  const {
    data: cardsData,
    error,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useProducts();

  const { isAuthenticated, loading } = useCheckAuth();

  if (isPending || loading) return <Loader />;

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <p className="text-red-600 text-lg">
          An error has occurred: {error?.message || "Failed to load products"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Products Grid */}
      <section
        aria-label="Works Gallery"
        className="p-1 md:grid grid-cols-3 gap-6 justify-items-center"
      >
        {cardsData?.map((card, index) => (
          <article
            key={`${card._id}-${index}`}
            className="relative overflow-hidden rounded-lg shadow-lg group md:my-0 my-4"
          >
            {/* Image Section */}
            <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Image
                src={card.images[0]}
                alt={card.title}
                width={320}
                height={320}
                priority={index < 3}
                className="w-full h-80 object-cover"
                style={{ height: 'auto' }} // This maintains aspect ratio
              />
            </div>

            {/* Overlay Details */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-linear-to-t from-seBlack/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-seWhite text-sm">{card.category}</span>
              <div className="grid grid-rows-2 justify-between items-center gap-4 text-seWhite">
                <div>
                  <Link href={`/design-details/${card._id}`}>
                    <h3 className="text-xl font-semibold hover:underline line-clamp-1">
                      {card.title}
                    </h3>
                  </Link>
                </div>
                <div>
                  <Link href={`/design-details/${card._id}`}>
                    <button className="rounded-full text-xs font-bold px-3 py-2 bg-seGray/40 backdrop-blur-md hover:bg-seWhite/40 transition-colors cursor-pointer">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Add Project Card (Authenticated Only) */}
        {isAuthenticated && (
          <article className="w-80 h-80 rounded-lg flex items-center justify-center border-2 border-dashed border-seGray/40 hover:border-seBlue transition-colors">
            <div className="text-center">
              <Plus className="h-8 w-8 mx-auto mb-4 rounded-full bg-seBlue text-white p-1" />
              <Link href="/create-project">
                <button className="bg-seSlack/10 border border-seSlack/10 px-4 py-2 rounded-lg cursor-pointer hover:bg-seGray/40 text-sm font-semibold text-seSlack/90 transition-colors">
                  Create A Project
                </button>
              </Link>
            </div>
          </article>
        )}
      </section>

      {/* Load More Button */}
      {hasNextPage && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="flex items-center gap-3 px-8 py-3 bg-seBlack text-seWhite rounded-lg hover:bg-seRed transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold cursor-pointer"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading More...
              </>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      )}

      {/* End of Results */}
      {!hasNextPage && cardsData.length > 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-4 text-gray-500">
            <div className="h-px w-16 bg-gray-300"></div>
            <span className="text-sm font-medium">All projects loaded</span>
            <div className="h-px w-16 bg-gray-300"></div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {cardsData?.length === 0 && !isPending && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No projects found.</p>
          {isAuthenticated && (
            <Link href="/create-project" className="inline-block mt-4">
              <button className="bg-seBlue text-white px-6 py-2 rounded-lg hover:bg-seBlue/90 transition-colors">
                Create Your First Project
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Works;