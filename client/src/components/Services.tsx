import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
const image = 'https://cdn.dribbble.com/userupload/43200390/file/original-ade45dbb987e40dd76cad00f5cc7be23.png'
import Marquee from "react-fast-marquee";
import { LuCrown } from "react-icons/lu";
import {  FaPencilRuler, FaTshirt } from 'react-icons/fa';
import { BsFillPersonVcardFill } from "react-icons/bs";
import { BsCalendarEvent } from 'react-icons/bs';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { faqData } from '@/data/workCard';
import { ChevronDown } from 'lucide-react';
const categories = [
    { name: "Web Design", img: { image }, link: "/" },
    { name: "Development", img: { image }, link: "/" },
    { name: "Branding", img: { image }, link: "/" },
    { name: "UI/UX", img: { image }, link: "/" },
    { name: "SEO", img: { image }, link: "/" },
];
const services = [
    {
        icon: <LuCrown className="text-white text-4xl" />,
        title: "Brand Identity",
        desc: "Logos, Color Systems, Typography",
    },
    {
        icon: <BsFillPersonVcardFill className="text-white text-4xl" />,
        title: "Business Cards & Stationery",
        desc: "Professional print-ready layouts",
    },
    {
        icon: <FaTshirt className="text-white text-4xl" />,
        title: "Jersey & Teamwear Design",
        desc: "Modern sports apparel & team branding",
    },
    {
        icon: <BsCalendarEvent className="text-white text-4xl" />,
        title: "Social Media Graphics",
        desc: "Banners, posts, covers, ad creatives",
    },
    {
        icon: <RiShoppingBag3Fill className="text-white text-4xl" />,
        title: "Merchandise Design",
        desc: "Apparel, packaging, promotional items",
    },
    {
        icon: <FaPencilRuler className="text-white text-4xl" />,
        title: "Custom Illustrations",
        desc: "Bespoke digital artwork & visuals",
    },
];
const Services = () => {

 const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };




    return (
        <div className="py-10">
            
            <Marquee pauseOnHover={true} speed={50} gradient={false}>
                {categories.map((item, index) => (
                    <Link
                        key={index}
                        href={item.link}
                        className="mx-4 group cursor-pointer block"
                    >
                        <div className="flex flex-col items-center">
                            <div className="w-72 h-72 overflow-hidden rounded-xl">
                                <Image
                                    src={image}
                                    alt={item.name}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <p className="mt-2 text-center font-semibold text-sm">
                                {item.name}
                            </p>
                        </div>
                    </Link>
                ))}
            </Marquee>

            <div className="px-6 pt-10">
                <h2 className="text-3xl font-bold mb-10"></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services?.map((service, index) => (
                        <div key={index} className="shadow-lg rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300">
                            <div className="flex items-start gap-4">
                                <div className="bg-red-800 p-4 rounded-xl flex items-center justify-center">
                                    {service.icon}
                                </div>
                                <div>
                                    <h3 className="text-3xl font-semibold mb-2">{service.title}</h3>
                                    <p className="text-xl opacity-90">{service.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <section className="">
                <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                    <h2 className="text-2xl font-semibold sm:text-4xl my-10">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <details key={index} className="w-full bg-seBlack/10 rounded-lg">
                                <summary className="px-4 py-6 text-seBlack/70 cursor-pointer">
                                    {faq.question}
                                </summary>
                                <p className="py-6 ml-4 -mt-4 text-seBlack/70">
                                    {faq.answer}
                                </p>
                            </details>
                        ))}
                    </div>



<div className="space-y-3">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`border border-blue-400 rounded-2xl p-4 transition-all duration-300 ${
              openIndex === index ? "bg-blue-50 shadow-md" : "bg-white"
            }`}
          >
            <button
              className="flex justify-between items-center w-full text-left font-medium text-lg"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
               <ChevronDown
    className={`h-5 w-5 transition-transform duration-300 ${
      openIndex === index ? "rotate-180" : ""
    }`}
  />
            </button>

            {openIndex === index && (
              <div className="mt-3 text-gray-700 text-sm leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>




                </div>
            </section>
        </div>
    );
};

export default Services;