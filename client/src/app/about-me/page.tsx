import { FiArrowDown, FiCpu,  FiLayers} from "react-icons/fi";
import { SiAdobephotoshop, SiAdobeillustrator, SiFigma, SiBlender } from "react-icons/si";

const AboutPage = () => {
    return (
        <div className="bg-[#0a0a0a] min-h-screen">
            {/* 1. HERO SECTION: The Narrative */}
            <section className="relative pt-32 pb-20 px-6 lg:px-8 container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <h2 className="text-purple-500 font-mono text-sm tracking-[0.5em] uppercase mb-6">
                            Est. 2018 — Legacy of Craft
                        </h2>
                        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-seBlack leading-none mb-10">
                            Saeid Emon. <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500 italic">
                                Visual Architect.
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-seGray font-light leading-relaxed max-w-3xl">
                            With nearly a decade of experience, I’ve transitioned from creating simple graphics to engineering 
                            comprehensive visual identities. My work exists at the intersection of <span className="text-white">mathematical logic</span> 
                            and <span className="text-white">creative chaos</span>.
                        </p>
                    </div>
                    <div className="lg:col-span-4 flex items-end justify-start lg:justify-end">
                        <div className="text-right">
                            <p className="text-6xl font-bold text-seBlack">08</p>
                            <p className="text-seGray font-mono uppercase tracking-widest text-xs">Years of <br /> Industry Grit</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THE SPEC SHEET: Tools & Expertise */}
            <section className="py-20 bg-white/5 backdrop-blur-sm border-y border-white/5">
                <div className="container mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {/* Expertise 01 */}
                        <div>
                            <div className="flex items-center gap-3 mb-6 text-purple-400">
                                <FiLayers size={20} />
                                <h3 className="font-mono text-xs uppercase tracking-widest">Core Disciplines</h3>
                            </div>
                            <ul className="space-y-4 text-seBlack text-lg font-medium">
                                <li>Identity Construction</li>
                                <li>Technical Apparel Design</li>
                                <li>Vector Mathematics</li>
                                <li>Brand Strategy</li>
                            </ul>
                        </div>

                        {/* Tools 02 */}
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-8 text-pink-500">
                                <FiCpu size={20} />
                                <h3 className="font-mono text-xs uppercase tracking-widest">Digital Arsenal</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                                <ToolItem icon={<SiAdobeillustrator />} name="Illustrator" level="98%" />
                                <ToolItem icon={<SiAdobephotoshop />} name="Photoshop" level="90%" />
                                <ToolItem icon={<SiFigma />} name="Figma" level="85%" />
                                <ToolItem icon={<SiBlender />} name="Blender" level="70%" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. DESIGN PHILOSOPHY */}
            <section className="py-32 px-6 lg:px-8 container mx-auto text-center">
                <div className="inline-block p-4 rounded-full border border-white/10 mb-12 animate-bounce">
                    <FiArrowDown className="text-purple-400" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-seBlack tracking-tighter max-w-4xl mx-auto leading-tight">
                    &quot;A logo is not a brand. It is a <span className="italic font-serif text-seGray">trigger</span> for a brand&apos;s entire story.&quot;
                </h2>
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
                   <Stat block="Agencies" value="04" />
                   <Stat block="Projects" value="250+" />
                   <Stat block="Sublimation" value="100%" />
                   <Stat block="Precision" value="0.01mm" />
                </div>
            </section>
        </div>
    );
};

/* --- Helper Components --- */

const ToolItem = ({ icon, name, level }: { icon: React.ReactNode, name: string, level: string }) => (
    <div className="group cursor-default hover:text-red-500">
        <div className="text-3xl text-seGray group-hover:text-white transition-colors mb-2">
            {icon}
        </div>
        <p className="text-seBlack text-sm font-bold">{name}</p>
        <div className="w-full h-1 bg-white/10 mt-2 overflow-hidden">
            <div className="h-full bg-purple-500 transition-all duration-1000" style={{ width: level }} />
        </div>
    </div>
);

const Stat = ({ block, value }: { block: string, value: string }) => (
    <div className="p-8 border border-white/5 rounded-3xl hover:bg-white/2 transition-colors">
        <p className="text-seGray font-mono text-[10px] uppercase tracking-widest mb-2">{block}</p>
        <p className="text-3xl font-bold text-seBlack">{value}</p>
    </div>
);

export default AboutPage;