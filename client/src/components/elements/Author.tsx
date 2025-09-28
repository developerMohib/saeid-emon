"use client";
import Image from 'next/image';
import Link from 'next/link';
import { CircleAlert, FilePen, Mail, MapPinCheck, ShoppingBag } from "lucide-react";
import { useAuthUser } from '@/hooks/useAuthUser';


const Author = () => {
    const { isPending, isError, error, data } = useAuthUser();
    const user = false;
    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.message}</p>;

    const newdata = data[0];
    return (
        <section aria-labelledby="author-heading" className="relative">
            {/* Profile image */}
            <div className="absolute left-0 -top-16">
                <Image
                    src={newdata?.avatar}
                    alt="Portrait of Saeid Emon"
                    width={900}
                    height={900}
                    className="rounded-full h-24 w-24 border-2 border-seWhite"
                    priority
                />
            </div>

            {/* Author Info */}
            <header className="pt-16 pb-6 space-y-8 text-start">
                <h1 id="author-heading" className="text-2xl font-semibold">
                    {newdata?.name}
                </h1>

                <ul className="space-y-2">
                    <li className="flex items-center gap-2"> <CircleAlert className="w-4 h-4 text-seRed" />  <span className="text-seSlack">{newdata?.proffession}</span> </li>
                    <li className="flex items-center gap-2"> <ShoppingBag className="w-4 h-4 text-seBlue" />  <span className="text-seSlack">{newdata?.description}</span> </li>
                    <li className="flex items-center gap-2"> <MapPinCheck className="w-4 h-4 text-seBlack" /> <span className="text-seSlack">{newdata?.location}</span> </li>
                </ul>
            </header>

            {/* Hire me button */}
            <footer>
                <Link href="/contact">
                    <button
                        className="flex items-center justify-center gap-2 w-full bg-seGray/20 text-seRed hover:text-seWhite py-2 rounded-lg hover:bg-seRed transition-colors cursor-pointer"
                    >
                        <Mail />
                        Hire Me
                    </button>
                </Link>
                {/* Edit Profile Info button */}
                {user && (<div className='mt-3'>
                    <button
                        className="flex items-center justify-center gap-2 w-full bg-seBlue/90 text-seWhite hover:text-seSlack py-2 rounded-lg hover:bg-seRed/80 transition-colors cursor-pointer"
                    >
                        <FilePen />
                        Edit Profile Info
                    </button>
                </div>)}
            </footer>
        </section>
    );
};

export default Author;
