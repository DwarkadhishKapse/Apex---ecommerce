import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// health check
app.get("/", async (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);

export default app;
