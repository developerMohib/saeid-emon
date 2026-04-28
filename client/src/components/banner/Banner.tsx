"use client";

import { motion, Variants } from 'framer-motion';
import { PenLine } from 'lucide-react';
import { useEffect, useState } from 'react';
import EmblaCarousel from '../EmblaCarousel';
import BannerModal from '../modals/BannerModal';
import BannerSkeleton from './BannerSkeleton';
import useBanner from '@/hooks/useBanner';
import useCheckAuth from '@/hooks/useCheckAuth';
import instance from '@/hooks/instance';
import toast from 'react-hot-toast';
import axios from 'axios';
import { IBannerData } from '@/types/banner.type';

const Banner = () => {
  const isdevelopment = true;
  const [showModal, setShowModal] = useState(false);
  const { isPending, data } = useBanner()
  const { isAuthenticated, loading: isLoading } = useCheckAuth();
  const [loading, setLoading] = useState(false);


  const [bannerData, setBannerData] = useState<IBannerData | null>(null)

  useEffect(() => {
    if (data && data[0]) {
      setBannerData(data[0]);
    }
  }, [data]);


  const handleSave = async (data: typeof bannerData) => {
    try {
      setLoading(true)
      const res = await instance.put("/api/banner/update/banner", data);
      if (res?.data?.success) {
        toast.success(res.data.message)
      }
    } catch (err) {

      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message || "Request failed";
        toast.error(message);
      } else {
        toast.error("Database Busy");
      }
    } finally { setLoading(false) }
  };



  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
  };

  if (isPending || isLoading || !bannerData || loading) {
    return <BannerSkeleton />;
  }


  return (
    <section className="relative overflow-hidden py-24 sm:py-32 w-full transition-colors duration-500">
      <div className="relative container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:items-center">

          <header>
            <motion.span
              custom={0} initial="hidden" animate="visible" variants={fadeInUp}
              className="inline-block rounded-full border border-seGray/20 bg-seGray/5 px-3 py-1 text-xs font-bold tracking-widest uppercase text-accent mb-6"
            >
              {bannerData.badge}
            </motion.span>

            <motion.h1
              custom={1} initial="hidden" animate="visible" variants={fadeInUp}
              className="text-4xl font-black tracking-tight text-seBlack sm:text-7xl leading-[1.1]"
            >
              {bannerData.titleLine} <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-seBlue to-seRed">
                {bannerData.highlight}
              </span><br />
              {bannerData.subTitleLine}
            </motion.h1>

            <motion.p
              custom={2} initial="hidden" animate="visible" variants={fadeInUp}
              className="mt-6 text-lg leading-8 text-seGray max-w-md font-medium"
            >
              {bannerData.description}
            </motion.p>
          </header>

          {isdevelopment && (
            <button
              title="Edit Heading and Subheading"
              onClick={() => setShowModal(true)}
              className="absolute top-4 left-0 bg-seRed p-2 rounded-full shadow cursor-pointer text-white hover:bg-red-700 transition"
              aria-label="Edit Banner"
            >
              <PenLine size={16} />
            </button>
          )}


          {showModal && bannerData && (
            <BannerModal
              initialData={bannerData}
              onClose={() => setShowModal(false)}
              onSave={handleSave}
            />
          )}
          <motion.aside
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative w-full max-w-125 mx-auto lg:ml-auto"
          >
            <div className="rounded-3xl overflow-hidden border border-seGray/10 bg-seWhite shadow-2xl">
              <EmblaCarousel />
            </div>
          </motion.aside>

        </div>
      </div>
    </section>
  );
};

export default Banner;