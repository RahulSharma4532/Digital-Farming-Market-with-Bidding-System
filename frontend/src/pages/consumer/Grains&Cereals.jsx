import React from 'react';
import { ShoppingCart, Star, Filter, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../routes/CartContext';

// Import local images
import quinoaImg from '../../assets/images/products/quinoa.jpg';
import oatsImg from '../../assets/images/products/rolled_oats.jpg';

export default function GrainsAndCereals() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const products = [
    { id: 301, name: "Basmati Rice", price: 150, unit: "kg", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop", rating: 4.8 },
    { id: 302, name: "Whole Wheat Flour", price: 40, unit: "kg", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop", rating: 4.7 },
    { id: 303, name: "Organic Quinoa", price: 350, unit: "kg", img: quinoaImg, rating: 4.9 },
    { id: 304, name: "Corn Maize", price: 30, unit: "kg", img: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=600&auto=format&fit=crop", rating: 4.5 },
    { id: 305, name: "Rolled Oats", price: 180, unit: "kg", img: oatsImg, rating: 4.6 },
  ];

  return (
    <div className="min-h-screen bg-[#fffbeb] font-sans text-slate-800 pb-12">

      {/* 3D Yellow Background Accents */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-yellow-200/40 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-amber-200/40 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-yellow-600">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-amber-500">
            Grains & Cereals
          </h1>
          <button className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl text-yellow-600">
            <Filter className="w-6 h-6" />
          </button>
        </div>

        {/* Featured Hero Card */}
        <div className="mb-16 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">Dietary Staple</span>
              <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Wholesome <br />& Nutritious</h2>
              <p className="text-yellow-100 text-lg mb-8 max-w-md">Premium quality grains sourced from the finest fields. Perfect for a healthy, balanced diet.</p>
              <button className="bg-white text-yellow-600 px-8 py-3 rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all">
                Shop Now
              </button>
            </div>
            <div className="relative h-64 md:h-80 perspective-1000">
              <img
                src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=600&auto=format&fit=crop"
                alt="Grains"
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl p-4 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-4 bg-yellow-50">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop'; // Fallback to Rice image
                  }}
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-bold">{item.rating}</span>
                </div>
              </div>

              <div className="px-2 pb-2">
                <h3 className="text-xl font-bold text-slate-800 mb-1">{item.name}</h3>
                <p className="text-slate-400 text-sm mb-4">Field Fresh</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-yellow-600">₹{item.price}</span>
                    <span className="text-sm font-medium text-slate-400">/ {item.unit}</span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-slate-900 text-white p-3 rounded-xl hover:bg-yellow-600 transition-colors shadow-lg"
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
