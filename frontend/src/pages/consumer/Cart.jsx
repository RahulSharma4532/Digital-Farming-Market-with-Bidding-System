// // pages/consumer/Cart.jsx
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../../routes/CartContext';
// import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, CreditCard, Truck } from 'lucide-react';

// export default function Cart() {
//   const navigate = useNavigate();
//   const { 
//     cart, 
//     cartCount, 
//     cartTotal, 
//     incrementQty, 
//     decrementQty, 
//     removeFromCart, 
//     clearCart 
//   } = useCart();

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="bg-white px-6 py-4 border-b flex items-center">
//           <button onClick={() => navigate(-1)} className="mr-4">
//             <ArrowLeft />
//           </button>
//           <h1 className="text-xl font-bold">Your Cart</h1>
//         </div>

//         <div className="max-w-4xl mx-auto p-8 text-center">
//           <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
//           <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
//           <p className="text-gray-500 mb-8">Add some fresh products to get started!</p>
//           <button 
//             onClick={() => navigate('/consumer/home')}
//             className="bg-[#1a5d36] text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800"
//           >
//             Start Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white px-6 py-4 border-b flex items-center justify-between sticky top-0 z-50">
//         <div className="flex items-center">
//           <button onClick={() => navigate(-1)} className="mr-4">
//             <ArrowLeft />
//           </button>
//           <h1 className="text-xl font-bold">Your Cart ({cartCount} items)</h1>
//         </div>
//         <button 
//           onClick={clearCart}
//           className="text-red-500 text-sm font-semibold hover:text-red-700"
//         >
//           Clear All
//         </button>
//       </div>

//       <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Cart Items */}
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
//               <ShoppingBag className="w-5 h-5" /> Shopping Bag
//             </h2>

//             <div className="space-y-6">
//               {cart.map((item) => (
//                 <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
//                   {/* Product Image */}
//                   <div className="w-24 h-24 rounded-lg overflow-hidden">
//                     <img 
//                       src={item.img || item.fallback || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'} 
//                       alt={item.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   {/* Product Info */}
//                   <div className="flex-1">
//                     <h3 className="font-bold">{item.name || item.display}</h3>
//                     <p className="text-sm text-gray-500">{item.farmer}</p>
//                     <div className="flex items-center justify-between mt-2">
//                       <div className="flex items-center gap-2">
//                         <span className="text-lg font-bold text-gray-800">₹{item.price}</span>
//                         {item.unit && <span className="text-sm text-gray-500">/ {item.unit}</span>}
//                       </div>

//                       {/* Quantity Controls */}
//                       <div className="flex items-center gap-3">
//                         <button 
//                           onClick={() => decrementQty(item.id)}
//                           className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
//                         >
//                           <Minus className="w-4 h-4" />
//                         </button>
//                         <span className="font-bold w-8 text-center">{item.qty || 1}</span>
//                         <button 
//                           onClick={() => incrementQty(item.id)}
//                           className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
//                         >
//                           <Plus className="w-4 h-4" />
//                         </button>
//                         <button 
//                           onClick={() => removeFromCart(item.id)}
//                           className="ml-4 text-red-500 hover:text-red-700"
//                         >
//                           <Trash2 className="w-5 h-5" />
//                         </button>
//                       </div>
//                     </div>
//                     <div className="mt-2">
//                       <span className="text-lg font-bold">₹{item.price * (item.qty || 1)}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="space-y-6">
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
//               <CreditCard className="w-5 h-5" /> Order Summary
//             </h2>

//             <div className="space-y-4">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Subtotal</span>
//                 <span className="font-bold">₹{cartTotal}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Delivery</span>
//                 <span className="font-bold text-green-600">FREE</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Taxes</span>
//                 <span className="font-bold">₹{(cartTotal * 0.05).toFixed(2)}</span>
//               </div>
//               <div className="border-t pt-4">
//                 <div className="flex justify-between text-lg font-bold">
//                   <span>Total</span>
//                   <span>₹{(cartTotal * 1.05).toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>

//             <button 
//               onClick={() => navigate('/consumer/orders')}
//               className="w-full mt-8 bg-[#1a5d36] text-white py-3 rounded-lg font-bold hover:bg-green-800 transition-colors"
//             >
//               Proceed to Checkout
//             </button>
//           </div>

