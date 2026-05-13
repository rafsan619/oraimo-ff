import RegistrationModal from "@/components/RegistrationModal";

export default function Home() {
  return (
    <main className="min-h-screen bg-carbon-900 text-gray-300 overflow-x-hidden">
      {/* Top Navigation Shell */}
      <nav className="fixed top-0 w-full z-50 bg-carbon-900/80 backdrop-blur-md border-b border-carbon-700/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-neon-green font-grotesk text-2xl font-bold tracking-tighter uppercase">
            Oraimo <span className="text-white">x</span> Free Fire
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 z-10">
            <h1 className="font-grotesk text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-[0.9]">
              <span className="text-white">The Biggest</span><br />
              <span className="text-neon-green drop-shadow-[0_0_15px_rgba(57,255,20,0.4)]">Collaboration</span><br />
              <span className="text-white">Of 2026</span>
            </h1>
            <p className="text-lg md:text-xl max-w-lg text-gray-400">
              Gear up with the ultimate performance audio. Register now for the exclusive Showmatch and win massive prizes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <RegistrationModal>
                <button className="px-8 py-4 bg-gradient-to-br from-neon-green-light to-neon-green-dark text-black font-grotesk font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] cursor-pointer">
                  Register Now
                </button>
              </RegistrationModal>
              <button className="px-8 py-4 bg-carbon-800 border border-neon-green text-white font-grotesk font-bold uppercase tracking-widest hover:bg-neon-green/10 transition-colors duration-300 cursor-pointer">
                Play Showmatch
              </button>
            </div>
          </div>
          
          <div className="relative aspect-[4/5] lg:aspect-square w-full max-w-lg mx-auto">
            {/* Image Placeholder */}
            <div className="absolute inset-0 bg-carbon-700 rounded-2xl border border-carbon-700 flex items-center justify-center shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-carbon-900/80 to-transparent"></div>
              <div className="text-neon-green font-grotesk text-2xl font-bold uppercase tracking-widest z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                Free Fire Character
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/10 blur-[50px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-neon-cyan/10 blur-[60px] rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Buy and Win Section */}
      <section className="py-24 px-6 bg-carbon-800 relative border-y border-carbon-700/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-grotesk text-4xl md:text-5xl font-black uppercase text-white mb-16">
            Buy and Win
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[1, 2].map((i) => (
              <div key={i} className="aspect-[4/3] bg-carbon-900 rounded-3xl border border-carbon-700 hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(0,238,252,0.15)] transition-all duration-500 flex items-center justify-center group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-carbon-800/50 to-transparent"></div>
                <span className="text-neon-cyan/70 font-grotesk text-xl font-bold uppercase tracking-wider group-hover:text-neon-cyan transition-colors z-10">
                  Oraimo Product
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Register for ZCS Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <h2 className="font-grotesk text-3xl md:text-4xl font-bold uppercase text-neon-green tracking-widest">
            Register for ZCS
          </h2>
          <div className="relative">
            <h3 className="font-grotesk text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter uppercase leading-none mix-blend-difference z-10 relative text-white">
              5,00,000 <span className="text-neon-green">BDT</span>
            </h3>
            <div className="absolute -inset-10 bg-gradient-to-r from-neon-green/20 via-neon-cyan/20 to-neon-green/20 blur-[60px] -z-0 pointer-events-none"></div>
          </div>
          <p className="max-w-2xl text-gray-400 text-lg md:text-xl">
            Join the ultimate showdown and prove your worth. Form your squad, register for the ZCS qualifiers, and battle your way to the top to claim the massive prize pool.
          </p>
          
          <div className="mt-16 w-64 h-64 rotate-45 bg-carbon-800 border-2 border-neon-green flex items-center justify-center shadow-[0_0_40px_rgba(57,255,20,0.15)] hover:shadow-[0_0_60px_rgba(57,255,20,0.3)] transition-shadow duration-500">
            <div className="-rotate-45 text-neon-green font-grotesk text-2xl font-black uppercase tracking-widest">
              ZCS Logo
            </div>
          </div>
        </div>
      </section>

      {/* 4. Play with your Favourite Influencers Section */}
      <section className="py-24 px-6 bg-carbon-800 border-t border-carbon-700/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-grotesk text-4xl md:text-5xl font-black uppercase text-white mb-20">
            Play with your <span className="text-neon-cyan">Favourite Influencers</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Steps */}
            <div className="space-y-8">
              {[
                "Buy oraimo x freefire watch or oraimo x freefire tws",
                "Find the product serial number on the side",
                "Enter your details and then the product serial",
                "If you are lucky you will get showmatch entry or any of the below gifts"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="flex-shrink-0 w-20 h-10 flex items-center justify-center bg-carbon-900 border border-neon-green/30 text-neon-green font-grotesk font-bold group-hover:bg-neon-green group-hover:text-black transition-colors duration-300">
                    STEP {i + 1}
                  </div>
                  <p className="text-gray-300 text-lg pt-1 group-hover:text-white transition-colors duration-300">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* Right: Influencer placeholder */}
            <div className="flex justify-center py-10">
              <div className="w-64 h-64 md:w-80 md:h-80 rotate-45 bg-carbon-900 border border-neon-cyan flex items-center justify-center shadow-[0_0_40px_rgba(0,238,252,0.15)] group hover:scale-105 transition-transform duration-500">
                <div className="-rotate-45 text-neon-cyan font-grotesk text-xl font-bold uppercase tracking-widest opacity-70 group-hover:opacity-100">
                  Influencer Photos
                </div>
              </div>
            </div>
          </div>

          <div className="mt-20 flex justify-center">
            <button className="px-10 py-5 bg-gradient-to-br from-neon-green-light to-neon-green-dark text-black font-grotesk text-lg font-black uppercase tracking-widest hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:shadow-[0_0_40px_rgba(57,255,20,0.5)] cursor-pointer">
              Enter Lucky Draw
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-carbon-900 py-8 border-t border-carbon-700 text-center text-sm text-gray-500">
        &copy; 2026 Oraimo x Free Fire. All rights reserved.
      </footer>
    </main>
  );
}
