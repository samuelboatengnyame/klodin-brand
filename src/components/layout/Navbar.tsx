import { ShoppingBag, Heart, Search, Menu, X, ArrowRight, Instagram, Twitter, Facebook } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { BRAND_NAME } from "@/constants";

export function Navbar({ onOpenCart, cartCount }: { onOpenCart: () => void, cartCount: number }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-4" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button 
          className="lg:hidden text-white hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>
          
        <a href="/" className="text-2xl font-black italic tracking-tighter uppercase group">
          BODWÉ <span className="text-primary transition-colors group-hover:text-white">KLODYNN</span>
        </a>

        <div className="hidden lg:flex items-center gap-12 text-[10px] uppercase tracking-[0.3em] font-medium opacity-70">
          <a href="#collections" className="hover:text-primary hover:opacity-100 transition-all">Collection</a>
          <a href="#shop" className="hover:text-primary hover:opacity-100 transition-all">Archive</a>
          <a href="#lookbook" className="hover:text-primary hover:opacity-100 transition-all">Lookbook</a>
          <a href="#bespoke" className="hover:text-primary hover:opacity-100 transition-all">Bespoke</a>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">

          <button className="hidden sm:block text-white hover:text-primary transition-colors">
            <Search size={20} />
          </button>
          <button className="text-white hover:text-primary transition-colors">
            <Heart size={20} />
          </button>
          <button 
            className="text-white hover:text-primary transition-colors relative"
            onClick={onOpenCart}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background p-8 flex flex-col pt-20"
          >
            <button 
              className="absolute top-6 left-6 text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
            
            <div className="flex flex-col gap-8 text-4xl font-bold tracking-tighter">
              <a href="#collections" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors">COLLECTIONS</a>
              <a href="#shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors">SHOP ALL</a>
              <a href="#lookbook" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors">LOOKBOOK</a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-primary transition-colors">ABOUT</a>
            </div>

            <div className="mt-auto flex gap-6">
              <Instagram size={24} />
              <Twitter size={24} />
              <Facebook size={24} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
