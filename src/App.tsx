/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { NewArrivals } from "@/components/home/NewArrivals";
import { Lookbook } from "@/components/home/Lookbook";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/shop/CartDrawer";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Product, CartItem } from "@/types";
import { motion, AnimatePresence } from "motion/react";
import { CATEGORIES, PRODUCTS } from "@/constants";
import { ProductCard } from "@/components/shop/ProductCard";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  const addToCart = (product: Product, size: string = "L") => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    toast.success(`${product.name} added to bag`, {
      description: `Size: ${size}`,
      className: "bg-zinc-900 border-white/10 text-white",
    });
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    setCart(prev => prev.map(item => 
      (item.id === id && item.selectedSize === size) ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (id: string, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] overflow-x-hidden">
      {/* Immersive Background Elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary opacity-[0.03] blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-white opacity-[0.02] blur-[100px] rounded-full pointer-events-none z-0" />

      <Navbar onOpenCart={() => setIsCartOpen(true)} cartCount={cart.reduce((s, i) => s + i.quantity, 0)} />
      
      <main className="relative z-10">

        <Hero onShopClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })} />
        
        <FeaturedProducts onAddToCart={addToCart} />

        <NewArrivals onAddToCart={addToCart} />

        {/* Categories Section */}
        <section id="collections" className="py-20 bg-zinc-950 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 overflow-x-auto">
            <div className="flex items-center justify-center gap-10 whitespace-nowrap min-w-max pb-4">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm uppercase tracking-[0.3em] font-bold transition-all ${
                    activeCategory === cat ? "text-primary border-b-2 border-primary pb-2" : "text-white/40 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} onAddToCart={(p, s) => addToCart(p, s)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        <Lookbook />

        {/* Brand Story Short */}
        <section className="py-40 bg-background flex items-center justify-center text-center px-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter mb-10 uppercase">
                Redefining the <br /> <span className="text-primary italic">Urban Identity</span>
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed italic font-serif">
                "Bodwé Klodynn isn't just about fashion. It's about a movement. A movement of individuals who see the city as their canvas and excellence as their standard."
              </p>
              <div className="mt-12 flex justify-center">
                <div className="w-20 h-px bg-primary" />
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
      
      <Toaster position="bottom-right" richColors theme="dark" />
    </div>
  );
}
