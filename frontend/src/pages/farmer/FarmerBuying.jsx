import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Sprout, Briefcase, Zap, Bug, ShoppingCart } from 'lucide-react';

export default function FarmerBuying() {
    const navigate = useNavigate();
    const location = useLocation();

    // If we are at the root '/farmer/buy', show the categories
    const isRoot = location.pathname === '/farmer/buy';

    const categories = [
        { id: 'seeds', title: "Seeds & Saplings", icon: <Sprout className="w-8 h-8 text-green-600" />, desc: "High yield varieties", color: "bg-green-100", border: "border-green-200" },
        { id: 'fertilizers', title: "Fertilizers", icon: <Zap className="w-8 h-8 text-yellow-600" />, desc: "Organic & Chemical", color: "bg-yellow-100", border: "border-yellow-200" },
        { id: 'equipment', title: "Equipments", icon: <Briefcase className="w-8 h-8 text-blue-600" />, desc: "Farm tools & machinery", color: "bg-blue-100", border: "border-blue-200" },
        { id: 'pesticides', title: "Pesticides", icon: <Bug className="w-8 h-8 text-red-600" />, desc: "Pest control solutions", color: "bg-red-100", border: "border-red-200" },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto font-sans">
            {isRoot && (
                <>
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-black text-slate-800">Farmer's Marketplace</h1>
                            <p className="text-gray-500">Buy high-quality inputs for your farm.</p>
                        </div>
                        <button onClick={() => navigate('/farmer/buy/cart')} className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition-colors">
                            <ShoppingCart className="w-5 h-5" />
                            <span>My Cart</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                onClick={() => navigate(cat.id)}
                                className={`bg-white p-6 rounded-2xl border ${cat.border} shadow-sm hover:shadow-xl cursor-pointer transition-all hover:-translate-y-1 group`}
                            >
                                <div className={`w-16 h-16 rounded-full ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    {cat.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">{cat.title}</h3>
                                <p className="text-gray-400 text-sm">{cat.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Trending Products</h2>
                        {/* Placeholder for trending items if needed, or simple banner */}
                        <div className="bg-gradient-to-r from-green-600 to-emerald-800 rounded-3xl p-8 text-white relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-black mb-2">Summer Sale Live!</h3>
                                <p className="mb-6 opacity-90">Get up to 40% off on all organic fertilizers this week.</p>
                                <button onClick={() => navigate('fertilizers')} className="bg-white text-green-800 px-6 py-2 rounded-xl font-bold hover:bg-green-50">Explore Deals</button>
                            </div>
                            <div className="absolute right-0 top-0 h-full w-1/2 bg-white/10 skew-x-12"></div>
                        </div>
                    </div>
                </>
            )}

            <Outlet />
        </div>
    );
}
