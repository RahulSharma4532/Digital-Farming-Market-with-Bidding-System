import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // If null, it's a broadcast/admin notification
    },
    type: {
        type: String,
        enum: ["info", "success", "warning", "error"],
        default: "info"
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    link: {
        type: String // Optional link to redirect (e.g., to /admin/disputes)
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("Notification", notificationSchema);
