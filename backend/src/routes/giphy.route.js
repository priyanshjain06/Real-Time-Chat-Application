import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js"; // Optional
import { searchGiphy } from "../controllers/giphy.controller.js";

const router = express.Router();

// Search for stickers from GIPHY
router.get("/search", protectRoute, searchGiphy); // Added protectRoute (optional)

export default router;