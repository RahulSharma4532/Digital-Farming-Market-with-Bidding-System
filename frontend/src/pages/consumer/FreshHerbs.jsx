import React from 'react';
import { ShoppingCart, Star, Filter, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../routes/CartContext';

export default function FreshHerbs() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const products = [
    { id: 401, name: "Fresh Coriander", price: 20, unit: "bunch", img: "https://images.unsplash.com/photo-1588879464875-c5464528cdb1?q=80&w=600&auto=format&fit=crop", rating: 4.8 },
    { id: 402, name: "Mint Leaves", price: 15, unit: "bunch", img: "https://images.unsplash.com/photo-1603048588665-791ca8aea616?q=80&w=600&auto=format&fit=crop", rating: 4.7 },
    { id: 403, name: "Basil Leaves", price: 40, unit: "bunch", img: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=600&auto=format&fit=crop", rating: 4.9 },
    { id: 404, name: "Curry Leaves", price: 10, unit: "packet", img: "https://images.unsplash.com/photo-1596395914652-32a26c483259?q=80&w=600&auto=format&fit=crop", rating: 4.6 },
    { id: 405, name: "Rosemary", price: 60, unit: "bunch", img: "https://images.unsplash.com/photo-1515587752250-1370e047bbdc?q=80&w=600&auto=format&fit=crop", rating: 5.0 },
    { id: 406, name: "Parsley", price: 50, unit: "bunch", img: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=600&auto=format&fit=crop", rating: 4.5 },
  ];

  return (
    <div className="min-h-screen bg-[#ecfccb] font-sans text-slate-800 pb-12">

      {/* 3D Green/Chartreuse Background Accents */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-lime-200/40 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-green-200/40 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lime-700">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-700 to-green-600">
            Aromatic Herbs
          </h1>
          <button className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl text-lime-700">
            <Filter className="w-6 h-6" />
          </button>
        </div>

        {/* Featured Hero Card */}
        <div className="mb-16 bg-gradient-to-r from-lime-600 to-green-600 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">Chef's Choice</span>
              <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Fresh Cut <br />Flavor Boosters</h2>
              <p className="text-lime-100 text-lg mb-8 max-w-md">Elevate your dishes with our hand-picked, pesticide-free fresh herbs. The secret ingredient to gourmet cooking.</p>
              <button className="bg-white text-lime-700 px-8 py-3 rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all">
                Shop Now
              </button>
            </div>
            <div className="relative h-64 md:h-80 perspective-1000">
              <img
                src="https://images.unsplash.com/photo-1595855709940-5100d11b3d6d?q=80&w=600&auto=format&fit=crop"
                alt="Herbs Basket"
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-700"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl p-4 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-4 bg-lime-50">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-bold">{item.rating}</span>
                </div>
              </div>

              <div className="px-2 pb-2">
                <h3 className="text-xl font-bold text-slate-800 mb-1">{item.name}</h3>
                <p className="text-slate-400 text-sm mb-4">Aromatic & Fresh</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-lime-700">₹{item.price}</span>
                    <span className="text-sm font-medium text-slate-400">/ {item.unit}</span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-slate-900 text-white p-3 rounded-xl hover:bg-lime-600 transition-colors shadow-lg"
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