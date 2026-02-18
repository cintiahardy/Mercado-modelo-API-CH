import { connectDB } from "./config/db.js";
import { Product } from "./models/product.model.js";

const products = [
  { title: "Manzana", description: "Manzana roja fresca", price: 1200, category: "frutas", stock: 100 },
  { title: "Banana", description: "Banana ecuatoriana", price: 900, category: "frutas", stock: 120 },
  { title: "Naranja", description: "Naranja jugosa", price: 1100, category: "frutas", stock: 80 },
  { title: "Mandarina", description: "Mandarina dulce", price: 1000, category: "frutas", stock: 70 },
  { title: "Frutilla", description: "Frutillas frescas", price: 2500, category: "frutas", stock: 50 },
  { title: "Papa", description: "Papa blanca", price: 700, category: "verduras", stock: 200 },
  { title: "Tomate", description: "Tomate redondo", price: 1500, category: "verduras", stock: 90 },
  { title: "Lechuga", description: "Lechuga criolla", price: 800, category: "verduras", stock: 110 },
  { title: "Cebolla", description: "Cebolla común", price: 850, category: "verduras", stock: 150 },
  { title: "Zanahoria", description: "Zanahoria fresca", price: 750, category: "verduras", stock: 170 }
];

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("✅ 10 productos cargados correctamente");
    process.exit();
  } catch (error) {
    console.error("❌ Error cargando productos:", error);
    process.exit(1);
  }
};

seedProducts();