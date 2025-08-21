import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ ye add karo

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Optional redirect
app.get("/products", async (req, res) => {
  return res.redirect("/api/products");
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
