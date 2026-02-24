import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import bidService from "../services/bidService";
import { Gavel, Clock, Trophy, History, User, AlertCircle, ArrowUp } from "lucide-react";

// Connect to socket outside component to avoid reconnects
const SOCKET_URL = import.meta.env.VITE_API_URL || 'https://digital-farming-market-with-bidding.onrender.com/api' ? import.meta.env.VITE_API_URL || 'https://digital-farming-market-with-bidding.onrender.com/api'.replace('/api', '') : '';
const socket = io(SOCKET_URL);

const AuctionItem = () => {
    const { id } = useParams();
    const [auction, setAuction] = useState(null);
    const [bidAmount, setBidAmount] = useState("");
    const [message, setMessage] = useState("");
    const [timeLeft, setTimeLeft] = useState("");
    const [wsConnected, setWsConnected] = useState(false);

    // Animation refs
    const lastBidRef = useRef(null);

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) setCurrentUser(user);
    }, []);

    useEffect(() => {
        const fetchAuction = async () => {
            try {
                const res = await bidService.getAuction(id);
                setAuction(res);
                setBidAmount(res.currentPrice + (res.bidIncrement || 50)); // Pre-fill next bid
            } catch (err) {
                console.error("Failed to load auction", err);
                setMessage("Failed to load auction");
            }
        };

        fetchAuction();

        // Socket.io Setup
        socket.on("connect", () => {
            console.log("Connected to WebSocket");
            setWsConnected(true);
            socket.emit("join_auction", id);
        });

        socket.on("new_bid", (data) => {
            console.log("New Bid Received:", data);
            setAuction((prev) => ({
                ...prev,
                currentPrice: data.currentPrice,
                highestBidder: data.highestBidder,
            }));

            setMessage(`New highest bid: ₹${data.currentPrice}!`);
            setBidAmount(data.currentPrice + (auction?.bidIncrement || 50));

            // Clear message after 3s
            setTimeout(() => setMessage(""), 3000);
        });

        return () => {
            socket.off("new_bid");
            socket.off("connect");
        };
    }, [id]); // Removed auction dependency to prevent loop

    // Countdown Timer Logic
    useEffect(() => {
        if (!auction?.endTime) return;

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const end = new Date(auction.endTime).getTime();
            const distance = end - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft("Auction Ended");
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [auction?.endTime]);


    const handlePlaceBid = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please login to bid");
            return;
        }

        try {
            await bidService.placeBid(id, bidAmount, token);
            // Success is handled by the socket event 'new_bid'
            // setMessage("Bid placed successfully!"); 
        } catch (err) {
            setMessage(err.response?.data?.message || "Bid failed");
        }
    };

    if (!auction) return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        </div>
    );



    // ... (rest of existing logic)

    // Check if Auction Ended and User Won
    const isAuctionEnded = timeLeft === "Auction Ended";
    const isWinner = isAuctionEnded && auction?.highestBidder && currentUser && (
        // Handle both populated object and direct ID string
        (typeof auction.highestBidder === 'object' ? auction.highestBidder._id === currentUser.id : auction.highestBidder === currentUser.id)
    );

    if (isWinner) {
        return (
            <div className="min-h-screen bg-[#0f172a] font-sans text-white p-6 relative overflow-hidden flex items-center justify-center">
                {/* Confetti Background Effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{
                            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`, animationDuration: '3s'
                        }}></div>
                    ))}
                </div>

                <div className="max-w-md w-full bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl border border-yellow-500/30 rounded-3xl p-8 text-center shadow-2xl relative z-10 animate-fade-in-up">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-6 shadow-lg animate-bounce">
                        <Trophy className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-black text-white mb-2 tracking-tight">You Won!</h1>
                    <p className="text-yellow-200/80 mb-8 text-lg">Congratulations on winning this auction.</p>

                    <div className="bg-black/20 rounded-2xl p-6 mb-8 border border-white/5">
                        <p className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-2">Winning Bid</p>
                        <p className="text-5xl font-black text-green-400 mb-4">₹{auction.currentPrice}</p>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-300 bg-white/5 py-2 px-4 rounded-lg">
                            <span className="font-bold">{auction.product?.name}</span>
                            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                            <span>{auction.product?.quantity} {auction.product?.unit}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => window.location.href = '/consumer/orders'}
                        className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl shadow-lg transform hover:-translate-y-1 transition-all"
                    >
                        Proceed to Payment
                    </button>
                    <button
                        onClick={() => window.location.href = '/consumer/auctions'}
                        className="mt-4 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        Back to Auctions
                    </button>
                </div>
            </div>
        );
    }

    // Default Return (Existing UI)
    return (
        <div className="min-h-screen bg-[#0f172a] font-sans text-white p-6 relative overflow-hidden flex items-center justify-center">
            {/* ... Existing UI Content ... */}
            {/* Note: I'm preserving the original return content by wrapping this new return before the old one. 
                Wait, I need to insert this logic *inside* the component but *before* the main return.
                Since I am using 'replace_file_content', I will rewrite the top part of the component to include this logic.
            */}

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

                {/* Left Column: Product & Timer */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Header Card */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-green-600 text-white px-4 py-1.5 rounded-bl-2xl font-bold flex items-center gap-2">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                            LIVE NOW
                        </div>

                        <h1 className="text-4xl font-black tracking-tight mb-2 flex flex-wrap items-center gap-4">
                            {auction.product?.name || "Unknown Product"}
                            {auction.product?.quantity && (
                                <span className="bg-green-500/20 text-green-300 px-4 py-1 rounded-xl text-lg border border-green-500/30">
                                    {auction.product.quantity} {auction.product.unit || 'kg'}
                                </span>
                            )}
                            {auction.product?.grade && (
                                <span className="bg-yellow-500/20 text-yellow-300 px-4 py-1 rounded-xl text-lg border border-yellow-500/30">
                                    Grade {auction.product.grade}
                                </span>
                            )}
                        </h1>
                        <div className="flex items-center gap-4 mt-2 mb-6">
                            <p className="text-gray-400 flex items-center gap-2 text-lg">
                                <User className="w-5 h-5" /> Seller Name
                            </p>
                            <div className="group relative">
                                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider cursor-help flex items-center gap-1">
                                    <Gavel className="w-3 h-3" /> English Auction
                                </span>
                                <div className="absolute left-0 bottom-full mb-2 w-64 p-3 bg-black/90 border border-white/10 rounded-xl text-xs text-gray-300 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                    <p className="font-bold text-white mb-1">How it works:</p>
                                    <ul className="list-disc pl-4 space-y-1">
                                        <li>Start at a base price.</li>
                                        <li>Bidders compete by raising the price.</li>
                                        <li>Highest bidder when time ends wins.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Current Price</p>
                                <p className="text-5xl font-black text-green-400">₹{auction.currentPrice}</p>
                            </div>
                            <div className="bg-black/20 rounded-2xl p-6 border border-white/5">
                                <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Time Remaining</p>
                                <p className="text-4xl font-mono font-bold text-white/90">{timeLeft}</p>
                            </div>
                        </div>
                    </div>

                    {/* Chart/Details Placeholder */}
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 h-64 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                            <History className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Bid History Graph Coming Soon</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Bidding Interface */}
                <div className="lg:col-span-4 flex flex-col h-[600px]">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl flex-1 flex flex-col">
                        <div className="mb-6 flex items-center gap-2 text-xl font-bold border-b border-white/10 pb-4">
                            <Gavel className="w-6 h-6 text-green-400" />
                            Place Your Bid
                        </div>

                        {/* Recent Activity */}
                        <div className="flex-1 overflow-y-auto space-y-3 mb-6 pr-2 scrollbar-thin scrollbar-thumb-white/20">
                            <div className="bg-white/5 rounded-xl p-3 text-sm flex justify-between items-center animate-fade-in-up">
                                <span className="text-gray-300">Highest Bidder</span>
                                <span className="font-bold text-green-400">₹{auction.currentPrice}</span>
                            </div>
                            <div className="bg-white/5 rounded-xl p-3 text-sm flex justify-between items-center opacity-50">
                                <span className="text-gray-500">Starting Price</span>
                                <span className="font-bold text-gray-400">₹{auction.startingPrice}</span>
                            </div>
                        </div>

                        {/* Bidding Controls */}
                        <div className="space-y-4">
                            {currentUser?.role === 'farmer' ? (
                                <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-center">
                                    <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                                    <h3 className="text-lg font-bold text-yellow-200 mb-1">Seller View</h3>
                                    <p className="text-sm text-yellow-200/70">Farmers cannot place bids.</p>
                                </div>
                            ) : (
                                <>
                                    {message && (
                                        <div className={`p-3 rounded-xl text-center text-sm font-bold animate-bounce ${message.includes("failed") ? "bg-red-500/20 text-red-200" : "bg-green-500/20 text-green-200"}`}>
                                            {message}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-300 ml-1">Your Bid Amount</label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-3.5 text-gray-400 font-bold">₹</span>
                                            <input
                                                type="number"
                                                className="w-full bg-black/40 border border-white/20 rounded-xl pl-8 pr-4 py-3 text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all placeholder-gray-600"
                                                value={bidAmount}
                                                onChange={(e) => setBidAmount(e.target.value)}
                                            />
                                        </div>
                                        <p className="text-xs text-gray-400 text-right">Min bid: ₹{auction.currentPrice + (auction.bidIncrement || 1)}</p>
                                    </div>

                                    <button
                                        onClick={handlePlaceBid}
                                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg transform hover:-translate-y-0.5 active:scale-95 transition-all text-lg flex items-center justify-center gap-2"
                                    >
                                        Place Bid <ArrowUp className="w-5 h-5" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionItem;
