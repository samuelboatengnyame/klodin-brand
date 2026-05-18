import heroImg from "./assets/images/hero_fashion_model_1779115818783.png";
import hoodieImg from "./assets/images/hoodie_product_shot_1779115836306.png";
import tshirtImg from "./assets/images/tshirt_product_shot_1779115853651.png";
import lookbookImg from "./assets/images/lookbook_urban_model_1779115886952.png";
import customImg from "./assets/images/custom_jacket_shot_1779115904477.png";

export const BRAND_NAME = "Bodwé Klodynn";

export const IMAGES = {
  HERO: heroImg,
  HOODIE: hoodieImg,
  TSHIRT: tshirtImg,
  LOOKBOOK: lookbookImg,
  CUSTOM: customImg,
};

export const PRODUCTS = [
  {
    id: "1",
    name: "Onyx Gold Hoodie",
    price: 185,
    category: "Hoodies",
    image: IMAGES.HOODIE,
    description: "Premium heavyweight cotton hoodie with custom gold 'Bodwé' embroidery. Designed for an oversized urban silhouette.",
    sizes: ["S", "M", "L", "XL"],
    featured: true,
  },
  {
    id: "2",
    name: "Ascent Graph Tee",
    price: 75,
    category: "T-Shirts",
    image: IMAGES.TSHIRT,
    description: "High-end oversized white tee featuring our signature 'Ascent' graphic. Durable luxury fabric with a soft touch.",
    sizes: ["S", "M", "L", "XL"],
    featured: true,
  },
  {
    id: "3",
    name: "Bodwé Custom Jacket",
    price: 450,
    category: "Custom Wear",
    image: IMAGES.CUSTOM,
    description: "Limited edition custom jacket. Intricate gold leaf detailing and individual number embroidery. A true collector's piece.",
    sizes: ["M", "L"],
    featured: true,
  },
  {
    id: "4",
    name: "Midnight Cargo",
    price: 210,
    category: "Bottoms",
    image: "https://picsum.photos/seed/cargo/800/1000",
    description: "Tech-focused cargo pants with water-resistant finish and signature gold accents.",
    sizes: ["30", "32", "34", "36"],
    featured: false,
  },
  {
    id: "5",
    name: "Street Beanie",
    price: 45,
    category: "Accessories",
    image: "https://picsum.photos/seed/beanie/800/1000",
    description: "Classic rib-knit beanie with woven label branding.",
    sizes: ["One Size"],
    featured: false,
  },
  {
    id: "6",
    name: "Legacy Tote",
    price: 60,
    category: "Accessories",
    image: "https://picsum.photos/seed/tote/800/1000",
    description: "Heavy-duty canvas tote with bold screen-printed logo.",
    sizes: ["One Size"],
    featured: false,
  },
];

export const CATEGORIES = ["All", "Hoodies", "T-Shirts", "Custom Wear", "Bottoms", "Accessories"];
