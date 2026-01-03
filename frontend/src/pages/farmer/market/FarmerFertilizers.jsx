import React from 'react';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../routes/CartContext';

// Import local images
import ureaImg from '../../../assets/images/products/farmer_urea.jpg';
import dapImg from '../../../assets/images/products/farmer_dap.jpg';
import compostImg from '../../../assets/images/products/farmer_vermicompost.jpg';
import potashImg from '../../../assets/images/products/farmer_potash.jpg';

export default function FarmerFertilizers() {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const products = [
        { id: 'f1', name: "Urea (Neem Coated)", price: 266, unit: "45kg", rating: 4.9, img: ureaImg },
        { id: 'f2', name: "DAP (Di-ammonium Phosphate)", price: 1350, unit: "50kg", rating: 4.8, img: dapImg },
        { id: 'f3', name: "Organic Vermicompost", price: 300, unit: "25kg", rating: 4.9, img: compostImg },
        { id: 'f4', name: "Potash (MOP)", price: 1700, unit: "50kg", rating: 4.7, img: potashImg },
    ];

    return (
        <div>
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate('/farmer/buy')} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"><ArrowLeft className="w-5 h-5" /></button>
                <h2 className="text-2xl font-bold text-slate-800">Fertilizers</h2>
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
