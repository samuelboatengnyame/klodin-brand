import { BRAND_NAME } from "@/constants";
import { Instagram, Twitter, Facebook, ArrowUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer({ onOpenAdmin }: { onOpenAdmin: () => void }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          
          <div className="lg:col-span-12 mb-16 flex justify-between items-end border-b border-white/10 pb-8">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase">
              BODWÉ <span className="text-primary font-bold">KLODYNN</span>
            </h2>
            <div className="flex items-center space-x-4 bg-white/5 rounded-full px-6 py-2 border border-white/10 hidden md:flex">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[9px] uppercase tracking-widest opacity-60">System Online: Drops Loading...</span>
            </div>
          </div>
          
          <div className="lg:col-span-4">
            <p className="text-muted-foreground text-sm mb-10 max-w-sm leading-loose">
              Premium length engineered for the modern nomad. Bodwé Klodynn defines the intersection of high-street silhouette and bespoke luxury hardware. Studio based in Ghana.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-white/30 text-[8px] uppercase tracking-[0.2em] font-bold mb-6">Collections</h3>
            <ul className="flex flex-col gap-4 text-[10px] uppercase font-bold tracking-widest">
              <li><a href="#collections" className="hover:text-primary transition-colors">Archive 01</a></li>
              <li><a href="#collections" className="hover:text-primary transition-colors">Bespoke</a></li>
              <li><a href="#lookbook" className="hover:text-primary transition-colors">Lookbook</a></li>
              <li><button onClick={onOpenAdmin} className="text-left hover:text-primary transition-colors">Admin Settings</button></li>
            </ul>
          </div>


          <div className="lg:col-span-2">
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Support</h3>
            <ul className="flex flex-col gap-4 text-muted-foreground font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
              <li><button onClick={onOpenAdmin} className="text-left hover:text-primary transition-colors">Manage Pricing</button></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-8">Newsletter</h3>
            <p className="text-muted-foreground text-sm mb-6">Join the inner circle for exclusive drops and limited releases.</p>
            <div className="flex gap-2">
              <Input 
                placeholder="YOUR EMAIL" 
                className="bg-zinc-900 border-none rounded-none focus-visible:ring-primary"
              />
              <Button size="icon" className="rounded-none shrink-0 group">
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5">
          <p className="text-xs text-muted-foreground tracking-widest uppercase">
            © 2026 {BRAND_NAME}. ALL RIGHTS RESERVED.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors group"
          >
            Back to Top
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary transition-all">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
