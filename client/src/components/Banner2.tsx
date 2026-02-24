import React from 'react';

const Banner2 = () => {
    return (
        <section className="relative overflow-hidden bg-[#0a0a0a] py-24 sm:py-32">
      {/* Background Mesh Gradient */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:items-center">
          
          {/* Left Column: Typography & CTA */}
          <div>
            <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-widest uppercase text-purple-400 mb-6">
              Available for Freelance
            </span>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
              Visual <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Alchemist</span> & Digital Designer.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-400 max-w-md">
              Turning complex problems into elegant visual solutions through intentional UI/UX and brand storytelling.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a href="#" className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200">
                View Work
              </a>
              <a href="#" className="text-sm font-semibold leading-6 text-white group">
                The Process <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Element / Placeholder */}
          <div className="relative lg:ml-auto">
            <div className="aspect-[4/3] w-full max-w-[500px] rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="h-full w-full rounded-xl bg-gradient-to-br from-gray-800 to-black overflow-hidden flex items-center justify-center border border-white/5">
                {/* Replace this with your actual portfolio image or a high-end render */}
                <p className="text-gray-600 font-mono text-sm tracking-tighter">
                  [ Featured_Project_01.png ]
                </p>
              </div>
            </div>
            
            {/* Design Accents */}
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full border border-purple-500/20 bg-purple-500/10 blur-xl" />
          </div>

        </div>
      </div>
    </section>
    );
};

export default Banner2;