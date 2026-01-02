import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, DollarSign, Activity, AlertTriangle, ShieldCheck, Search } from 'lucide-react';

const userGrowthData = [
  { name: 'Jan', consumers: 400, farmers: 240 },
  { name: 'Feb', consumers: 600, farmers: 300 },
  { name: 'Mar', consumers: 800, farmers: 450 },
  { name: 'Apr', consumers: 1200, farmers: 600 },
  { name: 'May', consumers: 1500, farmers: 700 },
  { name: 'Jun', consumers: 1800, farmers: 850 },
];

const revenueData = [
  { name: 'Jan', amount: 50000 },
  { name: 'Feb', amount: 80000 },
  { name: 'Mar', amount: 120000 },
  { name: 'Apr', amount: 150000 },
  { name: 'May', amount: 180000 },
  { name: 'Jun', amount: 240000 },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 font-sans">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
          <p className="text-slate-400 mt-1">Platform overview and management</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search users, orders..."
              className="bg-[#1e293b] border border-[#334155] rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors w-64"
            />
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm">
            AD
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Users"
          value="2,450"
          trend="+12%"
          icon={<Users className="text-blue-400" />}
          bg="bg-blue-500/10"
        />
        <StatCard
          title="Total Revenue"
          value="₹12.4L"
          trend="+8%"
          icon={<DollarSign className="text-green-400" />}
          bg="bg-green-500/10"
        />
        <StatCard
          title="Active Auctions"
          value="142"
          trend="+24"
          icon={<Activity className="text-purple-400" />}
          bg="bg-purple-500/10"
        />
        <StatCard
          title="Pending Verifications"
          value="18"
          trend="Action Needed"
          icon={<AlertTriangle className="text-orange-400" />}
          bg="bg-orange-500/10"
          isAlert
        />
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

        {/* User Growth Chart */}
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-[#334155]">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            User Growth
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="consumers" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Consumers" />
                <Bar dataKey="farmers" fill="#10b981" radius={[4, 4, 0, 0]} name="Farmers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-[#334155]">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            Platform Revenue
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity / Logs */}
      <div className="bg-[#1e293b] rounded-2xl border border-[#334155] overflow-hidden">
        <div className="p-6 border-b border-[#334155] flex justify-between items-center">
          <h3 className="text-lg font-bold">System Activity Logs</h3>
          <button className="text-sm text-blue-400 hover:text-blue-300">View All Logs</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0f172a] text-slate-400 font-medium">
              <tr>
                <th className="px-6 py-4">Event Time</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Action</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-[#334155]/30 transition-colors">
                  <td className="px-6 py-4 text-slate-300">Today, 10:2{item} AM</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-600"></div>
                      <span className="text-white">User_{item}42</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {item % 2 === 0 ? 'Placed Bid on Auction #884' : 'Registered new account'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${item % 2 === 0 ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                      {item % 2 === 0 ? 'SUCCESS' : 'INFO'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-slate-400 cursor-pointer hover:text-white">
                    View
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

function StatCard({ title, value, trend, icon, bg, isAlert }) {
  return (
    <div className="bg-[#1e293b] p-6 rounded-2xl border border-[#334155]">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${bg}`}>
          {icon}
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${isAlert ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'
          }`}>
          {trend}
        </span>
      </div>
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
    </div>
  );
}
