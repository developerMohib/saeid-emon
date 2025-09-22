import { cardsData } from '@/data/workCard';
import Image from 'next/image';
import React from 'react';
type Props = {
    params: { id: string }
};
const page = async ({ params }: Props) => {
    const { id } = await params;
    const card = cardsData.find((c) => String(c.id) === id);

    if (!card) {
        return <div className="p-6 text-red-500">Card not found</div>;
    }
    const {description} = card ;
    return (
        <div className="p-6 container mx-auto">
            <h1 className="text-3xl font-bold mb-4">{card.name}</h1>
            <p className="text-gray-500 mb-6">{card.category}</p>

            <Image
                src={card.image}
                alt={card.name}
                width={900}
                height={600}
                className="rounded-lg shadow-md mb-6"
            />
            <div className="max-w-3xl text-gray-800 px-10">
                <h1 className="mb-4">
                    {description.intro}
                </h1>
                <p className="mb-6">
                    With my expertise as a Graphic Designer and years of experience, I specialize in creating high-quality, visually appealing magazine layouts tailored to your needs.
                </p>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">What I Offer:</h2>
                    <ul className="list-none space-y-2">
                        <li className="flex items-center">
                            <span className="text-green-600 mr-2">✔</span> Custom magazine designs for print or digital formats
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-600 mr-2">✔</span> Engaging cover designs that make an impact
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-600 mr-2">✔</span> Professional page layouts with well-structured content and stunning visuals
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-600 mr-2">✔</span> Typography and color schemes that align with your brand identity
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-600 mr-2">✔</span> Design tailored to various industries – fashion, business, lifestyle, tech, and more
                        </li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Why Choose Me?</h2>
                    <ul className="list-none space-y-2">
                        <li className="flex items-center">
                            <span className="text-yellow-500 mr-2">⚡</span> Creative Expertise: Years of experience in graphic design, ensuring unique and high-quality results
                        </li>
                        <li className="flex items-center">
                            <span className="text-yellow-500 mr-2">📐</span> Detail-Oriented: Your magazine will look polished, organized, and professional
                        </li>
                        <li className="flex items-center">
                            <span className="text-yellow-500 mr-2">⏳</span> Unlimited Revisions: I’ll work with you until you’re 100% satisfied
                        </li>
                        <li className="flex items-center">
                            <span className="text-yellow-500 mr-2">⏰</span> Timely Delivery: Deadlines are my priority, and you’ll always receive on-time results
                        </li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">What You Provide:</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Your magazine’s content (text, images, articles, ads, etc.)</li>
                        <li>Your brand guidelines (if any) or your preferences for style and colors</li>
                        <li>Specific instructions (page count, themes, etc.)</li>
                    </ul>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Extras (Available Upon Request):</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Stock images for your magazine</li>
                        <li>Interactive PDF design for digital magazines</li>
                        <li>Printing assistance and consultation</li>
                    </ul>
                </div>

                <p className="mb-4">
                    Let me bring your magazine to life with a design that speaks to your audience! Whether you’re launching a new publication or need a fresh redesign, I’m here to help.
                </p>

                <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
                    Message me now to discuss your project or request a custom quote. Let’s create something extraordinary together!
                </button>
            </div>

        </div>
    );
};

export default page;