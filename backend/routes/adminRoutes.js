import express from "express";
import {
    getAllUsers,
    getPendingFarmers,
    toggleUserStatus,
    deleteUser,
    verifyFarmer,
    rejectFarmer,
    stopAuction,
    getDashboardStats,
    getSystemConfig,
    updateSystemConfig,
    getRevenueAnalytics,
    getDisputes,
    resolveDispute,
    getNotifications,
    markNotificationRead
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect); // All admin routes active protection
router.use(admin); // All admin routes require admin role

// Config
router.get("/config", getSystemConfig);
router.put("/config", updateSystemConfig);

// Stats & Financials
router.get("/stats", getDashboardStats);
router.get("/revenue", getRevenueAnalytics);

// Disputes
router.get("/disputes", getDisputes);
router.put("/disputes/:id/resolve", resolveDispute);

// Notifications
router.get("/notifications", getNotifications);
router.put("/notifications/:id/read", markNotificationRead);

// User Management
router.get("/users", getAllUsers);
router.put("/users/:id/status", toggleUserStatus);
router.delete("/users/:id", deleteUser);

// Farmer Verification
router.get("/farmers/pending", getPendingFarmers);
router.put("/farmers/:id/verify", verifyFarmer);
router.put("/farmers/:id/reject", rejectFarmer);

// Auction Control
router.put("/auctions/:id/stop", stopAuction);

export default router;