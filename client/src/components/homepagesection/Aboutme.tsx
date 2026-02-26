"use client";

import { useAuthUser } from '@/hooks/useAuthUser';
import { ChevronRight, SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from "next";
import React from 'react';
import Loader from '../Loader';

export const metadata: Metadata = {
  title: "About | Saeid Emon - Graphics Designer",
  description:
    "Learn more about Saeid Emon — a passionate graphics designer specializing in logo design, branding, and visual storytelling.",
  openGraph: {
    title: "About | Saeid Emon",
    description:
      "Meet Saeid Emon, a creative professional graphics designer with years of experience in brand identity design.",
    url: "https://www.saeidemon.com",
  },
};

const Aboutme = () => {
  const { isPending, isError, error, data } = useAuthUser();

  if (isPending) return <Loader />;
  if (isError) return <p>Error: {error?.message}</p>;

  const socials = data[0]?.social;
  const newdata = data[0];

  return (
    <section className="my-10 md:px-0 px-5">
      {/* About Me Section */}
      <header className="mb-6">
        <h1 className="text-sm font-semibold uppercase text-seGray mb-2">About Me</h1>
        <p className="text-sm text-seBlack/80 leading-6 tracking-wide mb-2">{newdata.experience}</p>
        <p className="text-sm text-seBlack/80 leading-6">{newdata.bio}</p>
      </header>

      {/* Resume Link (hidden currently) */}
      <div className="my-5 hidden">
        <Link
          href="/resume"
          className="flex items-center text-sm text-seGray hover:text-seBlack"
        >
          View Full Resume
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {/* Contact Section */}
      <section className="my-10">
        <h2 className="text-sm font-semibold uppercase text-seGray mb-2">Contact Me</h2>
        <ul className="space-y-1">
          <li>
            <Link
              href="tel:+15878218048"
              className="text-sm text-seBlack/80 hover:underline"
            >
              Call Me: +1 587-821-8048
            </Link>
          </li>
          <li>
            <Link
              href="mailto:contact@saeidemon.com"
              className="text-sm text-seBlack/80 hover:underline"
            >
              Email: contact@saeidemon.com
            </Link>
          </li>
        </ul>
      </section>

      {/* Socials Section */}
      <section>
        <h2 className="text-xs font-semibold uppercase text-seGray mb-2">On The Web</h2>
        <ul className="space-y-2">
          {Object.entries(socials).map(([key, url], index) => (
            <li key={index}>
              <Link
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center w-full px-4 py-3 rounded-md border border-seGray/20 hover:bg-seGray/20 transition"
              >
                <span className="text-xs font-light tracking-widest capitalize flex gap-2">
                  {key}
                </span>
                <SquareArrowOutUpRight className="w-4 h-4 text-seGray/80" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Aboutme;
