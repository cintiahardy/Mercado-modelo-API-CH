import { Router } from "express";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

const router = Router();

/* =========================
   HOME → index.handlebars
========================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().lean();

    res.render("index", {
      title: "Mercado Modelo",
      products
    });
  } catch (error) {
    res.status(500).send("Error cargando index");
  }
});

/* =========================
   CARRITO
========================= */
router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid)
      .populate("products.product")
      .lean();

    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    res.render("cart", {
      title: "Carrito",
      cart
    });
  } catch (error) {
    res.status(500).send("Error cargando carrito");
  }
});

export default router;

