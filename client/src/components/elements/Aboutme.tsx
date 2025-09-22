import { ChevronRight, Facebook, Instagram, Linkedin, SquareArrowOutUpRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
type SocialLink = {
    name: string;
    icon: React.ReactNode;
    url: string;
};
const socials: SocialLink[] = [
    { name: "Facebook", icon: <Facebook  className="w-4 h-4 text-seBlack" />, url: "/" },
    { name: "LinkedIn", icon: <Linkedin className="w-4 h-4 text-seBlack" />, url: "/" },
    { name: "Instagram", icon: <Instagram className="w-4 h-4 text-seBlack rounded-full" />, url: "/" },
];
const Aboutme = () => {
    return (
        <div className='my-10'>
            <div className="w-full">
            <h1 className='text-xs uppercase font-semibold text-seGray'>On The Web</h1>
                <ul className="w-full">
                    {socials.map((s, i) => (
                        <li className='my-2' key={i}>
                            <a
                                href={s.url}
                                target="_blank"
                                className="w-full flex justify-between items-center px-4 py-3 rounded-md hover:bg-seGray/20 transition border border-seGray/20"
                            >
                                <span className='flex gap-2 text-xs font-semibold'>{s.icon}{s.name}</span>
                                <SquareArrowOutUpRight className='text-seGray/80 w-4 h-4' />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='my-5'>
            <Link href={'/resume'} className='flex text-seGray items-center hover:text-seBlack text-sm' >View Full Resume <span> <ChevronRight className='w-4 h-4' /> </span> </Link>
            </div>
            <div className='mt-5'>
                <h1 className='my-2 uppercase text-seGray text-xs font-semibold'>About Me</h1>
                <p className='text-sm text-seBlack leading-6'>Experienced Graphic Designer with 6 years of expertise in print and social media post design, as well as merchandise and branding. Let&apos;s create captivating visuals together!</p>
            </div>
        </div>
    );
};

export default Aboutme;