import React, { useState } from 'react';
import { ShoppingCart, Star, Filter, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../routes/CartContext';

// Import all images
import Artichoke from '../../assets/images/Artichoke.jpg';
import Arugula from '../../assets/images/Arugula.jpg';
import Asparagus from '../../assets/images/Asparagus.jpg';
import BabySpanich from '../../assets/images/BabySpanich.jpg';
import Beetroot from '../../assets/images/Beetroot.jpg';
import BellPaper from '../../assets/images/BellPaper.jpg';
import BitterGourd from '../../assets/images/Bitter Gourd.jpg';
import Carrots from '../../assets/images/Carrots.jpg';
import Cauliflower from '../../assets/images/Cauliflower.jpg';
import Celery from '../../assets/images/Celery.jpg';
import Chili from '../../assets/images/Chili.jpg';
import CollardGreens from '../../assets/images/Collard Greens.jpg';
import Coriander from '../../assets/images/Coriander.jpg';
import Endive from '../../assets/images/Endive.jpg';
import Fennel from '../../assets/images/Fennel.jpg';
import Garlic from '../../assets/images/Garlic.jpg';
import Ginger from '../../assets/images/Ginger.jpg';
import GreenBeans from '../../assets/images/GreenBeans.jpg';
import Horseradish from '../../assets/images/Horseradish.jpg';
import Kale from '../../assets/images/Kale.jpg';
import Kohlrabi from '../../assets/images/Kohlrabi.jpg';
import Leeks from '../../assets/images/Leeks.jpg';
import Lettuce from '../../assets/images/Lettuce.jpg';
import Mushrooms from '../../assets/images/Mushrooms.jpg';
import MustardGreens from '../../assets/images/Mustard Greens.jpg';
import NewPotatoes from '../../assets/images/New Potatoes.jpg';
import Okra from '../../assets/images/Okra.jpg';
import Pumpkin from '../../assets/images/Pumpkin.jpg';
import PurpleEggplant from '../../assets/images/PurpleEggplant.jpg';
import Radish from '../../assets/images/Radish.jpg';
import RedOnions from '../../assets/images/Red Onions.jpg';
import RidgeGourd from '../../assets/images/Ridge Gourd.jpg';
import RomaTomatoes from '../../assets/images/RomaTomatoes.jpg';
import SnowPeas from '../../assets/images/Snow Peas.jpg';
import SpringOnion from '../../assets/images/Spring Onion.jpg';
import Taro from '../../assets/images/Taro.jpg';
import Turnip from '../../assets/images/Turnip.jpg';
import Watercress from '../../assets/images/Watercress.jpg';
import Yam from '../../assets/images/Yam.jpg';
import Cabbage from '../../assets/images/cabbages.jpg';
import Cucumber from '../../assets/images/cucumbers.jpg';
import Potato from '../../assets/images/potatoes.jpg';
import SweetCorn from '../../assets/images/sweetcorn.jpg';


import Zucchini from '../../assets/images/products/zucchini.jpg';
import RawBanana from '../../assets/images/products/raw_banana.jpg';
import Drumstick from '../../assets/images/products/drumstick.jpg';
import ClusterBeans from '../../assets/images/products/cluster_beans.jpg';
import SnakeGourd from '../../assets/images/products/snake_gourd.jpg';
import PointedGourd from '../../assets/images/products/pointed_gourd.jpg';


export default function Vegetables() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  // 50 Items List with Indian Names
  const allProducts = [
    { id: 101, name: "Roma Tomato (Tamatar)", price: 40, unit: "kg", img: RomaTomatoes, rating: 4.8 },
    { id: 102, name: "Red Onion (Pyaaz)", price: 30, unit: "kg", img: RedOnions, rating: 4.7 },
    { id: 103, name: "Potato (Aloo)", price: 25, unit: "kg", img: Potato, rating: 4.9 },
    { id: 104, name: "Carrot (Gajar)", price: 50, unit: "kg", img: Carrots, rating: 4.8 },
    { id: 105, name: "Bell Pepper (Shimla Mirch)", price: 60, unit: "kg", img: BellPaper, rating: 4.6 },
    { id: 106, name: "Bitter Gourd (Karela)", price: 45, unit: "kg", img: BitterGourd, rating: 4.5 },
    { id: 107, name: "Cauliflower (Gobi)", price: 35, unit: "kg", img: Cauliflower, rating: 4.7 },
    { id: 108, name: "Okra (Bhindi)", price: 40, unit: "kg", img: Okra, rating: 4.8 },
    { id: 109, name: "Purple Eggplant (Baingan)", price: 30, unit: "kg", img: PurpleEggplant, rating: 4.6 },
    { id: 110, name: "Green Beans (Phali)", price: 50, unit: "kg", img: GreenBeans, rating: 4.7 },
    { id: 111, name: "Ginger (Adrak)", price: 120, unit: "kg", img: Ginger, rating: 4.9 },
    { id: 112, name: "Garlic (Lehsun)", price: 150, unit: "kg", img: Garlic, rating: 4.9 },
    { id: 113, name: "Spinach (Palak)", price: 20, unit: "bunch", img: BabySpanich, rating: 4.8 },
    { id: 114, name: "Coriander (Dhaniya)", price: 15, unit: "bunch", img: Coriander, rating: 4.8 },
    { id: 115, name: "Green Chili (Hari Mirch)", price: 80, unit: "kg", img: Chili, rating: 4.7 },
    { id: 116, name: "Cucumber (Kheera)", price: 30, unit: "kg", img: Cucumber, rating: 4.6 },
    { id: 118, name: "Pumpkin (Kaddu)", price: 25, unit: "kg", img: Pumpkin, rating: 4.5 },
    { id: 119, name: "Radish (Mooli)", price: 20, unit: "kg", img: Radish, rating: 4.4 },
    { id: 120, name: "Beetroot (Chukandar)", price: 40, unit: "kg", img: Beetroot, rating: 4.8 },
    { id: 121, name: "Sweet Corn (Bhutta)", price: 15, unit: "pc", img: SweetCorn, rating: 4.9 },
    { id: 122, name: "Ridge Gourd (Torai)", price: 40, unit: "kg", img: RidgeGourd, rating: 4.5 },
    { id: 123, name: "Cabbage (Patta Gobi)", price: 30, unit: "kg", img: Cabbage, rating: 4.6 },
    { id: 124, name: "Spring Onion (Hara Pyaaz)", price: 40, unit: "bunch", img: SpringOnion, rating: 4.7 },
    { id: 125, name: "Mushrooms (Khumb)", price: 50, unit: "pack", img: Mushrooms, rating: 4.8 },
    { id: 126, name: "Yam (Jimikand)", price: 60, unit: "kg", img: Yam, rating: 4.5 },
    { id: 127, name: "Taro Root (Arbi)", price: 45, unit: "kg", img: Taro, rating: 4.4 },
    { id: 128, name: "Asparagus (Shatavari)", price: 300, unit: "kg", img: Asparagus, rating: 4.9 },
    { id: 129, name: "Artichoke (Haathi Chak)", price: 200, unit: "kg", img: Artichoke, rating: 4.6 },
    { id: 130, name: "Celery (Ajwain Patta)", price: 150, unit: "kg", img: Celery, rating: 4.7 },
    { id: 131, name: "Leeks (Vilayeti Pyaaz)", price: 180, unit: "kg", img: Leeks, rating: 4.5 },
    { id: 132, name: "Kale (Karam Saag)", price: 200, unit: "kg", img: Kale, rating: 4.8 },
    { id: 133, name: "Turnip (Shalgam)", price: 30, unit: "kg", img: Turnip, rating: 4.4 },
    { id: 134, name: "Watercress (Jal Kumbhi)", price: 80, unit: "bunch", img: Watercress, rating: 4.6 },
    { id: 135, name: "Mustard Greens (Sarson)", price: 25, unit: "bunch", img: MustardGreens, rating: 4.7 },
    { id: 136, name: "Collard Greens (Haak)", price: 40, unit: "bunch", img: CollardGreens, rating: 4.5 },
    { id: 137, name: "Endive (Kasni)", price: 150, unit: "kg", img: Endive, rating: 4.6 },
    { id: 138, name: "Fennel (Saunf Stick)", price: 100, unit: "kg", img: Fennel, rating: 4.7 },
    { id: 139, name: "Horseradish (Sahjan)", price: 120, unit: "kg", img: Horseradish, rating: 4.4 },
    { id: 140, name: "Kohlrabi (Gaanth Gobi)", price: 50, unit: "kg", img: Kohlrabi, rating: 4.5 },
    { id: 141, name: "Lettuce (Salaad Patta)", price: 80, unit: "kg", img: Lettuce, rating: 4.6 },
    { id: 142, name: "Snow Peas (Matar Phali)", price: 120, unit: "kg", img: SnowPeas, rating: 4.8 },
    { id: 143, name: "New Potato (Naya Aloo)", price: 35, unit: "kg", img: NewPotatoes, rating: 4.8 },
    { id: 144, name: "Zucchini (Turai Type)", price: 100, unit: "kg", img: Zucchini, rating: 4.7 },
    { id: 145, name: "Arugula (Rocket)", price: 140, unit: "kg", img: Arugula, rating: 4.8 },
    { id: 146, name: "Raw Banana (Kaccha Kela)", price: 30, unit: "doz", img: RawBanana, rating: 4.5 },
    { id: 147, name: "Drumstick (Sahjan)", price: 60, unit: "kg", img: Drumstick, rating: 4.8 },
    { id: 148, name: "Cluster Beans (Gwar Phali)", price: 40, unit: "kg", img: ClusterBeans, rating: 4.6 },
    { id: 149, name: "Snake Gourd (Chichinda)", price: 45, unit: "kg", img: SnakeGourd, rating: 4.5 },
    { id: 150, name: "Pointed Gourd (Parwal)", price: 80, unit: "kg", img: PointedGourd, rating: 4.7 },
  ];

  const filteredProducts = allProducts.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f0fdf4] font-sans text-slate-800 pb-20">

      {/* 3D Green Background Accents */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-200/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all text-green-700">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-600">
                Fresh Vegetables
              </h1>
              <p className="text-green-600 font-medium">Farm fresh, pesticide free.</p>
            </div>
          </div>

          <div className="bg-white p-2 rounded-2xl shadow-lg flex items-center w-full md:w-96 border border-green-100">
            <Search className="w-5 h-5 text-gray-400 ml-2" />
            <input
              type="text"
              placeholder="Search vegetables (e.g. Aloo, Gobi)..."
              className="w-full px-3 py-2 outline-none text-slate-700 bg-transparent placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="p-2 bg-green-100 rounded-xl text-green-700 hover:bg-green-200">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl p-4 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group border border-green-50">
              <div className="relative h-56 rounded-2xl overflow-hidden mb-4 bg-green-50">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-xs font-bold">{item.rating}</span>
                </div>
              </div>

              <div className="px-2 pb-2">
                <h3 className="text-lg font-bold text-slate-800 mb-1 leading-tight">{item.name}</h3>
                <p className="text-slate-400 text-xs mb-4">Farm Fresh & Certified</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-green-700">₹{item.price}</span>
                    <span className="text-xs font-medium text-slate-400">/ {item.unit}</span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-slate-900 text-white p-2.5 rounded-xl hover:bg-green-600 transition-colors shadow-lg active:scale-95"
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