//           {/* Delivery Info */}
//           <div className="bg-white rounded-xl shadow-sm p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <Truck className="w-5 h-5 text-green-600" />
//               <h3 className="font-bold">Delivery Information</h3>
//             </div>
//             <p className="text-sm text-gray-600">
//               Your order will be delivered within 2-4 hours. Fresh products are sourced directly from farms.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// pages/consumer/Cart.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../routes/CartContext';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  RefreshCw
} from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    cartCount,
    cartTotal,
    incrementQty,
    decrementQty,
    removeFromCart,
    clearCart
  } = useCart();

  const [isClearing, setIsClearing] = useState(false);

  const handleClearCart = () => {
    setIsClearing(true);
    clearCart();
    setTimeout(() => setIsClearing(false), 500);
  };

  const calculateTax = () => (cartTotal * 0.05).toFixed(2);
  const calculateTotal = () => (cartTotal * 1.05).toFixed(2);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 max-w-lg w-full text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative"
          >
            <div className="w-40 h-40 mx-auto bg-gradient-to-tr from-green-400/20 to-emerald-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/5 shadow-2xl">
              <ShoppingBag className="w-16 h-16 text-green-400" />
            </div>
            {/* Floating particles */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-0 right-10 text-4xl"
            >
              🌿
            </motion.div>
            <motion.div
              animate={{ y: [10, -10, 10], rotate: [0, -10, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute bottom-0 left-10 text-4xl"
            >
              🍎
            </motion.div>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-black text-white mb-4 tracking-tight"
          >
            Your Cart is <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Empty</span>
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-400 text-lg mb-8 leading-relaxed"
          >
            Looking a bit light in here. Explore our fresh marketplace and discover premium organic produce directly from farmers.
          </motion.p>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate('/consumer/home')}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all flex items-center gap-2 mx-auto group"
          >
            Start Shopping <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b shadow-sm flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Shopping Cart</h1>
            <p className="text-sm text-gray-500">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
          </div>
        </div>
        <button
          onClick={handleClearCart}
          disabled={isClearing}
          className="text-red-500 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
        >
          {isClearing ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
          Clear All
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-green-600" />
                Shopping Bag
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({cartCount} {cartCount === 1 ? 'item' : 'items'})
                </span>
              </h2>
              <span className="text-green-600 font-semibold">₹{cartTotal}</span>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 border rounded-xl hover:shadow-md transition-all duration-300 bg-white"
                >
                  {/* Product Image */}
                  <div className="relative w-28 h-28 rounded-xl overflow-hidden shadow-md">
                    <img
                      src={item.img || item.fallback || '/default-product.png'}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';
                      }}
                    />
                    {item.organic && (
                      <span className="absolute top-2 left-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Organic
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900 truncate">{item.name || item.display}</h3>
                        <p className="text-sm text-gray-600">{item.farmer}</p>
                        {item.location && (
                          <p className="text-xs text-gray-500 mt-1">📍 {item.location}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
                          {item.unit && (
                            <span className="text-sm text-gray-500">/ {item.unit}</span>
                          )}
                          {item.discount && (
                            <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                              {item.discount}% OFF
                            </span>
                          )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => decrementQty(item.id)}
                            disabled={item.quantity <= 1}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${item.quantity <= 1
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-green-50 text-green-700 hover:bg-green-100'
                              }`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-lg min-w-8 text-center">
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => incrementQty(item.id)}
                            className="w-9 h-9 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 flex items-center justify-center transition-all"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <span className="text-gray-500 text-sm ml-2">
                            {item.stock && `Stock: ${item.stock}`}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Total</p>
                        <p className="text-xl font-bold text-gray-900">
                          ₹{item.price * (item.quantity || 1)}
                        </p>
                        {item.originalPrice && (
                          <p className="text-sm text-gray-400 line-through">
                            ₹{item.originalPrice * (item.quantity || 1)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Promise */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <div className="flex items-start gap-4">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Fast & Free Delivery</h3>
                <p className="text-gray-600 text-sm">
                  🚚 Delivery within 2-4 hours • 📍 Free for orders above ₹300 • 🔄 Easy returns within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-green-600" />
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                <span className="font-medium">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium text-green-600">
                  {cartTotal > 300 ? 'FREE' : '₹40'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">GST & Taxes (5%)</span>
                <span className="font-medium">₹{calculateTax()}</span>
              </div>
              {cartTotal < 300 && (
                <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                  Add ₹{300 - cartTotal} more for free delivery
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-green-700">₹{calculateTotal()}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Inclusive of all taxes</p>
              </div>
            </div>

            <button
              onClick={() => navigate('/consumer/checkout')}
              className="w-full bg-gradient-to-r from-[#1a5d36] to-green-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
            >
              Proceed to Checkout
            </button>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Secure SSL Encryption</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <RefreshCw className="w-4 h-4 text-green-600" />
                <span>100% Freshness Guarantee</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-800 mb-4">Payment Methods</h3>
            <div className="grid grid-cols-4 gap-3">
              {['visa', 'mastercard', 'paytm', 'upi'].map((method) => (
                <div key={method} className="border rounded-lg p-3 flex items-center justify-center hover:border-green-400 transition-colors">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">{method.toUpperCase()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
