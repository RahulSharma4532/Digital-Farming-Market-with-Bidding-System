import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../routes/CartContext';
import {
  User, Box, MapPin, CreditCard, LogOut, ChevronRight,
  Package, Heart, Settings, Camera, Edit2, TrendingUp, Shield
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { userDetails } = useCart();
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <User className="w-5 h-5" /> },
    { id: 'orders', label: 'Orders & Returns', icon: <Box className="w-5 h-5" /> },
    { id: 'address', label: 'Addresses', icon: <MapPin className="w-5 h-5" /> },
    { id: 'payment', label: 'Payment', icon: <CreditCard className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];
  // Fetch Orders for Profile
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('jwt');
        if (!token) return;

        const res = await fetch('http://localhost:5000/api/orders/my', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile orders", error);
      }
    };
    fetchOrders();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection user={user} userDetails={userDetails} stats={{ orderCount: orders.length }} />;
      case 'orders':
        return <OrdersSection orders={orders} />;
      case 'address':
        return <AddressSection userDetails={userDetails} />;
      default:
        return <OverviewSection user={user} userDetails={userDetails} stats={{ orderCount: orders.length }} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-12 px-4 font-sans selection:bg-cyan-500 selection:text-white">

      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header Profile Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-8">
            <div className="relative group">
              <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-blue-600">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#0f172a]">
                  <img src="https://ui-avatars.com/api/?name=Rajesh+Sharma&background=0D8ABC&color=fff" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
              <button className="absolute bottom-0 right-0 bg-cyan-500 p-2 rounded-full text-white shadow-lg hover:bg-cyan-400 transition transform hover:scale-110">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Hello, {user?.name || 'User'}! 👋</h1>
              <p className="text-gray-400 flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                {user?.email || 'user@example.com'}
                <span className="bg-cyan-500/10 text-cyan-400 text-xs px-2 py-0.5 rounded-full border border-cyan-500/20">Consumer Account</span>
              </p>
            </div>
          </div>

          <div className="text-right hidden md:block">
            <div className="text-sm text-gray-400 mb-1">Member Since</div>
            <div className="text-xl font-bold text-white">December 2024</div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 h-fit">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-xl sticky top-8">
              <div className="p-6 border-b border-white/5">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Account Menu</p>
              </div>
              <nav className="p-4 space-y-2">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${activeTab === item.id
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-900/50'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                  >
                    <div className="flex items-center gap-3 font-medium">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {activeTab === item.id && <ChevronRight className="w-4 h-4" />}
                  </button>
                ))}

                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors mt-8"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

const data = [
  { name: 'Mon', spend: 400 },
  { name: 'Tue', spend: 300 },
  { name: 'Wed', spend: 600 },
  { name: 'Thu', spend: 200 },
  { name: 'Fri', spend: 900 },
  { name: 'Sat', spend: 1200 },
  { name: 'Sun', spend: 850 },
];

