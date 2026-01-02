import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        enum: ["Vegetables", "Fruits", "Grains", "Spices", "Other"],
        default: "Other",
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    images: [String],
    quantity: {
        type: Number,
        default: 1
    },
    unit: {
        type: String, // e.g., 'kg', 'ton', 'box'
        default: 'kg'
    },
    grade: {
        type: String, // e.g., 'A', 'B', 'Organic'
        default: 'Standard'
    },
    harvestDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Product", productSchema);
