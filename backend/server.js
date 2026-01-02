import express from "express";
import { createServer } from "http"; // Restore
import { Server } from "socket.io"; // Restore
// Trigger restart 5
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import auctionRoutes from "./routes/auctionRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
// Connect to DB and start server
const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }

  // Socket.io Connection (moved inside or kept outside, io is already defined)

  httpServer.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
};

// Initialize
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

startServer();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/auctions", auctionRoutes);
app.use("/api/products", productRoutes);

// Make io accessible to our router
app.set("io", io);

// Socket.io Connection
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join_auction", (room) => {
    socket.join(room);
    console.log(`User joined auction: ${room}`);
  });

  // socket.on("place_bid") removed: Bids should go through API for validation

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


