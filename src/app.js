import express from "express";
import mongoose from "mongoose";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

/* =========================
   IMPORTAR ROUTERS
========================= */
import cartsRouter from "./routes/carts.router.js";
import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";

/* =========================
   CONFIG BASICA
========================= */
const app = express();
const PORT = 8080;

/* Para usar __dirname con ES Modules */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   MIDDLEWARES
========================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Archivos estáticos */
app.use(express.static(path.join(__dirname, "public")));

/* =========================
   HANDLEBARS
========================= */
app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

/* =========================
   RUTAS
========================= */

/* VISTAS */
app.use("/", viewsRouter);

/* API */
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

/* =========================
   CONEXION MONGO
========================= */
mongoose
  .connect("mongodb://127.0.0.1:27017/mercado-modelo")
  .then(() => {
    console.log("✅ Conectado a MongoDB");
  })
  .catch((error) => {
    console.error("❌ Error MongoDB:", error);
  });

/* =========================
   SERVER
========================= */
app.listen(PORT, () => {
  console.log(`🚀 Servidor activo en http://localhost:${PORT}`);
});
