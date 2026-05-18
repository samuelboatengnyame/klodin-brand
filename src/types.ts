export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sizes: string[];
  featured: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  clearCart: () => void;
}
