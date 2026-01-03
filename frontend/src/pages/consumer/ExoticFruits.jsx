import React from 'react';
import { ShoppingCart, Star, Filter, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../routes/CartContext';

// Import local images
import dragonImg from '../../assets/images/products/dragon_fruit.jpg';
import kiwiImg from '../../assets/images/products/kiwi.jpg';
import avocadoImg from '../../assets/images/products/avocado.jpg';
import passionImg from '../../assets/images/products/passion_fruit.jpg';
import blueberryImg from '../../assets/images/products/blueberries.jpg';
import mangosteenImg from '../../assets/images/products/mangosteen.jpg';
import heroImg from '../../assets/images/products/exotic_hero.jpg';

export default function ExoticFruits() {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const products = [
        { id: 801, name: "Dragon Fruit", price: 120, unit: "pc", img: dragonImg, rating: 4.8 },
        { id: 802, name: "Kiwi", price: 40, unit: "pc", img: kiwiImg, rating: 4.7 },
        { id: 803, name: "Avocado", price: 200, unit: "pc", img: avocadoImg, rating: 4.9 },
        { id: 804, name: "Passion Fruit", price: 80, unit: "pc", img: passionImg, rating: 4.9 },
        { id: 805, name: "Imported Blueberries", price: 350, unit: "125g", img: blueberryImg, rating: 4.9 },
        { id: 806, name: "Mangosteen", price: 450, unit: "kg", img: mangosteenImg, rating: 5.0 },
    ];

    return (
        <div className="min-h-screen bg-[#fff0f5] font-sans text-slate-800 pb-12">

            {/* 3D Pink/Rose Background Accents */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-pink-200/40 rounded-full blur-[100px]"></div>
                <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-rose-200/40 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-pink-600">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-500">
                        Exotic Fruits
                    </h1>
                    <button className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl text-pink-600">
                        <Filter className="w-6 h-6" />
                    </button>
                </div>

                {/* Featured Hero Card */}
                <div className="mb-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block">Rare & Unique</span>
                            <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">Taste the <br />Extraordinary</h2>
                            <p className="text-pink-100 text-lg mb-8 max-w-md">Discover flavors from around the world. Hand-picked exotic fruits delivered to your doorstep.</p>
                            <button className="bg-white text-pink-600 px-8 py-3 rounded-2xl font-bold hover:shadow-lg hover:scale-105 transition-all">
                                Shop Now
                            </button>
                        </div>
                        <div className="relative h-64 md:h-80 perspective-1000">
                            <img
                                src={heroImg}
                                alt="Exotic Fruit Basket"
                                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((item) => (
                        <div key={item.id} className="bg-white rounded-3xl p-4 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                            <div className="relative h-64 rounded-2xl overflow-hidden mb-4 bg-pink-50">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=600&auto=format&fit=crop'; // Fallback
                                    }}
                                />
                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                    <span className="text-xs font-bold">{item.rating}</span>
                                </div>
                            </div>

                            <div className="px-2 pb-2">
                                <h3 className="text-xl font-bold text-slate-800 mb-1">{item.name}</h3>
                                <p className="text-slate-400 text-sm mb-4">Imported Fresh</p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-2xl font-black text-pink-600">₹{item.price}</span>
                                        <span className="text-sm font-medium text-slate-400">/ {item.unit}</span>
                                    </div>
                                    <button
                                        onClick={() => addToCart(item)}
                                        className="bg-slate-900 text-white p-3 rounded-xl hover:bg-pink-600 transition-colors shadow-lg"
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
