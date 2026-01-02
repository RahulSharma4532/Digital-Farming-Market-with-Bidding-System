import React from 'react';
import { ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../routes/CartContext'; // Reuse Cart Context for simplicity or create new one

export default function FarmerSeeds() {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const products = [
        { id: 's1', name: "Hybrid Tomato Seeds", price: 450, unit: "pack", rating: 4.8, img: "https://images.unsplash.com/photo-1599818987482-143003b3846e?q=80&w=600&auto=format&fit=crop" },
        { id: 's2', name: "Basmati Rice Seeds", price: 1200, unit: "kg", rating: 4.9, img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop" },
        { id: 's3', name: "Wheat Seeds (HD-2967)", price: 800, unit: "kg", rating: 4.7, img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop" },
        { id: 's4', name: "Cotton Seeds", price: 2500, unit: "pack", rating: 4.6, img: "https://images.unsplash.com/photo-1605342279762-b91c015b3260?q=80&w=600&auto=format&fit=crop" },
        { id: 's5', name: "Mango Sapling (Alphonso)", price: 150, unit: "pc", rating: 4.9, img: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600&auto=format&fit=crop" },
        { id: 's6', name: "Coconut Sapling", price: 200, unit: "pc", rating: 4.8, img: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=600&auto=format&fit=crop" },
    ];

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/farmer/buy')} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><ArrowLeft className="w-5 h-5" /></button>
                <h2 className="text-2xl font-bold text-slate-800">Seeds & Saplings</h2>
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
