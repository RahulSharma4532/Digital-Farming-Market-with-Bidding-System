import React from 'react';
import { ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../routes/CartContext'; // Reuse Cart Context for simplicity or create new one

// Import local images
import tomatoImg from '../../../assets/images/products/farmer_tomato_seeds.jpg';
import riceImg from '../../../assets/images/products/farmer_rice_seeds.jpg';
import wheatImg from '../../../assets/images/products/farmer_wheat_seeds.jpg';
import cottonImg from '../../../assets/images/products/farmer_cotton_seeds.jpg';
import mangoImg from '../../../assets/images/products/farmer_mango_sapling.jpg';
import coconutImg from '../../../assets/images/products/farmer_coconut_sapling.jpg';

export default function FarmerSeeds() {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const products = [
        { id: 's1', name: "Hybrid Tomato Seeds", price: 450, unit: "pack", rating: 4.8, img: tomatoImg },
        { id: 's2', name: "Basmati Rice Seeds", price: 1200, unit: "kg", rating: 4.9, img: riceImg },
        { id: 's3', name: "Wheat Seeds (HD-2967)", price: 800, unit: "kg", rating: 4.7, img: wheatImg },
        { id: 's4', name: "Cotton Seeds", price: 2500, unit: "pack", rating: 4.6, img: cottonImg },
        { id: 's5', name: "Mango Sapling (Alphonso)", price: 150, unit: "pc", rating: 4.9, img: mangoImg },
        { id: 's6', name: "Coconut Sapling", price: 200, unit: "pc", rating: 4.8, img: coconutImg },
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
