import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { IMAGES } from "@/constants";
import { ArrowUpRight } from "lucide-react";

export function Lookbook() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section id="lookbook" ref={containerRef} className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Images */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            <motion.div style={{ y: y1 }} className="aspect-[9/16] overflow-hidden bg-muted">
              <img 
                src={IMAGES.LOOKBOOK} 
                alt="Lookbook 1" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div style={{ y: y2 }} className="aspect-[9/16] mt-24 overflow-hidden bg-muted">
              <img 
                src="https://picsum.photos/seed/urban2/800/1400" 
                alt="Lookbook 2" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <span className="text-primary font-medium tracking-[0.3em] uppercase mb-4 block">Chapter I</span>
              <h2 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                THE <br /> SILENT <br /> STREETS
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                Our first chapter explores the duality of modern existence. The contrast between raw concrete textures and the refined luxury of gold leaf. Designed in the heart of the city, for those who move between shadows.
              </p>
              
              <button className="flex items-center gap-4 text-white font-bold uppercase tracking-widest group">
                Explored the Lookbook
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-black transition-all">
                  <ArrowUpRight size={20} />
                </div>
              </button>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Background Decorative Type */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -z-0 opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-[30rem] font-bold leading-none tracking-tighter">BODWÉ</h2>
      </div>
    </section>
  );
}
