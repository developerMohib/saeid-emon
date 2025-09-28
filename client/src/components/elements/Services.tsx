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
        </div>
    );
};

export default Services;