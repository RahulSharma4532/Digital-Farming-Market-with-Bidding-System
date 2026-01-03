import mongoose from "mongoose";

const systemConfigSchema = new mongoose.Schema({
    maintenanceMode: {
        type: Boolean,
        default: false
    },
    allowRegistration: {
        type: Boolean,
        default: true
    },
    platformFee: {
        type: Number,
        default: 2.5
    },
    emailNotifications: {
        type: Boolean,
        default: true
    },
    autoApproveFarmers: {
        type: Boolean,
        default: false
    },
    debugMode: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model("SystemConfig", systemConfigSchema);
