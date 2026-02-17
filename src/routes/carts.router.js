import { Router } from "express";
import Cart from "../models/cart.model.js";

const router = Router();

/* crear carrito */
router.post("/", async (req, res) => {
  const cart = await Cart.create({ products: [] });
  res.json(cart);
});

/* ver carrito */
router.get("/:cid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid).populate("products.product");
  res.json(cart);
});

export default router;


