import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    startingPrice: {
        type: Number,
        required: true,
    },
    currentPrice: {
        type: Number,
        required: true,
        default: function () {
            return this.startingPrice;
        },
    },
    highestBidder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    bidIncrement: {
        type: Number,
        default: 50, // Default increment amount
    },
    startTime: {
        type: Date,
        default: Date.now,
    },
    endTime: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "completed", "cancelled"],
        default: "active",
    },
}, { timestamps: true });

export default mongoose.model("Auction", auctionSchema);
