"use client"
import Link from 'next/link';
import React from 'react';
import useProduct from '@/hooks/useProduct';
import Loading from '@/app/loading';
import ImageGallery from '@/components/elements/ImageGallery';
import { useParams } from 'next/navigation';

const ProductDetails = () => {
    const params = useParams();
    const id = params?.id as string;
    const { data, isPending, isError, error } = useProduct(id);

    if (isPending) return <Loading />;
    if (isError || error) return <p>Error: {(error as Error).message}</p>;
    return (
        <div className="py-6 px-10 container mx-auto">
            <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
            <p className="text-seSlack/50 mb-6">{data.category}</p>
            <div className="w-full flex justify-center mb-6">
                <ImageGallery src={data.image} alt={data.name} />
            </div>

            {/* Details */}
            <div className="max-w-3xl text-seBlack/80 px-4 sm:px-10 mx-auto space-y-8">
                {/* Intro */}
                <p> {data?.description.intro}</p>

                {/* What I Offer */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">What I Offer</h2>
                    <ul className="list-none space-y-2">
                        {data?.description.whatIOffer.map((item, i) => (
                            <li key={i} className="flex items-start">
                                <span className="text-green-600 mr-2">✔</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Why Choose Me */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">Why Choose Me?</h2>
                    <ul className="list-none space-y-2">
                        {data?.description.whyChooseMe.map((item, i) => (
                            <li key={i}>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* What You Provide */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">What You Provide</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {data?.description.whatYouProvide.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </section>

                {/* Extras */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">Extras (Available Upon Request)</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {data?.description.extras.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </section>

                {/* Closing */}
                <p className="italic">{data?.description.closing}</p>

                {/* CTA Button */}
                <Link href={"/contact"} >
                    <button className="mt-4 px-6 py-2 bg-seGray/10 hover:bg-seGray/20 rounded-full border border-seGray/30 shadow-sm text-seBlack transition-colors cursor-pointer">
                        Message Me Now 🚀
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ProductDetails;