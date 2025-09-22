import Image from 'next/image';
import React from 'react';
import coverbanner from "../../../public/images/banner.png";
const Banner = () => {
    return (
        <div className="relative w-full h-56 pt-0 -mt-3.5">
            <Image
                src={coverbanner}
                alt="Banner"
                fill
                className="object-cover md:object-contain"
                priority
            />
        </div>
    );
};

export default Banner;