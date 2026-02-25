import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiCheckCircle, FiPenTool, FiInstagram, FiDribbble } from "react-icons/fi";

const Author2 = () => {
    return (
        <section className="relative py-24 bg-transparent overflow-hidden">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 container mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left */}
                    <div className="relative w-full lg:w-1/3 max-w-[400px]">
                        <div className="relative aspect-5/4 rounded-[3rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group">
                            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80 z-10" />
                            <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center italic text-seGray/30 font-serif">
                                <Image
                                    src="https://images.pexels.com/photos/36211200/pexels-photo-36211200.jpeg"
                                    alt="User Avatar"
                                    width={450}
                                    height={450}
                                    className="rounded-full border-[3px] border-seWhite/80 object-cover"
                                    priority
                                />
                            </div>

                            <div className="absolute bottom-4 left-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                                <p className="text-white text-[10px] font-mono uppercase tracking-[0.2em]">
                                    Experience
                                </p>
                                <p className="text-2xl font-bold text-seBlack">
                                    08 Years
                                </p>
                            </div>
                        </div>
                        <div className="absolute -top-4 -left-4 w-full h-full border border-white/5 rounded-[3rem] -z-10" />
                    </div>

                    {/* Right */}
                    <div className="flex-1 text-left">
                        <h2 className="text-sm font-mono tracking-[0.5em] text-purple-400 uppercase font-bold">
                            Senior Graphic Designer
                        </h2>

                        <h3 className="text-4xl font-extrabold tracking-tight text-seBlack sm:text-6xl leading-tight">
                            Design That{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 italic">
                                Speaks
                            </span>
                        </h3>

                        <p className="text-xl text-seGray leading-relaxed mb-4 font-light max-w-2xl">
                            I build strong brand identities and clean visual systems
                            that connect, communicate, and convert.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/3 hover:bg-white/5">
                                <FiPenTool className="text-purple-400 mt-1" size={20} />
                                <div>
                                    <h4 className="text-white font-bold tracking-widest">
                                        Branding
                                    </h4>
                                    <p className="text-seGray text-sm mt-1">
                                        Logos, identity systems, brand guidelines.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-5 rounded-2xl border border-white/5 bg-white/3 hover:bg-white/5">
                                <FiCheckCircle className="text-pink-500 mt-1" size={20} />
                                <div>
                                    <h4 className="text-white font-bold tracking-widest">
                                        Creative Assets
                                    </h4>
                                    <p className="text-seGray text-sm mt-1">
                                        Social media, print, packaging, campaigns.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                            <Link href={'/about-me'} className="flex items-center gap-2 text-seBlack font-mono text-xs font-bold tracking-[0.2em] uppercase group border-b border-purple-500 pb-2 hover:text-purple-400 transition-all w-fit">
                                Read More{" "}
                                <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>

                            <div className="flex items-center gap-6 border-l border-white/10 pl-0 sm:pl-8">
                                <Link
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-seGray hover:text-purple-400 transition-colors text-xs font-mono tracking-widest uppercase"
                                >
                                    <FiInstagram size={18} /> Freelancer
                                </Link>

                                <Link
                                    href="https://dribbble.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-2 text-seGray hover:text-pink-500 transition-colors text-xs font-mono tracking-widest uppercase"
                                >
                                    <FiDribbble size={18} /> Fiverr
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Author2;