import express from "express";
import { createAuction, placeBid, getAuction, getSellerAuctions, getAllAuctions, getRecentBids } from "../controllers/auctionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protect, createAuction);
router.post("/bid", protect, placeBid);
router.get("/seller", protect, getSellerAuctions); // New route
router.get("/feed", getRecentBids); // Real-time activity feed
router.get("/", getAllAuctions); // New route: Get all active auctions
router.get("/:id", getAuction);

export default router;
