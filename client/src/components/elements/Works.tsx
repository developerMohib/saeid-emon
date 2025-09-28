import Loading from '@/app/loading';
import useProducts from '@/hooks/useProducts';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Works = () => {
    const { data: cardsData, error, isPending, isError } = useProducts();
    const user = true;
    if (isPending) return <Loading />
    if (error || isError) return 'An error has occurred: ' + error?.message
    return (
        <div className="p-1 md:grid grid-cols-2 gap-6 justify-items-center">
            {cardsData?.map((card) => (
                <div
                    key={card._id}
                    className="relative overflow-hidden rounded-lg shadow-lg group"
                >
                    {/* Image Section */}
                    <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Image
                            className="relative"
                            src={card.images[0]}
                            alt={card.title}
                            width={900}
                            height={900}
                        />
                    </div>

                    {/* Hidden Details - Visible on Hover */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-seBlack/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="block text-seGray text-sm">{card.category}</span>
                        <div className="flex justify-between items-center text-seWhite">
                            <Link href={`/design-details/${card._id}`}><span className="block font-semibold text-xl hover:underline">{card.title}</span></Link>
                            <Link href={`/design-details/${card._id}`}>
                                <button className="rounded-full text-xs font-bold px-3 py-2 bg-seGray/40 backdrop-blur-md hover:bg-seWhite/40 transition-colors cupsor-pointer">
                                    View Details
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}


            {user && (<div className="w-full h-80 rounded-lg flex items-center justify-center border border-dashed">
                <div>
                    <span >
                        <Plus
                            className="h-6 w-6 mx-auto mb-4 rounded-full bg-seBlue text-white font-bold"
                        />
                    </span>

                    {/* Link with button */}
                    <Link href="/create-project">
                        <button className="bg-seSlack/10 border border-seSlack/10 px-2 py-1 rounded-lg cursor-pointer hover:bg-seGray/40 text-center text-sm font-semibold text-seSlack/90 transition-colors">
                            Create A Project
                        </button>
                    </Link>
                </div>
            </div>)}


        </div>
    );
};

export default Works;