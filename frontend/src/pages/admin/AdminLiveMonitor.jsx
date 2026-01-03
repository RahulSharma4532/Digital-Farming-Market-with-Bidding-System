import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {
    Gavel, TrendingUp, AlertCircle, StopCircle,
    Activity, Clock, User, ArrowLeft
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Use environment variable for URL or default to localhost
const SOCKET_URL = 'http://localhost:5000';
const socket = io(SOCKET_URL);

export default function AdminLiveMonitor() {
    const navigate = useNavigate();
    const [activeAuctions, setActiveAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [systemStatus, setSystemStatus] = useState("Operational");

    useEffect(() => {
        fetchAuctions();

        // Listen for new bids
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

        // Listen for status changes (e.g. stopped auctions)
        socket.on("auction_update", (data) => {
            if (data.type === "STATUS_CHANGE" && data.status === "cancelled") {
                setActiveAuctions((prev) => prev.filter(a => a._id !== data.auctionId));
            }
        });

        return () => {
            socket.off("new_bid");
            socket.off("auction_update");
        };
    }, []);

    const fetchAuctions = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auctions`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                // Filter only active auctions
                setActiveAuctions(data.filter(a => a.status === 'active'));
            }
        } catch (error) {
            console.error("Error fetching auctions:", error);
            setSystemStatus("Connection Error");
        } finally {
            setLoading(false);
        }
    };

    const handleStopAuction = async (id) => {
        if (!confirm("EMERGENCY STOP: Are you sure you want to forcibly end this auction?")) return;

        try {
            const token = localStorage.getItem('jwt');
            await fetch(`http://localhost:5000/api/admin/auctions/${id}/stop`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` }
            });
            // Optimistic Update
            setActiveAuctions(prev => prev.filter(a => a._id !== id));
        } catch (error) {
            console.error("Failed to stop auction", error);
        }
    };

    // Calculate Stats
    const totalVolume = activeAuctions.reduce((sum, a) => sum + (a.currentPrice || 0), 0);
    const totalBids = activeAuctions.reduce((sum, a) => sum + (a.bidsCount || 0), 0);

    return (
        <div className="min-h-screen bg-[#0f172a] text-white font-sans p-8">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin')}
                        className="p-2 bg-[#1e293b] rounded-full hover:bg-[#334155] transition-colors"
                    >
                        <ArrowLeft className="text-slate-400" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Activity className="text-red-500 animate-pulse" />
                            Live Auction Monitor
                        </h1>
                        <p className="text-slate-400 text-sm">Real-time surveillance & control</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className={`px-4 py-2 rounded-full border flex items-center gap-2 font-bold text-sm ${systemStatus === 'Operational'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${systemStatus === 'Operational' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                        {systemStatus}
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#1e293b]/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Gavel size={64} />
                    </div>
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Active Auctions</p>
                    <h3 className="text-4xl font-black text-white">{activeAuctions.length}</h3>
                    <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                        <span className="text-emerald-400">●</span> Live Now
                    </div>
                </div>

                <div className="bg-[#1e293b]/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={64} />
                    </div>
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Total Volume</p>
                    <h3 className="text-4xl font-black text-emerald-400">₹{totalVolume.toLocaleString()}</h3>
                    <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                        <TrendingUp size={12} className="text-emerald-400" /> +12% vs last hour
                    </div>
                </div>

                <div className="bg-[#1e293b]/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity size={64} />
                    </div>
                    <p className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-1">Bid Velocity</p>
                    <h3 className="text-4xl font-black text-blue-400">{totalBids}</h3>
                    <div className="mt-2 text-xs text-slate-500">Bids placed during current session</div>
                </div>
            </div>

            {/* Live Feed Table */}
            <div className="bg-[#1e293b] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0f172a]/50">
                    <h2 className="font-bold flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                        Live Feed
                    </h2>
                    <span className="text-xs text-slate-500 font-mono">LATENCY: 24ms</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#0f172a] text-slate-400 text-xs uppercase font-bold tracking-wider">
                            <tr>
                                <th className="p-6">Auction Details</th>
                                <th className="p-6">Live Price</th>
                                <th className="p-6">Highest Bidder</th>
                                <th className="p-6">Time Remaining</th>
                                <th className="p-6 text-right">Emergency Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-sm">
                            <AnimatePresence>
                                {loading ? (
                                    <tr><td colSpan="5" className="p-10 text-center text-slate-500">Connecting to live feed...</td></tr>
                                ) : activeAuctions.length === 0 ? (
                                    <tr><td colSpan="5" className="p-10 text-center text-slate-500">No active auctions at the moment.</td></tr>
                                ) : (
                                    activeAuctions.map((auction) => (
                                        <motion.tr
                                            key={auction._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="hover:bg-white/5 transition-colors group"
                                        >
                                            <td className="p-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-emerald-900/50 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                                        <Gavel size={20} />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white text-base">{auction.product?.name || "Unknown Product"}</p>
                                                        <p className="text-slate-500 text-xs font-mono">ID: {auction._id.slice(-6)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="font-mono font-bold text-emerald-400 text-lg">
                                                    ₹{auction.currentPrice?.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-slate-500">{auction.bidsCount || 0} bids</div>
                                            </td>
                                            <td className="p-6">
                                                {auction.highestBidder ? (
                                                    <div className="flex items-center gap-2 text-slate-300">
                                                        <User size={14} />
                                                        <span>{auction.highestBidder.name}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-600 italic">No bids yet</span>
                                                )}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-2 text-slate-400">
                                                    <Clock size={14} />
                                                    <span>
                                                        {auction.endTime ? new Date(auction.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-right">
                                                <button
                                                    onClick={() => handleStopAuction(auction._id)}
                                                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold flex items-center gap-2 ml-auto transition-all hover:scale-105"
                                                >
                                                    <StopCircle size={14} />
                                                    EMERGENCY STOP
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
