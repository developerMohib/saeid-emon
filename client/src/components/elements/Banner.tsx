"use client";
import Image from 'next/image';
import React from 'react';
import coverbanner from "../../../public/images/banner.png";
import Loading from '@/app/loading';
import { useAuthUser } from '@/hooks/useAuthUser';
const Banner = () => {
    const { isPending, isError, error, data } = useAuthUser();

    if (isPending) return <Loading />;
    if (isError) return <p>Error: {error?.message}</p>;
    const newdata = data[0];
    return (
        <div className="relative w-full h-56 pt-0 -mt-3.5">
            <Image
                src={newdata?.banner || coverbanner}
                alt="Banner"
                fill
                className="object-cover md:object-contain"
                priority
            />
        </div>
    );
};

export default Banner;