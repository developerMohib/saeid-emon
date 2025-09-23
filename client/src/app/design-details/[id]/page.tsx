import ImageGallery from '@/components/elements/ImageGallery';
import { cardsData } from '@/data/workCard';
import Image from 'next/image';
import Link from 'next/link';
type Props = {
    params: { id: string }
};
const page = async ({ params }: Props) => {
    const { id } = await params;
    const card = cardsData.find((c) => String(c.id) === id);

    if (!card) {
        return <div className="p-6 text-red-500">Card not found</div>;
    }
    const { description } = card;
    return (
        <div className="py-6 px-10 container mx-auto">
            <h1 className="text-3xl font-bold mb-4">{card.name}</h1>
            <p className="text-seSlack/50 mb-6">{card.category}</p>
            <div className="w-full flex justify-center mb-6">
                <ImageGallery src={card.image} alt={card.name} />
            </div>

            {/* Details */}
            <div className="max-w-3xl text-seBlack/80 px-4 sm:px-10 mx-auto space-y-8">
                {/* Intro */}
                <p>{description.intro}</p>

                {/* What I Offer */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">What I Offer</h2>
                    <ul className="list-none space-y-2">
                        {description.whatIOffer.map((item, i) => (
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
                        {description.whyChooseMe.map((item, i) => (
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
                        {description.whatYouProvide.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </section>

                {/* Extras */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">Extras (Available Upon Request)</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {description.extras.map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </section>

                {/* Closing */}
                <p className="italic">{description.closing}</p>

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

export default page;