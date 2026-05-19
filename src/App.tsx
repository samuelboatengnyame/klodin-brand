/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
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
import { CATEGORIES, PRODUCTS, BRAND_NAME } from "@/constants";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('bodwe_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('bodwe_products', JSON.stringify(products));
  }, [products]);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
    setIsCartOpen(true);
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

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    
    toast.success("Order Placed Successfully", {
      description: `Thank you for shopping with ${BRAND_NAME}. We've received your order.`,
      className: "bg-zinc-900 border-white/10 text-white",
    });
    
    setCart([]);
    setIsCartOpen(false);
  };

  const updateProductPrice = (id: string, newPrice: number) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price: newPrice } : p));
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] overflow-x-hidden">
      {/* Immersive Background Elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary opacity-[0.03] blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-white opacity-[0.02] blur-[100px] rounded-full pointer-events-none z-0" />

      <Navbar 
        onOpenCart={() => setIsCartOpen(true)} 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="relative z-10">
        <Hero 
          onShopClick={() => document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" })} 
          onWatchFilm={() => setIsVideoOpen(true)}
        />
        
        {searchQuery ? (
          <section className="py-32 bg-background min-h-[60vh]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-20">
                <p className="text-primary font-medium tracking-[0.2em] uppercase mb-4">Discovery</p>
                <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter uppercase">
                  Search <br /> Results
                </h2>
                <p className="mt-6 text-muted-foreground">Showing results for "{searchQuery}"</p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filteredProducts.map((product) => (
                    <div key={product.id}>
                      <ProductCard 
                        product={product} 
                        onAddToCart={(p, s) => addToCart(p, s)} 
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center border border-white/5 bg-zinc-950">
                  <p className="text-xl uppercase tracking-widest text-muted-foreground">No products found matching your search.</p>
                  <Button variant="link" onClick={() => setSearchQuery("")} className="mt-4 text-primary uppercase text-xs tracking-widest">Clear Search</Button>
                </div>
              )}
            </div>
          </section>
        ) : (
          <>
            <FeaturedProducts 
              products={products.filter(p => p.featured)} 
              onAddToCart={addToCart} 
            />
            <NewArrivals 
              products={products.slice(3, 6)} 
              onAddToCart={addToCart} 
            />

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
          </>
        )}

        <Lookbook onWatchFilm={() => setIsVideoOpen(true)} />

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

      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onPlaceOrder={handlePlaceOrder}
      />
      
      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-6xl p-0 overflow-hidden bg-black border-white/10">
          <div className="aspect-video w-full bg-zinc-900 flex items-center justify-center relative group">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Bodwé Klodynn Film" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="w-full h-full"
            ></iframe>
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-primary transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admin / Pricing Manager Modal */}
      <Dialog open={isAdminOpen} onOpenChange={setIsAdminOpen}>
        <DialogContent className="max-w-2xl bg-zinc-950 border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold uppercase tracking-widest font-black italic">PRICING CONTROLS</DialogTitle>
          </DialogHeader>
          <div className="py-6 space-y-4 max-h-[60vh] overflow-y-auto px-1">
            {products.map((product) => (
              <div key={product.id} className="flex items-center gap-6 p-4 bg-white/5 border border-white/5 hover:border-primary/30 transition-colors">
                <div className="w-16 h-20 shrink-0 bg-zinc-800">
                  <img src={product.image} alt="" className="w-full h-full object-cover grayscale" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm uppercase tracking-tight">{product.name}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{product.category}</p>
                </div>
                <div className="w-32">
                  <Label className="text-[9px] uppercase text-muted-foreground mb-1 block tracking-widest">Price (GH₵)</Label>
                  <Input 
                    type="number" 
                    value={product.price}
                    onChange={(e) => updateProductPrice(product.id, Number(e.target.value))}
                    className="bg-black border-white/10 h-10 rounded-none text-primary font-mono focus-visible:ring-primary text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-white/5 flex justify-end">
            <Button onClick={() => setIsAdminOpen(false)} className="rounded-none uppercase tracking-[0.2em] font-bold px-10 h-12">Save & Close</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Toaster position="bottom-right" richColors theme="dark" />
    </div>
  );
}
