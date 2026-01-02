
import React from 'react';
import { Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../../routes/CartContext';
import { useNavigate } from 'react-router-dom';

export default function FarmerCart() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-black text-slate-800 mb-8">Your Cart</h2>

            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl">
                    <p className="text-gray-400 mb-4">Your cart is empty.</p>
                    <button onClick={() => navigate('/farmer/buy')} className="text-green-600 font-bold hover:underline">Start Shopping</button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                <img src={item.img} className="w-20 h-20 object-cover rounded-lg bg-gray-100" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-800">{item.name}</h4>
                                    <p className="text-green-600 font-bold">₹{item.price}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                                            <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center font-bold hover:bg-white rounded shadow-sm">-</button>
                                            <span className="text-sm w-4 text-center">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center font-bold hover:bg-white rounded shadow-sm">+</button>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit">
                        <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                        <div className="flex justify-between mb-2 text-gray-500">
                            <span>Subtotal</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-gray-500">
                            <span>Delivery</span>
                            <span className="text-green-600">Free</span>
                        </div>
                        <div className="border-t pt-4 flex justify-between font-black text-xl mb-6">
                            <span>Total</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                            Proceed to Checkout <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
