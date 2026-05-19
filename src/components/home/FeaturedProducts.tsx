import { motion } from "motion/react";
import { PRODUCTS } from "@/constants";
import { ProductCard } from "@/components/shop/ProductCard";

import { Product } from "@/types";

export function FeaturedProducts({ products, onAddToCart }: { products: Product[], onAddToCart: (p: Product, s: string) => void }) {
  return (
    <section id="shop" className="py-32 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-medium tracking-[0.2em] uppercase mb-4"
            >
              Curated Selection
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold tracking-tighter"
            >
              FEATURED <br /> RELEASES
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:max-w-md text-muted-foreground text-lg"
          >
            Explore our latest drops, where high-end aesthetics meet the grit of the street. Each piece is a statement of uncompromising quality and limited availability.
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div key={product.id}>
                 <ProductCard product={product} onAddToCart={(p, s) => onAddToCart(p, s)} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
