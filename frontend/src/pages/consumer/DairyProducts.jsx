import React from 'react';
import { ShoppingCart, Star, Filter, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../routes/CartContext';

export default function DairyProducts() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const products = [
    { id: 101, name: "Fresh Cow Milk", price: 60, unit: "Litre", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=600&auto=format&fit=crop", rating: 4.8 },
    { id: 102, name: "Organic Butter", price: 450, unit: "500g", img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?q=80&w=600&auto=format&fit=crop", rating: 4.9 },
    { id: 103, name: "Farm Fresh Paneer", price: 320, unit: "kg", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=600&auto=format&fit=crop", rating: 4.7 },
    { id: 104, name: "Greek Yogurt", price: 120, unit: "Cup", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=600&auto=format&fit=crop", rating: 4.6 },
    { id: 105, name: "Buffalo Ghee", price: 1100, unit: "Litre", img: "https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?q=80&w=600&auto=format&fit=crop", rating: 5.0 },
    { id: 106, name: "Cheddar Cheese", price: 400, unit: "200g", img: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=600&auto=format&fit=crop", rating: 4.5 },
  ];

  return (
    <div className="min-h-screen bg-[#f0f9ff] font-sans text-slate-800 pb-12">

      {/* 3D Blue Background Accents */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-200/40 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-blue-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
            Dairy Collection
          </h1>
          <button className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl text-blue-600">
            <Filter className="w-6 h-6" />
          </button>
        </div>

        {/* Featured Hero Card (3D Style) */}
        <div className="mb-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">Best Seller</span>
              <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Fresh Farm <br />Morning Milk</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-md">Delivered straight from trusted local farms within hours of milking. Pure, untreated, and wholesome.</p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all">
                Shop Now
              </button>
            </div>
            <div className="relative h-64 md:h-80 perspective-1000">
              <img
                src="https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=600&auto=format&fit=crop"
                alt="Milk Bottle"
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl p-4 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-4 bg-blue-50">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-bold">{item.rating}</span>
                </div>
              </div>

              <div className="px-2 pb-2">
                <h3 className="text-xl font-bold text-slate-800 mb-1">{item.name}</h3>
                <p className="text-slate-400 text-sm mb-4">Farm Fresh Direct</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-blue-600">₹{item.price}</span>
                    <span className="text-sm font-medium text-slate-400">/ {item.unit}</span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}