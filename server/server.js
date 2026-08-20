const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const troubleshootingRoutes = require("./routes/troubleshootingRoutes");
const partsRoutes = require("./routes/partsRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

const app = express();

// ================================
// Middleware
// ================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://repairx-client.onrender.com",
    ],
  })
);

app.use(express.json());

// ================================
// Database
// ================================

connectDB();

// ================================
// API Routes
// ================================

app.use("/api/troubleshooting", troubleshootingRoutes);
app.use("/api/parts", partsRoutes);
app.use("/api/admin", adminRoutes);

// ================================
// Test API
// ================================

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "RepairX API is working!",
  });
});

// ================================
// Root Route
// ================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to RepairX API",
  });
});

// ================================
// Start Server
// ================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `RepairX server running on port ${PORT}`
  );
});