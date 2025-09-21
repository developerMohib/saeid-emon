"use client"
import React from 'react';

const page = () => {
    return (
        <main className='bg-white'>
            <div className='max-w-6xl mx-auto'>
                <div className='text-right py-10'>
                    <button className='text-black px-2 py-1 rounded-4xl border border-gray-200 shadow-xs'>Print Resume</button>
                </div>
                <div className='bg-amber-500 py-16 px-20'>
                    <div className=''>
                        <header className="text-start divide-x-2">
                            <h1 className="text-3xl font-bold">Saeid Emon</h1>
                            <h2 className="text-xl">Graphic Designer</h2>
                            <p className="text-gray-600">Toronto, Ontario, Canada</p>
                        </header>
                    </div>
                    <div className='bg-amber-200 divide-x'>
                        <p>
                            Experienced Graphic Designer with 6 years of expertise in print and social media post design, as well as merchandise and branding. Let&apos;s create captivating visuals together! 🎨✨
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default page;