import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import explainRoute from "./src/routes/explain.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "FounderAI backend running" });
});

// Routes
app.use("/api", explainRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});