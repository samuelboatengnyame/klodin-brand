import { motion } from "motion/react";
import { ShoppingBag, Eye, Heart } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

export function ProductCard({ product, onAddToCart }: { product: Product, onAddToCart?: (p: Product, size: string) => void }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <motion.div 
      className="group relative flex flex-col"
      whileHover={{ y: -5 }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <button 
            onClick={() => onAddToCart?.(product, selectedSize)}
            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary transition-colors transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-[0s]"
          >
            <ShoppingBag size={20} />
          </button>
          
          <Dialog>
            <DialogTrigger className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:bg-primary transition-colors transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-[0.1s]">
              <Eye size={20} />
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-zinc-950 border-white/10 p-0 overflow-hidden rounded-none">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-[3/4] bg-muted">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="p-8 flex flex-col">
                  <Badge className="w-fit mb-4 bg-primary text-primary-foreground rounded-none uppercase font-bold tracking-widest">{product.category}</Badge>
                  <h2 className="text-4xl font-bold uppercase tracking-tighter mb-2">{product.name}</h2>
                  <p className="text-2xl font-bold text-primary mb-6">${product.price}</p>
                  <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>
                  
                  <div className="mb-8">
                    <p className="text-xs font-bold uppercase tracking-widest mb-4">Select Size</p>
                    <div className="flex gap-2">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-12 h-12 border flex items-center justify-center text-sm font-bold transition-all ${
                            selectedSize === size ? "bg-primary text-black border-primary" : "border-white/10 hover:border-white"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => onAddToCart?.(product, selectedSize)}
                    className="w-full h-14 uppercase tracking-widest font-bold text-sm mt-auto"
                  >
                    Add to Bag
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.category === "Custom Wear" && (
            <Badge className="bg-primary text-primary-foreground font-bold tracking-widest uppercase text-[10px] rounded-none px-3">
              Limited
            </Badge>
          )}
        </div>

        <button className="absolute top-4 right-4 text-white/50 hover:text-primary transition-colors">
          <Heart size={20} />
        </button>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-start mb-1">
          <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-medium">{product.category}</p>
          <p className="font-mono text-xs font-medium text-primary">${product.price.toFixed(2)}</p>
        </div>
        <h3 className="text-xl font-bold tracking-tight uppercase group-hover:text-primary transition-colors">{product.name}</h3>
      </div>
    </motion.div>
  );
}
