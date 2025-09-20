import { cards } from '@/data/workCard';
import Image from 'next/image';
import React from 'react';

const Works = () => {
    return (
        <div className="p-1 grid grid-cols-2 gap-6 justify-items-center">
            {cards?.map((card) => (
                <div
                    key={card.id}
                    className={`relative overflow-hidden ${card.bgColor} rounded-lg shadow-lg group `}
                >

                    <div className="relative pt-10 p-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        
                        <Image
                            className="relative w-full "
                            src={card.image}
                            alt={card.name}
                            width={900}
                            height={400}
                        />
                    </div>
                    <div className="relative text-red-800 px-6 pb-6 mt-6">
                        <span className="block opacity-75 -mb-1">{card.category}</span>
                        <div className="flex justify-between">
                            <span className="block font-semibold text-xl">{card.name}</span>
                            <span
                                className={`bg-white rounded-full ${card.textColor} text-xs font-bold px-3 py-2 leading-none flex items-center`}
                            >
                                {card.price}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
};

export default Works;