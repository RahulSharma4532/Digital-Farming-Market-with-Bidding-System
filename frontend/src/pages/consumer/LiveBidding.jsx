import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { Clock, TrendingUp, User, ShoppingBag } from "lucide-react";
import bidService from "../../services/bidService"; // Assuming this exists or we use fetch

// Create socket connection outside component to avoid reconnects
// Use environment variable for URL or default to localhost
const SOCKET_URL = import.meta.env.VITE_API_URL || 'https://digital-farming-market-with-bidding.onrender.com/api' ? import.meta.env.VITE_API_URL || 'https://digital-farming-market-with-bidding.onrender.com/api'.replace('/api', '') : '';
const socket = io(SOCKET_URL);

const LiveBidding = () => {
    const { id } = useParams();
    const [auction, setAuction] = useState(null);
    const [bids, setBids] = useState([]);
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch initial auction data
        const fetchAuction = async () => {
            try {
                // We need an endpoint to get auction details. Assuming getAuction exists.
                // If bidService doesn't have it, we'll fetch directly.
                const token = localStorage.getItem('token');
                const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://digital-farming-market-with-bidding.onrender.com/api'}/auctions/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok) {
                    setAuction(data);
                    setBids(data.bids || []); // Assuming backend sends bid history in auction object or we fetch separate
                    setAmount(data.currentPrice + (data.bidIncrement || 50));
                } else {
                    setError(data.message);
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load auction");
            } finally {
                setLoading(false);
            }
        };

        fetchAuction();

        // Socket Join Room
        socket.emit("join_auction", id);
        console.log(`Joined auction room: ${id}`);

        // Listen for new bids
        socket.on("new_bid", (data) => {
            console.log("New bid received:", data);
            setAuction(prev => ({
                ...prev,
                currentPrice: data.currentPrice,
                highestBidder: { name: data.bidderName } // Optimistic update
            }));
            setBids(prev => [data, ...prev]);
            setAmount(data.currentPrice + (auction?.bidIncrement || 50));
        });

        return () => {
            socket.off("new_bid");
            socket.emit("leave_auction", id); // Optional: if backend handles leave
        };
    }, [id]);

    const handleBid = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'https://digital-farming-market-with-bidding.onrender.com/api'}/auctions/bid`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ auctionId: id, amount: Number(amount) })
            });

            const data = await res.json();
            if (res.ok) {
                console.log("Bid placed successfully via API");
                // Socket will handle the UI update
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Failed to place bid");
        }
    };

    if (loading) return <div className="text-white text-center mt-20">Loading Auction...</div>;
    if (!auction) return <div className="text-white text-center mt-20">Auction not found</div>;

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-6 font-sans">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Product & Auction Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header Card */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-bl-2xl animate-pulse">
                            Live Now
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="w-32 h-32 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-400">
                                {/* Placeholder for product image */}
                                <ShoppingBag className="w-12 h-12" />
                            </div>
                            <div>
                                <h1 className="text-4xl font-black mb-2">{auction.product?.name || "Unknown Product"}</h1>
                                <p className="text-gray-400 text-lg mb-4">{auction.product?.description || "Fresh produce from local farmers"}</p>
                                <div className="flex gap-4">
                                    <div className="px-4 py-2 bg-white/10 rounded-lg flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-green-400" />
                                        <span className="text-sm font-medium">Ends in 2h 45m</span>
                                        {/* TODO: Implement real countdown based on auction.endTime */}
                                    </div>
                                    <div className="px-4 py-2 bg-white/10 rounded-lg flex items-center gap-2">
                                        <User className="w-4 h-4 text-blue-400" />
                                        <span className="text-sm font-medium">Seller: {auction.seller?.name || "Farmer"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart / Stats Area - Placeholder for now */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <span className="block text-gray-400 text-sm mb-1">Starting Price</span>
                            <span className="text-2xl font-bold">₹{auction.startingPrice}</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                            <span className="block text-gray-400 text-sm mb-1">Total Bids</span>
                            <span className="text-2xl font-bold">{bids.length}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Bidding Console */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md flex flex-col h-[600px]">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-400" />
                        Current Top Bid
                    </h2>

                    <div className="text-center mb-8 py-8 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-2xl border border-green-500/20">
                        <span className="block text-gray-400 text-sm uppercase tracking-widest mb-2">Current Highest Bid</span>
                        <div className="text-6xl font-black text-white tracking-tighter">
                            ₹{auction.currentPrice}
                        </div>
                        <div className="mt-2 text-sm text-green-400 font-medium flex items-center justify-center gap-1">
                            Highest Bidder: {auction.highestBidder?.name || "No bids yet"}
                        </div>
                    </div>

                    {/* Bidding Controls */}
                    <form onSubmit={handleBid} className="mb-8">
                        <div className="flex gap-3">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                min={auction.currentPrice + (auction.bidIncrement || 1)}
                                className="flex-1 bg-[#0f172a] border border-white/10 rounded-xl px-4 text-white focus:outline-none focus:border-green-500 transition-colors font-mono text-lg"
                            />
                            <button
                                type="submit"
                                className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-4 rounded-xl transition-all active:scale-95"
                            >
                                Place Bid
                            </button>
                        </div>
                        {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
                        <p className="text-center text-xs text-gray-500 mt-3">Minimum bid increment: ₹{auction.bidIncrement}</p>
                    </form>

                    {/* Live Feed */}
                    <div className="flex-1 overflow-hidden flex flex-col">
                        <h3 className="text-sm font-bold text-gray-400 mb-4">Live Activity Feed</h3>
                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                            {bids.map((bid, i) => (
                                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5 animate-in slide-in-from-right fade-in duration-300">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-xs font-bold text-blue-400">
                                            {bid.bidderName ? bid.bidderName[0] : 'U'}
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-gray-200">{bid.bidderName}</div>
                                            <div className="text-xs text-gray-500">Just now</div>
                                        </div>
                                    </div>
                                    <div className="font-mono font-bold text-green-400">₹{bid.currentPrice || bid.amount}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveBidding;
