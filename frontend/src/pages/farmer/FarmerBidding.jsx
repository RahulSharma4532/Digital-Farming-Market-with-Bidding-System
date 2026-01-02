import { useState, useEffect } from "react";
import io from "socket.io-client";
import { Gavel, Users, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Use environment variable for URL or default to localhost
const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
const socket = io(SOCKET_URL);

export default function FarmerBidding() {
  const [activeAuctions, setActiveAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auctions/seller`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        // Transform data if needed or use directly
        // Backend returns array of auctions
        // We might need to map some fields if names don't match, but they should be close
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

  const handleStartAuction = () => {
    navigate('/consumer/auctions');
  };

  const handleViewLive = (id) => {
    navigate(`/consumer/auctions/${id}`); // We can reuse the consumer view for now, or creaate a farmer specific one
  };

  return (
    <div className="p-6 font-sans text-gray-800">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Live Auctions</h1>
        <button onClick={handleStartAuction} className="bg-[#15803d] text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition flex items-center gap-2">
          <Gavel className="w-4 h-4" />
          Start New Auction
        </button>
      </div>

      {/* Stats Header (Mocked for now, can be calculated from activeAuctions) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500 text-sm font-medium">Active Listings</span>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold">{activeAuctions.filter(a => a.status === 'active').length}</h3>
          <span className="text-xs text-green-600 font-medium">real-time</span>
        </div>
        {/* ... other stats ... */}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold">Live Auction Inventory</h2>
          <p className="text-sm text-gray-400">Monitor bids and manage your active listings</p>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-6 text-center">Loading auctions...</div>
          ) : activeAuctions.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No active auctions found. Start one!</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Starting Price</th>
                  <th className="px-6 py-4">Current Price</th>
                  <th className="px-6 py-4">Highest Bidder</th>
                  <th className="px-6 py-4">Time Left</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {activeAuctions.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.product?.name || "Unknown Product"}
                      <div className="text-xs text-gray-400 font-normal">ID: {item._id.slice(-6)}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">₹{item.startingPrice}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">₹{item.currentPrice}</td>
                    <td className="px-6 py-4 font-bold text-green-700">{item.highestBidder?.name || "-"}</td>
                    <td className="px-6 py-4 flex items-center gap-2 text-orange-600 font-medium">
                      <Clock className="w-4 h-4" />
                      {new Date(item.endTime).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleViewLive(item._id)}
                        className="text-green-600 hover:text-green-800 font-bold text-xs"
                      >
                        View Live
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
