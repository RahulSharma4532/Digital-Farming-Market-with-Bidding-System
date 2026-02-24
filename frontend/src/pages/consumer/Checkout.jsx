// pages/consumer/Checkout.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../routes/CartContext';
import {
  ArrowLeft,
  CreditCard,
  Wallet,
  Smartphone,
  MapPin,
  CheckCircle,
  Shield,
  Truck,
  User,
  Mail,
  Phone,
  Home,
  Lock,
  ChevronRight,
  Calendar,
  Package
} from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartCount, cartTotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [deliveryAddress, setDeliveryAddress] = useState(() => {
    const saved = localStorage.getItem('checkoutAddress');
    return saved ? JSON.parse(saved) : {
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      pincode: '',
      instructions: ''
    };
  });
  const [deliverySlot, setDeliverySlot] = useState('now');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const calculateTax = () => (cartTotal * 0.05).toFixed(2);
  const deliveryFee = cartTotal > 300 ? 0 : 40;
  const totalAmount = (Number(cartTotal) + Number(calculateTax()) + deliveryFee).toFixed(2);

  const deliverySlots = [
    { id: 'now', label: 'Deliver Now', time: 'Within 2-4 hours', desc: 'Fastest delivery' },
    { id: 'today', label: 'Today Evening', time: '6 PM - 9 PM', desc: 'After work hours' },
    { id: 'tomorrow', label: 'Tomorrow Morning', time: '7 AM - 10 AM', desc: 'Fresh morning delivery' },
    { id: 'custom', label: 'Schedule', time: 'Choose time', desc: 'Pick your preferred slot' }
  ];

  // State for steps: 1 = Details, 2 = Payment
  const [step, setStep] = useState(1);

  const handleSubmitOrder = async () => {
    try {
      // Save address for next time
      localStorage.setItem('checkoutAddress', JSON.stringify(deliveryAddress));

      const token = localStorage.getItem('token');
      if (!token) {
        alert("Please login to place an order");
        navigate('/login');
        return;
      }

      const orderData = {
        items: cartItems.map(item => ({
          product: item.id.length === 24 ? item.id : null,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.img
        })),
        shippingAddress: deliveryAddress,
        paymentMethod: paymentMethod,
        totalAmount: totalAmount
      };

      const BASE_URL = import.meta.env.VITE_API_URL || 'https://digital-farming-market-with-bidding.onrender.com/api';
      const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setOrderPlaced(true);
        setTimeout(() => {
          clearCart();
          navigate('/consumer/orders');
        }, 2000);
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const error = await response.json();
          alert(`Order Failed: ${error.message}`);
        } else {
          const text = await response.text();
          console.error("Backend Error:", text);
          alert(`Order Failed (Server Error ${response.status}): ${text.substring(0, 100)}...`);
        }
      }
    } catch (error) {
      console.error("Order error:", error);
      alert(`Network/Client Error: ${error.message}`);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">Your order has been confirmed and will be delivered soon.</p>
          <div className="bg-green-50 p-4 rounded-xl mb-6">
            <p className="text-sm text-gray-600">Order ID: <span className="font-bold">ORD-{Date.now().toString().slice(-8)}</span></p>
            <p className="text-sm text-gray-600 mt-2">Estimated Delivery: <span className="font-bold">Within 2 hours</span></p>
          </div>
          <button
            onClick={() => navigate('/consumer/orders')}
            className="w-full bg-gradient-to-r from-[#1a5d36] to-green-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all"
          >
            View Order Details
          </button>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-yellow-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add items to your cart before checkout</p>
          <button
            onClick={() => navigate('/consumer/cart')}
            className="bg-gradient-to-r from-[#1a5d36] to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => {
                if (step === 2) setStep(1);
                else navigate('/consumer/cart');
              }}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Secure Checkout</h1>
              <p className="text-sm text-gray-500">Step {step} of 2: {step === 1 ? "Details" : "Payment"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Shield className="w-4 h-4 text-green-600" />
            <span>100% Secure</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div className={`flex flex-col items-center flex-1 ${step >= 1 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step >= 1 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
              <span className="text-sm font-medium">Details</span>
            </div>

            <div className={`h-1 flex-1 mx-2 rounded-full ${step >= 2 ? 'bg-green-600' : 'bg-gray-200'}`}></div>

            <div className={`flex flex-col items-center flex-1 ${step >= 2 ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step >= 2 ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
              <span className="text-sm font-medium">Payment</span>
            </div>

            <div className={`h-1 flex-1 mx-2 rounded-full ${orderPlaced ? 'bg-green-600' : 'bg-gray-200'}`}></div>

            <div className={`flex flex-col items-center flex-1 ${orderPlaced ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${orderPlaced ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
              <span className="text-sm font-medium">Success</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">

            {/* STEP 1: Delivery Information */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <User className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">Delivery Information</h2>
                      <p className="text-sm text-gray-600">Where should we deliver your order?</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        value={deliveryAddress.name}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, name: e.target.value })}
                        className="w-full p-3 border rounded-lg outline-none focus:border-green-500 transition-colors bg-gray-50 focus:bg-white"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        value={deliveryAddress.phone}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
                        className="w-full p-3 border rounded-lg outline-none focus:border-green-500 transition-colors bg-gray-50 focus:bg-white"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={deliveryAddress.email}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, email: e.target.value })}
                        className="w-full p-3 border rounded-lg outline-none focus:border-green-500 transition-colors bg-gray-50 focus:bg-white"
                        placeholder="Email Address"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700">Complete Address</label>
                      <textarea
                        value={deliveryAddress.address}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, address: e.target.value })}
                        className="w-full p-3 border rounded-lg outline-none focus:border-green-500 transition-colors bg-gray-50 focus:bg-white resize-none"
                        rows="3"
                        placeholder="House no., Building, Street, Area"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        value={deliveryAddress.city}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                        className="w-full p-3 border rounded-lg outline-none focus:border-green-500 transition-colors bg-gray-50 focus:bg-white"
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Pincode</label>
                      <input
                        type="text"
                        value={deliveryAddress.pincode}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, pincode: e.target.value })}
                        className="w-full p-3 border rounded-lg outline-none focus:border-green-500 transition-colors bg-gray-50 focus:bg-white"
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">Delivery Slot</h2>
                      <p className="text-sm text-gray-600">Choose your preferred time</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {deliverySlots.map((slot) => (
                      <div
                        key={slot.id}
                        onClick={() => setDeliverySlot(slot.id)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${deliverySlot === slot.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                          }`}
                      >
                        <h3 className="font-semibold text-gray-800 text-sm">{slot.label}</h3>
                        <p className="text-xs text-green-700 font-medium mt-1">{slot.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}


            {/* STEP 2: Payment Method */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <CreditCard className="w-5 h-5 text-green-700" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-800">Payment Method</h2>
                      <p className="text-sm text-gray-600">Secure encryption with SSL</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { id: 'upi', icon: <Smartphone />, title: 'UPI', desc: 'Google Pay, PhonePe, Paytm', popular: true },
                      { id: 'cards', icon: <CreditCard />, title: 'Credit/Debit Card', desc: 'Visa, Mastercard, RuPay' },
                      { id: 'cod', icon: <Wallet />, title: 'Cash on Delivery', desc: 'Pay when you receive' },
                      { id: 'netbanking', icon: <CreditCard />, title: 'Net Banking', desc: 'All major banks' },
                    ].map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === method.id
                          ? 'border-green-500 bg-green-50 shadow-md transform scale-[1.01]'
                          : 'border-gray-200 hover:border-green-300'
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${paymentMethod === method.id ? 'bg-green-100' : 'bg-gray-100'
                            }`}>
                            {method.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-800">{method.title}</h3>
                              {method.popular && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                  Popular
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{method.desc}</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method.id
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300'
                            }`}>
                            {paymentMethod === method.id && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* UPI QR Display if Selected */}
                {paymentMethod === 'upi' && (
                  <div className="p-6 bg-white border-2 border-green-500 border-dashed rounded-xl flex flex-col items-center text-center animate-in zoom-in duration-300 shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-2">Scan & Pay ₹{totalAmount}</h3>
                    <p className="text-sm text-gray-600 mb-4">Scan using any UPI app</p>

                    <div className="bg-white p-4 rounded-xl shadow-md border mb-4">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                          `upi://pay?pa=rahulsharma4898@ibl&pn=FarmFresh&am=${totalAmount}&cu=INR`
                        )}`}
                        alt="UPI QR Code"
                        className="w-48 h-48 object-contain"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-4 py-2 rounded-full mb-4">
                      <Smartphone className="w-4 h-4" />
                      <span>rahulsharma4898@ibl</span>
                    </div>

                    <button
                      onClick={handleSubmitOrder}
                      className="w-full max-w-xs px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                    >
                      Click here to Simulate Success
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Right Column - Order Summary - PERSISTENT */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={item.img || item.fallback}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × ₹{item.price}
                      </p>
                    </div>
                    <div className="font-semibold">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxes (5%)</span>
                  <span>₹{calculateTax()}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-green-700">₹{totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Button based on Step */}
              {step === 1 ? (
                <button
                  onClick={() => setStep(2)}
                  disabled={!deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.address}
                  className={`w-full mt-6 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${!deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.address
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#1a5d36] hover:bg-green-800 text-white shadow-lg'
                    }`}
                >
                  Continue to Payment <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitOrder}
                  className="w-full mt-6 py-4 rounded-xl font-bold bg-gradient-to-r from-[#1a5d36] to-green-600 hover:shadow-lg hover:scale-[1.02] text-white transition-all duration-300 shadow-green-200"
                >
                  Place Order & Pay ₹{totalAmount}
                </button>
              )}

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-500 text-center">
                  {step === 1 ? "Next: Secure Payment" : "Secure 256-bit SSL Encrypted"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
