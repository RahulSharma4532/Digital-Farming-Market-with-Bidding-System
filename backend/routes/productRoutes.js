import express from "express";
import { getProducts, createProduct, getMyProducts } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/my", protect, getMyProducts);
router.post("/", protect, createProduct);

export default router;
