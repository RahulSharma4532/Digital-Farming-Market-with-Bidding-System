import User from "../models/User.js";

// @desc    Get all users (with filters)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password").sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get pending farmer verifications
// @route   GET /api/admin/farmers/pending
// @access  Private/Admin
export const getPendingFarmers = async (req, res) => {
    try {
        const farmers = await User.find({
            role: "farmer",
            isVerified: false
        }).select("-password");
        res.json(farmers);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Toggle user active status (Suspend/Activate)
// @route   PUT /api/admin/users/:id/status
// @access  Private/Admin
export const toggleUserStatus = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.isActive = !user.isActive;
            await user.save();
            res.json({ message: `User ${user.isActive ? 'activated' : 'suspended'}`, isActive: user.isActive });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Verify farmer (Approve)
// @route   PUT /api/admin/farmers/:id/verify
// @access  Private/Admin
export const verifyFarmer = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user && user.role === 'farmer') {
            user.isVerified = true;
            // Also mark all docs as valid for now
            if (user.documents) {
                user.documents.forEach(doc => doc.status = 'valid');
            }
            await user.save();
            res.json({ message: "Farmer verified successfully" });
        } else {
            res.status(404).json({ message: "Farmer not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Reject farmer application
// @route   PUT /api/admin/farmers/:id/reject
// @access  Private/Admin
export const rejectFarmer = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user && user.role === 'farmer') {
            await User.findByIdAndDelete(req.params.id);
            res.json({ message: "Application rejected and removed" });
        } else {
            res.status(404).json({ message: "Farmer not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.deleteOne({ _id: user._id });
            res.json({ message: "User removed" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Emergency Stop Auction
// @route   PUT /api/admin/auctions/:id/stop
// @access  Private/Admin
export const stopAuction = async (req, res) => {
    try {
        const Auction = (await import("../models/Auction.js")).default;
        const auction = await Auction.findById(req.params.id);
        if (auction) {
            auction.status = 'cancelled';
            await auction.save();

            const io = req.app.get("io");
            if (io) {
                io.emit("auction_update", {
                    type: "STATUS_CHANGE",
                    auctionId: auction._id,
                    status: "cancelled"
                });
            }
            res.json({ message: "Auction emergency stopped", status: "cancelled" });
        } else {
            res.status(404).json({ message: "Auction not found" });
        }
    } catch (error) {
        console.error("Stop Auction Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get dashboard aggregated stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
    try {
        const Auction = (await import("../models/Auction.js")).default;
        const User = (await import("../models/User.js")).default;
        const Order = (await import("../models/Order.js")).default;

        const activeFarmersCount = await User.countDocuments({ role: "farmer", isActive: true });
        const verificationQueueCount = await User.countDocuments({ role: "farmer", isVerified: false });
        const liveAuctionsCount = await Auction.countDocuments({ status: "active" });

        // Total Volume/Fees
        const totalVolumeData = await Order.aggregate([
            { $match: { status: "completed" } },
            { $group: { _id: null, fees: { $sum: "$platformFee" } } }
        ]);
        const totalRevenue = totalVolumeData[0]?.fees || 0;

        // 7-Day Trend
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const dailyRevenue = await Order.aggregate([
            {
                $match: {
                    status: "completed",
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    value: { $sum: "$platformFee" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const revenueTrend = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
            const found = dailyRevenue.find(r => r._id === dateStr);
            revenueTrend.push({
                name: dayName,
                value: found ? found.value : 0
            });
        }

        res.json({
            activeFarmers: activeFarmersCount,
            verificationQueue: verificationQueueCount,
            liveAuctions: liveAuctionsCount,
            totalRevenue: totalRevenue,
            revenueTrend: revenueTrend
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get System Config
// @route   GET /api/admin/config
// @access  Private/Admin
export const getSystemConfig = async (req, res) => {
    try {
        const SystemConfig = (await import("../models/SystemConfig.js")).default;
        let config = await SystemConfig.findOne();
        if (!config) config = await SystemConfig.create({});
        res.json(config);
    } catch (error) {
        console.error("Get Config Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Update System Config
// @route   PUT /api/admin/config
// @access  Private/Admin
export const updateSystemConfig = async (req, res) => {
    try {
        const SystemConfig = (await import("../models/SystemConfig.js")).default;
        const config = await SystemConfig.findOne();
        if (config) {
            Object.assign(config, req.body);
            await config.save();
            res.json(config);
        } else {
            const newConfig = await SystemConfig.create(req.body);
            res.json(newConfig);
        }
    } catch (error) {
        console.error("Update Config Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get Revenue Analytics (Detailed)
// @route   GET /api/admin/revenue
// @access  Private/Admin
export const getRevenueAnalytics = async (req, res) => {
    try {
        const Order = (await import("../models/Order.js")).default;

        // Use exact same logic as dashboard stats for consistency
        const totalVolumeData = await Order.aggregate([
            { $match: { status: "completed" } },
            { $group: { _id: null, total: { $sum: "$amount" }, fees: { $sum: "$platformFee" } } }
        ]);

        const volume = totalVolumeData[0]?.total || 0;
        const fees = totalVolumeData[0]?.fees || 0;

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const dailyRevenue = await Order.aggregate([
            {
                $match: {
                    status: "completed",
                    createdAt: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    value: { $sum: "$platformFee" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const chartData = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
            const found = dailyRevenue.find(r => r._id === dateStr);
            chartData.push({
                name: dayName,
                value: found ? found.value : 0,
                fullDate: dateStr
            });
        }

        res.json({
            totalVolume: volume,
            totalRevenue: fees,
            chartData: chartData
        });

    } catch (error) {
        console.error("Revenue Analytics Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get All Disputes
// @route   GET /api/admin/disputes
// @access  Private/Admin
export const getDisputes = async (req, res) => {
    try {
        const Dispute = (await import("../models/Dispute.js")).default;
        const disputes = await Dispute.find({})
            .populate('raisedBy', 'name email')
            .populate('targetUser', 'name')
            .sort({ createdAt: -1 });
        res.json(disputes);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Resolve Dispute
// @route   PUT /api/admin/disputes/:id/resolve
// @access  Private/Admin
export const resolveDispute = async (req, res) => {
    try {
        const Dispute = (await import("../models/Dispute.js")).default;
        const { resolution, status } = req.body;

        const dispute = await Dispute.findById(req.params.id);
        if (dispute) {
            dispute.status = status || 'resolved';
            dispute.resolution = resolution;
            await dispute.save();
            res.json(dispute);
        } else {
            res.status(404).json({ message: "Dispute not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get Admin Notifications
// @route   GET /api/admin/notifications
// @access  Private/Admin
export const getNotifications = async (req, res) => {
    try {
        const Notification = (await import("../models/Notification.js")).default;
        // Fetch unread or recent notifications
        const notifications = await Notification.find({})
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Mark Notification as Read
// @route   PUT /api/admin/notifications/:id/read
// @access  Private/Admin
export const markNotificationRead = async (req, res) => {
    try {
        const Notification = (await import("../models/Notification.js")).default;
        await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
        res.json({ message: "Marked as read" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    (Internal Helper) Create Notification
export const createNotification = async (title, message, type = "info", link = null) => {
    try {
        const Notification = (await import("../models/Notification.js")).default;
        const notification = await Notification.create({ title, message, type, link });
        return notification;
    } catch (error) {
        console.error("Notification Creation Error:", error);
        return null;
    }
};
