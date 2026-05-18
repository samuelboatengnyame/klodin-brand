import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { PRODUCTS } from "@/constants";
import { ProductCard } from "@/components/shop/ProductCard";
import { Product } from "@/types";
import { ChevronRight, ChevronLeft } from "lucide-react";

export function NewArrivals({ onAddToCart }: { onAddToCart: (p: Product, s: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const newItems = PRODUCTS.slice(0, 5); // Just taking first 5 as "new" for now

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Limited Drops</span>
          <h2 className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase leading-[0.8] mb-4">
            NEW <br/><span className="text-transparent text-stroke" style={{ WebkitTextStroke: "1px #F5F5F5" }}>ARRIVALS</span>
          </h2>
        </motion.div>

        <div className="flex gap-4">
          <button 
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all group"
          >
            <ChevronLeft size={20} className="group-active:scale-90 transition-transform" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all group"
          >
            <ChevronRight size={20} className="group-active:scale-90 transition-transform" />
          </button>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-auto px-[max(1.5rem,calc((100vw-80rem)/2))] pb-12 no-scrollbar snap-x snap-mandatory"
      >
        {newItems.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="min-w-[300px] md:min-w-[400px] snap-start"
          >
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </motion.div>
        ))}
        
        {/* Call to action card at the end */}
        <div className="min-w-[300px] md:min-w-[400px] snap-start flex items-center justify-center border border-white/5 bg-white/[0.02] p-12 text-center group transition-colors hover:bg-white/[0.05]">
          <div>
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Explore Full Archive</h3>
            <p className="text-muted-foreground text-sm mb-8">Discover over 50+ unique pieces from previous seasons.</p>
            <button className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 mx-auto group-hover:gap-4 transition-all">
              View All <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
