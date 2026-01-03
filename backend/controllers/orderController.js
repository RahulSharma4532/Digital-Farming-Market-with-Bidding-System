
import Order from "../models/Order.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        const order = new Order({
            buyer: req.user._id,
            items,
            shippingAddress,
            paymentMethod,
            totalAmount,
            paymentStatus: paymentMethod === "cod" ? "pending" : "completed" // Simple logic for now
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my
// @access  Private
export const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("buyer", "name email");

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
