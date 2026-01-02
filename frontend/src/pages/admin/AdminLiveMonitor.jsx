import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Gavel, TrendingUp, AlertCircle, StopCircle } from "lucide-react";

// Use environment variable for URL or default to localhost
const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
const socket = io(SOCKET_URL);

export default function AdminLiveMonitor() {
    const [activeAuctions, setActiveAuctions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAuctions();

        socket.on("new_bid", (data) => {
            setActiveAuctions((prev) => prev.map(a =>
                a._id === data.productId ? {
                    ...a,
                    currentPrice: data.currentPrice,
                    highestBidder: { name: data.bidderName },
                    bidsCount: (a.bidsCount || 0) + 1
                } : a
            ));
        });

        return () => {
            socket.off("new_bid");
        };
    }, []);

    const fetchAuctions = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auctions`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setActiveAuctions(data);
            } else {
                console.error("Failed to fetch auctions", data);
            }
        } catch (error) {
            console.error("Error fetching auctions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStopAuction = (id) => {
        // Allow admin to stop auction (To be implemented in backend)
        alert(`Stop auction ${id} - Backend implementation needed`);
    };

    return (
        <div className="p-6 font-sans text-gray-800">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">Live Auction Monitor</h1>
                <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    Live System Active
                </div>
            </div>

            {/* Stats Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500 text-sm font-medium">Total Active</span>
                        <Gavel className="w-5 h-5 text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold">{activeAuctions.length}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500 text-sm font-medium">Total Value</span>
                        <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold">₹{activeAuctions.reduce((sum, a) => sum + (a.currentPrice || 0), 0).toLocaleString()}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500 text-sm font-medium">System Status</span>
                        <AlertCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-green-600">Operational</h3>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold">All Active Auctions</h2>
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-6 text-center">Loading live data...</div>
                    ) : activeAuctions.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">No active auctions.</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium text-xs uppercase">
                                <tr>
                                    <th className="px-6 py-4">Auction ID</th>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Seller</th>
                                    <th className="px-6 py-4">Current Price</th>
                                    <th className="px-6 py-4">Highest Bidder</th>
                                    <th className="px-6 py-4 text-right">Control</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {activeAuctions.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-gray-500">
                                            {item._id.slice(-6)}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {item.product?.name || "Unknown"}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {item.seller?.name || "Unknown"}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-green-700">₹{item.currentPrice}</td>
                                        <td className="px-6 py-4 text-gray-600">{item.highestBidder?.name || "-"}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleStopAuction(item._id)}
                                                className="text-red-500 hover:text-red-700 font-bold text-xs flex items-center justify-end gap-1 w-full"
                                            >
                                                <StopCircle className="w-4 h-4" /> Stop
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
