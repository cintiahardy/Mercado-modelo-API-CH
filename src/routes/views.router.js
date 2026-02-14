import { Router } from "express";
import Product from "../models/product.model.js";

const router = Router();

/* HOME */
router.get("/", async (req, res) => {
    const products = await Product.find().lean();
    res.render("index", { products });
});

/* PRODUCT DETAIL */
router.get("/products/:pid", async (req, res) => {
    const product = await Product.findById(req.params.pid).lean();
    res.render("productDetail", { product });
});

/* CART */
router.get("/cart", (req, res) => {
    res.render("cart");
});

export default router;