import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity } from 'lucide-react';

export default function MarketTicker() {
    const [feed, setFeed] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchFeed();
        const interval = setInterval(fetchFeed, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    const fetchFeed = async () => {
        try {
            const BASE_URL = import.meta.env.VITE_API_URL || 'https://digital-farming-market-with-bidding.onrender.com/api';
            const res = await fetch(`${BASE_URL}/auctions/feed`);
            const data = await res.json();
            if (res.ok && Array.isArray(data) && data.length > 0) {
                setFeed(data);
            } else {
                // If empty, we can show a placeholder or hide
                if (data.length === 0) setError(true);
            }
        } catch (err) {
            console.error("Ticker Error", err);
            setError(true);
        }
    };

    if (error || feed.length === 0) return null; // Hide if no activity

    return (
        <div className="w-full bg-[#0f172a]/80 backdrop-blur-md border-y border-white/5 py-2 overflow-hidden relative z-40">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0f172a] to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0f172a] to-transparent z-10"></div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20 ml-4 whitespace-nowrap z-20">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-wider">Live Market</span>
                </div>

                <motion.div
                    className="flex whitespace-nowrap gap-8"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20 // Adjust speed based on content length
                    }}
                >
                    {[...feed, ...feed].map((item, idx) => ( // Duplicate for seamless loop
                        <div key={`${item.id}-${idx}`} className="flex items-center gap-2 text-sm text-slate-300">
                            <TrendingUp size={14} className="text-emerald-500" />
                            <span className="font-semibold text-white">{item.message}</span>
                            <span className="text-slate-500 text-xs">
                                {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            <span className="mx-2 text-slate-700">|</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
