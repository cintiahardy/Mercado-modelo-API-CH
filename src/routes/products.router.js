import { Router } from "express";
import Product from "../models/product.model.js";

const router = Router();

/* =========================
   GET con paginación
========================= */

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 5, sort, query } = req.query;

    let filter = query ? { category: query } : {};

    let sortOption =
      sort === "asc"
        ? { price: 1 }
        : sort === "desc"
        ? { price: -1 }
        : {};

    const result = await Product.paginate(filter, {
      page,
      limit,
      sort: sortOption,
      lean: true
    });

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}`
        : null,
      nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}`
        : null
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message
    });
  }
});

/* =========================
   GET por ID
========================= */

router.get("/:pid", async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid);
    if (!product) {
      return res.status(404).json({ status: "error", error: "Producto no encontrado" });
    }
    res.json({ status: "success", payload: product });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

/* =========================
   POST con validación
========================= */

router.post("/", async (req, res) => {
  try {
    const { title, description, price, code, stock, category } = req.body;

    if (!title || !description || !price || !code || !stock || !category) {
      return res.status(400).json({
        status: "error",
        error: "Faltan campos obligatorios"
      });
    }

    const newProduct = await Product.create({
      title,
      description,
      price,
      code,
      stock,
      category
    });

    res.status(201).json({
      status: "success",
      payload: newProduct
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message
    });
  }
});

/* =========================
   DELETE
========================= */

router.delete("/:pid", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.pid);

    if (!deleted) {
      return res.status(404).json({
        status: "error",
        error: "Producto no encontrado"
      });
    }

    res.json({
      status: "success",
      message: "Producto eliminado"
    });

  } catch (error) {
    res.status(500).json({
      status: "error",
      error: error.message
    });
  }
});

export default router;