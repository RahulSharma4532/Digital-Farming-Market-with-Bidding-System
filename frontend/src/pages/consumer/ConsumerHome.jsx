import React from 'react';
import { Search, ArrowRight, ShoppingBag, Star, TrendingUp, Gavel, Leaf, Droplets, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import MarketTicker from '../../components/consumer/MarketTicker';
import FeaturedAuctions from '../../components/consumer/FeaturedAuctions';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

import exoticCardImg from '../../assets/images/products/exotic_fruit_card.jpg';

export default function ConsumerHome() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  // Floating animation variants
  const float = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const categories = [
    { title: "Fresh Vegetables", img: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=600&auto=format&fit=crop", count: "120+ Items", color: "from-green-400 to-green-600", path: "/consumer/vegetables" },
    { title: "Organic Fruits", img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=600&auto=format&fit=crop", count: "80+ Items", color: "from-orange-400 to-red-500", path: "/consumer/fruits" },
    { title: "Dairy Products", img: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=600&auto=format&fit=crop", count: "45 Items", color: "from-blue-400 to-cyan-500", path: "/consumer/dairy" },
    { title: "Grains & Cereals", img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=600&auto=format&fit=crop", count: "60+ Items", color: "from-yellow-400 to-orange-500", path: "/consumer/grains" },
    { title: "Organic Staples", img: "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?q=80&w=600&auto=format&fit=crop", count: "40+ Items", color: "from-amber-700 to-stone-600", path: "/consumer/organic" },
    { title: "Seeds & Plants", img: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=600&auto=format&fit=crop", count: "25+ Items", color: "from-teal-600 to-cyan-600", path: "/consumer/seeds" },
    { title: "Fresh Herbs & Spices", img: "https://images.unsplash.com/photo-1626808642875-0aa545482dfb?q=80&w=600&auto=format&fit=crop", count: "30+ Items", color: "from-emerald-400 to-green-600", path: "/consumer/herbs" },
    { title: "Exotic Fruits", img: exoticCardImg, count: "20+ Items", color: "from-pink-400 to-rose-600", path: "/consumer/exotic" },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-green-500 selection:text-white overflow-x-hidden">

      {/* 3D Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          style={{ y: y1, x: -100 }}
          className="absolute top-20 left-0 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div
          style={{ y: y2, x: 100 }}
          className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen"
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Market Ticker - Moved to top, relative positioning below navbar */}
        <div className="relative z-50 border-b border-white/5">
          <MarketTicker />
        </div>

        <div className="px-6 max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="pt-8 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content - Staggered Fade In */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 text-left relative z-20"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
              >
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-gray-300">#1 Marketplace for Fresh Produce</span>
              </motion.div>

              <h1 className="text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter">
                Farm Fresh <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-500 animate-gradient-x">
                  Straight to You
                </span>
              </h1>

              <p className="text-xl text-gray-400 max-w-lg leading-relaxed border-l-4 border-green-500/50 pl-6">
                Experience the future of grocery shopping. Connect directly with local farmers and get premium, organic produce delivered to your doorstep.
              </p>

              <div className="relative max-w-md group mt-12">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                <div className="relative bg-[#1e293b]/80 backdrop-blur-xl flex items-center p-2 rounded-2xl border border-white/10 shadow-2xl transition-transform group-hover:scale-[1.02]">
                  <Search className="ml-4 text-gray-400 w-6 h-6" />
                  <input
                    type="text"
                    placeholder="Search for 'Organic Tomatoes'..."
                    className="w-full bg-transparent border-none text-white px-4 py-3 focus:outline-none placeholder-gray-500 text-lg font-medium"
                  />
                  <button className="bg-green-500 hover:bg-green-400 text-black p-3 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-green-500/20">
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right 3D Visuals */}
            <div className="relative h-[600px] hidden lg:block perspective-1000">
              {/* Main Floating Element */}
              <motion.div
                variants={float}
                animate="animate"
                className="absolute top-10 right-10 w-full h-full"
              >
                <div className="relative w-full h-full transform rotate-y-[-10deg] rotate-x-[5deg] transform-style-3d">
                  {/* Decorative Circles */}
                  <div className="absolute top-0 right-10 w-64 h-64 bg-green-500/30 rounded-full blur-3xl animate-pulse"></div>

                  {/* Main Image Card with Glassmorphism */}
                  <div className="absolute top-20 right-20 w-[400px] h-[500px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl overflow-hidden p-6 transform hover:rotate-y-[0deg] transition-all duration-700">
                    <div className="w-full h-3/5 rounded-3xl overflow-hidden mb-6 relative group">
                      <img
                        src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800&auto=format&fit=crop"
                        className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700"
                        alt="Fresh Farm Vegetables"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop"; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60"></div>
                      <div className="absolute bottom-4 left-4">
                        <p className="text-white font-bold text-xl">Daily Harvest</p>
                        <p className="text-green-400 text-sm">Fresh from the fields</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <Leaf className="text-green-400 w-8 h-8" />
                        <div>
                          <h3 className="font-bold">100% Organic</h3>
                          <p className="text-xs text-gray-400">Certified local farmers</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                        <Droplets className="text-blue-400 w-8 h-8" />
                        <div>
                          <h3 className="font-bold">Sustainable</h3>
                          <p className="text-xs text-gray-400">Eco-friendly farming</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Featured Auctions (3D Carousel) - Real Data */}
          <div className="my-8 border-t border-white/5 pt-8">
            <FeaturedAuctions />
          </div>

          {/* Categories Section with Horizontal Scroll */}
          <div className="mt-12 mb-32 relative z-10">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-5xl font-black text-white tracking-tight">Explore Categories</h2>
                <p className="text-gray-400 mt-2 text-lg">Premium selections curated just for you.</p>
              </div>
              <button
                onClick={() => navigate('/consumer/products')}
                className="text-green-400 font-bold hover:text-green-300 flex items-center gap-2 transition-colors text-lg group"
              >
                View All Categories <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => navigate(cat.path)}
                  className="group relative h-80 rounded-[32px] overflow-hidden cursor-pointer shadow-2xl transition-all duration-500 border border-white/5 bg-[#1e293b]"
                  whileHover={{ y: -10 }}
                >
                  {/* Image Background */}
                  <div className="absolute inset-0">
                    <img
                      src={cat.img}
                      alt={cat.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
                      onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-lg`}>
                      <ShoppingBag className="w-7 h-7 text-white" />
                    </div>

                    <h3 className="text-3xl font-black text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{cat.title}</h3>
                    <p className="text-gray-300 font-medium text-base mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      {cat.count}
                    </p>

                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full w-0 group-hover:w-full bg-gradient-to-r ${cat.color} transition-all duration-700 delay-100`}></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
