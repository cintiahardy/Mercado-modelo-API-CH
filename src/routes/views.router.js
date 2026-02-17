import { Router } from "express";
import { Product } from "../models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await Product.find().lean();
  res.render("index", { products });
});

router.get("/cart", (req, res) => {
  res.render("cart");
});

export default router;
