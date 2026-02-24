import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, User, Gavel } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FeaturedAuctions() {
    const navigate = useNavigate();
    const [auctions, setAuctions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        fetchAuctions();
    }, []);

    const fetchAuctions = async () => {
        try {
            const BASE_URL = import.meta.env.VITE_API_URL || 'https://digital-farming-market-with-bidding.onrender.com/api';
            const res = await fetch(`${BASE_URL}/auctions?status=active`);
            const data = await res.json();
            // Take top 5 for the carousel
            if (res.ok) setAuctions(data.slice(0, 5));
        } catch (err) {
            console.error("Failed to fetch featured auctions");
        }
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % auctions.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + auctions.length) % auctions.length);
    };

    if (auctions.length === 0) return null;

    return (
        <div className="py-10 relative z-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b]/50 to-[#0f172a] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10 flex justify-between items-end">
                <div>
                    <h2 className="text-4xl font-black text-white tracking-tight">Live Auctions</h2>
                    <p className="text-slate-400 mt-2">Bidding wars happening right now.</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={handlePrev} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowRight className="rotate-180 text-white" />
                    </button>
                    <button onClick={handleNext} className="p-3 bg-green-500 hover:bg-green-400 rounded-full transition-colors text-black shadow-lg shadow-green-500/20">
                        <ArrowRight />
                    </button>
                </div>
            </div>

            <div className="relative h-[500px] flex items-center justify-center perspective-1000">
                <AnimatePresence mode='popLayout'>
                    {auctions.map((auction, idx) => {
                        // Calculate position relative to active index
                        let offset = (idx - activeIndex + auctions.length) % auctions.length;
                        if (offset > auctions.length / 2) offset -= auctions.length;

                        // Only render visible items (focus item and 1 neighbor on each side)
                        if (Math.abs(offset) > 2) return null;

                        const isCenter = offset === 0;

                        return (
                            <motion.div
                                key={auction._id}
                                layout
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{
                                    scale: isCenter ? 1.1 : 0.8,
                                    x: offset * 350, // Spacing
                                    z: isCenter ? 100 : -200, // Depth
                                    rotateY: offset * -15, // Rotation effect
                                    opacity: isCenter ? 1 : 0.4,
                                    zIndex: isCenter ? 50 : 10 - Math.abs(offset)
                                }}
                                transition={{ duration: 0.5, type: "spring" }}
                                className="absolute w-[320px] md:w-[400px] aspect-[4/5] bg-[#1e293b] rounded-3xl border border-white/10 shadow-2xl overflow-hidden cursor-pointer"
                                onClick={() => isCenter ? navigate(`/consumer/auctions/${auction._id}`) : setActiveIndex(idx)}
                            >
                                {/* Image Area */}
                                <div className="h-3/5 w-full relative">
                                    <img
                                        src={auction.product.image || "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=600&auto=format&fit=crop"}
                                        className="w-full h-full object-cover"
                                        alt={auction.product.name}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent"></div>
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                                        <Clock size={12} className="text-red-400" />
                                        <span className="text-xs font-bold text-white">Ending Soon</span>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-6 relative">
                                    <h3 className="text-2xl font-bold text-white mb-1">{auction.product.name}</h3>
                                    <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
                                        <User size={14} />
                                        <span>{auction.seller?.name || 'Local Farmer'}</span>
                                    </div>

                                    <div className="flex justify-between items-end border-t border-white/10 pt-4">
                                        <div>
                                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Current Bid</p>
                                            <p className="text-3xl font-black text-green-400">₹{auction.currentPrice}</p>
                                        </div>
                                        <button className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-green-500/20 transition-transform active:scale-95">
                                            <Gavel size={18} /> Bid Now
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
