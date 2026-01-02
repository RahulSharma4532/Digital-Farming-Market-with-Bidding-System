import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, TrendingUp, DollarSign, Calendar, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const data = [
  { name: 'Jan', earnings: 12000 },
  { name: 'Feb', earnings: 19000 },
  { name: 'Mar', earnings: 15000 },
  { name: 'Apr', earnings: 24000 },
  { name: 'May', earnings: 22000 },
  { name: 'Jun', earnings: 30450 },
];

export default function FarmerDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-6 font-sans text-gray-800">

      {/* Welcome Banner */}
      <div className="bg-[#15803d] rounded-2xl p-8 mb-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Rajesh'}! 🌾</h1>
          <p className="text-green-100 opacity-90">Here's what's happening with your farm today.</p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-10 translate-y-10">
          {/* Abstract leafy shape can go here, using huge lucide icon for now */}
          <Package className="w-64 h-64 text-white" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-gray-500 text-sm font-medium">Active Listings</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">12</h3>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-yellow-50 rounded-xl">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">+8%</span>
          </div>
          <p className="text-gray-500 text-sm font-medium">Total Bids Received</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">147</h3>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">+24%</span>
          </div>
          <p className="text-gray-500 text-sm font-medium">Monthly Revenue</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-1">₹30,450</h3>
        </div>
      </div>

      {/* Middle Section: Graph & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Graph */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-6 text-gray-800">Earnings Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#15803d" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#15803d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} tickFormatter={(val) => `₹${val}`} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="earnings" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorEarnings)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-6 text-gray-800">Recent Activity</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="mt-1 w-2 h-2 rounded-full bg-green-500 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-gray-800">New bid received</p>
                <p className="text-xs text-gray-500">Organic Tomatoes • ₹42/kg</p>
                <p className="text-xs text-gray-400 mt-1">5 mins ago</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-gray-800">Listing approved</p>
                <p className="text-xs text-gray-500">Fresh Strawberries</p>
                <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="mt-1 w-2 h-2 rounded-full bg-orange-500 shrink-0"></div>
              <div>
                <p className="text-sm font-bold text-gray-800">Auction ending soon</p>
                <p className="text-xs text-gray-500">Basmati Rice</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
