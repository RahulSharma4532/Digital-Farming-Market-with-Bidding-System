import React from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../routes/CartContext';

// Import local images
import neemImg from '../../../assets/images/products/neem_oil.jpg';
import fungicideImg from '../../../assets/images/products/fungicide.jpg';
import weedicideImg from '../../../assets/images/products/weedicide.jpg';

export default function FarmerPesticides() {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const products = [
        { id: 'p1', name: "Neem Oil (Organic)", price: 400, unit: "L", rating: 4.9, img: neemImg },
        { id: 'p2', name: "Fungicide (Mancozeb)", price: 650, unit: "kg", rating: 4.7, img: fungicideImg },
        { id: 'p3', name: "Weedicide (Glyphosate)", price: 800, unit: "L", rating: 4.6, img: weedicideImg },
    ];

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/farmer/buy')} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><ArrowLeft className="w-5 h-5" /></button>
                <h2 className="text-2xl font-bold text-slate-800">Pesticides</h2>
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
