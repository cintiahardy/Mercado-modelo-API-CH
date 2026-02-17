import { Router } from "express";
import { Product } from "../models/product.model.js";

const router = Router();

/* GET todos */
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

/* POST crear producto */
router.get("/create-test", async (req, res) => {
  await Product.insertMany([
    { title: "Manzana", price: 100, stock: 50 },
    { title: "Banana", price: 80, stock: 30 },
    { title: "Naranja", price: 120, stock: 20 }
  ]);

  res.send("Productos de prueba creados");
});

export default router;