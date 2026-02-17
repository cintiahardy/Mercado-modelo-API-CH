import express from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js"; // 👈 AGREGAR ESTA LÍNEA
import viewsRouter from "./routes/views.router.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = 3000;

// DB
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "src/views");

// Rutas API
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Rutas vistas
app.use("/", viewsRouter);

// Server
app.listen(PORT, () => {
  console.log(`🚀 Server en http://localhost:${PORT}`);
});