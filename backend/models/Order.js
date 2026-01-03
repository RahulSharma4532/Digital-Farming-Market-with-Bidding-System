import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            auction: { type: mongoose.Schema.Types.ObjectId, ref: "Auction" },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            image: { type: String }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        name: String,
        phone: String,
        email: String,
        address: String,
        city: String,
        pincode: String,
        instructions: String
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending"
    },
    paymentMethod: {
        type: String,
        default: "COD"
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending"
    }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
