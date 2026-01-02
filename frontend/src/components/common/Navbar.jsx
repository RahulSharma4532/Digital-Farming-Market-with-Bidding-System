import React, { useState } from 'react';
import { ShoppingCart, Bell, MapPin, User, Menu, X, CheckCircle, Info, Gavel } from 'lucide-react';
import { useCart } from '../../routes/CartContext';
import { useLocation } from '../../context/LocationContext';
import { useNavigate } from 'react-router-dom';
import WeatherWidget from '../weather/WeatherWidget';

export default function Navbar() {
    const { cartCount } = useCart();
    const { city, error: locationError } = useLocation();
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);

    const notifications = [
        { id: 1, title: "Order Delivered", msg: "Your order #12345 has been delivered successfully.", type: "success", time: "2 mins ago" },
        { id: 2, title: "Flash Sale Alert", msg: "Get 50% off on Organic Tomatoes for the next hour!", type: "info", time: "1 hr ago" },
        { id: 3, title: "Driver Nearby", msg: "Your delivery partner is 5 mins away.", type: "info", time: "2 hrs ago" },
    ];

    return (
        <div className="flex items-center justify-between py-4 relative z-50">
            {/* Brand & Location */}
            <div className="flex items-center gap-6">
                <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2 cursor-pointer" onClick={() => navigate('/consumer/home')}>
                    <span className="text-green-500 text-3xl">🌱</span>
                    TerraFresh
                </h1>

                <div className="hidden md:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 text-sm text-gray-300 hover:bg-white/10 cursor-pointer transition-colors">
                    <MapPin className={`w-4 h-4 ${locationError ? 'text-gray-500' : 'text-red-400'}`} />
                    <span>Delivering to: <span className="text-white font-bold">{locationError ? "Location Disabled" : city}</span></span>
                </div>

                <div
                    onClick={() => navigate('/consumer/auctions')}
                    className="hidden md:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 text-sm text-gray-300 hover:bg-white/10 hover:text-green-400 cursor-pointer transition-colors group"
                >
                    <Gavel className="w-4 h-4 group-hover:text-green-400" />
                    <span className="font-bold">Live Auctions</span>
                </div>
            </div>

            {/* Center Widget (Weather) */}
            <div className="hidden lg:block">
                <WeatherWidget />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">

                {/* Notification Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 text-gray-300 hover:text-white transition-colors"
                    >
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0f172a]"></span>
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 top-12 w-80 bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
                            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h3 className="font-bold text-white">Notifications</h3>
                                <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-white"><X className="w-4 h-4" /></button>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {notifications.map(n => (
                                    <div key={n.id} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                                        <div className="flex items-start gap-3">
                                            {n.type === 'success' ? <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" /> : <Info className="w-5 h-5 text-blue-500 mt-0.5" />}
                                            <div>
                                                <p className="font-bold text-sm text-white">{n.title}</p>
                                                <p className="text-xs text-gray-400 mt-1">{n.msg}</p>
                                                <p className="text-[10px] text-gray-500 mt-2">{n.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 text-center border-t border-white/10 bg-white/5">
                                <button className="text-xs text-green-400 font-bold hover:underline">Mark all as read</button>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => navigate('/consumer/cart')}
                    className="relative p-2 text-gray-300 hover:text-white transition-colors group"
                >
                    <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-black text-xs font-bold flex items-center justify-center rounded-full animate-bounce">
                            {cartCount}
                        </span>
                    )}
                </button>

                <button
                    onClick={() => navigate('/consumer/profile')}
                    className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10"
                >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </button>

                <button className="md:hidden text-white">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
