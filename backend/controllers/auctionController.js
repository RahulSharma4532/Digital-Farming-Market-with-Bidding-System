import Auction from "../models/Auction.js";
import Bid from "../models/Bid.js";
import mongoose from "mongoose";

// Create a new auction
export const createAuction = async (req, res) => {
    try {
        const { productId, startingPrice, endTime, bidIncrement } = req.body;

        // Basic validation
        if (!productId || !startingPrice || !endTime) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const auction = new Auction({
            product: productId,
            seller: req.user.id, // Assuming auth middleware adds user to req
            startingPrice,
            currentPrice: startingPrice,
            bidIncrement: bidIncrement || 50,
            endTime: new Date(endTime),
        });

        await auction.save();
        res.status(201).json(auction);
    } catch (error) {
        console.error("Error creating auction:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Place a bid with Transaction
export const placeBid = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { auctionId, amount } = req.body;
        const userId = req.user.id;

        // 1. Fetch Auction (lock it for this transaction if possible, though optimistic locking via versioning is default in Mongoose)
        const auction = await Auction.findById(auctionId).session(session);

        if (!auction) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: "Auction not found" });
        }

        if (new Date() > auction.endTime) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Auction has ended" });
        }

        // 2. Validation
        const minBid = auction.currentPrice + auction.bidIncrement;
        // If it's the very first bid, it might just need to be >= starting price (logic choice). 
        // Usually logic: if no bids, must be >= starting. If bids, must be >= current + increment.
        // However, currentPrice initialized to startingPrice.
        // Let's stick to strict: if highestBidder exists, must be >= current + increment. 
        // If no highestBidder, currentPrice is startingPrice, so request must be >= startingPrice.

        let isValidBid = false;
        if (!auction.highestBidder) {
            // First bid
            if (amount >= auction.startingPrice) isValidBid = true;
        } else {
            // Subsequent bids
            if (amount >= auction.currentPrice + auction.bidIncrement) isValidBid = true;
        }

        if (!isValidBid) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
                message: `Bid must be at least ${auction.highestBidder ? auction.currentPrice + auction.bidIncrement : auction.startingPrice}`
            });
        }

        // 3. Update Auction
        auction.currentPrice = amount;
        auction.highestBidder = userId;
        await auction.save({ session });

        // 4. Create Bid History
        const newBid = new Bid({
            auction: auctionId,
            bidder: userId,
            amount: amount
        });
        await newBid.save({ session });

        // 5. Commit Transaction
        await session.commitTransaction();
        session.endSession();

        // 6. Broadcast via Socket.io (using the global io instance attached to app/req or exported)
        // For now, we assume we can import it or pass it. 
        // Best practice depends on structure. We will emit from here if we have access, 
        // or return success and let route handler emit? 
        // Let's assume we import `io` or access it via `req.app.get('io')` if we attached it.
        const io = req.app.get("io");
        if (io) {
            io.to(auctionId).emit("new_bid", {
                currentPrice: amount,
                highestBidder: userId, // Warning: Sending ID might be less useful than Name, but for now ID.
                bidderName: req.user.name // Assuming user object has name
            });
        }

        res.status(200).json({ message: "Bid placed successfully", auction });

    } catch (error) {
        console.error("Transaction Aborted:", error);
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Bid failed due to concurrency or error" });
    }
};


export const getAuction = async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id).populate('product').populate('highestBidder', 'name');
        if (!auction) return res.status(404).json({ message: "Not found" });
        res.json(auction);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}


// Get auctions for the logged-in seller
export const getSellerAuctions = async (req, res) => {
    try {
        const auctions = await Auction.find({ seller: req.user.id })
            .populate('product', 'name quantity unit grade') // Populate product details
            .populate('highestBidder', 'name') // Populate bidder name
            .sort({ createdAt: -1 });
        res.json(auctions);
    } catch (error) {
        console.error("Error fetching seller auctions:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all active auctions (for Consumers & Admin)
export const getAllAuctions = async (req, res) => {
    try {
        const status = req.query.status || 'active';
        const auctions = await Auction.find({ status })
            .populate('product', 'name')
            .populate('seller', 'name')
            .populate('highestBidder', 'name')
            .sort({ createdAt: -1 });
        res.json(auctions);
    } catch (error) {
        console.error("Error fetching all auctions:", error);
    }
};

// Get recent bids across all auctions (for activity feed)
export const getRecentBids = async (req, res) => {
    try {
        const bids = await Bid.find()
            .populate('auction', 'product currentPrice') // Get auction details
            .populate('bidder', 'name') // Get bidder name
            .sort({ createdAt: -1 })
            .limit(10); // Last 10 bids
        res.json(bids);
    } catch (error) {
        console.error("Error fetching recent bids:", error);
        res.status(500).json({ message: "Server error" });
    }
};
