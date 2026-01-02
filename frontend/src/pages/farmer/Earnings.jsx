import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';

const data = [
  { name: 'Jan', amount: 12000 },
  { name: 'Feb', amount: 19000 },
  { name: 'Mar', amount: 15000 },
  { name: 'Apr', amount: 24000 },
  { name: 'May', amount: 22000 },
  { name: 'Jun', amount: 30450 },
];

export default function Earnings() {
  return (
    <div className="p-6 font-sans text-gray-800">

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Earnings Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Total Earnings */}
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <p className="text-sm text-gray-500 font-medium mb-1">Total Earnings</p>
          <h3 className="text-3xl font-bold text-green-800">₹1,24,680</h3>
          <p className="text-xs text-green-600 font-medium mt-2">+18% from last month</p>
        </div>

        {/* Pending Payments */}
        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
          <p className="text-sm text-gray-500 font-medium mb-1">Pending Payments</p>
          <h3 className="text-3xl font-bold text-yellow-700">₹8,450</h3>
          <p className="text-xs text-yellow-600 font-medium mt-2">Expected in 2-3 days</p>
        </div>

        {/* This Month */}
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <p className="text-sm text-gray-500 font-medium mb-1">This Month</p>
          <h3 className="text-3xl font-bold text-blue-600">₹30,450</h3>
          <p className="text-xs text-blue-500 font-medium mt-2">On track for target</p>
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} tickFormatter={(val) => `₹${val}`} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#15803d"
                strokeWidth={3}
                fill="none"
                dot={{ r: 6, fill: '#15803d', strokeWidth: 2, stroke: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
