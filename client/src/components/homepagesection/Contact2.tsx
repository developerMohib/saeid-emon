"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FiSend, FiInstagram, FiTwitter, FiDribbble, FiMapPin, FiClock } from 'react-icons/fi';

const ContactSection = () => {
  // Animation Variants
  const fadeInUp :Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <section className="relative py-12 sm:py-24 bg-transparent overflow-visible">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none opacity-50" aria-hidden="true" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none opacity-50" aria-hidden="true" />

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:gap-x-16">
          
          {/* Left Side: Branding & Location */}
          <article className="flex flex-col justify-between">
            <header>
              <motion.h2 
                custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="text-sm tracking-[0.4em] text-blue-400 uppercase mb-4 font-bold"
              >
                Let&apos;s Connect
              </motion.h2>
              <motion.h3 
                custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="text-5xl font-bold text-white tracking-tight leading-[1.1]"
              >
                Ready to define your <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500 italic font-serif">visual legacy?</span>
              </motion.h3>
              <motion.p 
                custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
                className="mt-6 text-lg text-gray-400 max-w-md font-light"
              >
                Whether you need a timeless logo or a full teamwear identity, I’m here to help you stand out.
              </motion.p>
            </header>

            {/* Author Location Detail */}
            <motion.address 
              custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="mt-12 not-italic space-y-4"
            >
              <div className="flex items-center gap-3 text-gray-400 group">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-blue-400 transition-colors">
                   <FiMapPin className="text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Studio Location</p>
                  <p className="text-white">La Ronge, SK — Canada</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400 group">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-purple-400 transition-colors">
                   <FiClock className="text-purple-400" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Local Time</p>
                  <p className="text-white">CST — Available Globally</p>
                </div>
              </div>
            </motion.address>

            {/* Social Links */}
            <motion.nav 
              custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              className="mt-12"
            >
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-6 font-bold">Follow the process</p>
              <div className="flex gap-4">
                {[
                  { icon: <FiInstagram />, color: "hover:text-purple-400 hover:border-purple-400/50" },
                  { icon: <FiDribbble />, color: "hover:text-blue-400 hover:border-blue-400/50" },
                  { icon: <FiTwitter />, color: "hover:text-white/60" }
                ].map((social, i) => (
                  <a key={i} href="#" className={`p-4 rounded-2xl bg-white/5 border border-white/10 text-white transition-all hover:-translate-y-1 ${social.color}`}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.nav>
          </article>

          {/* Right Side: The Form */}
          <motion.aside 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[2.5rem] border border-white/10 bg-white/2 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 px-1 font-bold">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-white/10"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 px-1 font-bold">Email</label>
                  <input 
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-white/10"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 px-1 font-bold">Project Type</label>
                <div className="relative">
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all appearance-none cursor-pointer">
                    <option className="bg-[#111]">Logo & Branding</option>
                    <option className="bg-[#111]">Jersey & Apparel</option>
                    <option className="bg-[#111]">Illustration</option>
                    <option className="bg-[#111]">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2 px-1 font-bold">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-white/10 resize-none"
                  placeholder="Tell me about your vision..."
                />
              </div>

              <button className="group relative w-full overflow-hidden rounded-xl bg-linear-to-r from-purple-600 to-blue-600 p-px transition-all hover:scale-[1.01] active:scale-[0.99]">
                <div className="flex items-center justify-center gap-2 rounded-xl bg-[#0a0a0a] py-5 transition-all group-hover:bg-transparent">
                  <span className="text-sm font-bold uppercase tracking-widest text-white">Send Message</span>
                  <FiSend className="text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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