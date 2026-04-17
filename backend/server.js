import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ CORS — allow localhost (dev) and EC2 IP (production)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://16.171.2.52",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// ✅ Body parsers — must come BEFORE routes
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// ✅ Health check — test with: GET http://16.171.2.52/api/health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is running ✅" });
});

// ✅ Routes
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
