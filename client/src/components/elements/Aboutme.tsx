import { ChevronRight, Facebook, Instagram, Linkedin, SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
type SocialLink = {
    name: string;
    icon: React.ReactNode;
    url: string;
};
const socials: SocialLink[] = [
    { name: "Facebook", icon: <Facebook  className="w-5 h-5 text-blue-600" />, url: "#" },
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5 text-blue-600" />, url: "#" },
    { name: "Instagram", icon: <Instagram className="w-5 h-5 text-pink-600" />, url: "#" },
];
const Aboutme = () => {
    return (
        <div className='my-5'>
            <div className="w-full">
                <ul className="w-full">
                    {socials.map((s, i) => (
                        <li key={i}>
                            <a
                                href={s.url}
                                target="_blank"
                                className="w-full flex justify-between items-center px-4 py-3 rounded-lg hover:bg-green-200 hover:opacity-50 transition"
                            >
                                <span className='flex gap-2'>{s.icon}{s.name}</span>
                                <SquareArrowOutUpRight />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='mt-5'>
                <h1 className='my-2'>Wprk experience</h1>
                <h1 className='my-2'>Graphic Designer</h1>
                <p>Santos Soul Productions - CA, USA</p>
                <br />
                <h1 className='my-2'>Graphic Designer</h1>
                <p>Santos Soul Productions - CA, USA</p>
            </div>
            <div className='my-5'>
            <Link href={'/resume'} className='flex hover:bg-gray-400' >View Full Resume <span> <ChevronRight /> </span> </Link>
            </div>
            <div className='mt-5'>
                <h1 className='my-2'>About Me</h1>
                <p>Experienced Graphic Designer with 6 years of expertise in print and social media post design, as well as merchandise and branding. Let&apos;s create captivating visuals together!</p>
            </div>
        </div>
    );
};

export default Aboutme;