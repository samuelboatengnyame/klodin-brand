import { motion } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IMAGES } from "@/constants";

export function Hero({ onShopClick, onWatchFilm }: { onShopClick: () => void, onWatchFilm: () => void }) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image with Ken Burns effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={IMAGES.HERO} 
          alt="Bodwé Hero Fashion" 
          className="w-full h-full object-cover opacity-60 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-10 bg-grid pointer-events-none opacity-20" />

      {/* Content */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-32">
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-6"
          >
            Season Archive 01 // 2024
          </motion.p>
        </div>

        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: "circOut" }}
            className="text-[80px] lg:text-[140px] font-black leading-[0.8] tracking-tighter uppercase"
          >
            URBAN <br />
            <span className="text-transparent text-stroke italic" style={{ WebkitTextStroke: "1px #F5F5F5" }}>ARMOR</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-md text-sm text-[#F5F5F5]/50 mb-10 leading-relaxed font-medium"
        >
          Premium weight textiles engineered for the modern nomad. Bodwé Klodynn defines the intersection of high-street silhouette and bespoke luxury hardware.
        </motion.p>


        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
        >
          <Button 
            size="lg" 
            onClick={onShopClick}
            className="h-16 px-10 text-lg uppercase tracking-widest font-bold group"
          >
            Shop Collection
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <button 
            onClick={onWatchFilm}
            className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
          >
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
              <Play size={16} fill="white" className="ml-1" />
            </div>
            <span className="text-sm uppercase tracking-widest font-medium">Watch Film</span>
          </button>
        </motion.div>
      </div>

      {/* Side Label */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-20 items-center overflow-hidden">
        <motion.div
          initial={{ y: 100, rotate: 90 }}
          animate={{ y: 0, rotate: 90 }}
          className="whitespace-nowrap text-[10px] uppercase tracking-[1em] text-white/30"
        >
          ESTABLISHED IN URBAN CHAOS
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}
