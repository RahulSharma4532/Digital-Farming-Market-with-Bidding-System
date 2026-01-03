import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["consumer", "farmer", "admin"],
    default: "consumer"
  },
  // Governance Fields
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false }, // For Farmers

  // Farmer Profile Fields
  farmName: { type: String },
  location: { type: String },

  // Verification Documents
  documents: [{
    type: { type: String }, // e.g., "Aadhar", "7/12"
    url: { type: String },
    status: { type: String, enum: ["pending", "valid", "rejected"], default: "pending" },
    idNumber: { type: String }
  }],

  riskScore: { type: String, enum: ["Low", "Medium", "High"], default: "Low" }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
