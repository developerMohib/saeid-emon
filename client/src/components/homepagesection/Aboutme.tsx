"use client";

import { useAuthUser } from '@/hooks/useAuthUser';
import { ChevronRight, SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from "next";
import { motion, Variants } from 'framer-motion'; // 1. Import motion
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

// 2. Define animation variants
const containerVariants :Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger children for sequential fade-in
    },
  },
};

const itemVariants :Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Aboutme = () => {
  const { isPending, isError, error, data } = useAuthUser();

  if (isPending) return <Loader />;
  if (isError) return <p className="text-seRed p-5">Error: {error?.message}</p>;

  const socials = data[0]?.social || {};
  const newdata = data[0];

  return (
    // 3. Wrap content in motion.div
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="my-10 md:px-0 px-5 text-seBlack"
    >
      {/* About Me Section */}
      <motion.header variants={itemVariants} className="mb-10">
        <h1 className="text-sm font-semibold uppercase tracking-widest text-seGray mb-4">About Me</h1>
        <div className="space-y-3">
          <p className="text-sm text-seSlack leading-relaxed tracking-wide">
            {newdata.experience}
          </p>
          <p className="text-sm text-seSlack leading-relaxed">
            {newdata.bio}
          </p>
        </div>
      </motion.header>

      {/* Resume Link (hidden currently) */}
      <motion.div variants={itemVariants} className="my-5 hidden">
        <Link
          href="/resume"
          className="flex items-center text-sm text-seGray hover:text-accent transition-colors"
        >
          View Full Resume
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </motion.div>

      {/* Contact Section */}
      <motion.section variants={itemVariants} className="my-10">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-seGray mb-4">Contact Me</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="tel:+15878218048"
              className="text-sm text-seBlack hover:text-seBlue transition-colors hover:underline"
            >
              Call Me: +1 587-821-8048
            </Link>
          </li>
          <li>
            <Link
              href="mailto:contact@saeidemon.com"
              className="text-sm text-seBlack hover:text-seBlue transition-colors hover:underline"
            >
              Email: contact@saeidemon.com
            </Link>
          </li>
        </ul>
      </motion.section>

      {/* Socials Section */}
      <motion.section variants={itemVariants}>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-seGray mb-4">On The Web</h2>
        <motion.ul variants={containerVariants} className="space-y-3">
          {Object.entries(socials).map(([key, url], index) => (
            <motion.li key={index} variants={itemVariants}>
              <Link
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center w-full px-5 py-4 rounded-xl border border-seGray/20 bg-seWhite hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
              >
                <span className="text-xs font-bold tracking-widest uppercase text-seBlack flex gap-2">
                  {key}
                </span>
                <SquareArrowOutUpRight className="w-4 h-4 text-seGray group-hover:text-accent" />
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>
    </motion.section>
  );
};

export default Aboutme;