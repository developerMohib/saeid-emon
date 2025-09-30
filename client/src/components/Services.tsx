import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
const image = 'https://cdn.dribbble.com/userupload/43200390/file/original-ade45dbb987e40dd76cad00f5cc7be23.png'
import Marquee from "react-fast-marquee";
const categories = [
    { name: "Web Design", img: { image }, link: "/" },
    { name: "Development", img: { image }, link: "/" },
    { name: "Branding", img: { image }, link: "/" },
    { name: "UI/UX", img: { image }, link: "/" },
    { name: "SEO", img: { image }, link: "/" },
];
const Services = () => {
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

            <div>
                {/* What I Offer */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">What I Offer</h2>
                    <ul className="list-none space-y-2">
                        {/* {data?.description.whatIOffer.map((item, i) => (
                            <li key={i} className="flex items-start">
                                <span className="text-green-600 mr-2">✔</span>
                                <span>{item}</span>
                            </li>
                        ))} */}
                    </ul>
                </section>

                {/* Why Choose Me */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">Why Choose Me?</h2>
                    <ul className="list-none space-y-2">
                        {/* {data?.description.whyChooseMe.map((item, i) => (
                            <li key={i}>
                                <span>{item}</span>
                            </li>
                        ))} */}
                    </ul>
                </section>

                {/* What You Provide */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">What You Provide</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {/* {data?.description.whatYouProvide.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))} */}
                    </ul>
                </section>

                {/* Extras */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">Extras (Available Upon Request)</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {/* {data?.description.extras.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))} */}
                    </ul>
                </section>

                {/* Closing */}
                <p className="italic">data?.description.closing</p>
            </div>
        </div>
    );
};

export default Services;