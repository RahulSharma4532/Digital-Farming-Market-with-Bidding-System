import React from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../routes/CartContext';

export default function FarmerEquipments() {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const products = [
        { id: 'e1', name: "Knapsack Sprayer (16L)", price: 1200, unit: "pc", rating: 4.8, img: "https://plus.unsplash.com/premium_photo-1661910006733-1491295b282c?q=80&w=600&auto=format&fit=crop" },
        { id: 'e2', name: "Sickle (Iron)", price: 150, unit: "pc", rating: 4.9, img: "https://images.unsplash.com/photo-1590240974895-d22439162c95?q=80&w=600&auto=format&fit=crop" },
        { id: 'e3', name: "Spade (Phawda)", price: 350, unit: "pc", rating: 4.7, img: "https://images.unsplash.com/photo-1589820296156-2454bb8a6d54?q=80&w=600&auto=format&fit=crop" },
        { id: 'e4', name: "Drip Irrigation Kit (1 Acre)", price: 15000, unit: "set", rating: 4.9, img: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=600&auto=format&fit=crop" },
    ];

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/farmer/buy')} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><ArrowLeft className="w-5 h-5" /></button>
                <h2 className="text-2xl font-bold text-slate-800">Farm Equipments</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map(p => (
                    <div key={p.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-lg transition-all">
                        <img src={p.img} alt={p.name} className="w-full h-48 object-cover rounded-xl mb-4" />
                        <h3 className="font-bold text-lg mb-1">{p.name}</h3>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-xl font-bold text-green-600">₹{p.price} <span className="text-xs text-gray-400 font-normal">/{p.unit}</span></span>
                            <button onClick={() => addToCart(p)} className="bg-slate-900 text-white p-2 rounded-lg hover:bg-green-600 transition-colors">
                                <ShoppingCart className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
