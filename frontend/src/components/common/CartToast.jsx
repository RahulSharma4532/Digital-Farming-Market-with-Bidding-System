import React, { useEffect } from 'react';
import { ShoppingBag, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import AuthContext to get role

export default function CartToast({ show, onClose, product }) {
    const navigate = useNavigate();
    const { user } = useAuth(); // Get user to check role

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    const handleViewCart = () => {
        if (user?.role === 'farmer') {
            navigate('/farmer/buy/cart');
        } else {
            navigate('/consumer/cart');
        }
        onClose();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
            <div className="bg-[#1e293b] border border-green-500/50 rounded-2xl p-4 shadow-2xl flex items-center gap-4 max-w-sm w-full backdrop-blur-xl">
                <div className="bg-green-500/20 p-3 rounded-xl border border-green-500/20">
                    <ShoppingBag className="w-6 h-6 text-green-400" />
                </div>

                <div className="flex-1">
                    <h4 className="font-bold text-white text-sm">Added to Cart!</h4>
                    <p className="text-xs text-gray-400 truncate">{product?.name || "Item"} has been added.</p>
                </div>

                <button
                    onClick={handleViewCart}
                    className="bg-green-500 hover:bg-green-600 text-black text-xs font-bold px-3 py-2 rounded-lg flex items-center gap-1 transition-colors"
                >
                    View <ArrowRight className="w-3 h-3" />
                </button>

                <button onClick={onClose} className="text-gray-500 hover:text-white">
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