function OverviewSection({ user, userDetails, stats }) {
  return (
    <div className="space-y-8">
      {/* 3D Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 p-6 rounded-3xl shadow-xl hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-green-400 text-xs font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +100%
            </span>
          </div>
          <h3 className="text-4xl font-bold text-white mb-1">{stats?.orderCount || 0}</h3>
          <p className="text-gray-400 text-sm">Total Orders Placed</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 p-6 rounded-3xl shadow-xl hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-pink-500/20 rounded-2xl text-pink-400">
              <Heart className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-4xl font-bold text-white mb-1">0</h3>
          <p className="text-gray-400 text-sm">Items in Wishlist</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 p-6 rounded-3xl shadow-xl hover:-translate-y-1 transition-transform duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-500/20 rounded-2xl text-green-400">
              <CreditCard className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-4xl font-bold text-white mb-1">₹0</h3>
          <p className="text-gray-400 text-sm">Wallet Credits</p>
        </div>
      </div>

      {/* Analytics Graph */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Spending Analysis</h2>
        <div className="w-full min-h-[300px]" style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="spend" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white">Profile Details</h2>
          <button className="text-cyan-400 hover:text-cyan-300 font-bold text-sm bg-cyan-500/10 px-4 py-2 rounded-lg border border-cyan-500/20 transition-all">
            Edit Profile
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
          <div className="group">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2 font-bold">Full Name</p>
            <p className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
              {user?.name || userDetails?.name || 'Rajesh Sharma'}
            </p>
          </div>
          <div className="group">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2 font-bold">Email ID</p>
            <p className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
              {user?.email || 'rajeshsharma@gmail.com'}
            </p>
          </div>
          <div className="group">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2 font-bold">Mobile Number</p>
            <p className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
              {userDetails?.phone || '+91 98765 43210'}
            </p>
          </div>
          <div className="group">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-2 font-bold">Location</p>
            <p className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
              {userDetails?.city || 'Mumbai, India'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrdersSection({ orders }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      <h2 className="text-xl font-bold text-white p-8 border-b border-white/10">Order History</h2>
      <div className="divide-y divide-white/10">
        {!orders || orders.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No orders found.</p>
            <p className="text-sm">Your order history will appear here once you place an order.</p>
          </div>
        ) : (
          orders.map(order => (
            <div key={order._id} className="p-6 flex flex-col md:flex-row gap-6 hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="w-20 h-20 bg-gray-800 rounded-xl border border-white/10 overflow-hidden">
                <img
                  src={order.items && order.items[0] && order.items[0].image ? order.items[0].image : "https://via.placeholder.com/100"}
                  alt="Product"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-200 group-hover:text-cyan-400 transition-colors">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h3>
                <p className="text-sm text-gray-300 font-medium">
                  {order.items.length} Items • {order.items.map(i => i.name).join(", ").slice(0, 30)}...
                </p>
                <p className="text-sm text-gray-400 mt-1">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                <div className="flex gap-2 mt-3">
                  <span className={`text-xs px-2 py-1 rounded-md border ${order.status === 'delivered' ? 'bg-green-500/20 text-green-400 border-green-500/20' :
                    order.status === 'pending' ? 'bg-orange-500/20 text-orange-400 border-orange-500/20' :
                      'bg-blue-500/20 text-blue-400 border-blue-500/20'
                    }`}>
                    {order.status ? order.status.toUpperCase() : 'PENDING'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-white">₹{order.totalAmount}</p>
                <p className="text-xs text-green-400 font-bold uppercase tracking-wide mt-1 flex items-center justify-end gap-1">
                  <Shield className="w-3 h-3" /> {order.paymentStatus}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function AddressSection({ userDetails }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-white">Saved Addresses</h2>
        <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/30 text-white transition-all transform hover:-translate-y-0.5">
          + Add New Address
        </button>
      </div>

      <div className="space-y-4">
        <div className="border border-cyan-500/30 bg-cyan-500/5 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-3 bg-cyan-500/20 rounded-bl-2xl">
            <MapPin className="text-cyan-400 w-5 h-5" />
          </div>
          <div className="flex gap-3 mb-4">
            <span className="bg-cyan-500 text-white text-[10px] font-bold px-2 py-1 rounded-md tracking-wider">HOME</span>
          </div>
          <h3 className="font-bold text-xl text-white mb-2">{userDetails?.name || 'Rajesh Sharma'}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {userDetails?.address || '1204, Green Valley Apartments, Sector 45'} <br />
            {userDetails?.city || 'Gurugram, Haryana'} - {userDetails?.pincode || '122003'} <br />
            Phone: {userDetails?.phone || '+91 98765 43210'}
          </p>
          <div className="flex gap-4 mt-6">
            <button className="text-sm font-bold text-gray-300 hover:text-white">Edit</button>
            <button className="text-sm font-bold text-red-400 hover:text-red-300">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
