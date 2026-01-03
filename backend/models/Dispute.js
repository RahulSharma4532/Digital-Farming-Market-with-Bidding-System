import mongoose from "mongoose";

const disputeSchema = new mongoose.Schema({
    raisedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    targetUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    reason: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["open", "resolved", "rejected"],
        default: "open"
    },
    resolution: {
        type: String
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High", "Critical"],
        default: "Medium"
    }
}, { timestamps: true });

export default mongoose.model("Dispute", disputeSchema);
