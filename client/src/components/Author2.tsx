import { FiArrowUpRight, FiCheckCircle, FiPenTool } from "react-icons/fi";

const Author2 = () => {
    return (
        <section className="relative py-24 bg-transparent overflow-hidden">
            {/* Background Glows to maintain the Infinite Canvas feel */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 container mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Left: The Visual / Profile Image */}
                    <div className="relative w-full lg:w-1/3 max-w-[400px]">
                        <div className="relative aspect-4/5 rounded-[3rem] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group">
                            {/* Replace with your photo */}
                            <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/80 z-10" />
                            <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center italic text-seGray/30 font-serif">
                                [ Photo_of_Designer ]
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute bottom-6 left-6 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                                <p className="text-white text-xs font-mono uppercase tracking-widest">Experience</p>
                                <p className="text-2xl font-bold text-seBlack">5+ Years</p>
                            </div>
                        </div>

                        {/* Decorative Grid behind image */}
                        <div className="absolute -top-4 -left-4 w-full h-full border border-white/5 rounded-[3rem] -z-10" />
                    </div>

                    {/* Right: The Narrative */}
                    <div className="flex-1 text-left">
                        <h2 className="text-sm font-mono tracking-[0.5em] text-blue-400 uppercase mb-4">The Architect</h2>
                        <h3 className="text-5xl font-bold text-seBlack tracking-tight mb-8">
                            Hi, I&apos;m <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-500 italic font-serif">Gemini</span>.
                        </h3>

                        <p className="text-xl text-seGray leading-relaxed mb-8 font-light">
                            I specialize in distilling brand values into <span className="text-white font-medium">singular, iconic marks</span> and modern apparel systems. My approach is rooted in mathematical grids, minimalist symbology, and the belief that a great logo should work as well on a postage stamp as it does on a skyscraper.
                        </p>

                        {/* Designer Stats/Values */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div className="flex items-start gap-4 p-4 rounded-2xl border border-white/5 bg-white/2">
                                <FiPenTool className="text-purple-400 mt-1" />
                                <div>
                                    <h4 className="text-white font-medium">Precision Crafted</h4>
                                    <p className="text-seGray text-sm">Every curve and anchor point is placed with purpose.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-2xl border border-white/5 bg-white/2">
                                <FiCheckCircle className="text-blue-400 mt-1" />
                                <div>
                                    <h4 className="text-white font-medium">Strategy First</h4>
                                    <p className="text-seGray text-sm">I design for your market, not just for the aesthetic.</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <button className="flex items-center gap-2 text-seBlack font-mono text-sm tracking-widest uppercase group border-b-2 border-purple-500 pb-1 hover:text-purple-400 transition-all">
                                Read My Story <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>

                            {/* Fake Signature or Branding Element */}
                            <div className="hidden sm:block text-seGray/20 text-4xl font-serif italic select-none">
                                Gemini Studio.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Author2;