import Loading from '@/app/loading';
import useProducts from '@/hooks/useProducts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Works = () => {
    const { data, error, isPending, isError } = useProducts();
    if (isPending) return <Loading />
    const cardsData = data
    if (error || isError) return 'An error has occurred: ' + error?.message
    return (
        <div className="p-1 md:grid grid-cols-2 gap-6 justify-items-center">
            {cardsData?.map((card) => (
                <div
                    key={card._id}
                    className="relative overflow-hidden rounded-lg shadow-lg group"
                >
                    {/* Image Section */}
                    <div className="relative pt-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Image
                            className="relative"
                            src={card.image}
                            alt={card.name}
                            width={900}
                            height={900}
                        />
                    </div>

                    {/* Hidden Details - Visible on Hover */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-seBlack/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="block text-seGray text-sm">{card.category}</span>
                        <div className="flex justify-between items-center text-seWhite">
                            <Link href={`/design-details/${card._id}`}><span className="block font-semibold text-xl hover:underline">{card.name}</span></Link>
                            <Link href={`/design-details/${card._id}`}>
                                <span className="rounded-full text-xs font-bold px-3 py-2 bg-seGray/40 backdrop-blur-md hover:bg-seWhite/40">
                                    View Details
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Works;