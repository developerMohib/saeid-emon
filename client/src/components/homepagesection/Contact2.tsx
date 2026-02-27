"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FiSend, FiMapPin, FiClock } from 'react-icons/fi';

const ContactSection = () => {
  // Animation Variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <section className="relative py-12 sm:py-24 bg-background transition-colors duration-500 overflow-visible">
      {/* Background Glows - Linked to theme variables */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-seBlue/5 blur-[130px] rounded-full pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
          
          {/* Left Side: Branding & Location */}
          <article>
            <header>
              <motion.h2 
                custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="text-xs sm:text-sm tracking-[0.4em] text-seBlue uppercase mb-4 font-bold"
              >
                Let&apos;s Connect
              </motion.h2>
              <motion.h3 
                custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="text-4xl sm:text-5xl font-black text-seBlack tracking-tight leading-[1.1]"
              >
                Ready to define your <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-accent to-seBlue italic font-serif">
                  visual legacy?
                </span>
              </motion.h3>
              <motion.p 
                custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="mt-6 text-base sm:text-lg text-seGray max-w-md font-medium"
              >
                Whether you need a timeless logo or a full teamwear identity, I’m here to help you stand out.
              </motion.p>
            </header>

            {/* Author Location Detail */}
            <motion.address 
              custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="mt-12 not-italic space-y-4"
            >
              <div className="flex items-center gap-3 text-seGray group">
                <div className="p-3 rounded-xl bg-seGray/5 border border-seGray/10 group-hover:border-seBlue transition-colors">
                    <FiMapPin className="text-seBlue" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-seGray/60 font-bold">Studio Location</p>
                  <p className="text-seBlack font-semibold">La Ronge, SK — Canada</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-seGray group">
                <div className="p-3 rounded-xl bg-seGray/5 border border-seGray/10 group-hover:border-accent transition-colors">
                    <FiClock className="text-accent" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-seGray/60 font-bold">Local Time</p>
                  <p className="text-seBlack font-semibold">CST — Available Globally</p>
                </div>
              </div>
            </motion.address>
            
          </article>

          {/* Right Side: The Form */}
          <motion.aside 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[2.5rem] border border-seGray/10 bg-seWhite backdrop-blur-2xl p-8 sm:p-12 shadow-2xl shadow-seGray/5"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-seGray mb-2 px-1 font-bold">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-background border border-seGray/10 rounded-xl py-4 px-4 text-seBlack focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all placeholder:text-seGray/30"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-seGray mb-2 px-1 font-bold">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-background border border-seGray/10 rounded-xl py-4 px-4 text-seBlack focus:outline-none focus:ring-2 focus:ring-seBlue/50 transition-all placeholder:text-seGray/30"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-seGray mb-2 px-1 font-bold">Project Type</label>
                <div className="relative">
                  <select className="w-full bg-background border border-seGray/10 rounded-xl py-4 px-4 text-seBlack focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none cursor-pointer">
                    <option className="bg-seWhite">Logo & Branding</option>
                    <option className="bg-seWhite">Jersey & Apparel</option>
                    <option className="bg-seWhite">Illustration</option>
                    <option className="bg-seWhite">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-seGray mb-2 px-1 font-bold">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-background border border-seGray/10 rounded-xl py-4 px-4 text-seBlack focus:outline-none focus:ring-2 focus:ring-seBlue/50 transition-all placeholder:text-seGray/30 resize-none"
                  placeholder="Tell me about your vision..."
                />
              </div>

              <button className="group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-accent to-seBlue p-px transition-all hover:scale-[1.01] active:scale-[0.99]">
                <div className="flex items-center justify-center gap-2 rounded-xl bg-seWhite py-5 transition-all group-hover:bg-transparent">
                  <span className="text-sm font-bold uppercase tracking-widest text-seBlack group-hover:text-white">Send Message</span>
                  <FiSend className="text-seBlack group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </button>
            </form>
          </motion.aside>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;