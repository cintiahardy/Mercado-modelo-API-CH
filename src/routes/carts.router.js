import { Router } from "express";
import { Cart } from "../models/cart.model.js";

const router = Router();

router.post("/", async (req, res) => {
  const cart = await Cart.create({ products: [] });
  res.json(cart);
});

router.get("/:cid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid).populate("products.product").lean();
  res.json(cart);
});

router.put("/:cid", async (req, res) => {
  const { products } = req.body;
  const cart = await Cart.findByIdAndUpdate(
    req.params.cid,
    { products },
    { new: true }
  );
  res.json(cart);
});

router.put("/:cid/products/:pid", async (req, res) => {
  const { quantity } = req.body;

  const cart = await Cart.findById(req.params.cid);

  const productIndex = cart.products.findIndex(
    p => p.product.toString() === req.params.pid
  );

  if (productIndex !== -1) {
    cart.products[productIndex].quantity = quantity;
  }

  await cart.save();
  res.json(cart);
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid);

  cart.products = cart.products.filter(
    p => p.product.toString() !== req.params.pid
  );

  await cart.save();
  res.json(cart);
});

router.delete("/:cid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid);
  cart.products = [];
  await cart.save();
  res.json(cart);
});

export default router;

