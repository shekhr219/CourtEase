const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const centerRoutes = require("./routes/centers");
const sportRoutes = require("./routes/sports");
const courtRoutes = require("./routes/courts");
const bookingRoutes = require("./routes/bookings");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Simple route for testing
app.use("/api/centers", centerRoutes);
app.use("/api/sports", sportRoutes);
app.use("/api/courts", courtRoutes);
app.use("/api/bookings", bookingRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
