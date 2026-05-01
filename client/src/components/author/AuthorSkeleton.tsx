"use client";

import { motion } from "framer-motion";

const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};
const AuthorSkeleton = () => {
    return (
        <section className="relative py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* LEFT SIDE */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex-1 w-full space-y-6"
          >
            {/* Small heading */}
            <div className={`h-4 w-40 bg-gray-300 rounded ${shimmer}`} />

            {/* Main heading */}
            <div className="space-y-3">
              <div className={`h-10 w-3/4 bg-gray-300 rounded ${shimmer}`} />
              <div className={`h-10 w-1/2 bg-gray-300 rounded ${shimmer}`} />
            </div>

            {/* Paragraph */}
            <div className="space-y-2">
              <div className={`h-4 w-full bg-gray-300 rounded ${shimmer}`} />
              <div className={`h-4 w-5/6 bg-gray-300 rounded ${shimmer}`} />
              <div className={`h-4 w-2/3 bg-gray-300 rounded ${shimmer}`} />
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {[1, 2].map((_, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="p-5 rounded-2xl border border-gray-200 bg-gray-100 space-y-3"
                >
                  <div className={`h-5 w-5 bg-gray-300 rounded-full ${shimmer}`} />
                  <div className={`h-3 w-24 bg-gray-300 rounded ${shimmer}`} />
                  <div className={`h-3 w-full bg-gray-300 rounded ${shimmer}`} />
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-6 pt-4">
              <div className={`h-4 w-24 bg-gray-300 rounded ${shimmer}`} />
              <div className="flex gap-4">
                <div className={`h-6 w-6 bg-gray-300 rounded-full ${shimmer}`} />
                <div className={`h-6 w-6 bg-gray-300 rounded-full ${shimmer}`} />
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE IMAGE */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="w-full lg:w-1/3 max-w-100"
          >
            <div className={`w-full h-100 bg-gray-300 rounded-2xl ${shimmer}`} />

            {/* Badge */}
            <div className="mt-4 w-32 h-12 bg-gray-300 rounded-xl ml-4" />
          </motion.div>

        </div>
      </div>

      {/* Shimmer keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </section>
    );
};

export default AuthorSkeleton;