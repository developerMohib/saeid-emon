import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className="relative w-full h-56 pt-0">
            <Image
                src="/images/banner.png"
                alt="Banner"
                fill
               className="object-cover md:object-contain"
                priority
            />
        </div>
    );
};

export default Banner;