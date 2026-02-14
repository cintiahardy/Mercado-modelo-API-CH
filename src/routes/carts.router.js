import { Router } from "express";
import Cart from "../models/cart.model.js";

const router = Router();

// Crear carrito
router.post("/", async (req, res) => {
  const cart = await Cart.create({ products: [] });
  res.status(201).json(cart);
});

// Obtener carrito con populate
router.get("/:cid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid)
    .populate("products.product");

  res.json(cart);
});

// Agregar producto al carrito
router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await Cart.findById(cid);

  const existing = cart.products.find(
    p => p.product.toString() === pid
  );

  if (existing) {
    existing.quantity++;
  } else {
    cart.products.push({ product: pid, quantity: 1 });
  }

  await cart.save();
  res.json(cart);
});

// DELETE producto específico
router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  const cart = await Cart.findById(cid);
  cart.products = cart.products.filter(
    p => p.product.toString() !== pid
  );

  await cart.save();
  res.json(cart);
});

// PUT actualizar todo el carrito
router.put("/:cid", async (req, res) => {
  const cart = await Cart.findByIdAndUpdate(
    req.params.cid,
    { products: req.body.products },
    { new: true }
  );

  res.json(cart);
});

// PUT actualizar solo cantidad
router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const cart = await Cart.findById(cid);
  const product = cart.products.find(
    p => p.product.toString() === pid
  );

  product.quantity = quantity;

  await cart.save();
  res.json(cart);
});

// DELETE vaciar carrito
router.delete("/:cid", async (req, res) => {
  const cart = await Cart.findById(req.params.cid);
  cart.products = [];
  await cart.save();
  res.json({ status: "Carrito vaciado" });
});

export default router;