import { ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, q: number) => void;
  onRemove: (id: string, size: string) => void;
}

export function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-zinc-950 z-[101] flex flex-col shadow-2xl border-l border-white/5"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="text-xl font-bold uppercase tracking-tighter">Your Bag ({items.length})</h2>
              </div>
              <button onClick={onClose} className="hover:text-primary transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <ScrollArea className="flex-1 p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center pt-20">
                  <ShoppingBag size={48} className="text-white/10 mb-4" />
                  <p className="text-muted-foreground uppercase tracking-widest text-sm">Your bag is empty</p>
                  <Button variant="link" onClick={onClose} className="mt-2 text-primary">Start Shopping</Button>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                      <div className="w-24 h-32 bg-muted overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-bold text-sm uppercase tracking-tight">{item.name}</h3>
                          <p className="font-bold text-primary">${item.price}</p>
                        </div>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Size: {item.selectedSize}</p>
                        
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-3 border border-white/10 p-1">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.selectedSize, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 flex items-center justify-center hover:text-primary transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center hover:text-primary transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => onRemove(item.id, item.selectedSize)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/5 bg-zinc-900/50">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground text-sm uppercase tracking-widest">Subtotal</span>
                  <span className="font-bold text-lg">${subtotal}</span>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="text-muted-foreground text-sm uppercase tracking-widest">Shipping</span>
                  <span className="text-xs uppercase font-bold text-primary">Free for members</span>
                </div>
                <Separator className="bg-white/5 mb-6" />
                <Button className="w-full h-14 text-sm uppercase tracking-[0.2em] font-bold">
                  Checkout Now
                </Button>
                <button className="w-full text-center mt-4 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-white transition-colors" onClick={onClose}>
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
