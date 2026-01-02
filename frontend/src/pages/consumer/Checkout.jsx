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
  const [deliveryAddress, setDeliveryAddress] = useState({
    name: 'John Doe',
    phone: '+91 9876543210',
    email: 'john@example.com',
    address: '123 Main Street, Apartment 4B',
    city: 'Mumbai',
    pincode: '400001',
    instructions: 'Leave at door if not home'
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

  const handleSubmitOrder = () => {
    // In real app, this would call an API
    console.log('Order submitted:', {
      items: cartItems,
      address: deliveryAddress,
      paymentMethod,
      deliverySlot,
      total: totalAmount
    });

    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate('/consumer/orders');
    }, 2000);
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
              onClick={() => navigate('/consumer/cart')}
              className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Secure Checkout</h1>
              <p className="text-sm text-gray-500">Complete your purchase</p>
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
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <span className="text-sm font-medium mt-2">Cart</span>
            </div>
            <div className="h-1 w-20 bg-green-600"></div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <span className="text-sm font-medium mt-2">Checkout</span>
            </div>
            <div className="h-1 w-20 bg-gray-300"></div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">
                3
              </div>
              <span className="text-sm text-gray-500 mt-2">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Delivery Information */}
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
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <div className="p-3 bg-gray-50">
                      <User className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={deliveryAddress.name}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, name: e.target.value })}
                      className="flex-1 p-3 outline-none"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <div className="p-3 bg-gray-50">
                      <Phone className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                      type="tel"
                      value={deliveryAddress.phone}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
                      className="flex-1 p-3 outline-none"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <div className="p-3 bg-gray-50">
                      <Mail className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      value={deliveryAddress.email}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, email: e.target.value })}
                      className="flex-1 p-3 outline-none"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <div className="p-3 bg-gray-50">
                      <MapPin className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                      className="flex-1 p-3 outline-none"
                      placeholder="Enter city"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Pincode</label>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <div className="p-3 bg-gray-50">
                      <Home className="w-5 h-5 text-gray-500" />
                    </div>
                    <input
                      type="text"
                      value={deliveryAddress.pincode}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, pincode: e.target.value })}
                      className="flex-1 p-3 outline-none"
                      placeholder="Enter pincode"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Complete Address</label>
                  <div className="flex border rounded-lg overflow-hidden">
                    <div className="p-3 bg-gray-50">
                      <MapPin className="w-5 h-5 text-gray-500" />
                    </div>
                    <textarea
                      value={deliveryAddress.address}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, address: e.target.value })}
                      className="flex-1 p-3 outline-none resize-none"
                      rows="3"
                      placeholder="House no., Building, Street, Area"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Delivery Instructions (Optional)</label>
                  <textarea
                    value={deliveryAddress.instructions}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, instructions: e.target.value })}
                    className="w-full p-3 border rounded-lg outline-none"
                    rows="2"
                    placeholder="e.g., Leave at door, Call before delivery, etc."
                  />
                </div>
              </div>
            </div>

            {/* Delivery Time */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Delivery Time</h2>
                  <p className="text-sm text-gray-600">When would you like to receive your order?</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {deliverySlots.map((slot) => (
                  <div
                    key={slot.id}
                    onClick={() => setDeliverySlot(slot.id)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${deliverySlot === slot.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                      }`}
                  >
                    <h3 className="font-semibold text-gray-800">{slot.label}</h3>
                    <p className="text-sm font-medium text-gray-900 mt-1">{slot.time}</p>
                    <p className="text-xs text-gray-600 mt-1">{slot.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CreditCard className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Payment Method</h2>
                  <p className="text-sm text-gray-600">Choose how you want to pay</p>
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
                      ? 'border-green-500 bg-green-50'
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
                      <div className={`w-5 h-5 rounded-full border-2 ${paymentMethod === method.id
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                        }`}>
                        {paymentMethod === method.id && (
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UPI QR Code Scanner */}
            {paymentMethod === 'upi' && (
              <div className="mt-6 p-6 bg-white border-2 border-green-500 border-dashed rounded-xl flex flex-col items-center text-center animate-in fade-in slide-in-from-top-4">
                <h3 className="font-bold text-gray-800 mb-2">Scan & Pay ₹{totalAmount}</h3>
                <p className="text-sm text-gray-600 mb-4">Scan this QR code with any UPI app to pay instantly</p>

                <div className="bg-white p-4 rounded-xl shadow-md border mb-4">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                      `upi://pay?pa=rahulsharma4898@ibl&pn=FarmFresh&am=${totalAmount}&cu=INR`
                    )}`}
                    alt="UPI QR Code"
                    className="w-48 h-48 object-contain"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-4 py-2 rounded-full">
                  <Smartphone className="w-4 h-4" />
                  <span>UPI ID: rahulsharma4898@ibl</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Payment will be verified automatically after you complete the transaction.
                </p>
              </div>
            )}

            {/* Security Note */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Lock className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">100% Secure Payment</h3>
                  <p className="text-sm text-gray-600">
                    Your payment information is encrypted and secure. We don't store your card details.
                    All transactions are protected by SSL encryption and PCI DSS compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
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
                        {item.qty} × ₹{item.price}
                      </p>
                    </div>
                    <div className="font-semibold">
                      ₹{item.price * item.qty}
                    </div>
                  </div>
                ))}

                {cartItems.length > 3 && (
                  <div className="text-center text-sm text-gray-500 py-2 border-t">
                    + {cartItems.length - 3} more items
                  </div>
                )}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cartCount} items)</span>
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

                {cartTotal < 300 && (
                  <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                    Add ₹{300 - cartTotal} more for free delivery
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span className="text-green-700">₹{totalAmount}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
                </div>
              </div>

              <button
                onClick={handleSubmitOrder}
                disabled={!deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.address}
                className={`w-full mt-6 py-4 rounded-xl font-bold transition-all duration-300 ${!deliveryAddress.name || !deliveryAddress.phone || !deliveryAddress.address
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#1a5d36] to-green-600 hover:shadow-lg hover:scale-[1.02] text-white'
                  }`}
              >
                Place Order & Pay
              </button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span>Delivery within 2-4 hours</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Secure payment • SSL encrypted</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>100% Freshness Guarantee</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-500 text-center">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-800 mb-2">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our customer support team is here to help!
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">+91 1800-123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">support@farmfresh.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">24/7 Support Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}