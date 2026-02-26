import HeroVisual from "@/components/aboutpagesection/HeroVisual";
import ToolsGrid from "@/components/aboutpagesection/ToolsGrid";
import { FiArrowDown, FiLayers } from "react-icons/fi";

export const metadata = {
  title: "About | Saeid Emon - Visual Architect",
  description: "Learn about Saeid Emon's decade of experience in visual identity and design engineering.",
};

export default function AboutPage() {
  return (
    <main className="bg-transparent overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative py-24 px-6 lg:px-8 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <header className="lg:col-span-7">
            <p className="text-seRed text-xs tracking-[0.5em] uppercase mb-6 font-bold">
              Est. 2018 — Legacy of Craft
            </p>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.9] mb-6">
              Saeid Emon. <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-pink-500 to-seRed italic">
                Visual Architect.
              </span>
            </h1>

            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl mb-6">
              With nearly a decade of experience, I’ve transitioned from creating simple graphics to engineering 
              comprehensive visual identities. My work exists at the intersection of 
              <span className="text-white font-medium"> mathematical logic</span> and 
              <span className="text-seRed font-medium"> creative chaos</span>.
            </p>

            <div className="flex items-center gap-6">
              <div className="text-left">
                <p className="text-6xl font-black text-white leading-none">08</p>
                <p className="text-gray-500 uppercase tracking-widest text-[10px] mt-2">Years of <br /> Industry Grit</p>
              </div>
              <div className="h-12 w-px bg-white/10 hidden md:block" />
              <div className="hidden md:block">
                <p className="text-gray-400 text-sm max-w-[200px] leading-tight font-medium">
                  Based in La Ronge, SK. <br /> Crafting global identities.
                </p>
              </div>
            </div>
          </header>

          <aside className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroVisual />
          </aside>
        </div>
      </section>

      {/* 2. THE SPEC SHEET */}
      <section className="py-20 bg-white/5 backdrop-blur-sm border-y border-white/5">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <article>
              <div className="flex items-center gap-3 mb-8 text-purple-400">
                <FiLayers size={20} />
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold">Core Disciplines</h3>
              </div>
              <ul className="space-y-6 text-white text-lg font-medium">
                {["Identity Construction", "Technical Apparel Design", "Vector Mathematics", "Brand Strategy"].map((item) => (
                  <li key={item} className="flex items-center gap-3 group cursor-default">
                    <span className="h-px w-4 bg-seRed group-hover:w-8 transition-all" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <div className="md:col-span-2">
              <ToolsGrid />
            </div>
          </div>
        </div>
      </section>

      {/* 3. DESIGN PHILOSOPHY */}
      <section className="py-32 px-6 lg:px-8 container mx-auto text-center">
        <div className="inline-block p-4 rounded-full border border-white/10 mb-12 animate-bounce">
          <FiArrowDown className="text-seRed" />
        </div>
        
        <blockquote className="border-none p-0 m-0">
          <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tighter max-w-5xl mx-auto leading-tight">
            &quot;A logo is not a brand. <br/> It is a <span className="italic text-seRed">trigger</span> for a brand&apos;s entire story.&quot;
          </h2>
        </blockquote>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard block="Agencies" value="04" />
          <StatCard block="Projects" value="250+" />
          <StatCard block="Sublimation" value="100%" />
          <StatCard block="Precision" value="0.01mm" />
        </div>
      </section>
    </main>
  );
}

function StatCard({ block, value }: { block: string; value: string }) {
  return (
    <div className="p-10 border border-white/5 rounded-[2.5rem] bg-[#0a0a0a] hover:bg-white/2 transition-all group">
      <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mb-3 group-hover:text-seRed transition-colors">{block}</p>
      <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
    </div>
  );
}