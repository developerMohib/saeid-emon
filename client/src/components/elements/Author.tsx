import { author } from '@/data/authorData';
import Image from 'next/image';
import React from 'react';
import { CircleAlert, Mail, MapPinCheck, ShoppingBag } from "lucide-react";
const iconMap = {
    Title: <CircleAlert className="w-4 h-4 text-red-600" />,
    Company: <ShoppingBag className="w-4 h-4 text-blue-600" />,
    Location: <MapPinCheck className="w-4 h-4 text-green-600" />,
};
const Author = () => {
    return (
        <div className='w-3/4 mx-auto'>
            <div className='relative'>
                <Image src={"https://mir-s3-cdn-cf.behance.net/user/230/4821b1302963013.5d29ed92444b7.jpg"} alt='saeid emon' width={900} height={900} className='rounded-full h-24 w-24 absolute left-0 -top-16 border-2 border-white' />
            </div>

            <div className="pt-16 pb-6 space-y-8 text-start">
                <h1 className="text-lg font-semibold">Saeid Emon</h1>
                <ul className="space-y-2">
                    {author.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                            {/* Icon based on label */}
                            {iconMap[item.label]}

                            {/* Value */}
                            <span className="text-gray-700">{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
<div>
    <button className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
    <Mail /> Message
  </button>
</div>
        </div>
    );
};

export default Author;