import express from "express";
import { generateExplanation } from "../controllers/explainController.js";

const router = express.Router();

// POST /api/explain
router.post("/explain", generateExplanation);

export default router;