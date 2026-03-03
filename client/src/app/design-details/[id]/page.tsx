"use client"
import Link from 'next/link';
import React from 'react';
import useProduct from '@/hooks/useProduct';
import ImageGallery from '@/components/ImageGallery';
import { useParams } from 'next/navigation';
import Loader from '@/components/Loader';

const ProductDetails = () => {
    const params = useParams();
    const id = params?.id as string;
    const { data, isPending, isError, error } = useProduct(id);

    if (isPending) return <Loader />;
    if (isError || error) return <p>Error: {(error as Error).message}</p>;
    return (
        <div className="py-6 px-10 container mx-auto">
            <p className="text-seSlack/50 mb-6">{data.category}</p>
            <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
            <div className="w-full flex mb-6">
                {data?.images?.map((imgSrc: string, index: number) => (
                    <ImageGallery
                        key={index}
                        src={imgSrc}
                        alt={`project-image-${index}`}
                    />
                ))}
            </div>

            {/* Details */}
            <div className="max-w-3xl text-seBlack/80 px-4 sm:px-10 mx-auto space-y-8">
                {/* Intro */}
                <p>{data?.intro} </p>

                {/* CTA Button */}
                <Link href={"/contact"} >
                    <button className="mt-4 px-6 py-2 bg-seGray/10 hover:bg-seGray/20 rounded-full border border-seGray/30 shadow-sm text-seBlack transition-colors cursor-pointer">
                        GET A CUSTOM QOUTE
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductDetails;