import { Router } from "express";
import { Product } from "../models/product.model.js";

const router = Router();

// Vista principal con paginación
router.get("/products", async (req, res) => {
  try {
    const { page = 1 } = req.query;

    const result = await Product.paginate({}, {
      page: parseInt(page),
      limit: 5,
      lean: true
    });

    res.render("products", {
      products: result.docs,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevPage: result.prevPage,
      nextPage: result.nextPage
    });

  } catch (error) {
    res.status(500).send("Error cargando productos");
  }
});

// Vista detalle producto
router.get("/products/:pid", async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).lean();
    res.render("productDetail", { product });
  } catch (error) {
    res.status(500).send("Producto no encontrado");
  }
});

// Vista carrito por id
router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid)
      .populate("products.product")
      .lean();

    res.render("cart", { cart });
  } catch (error) {
    res.status(500).send("Carrito no encontrado");
  }
});

export default router;
