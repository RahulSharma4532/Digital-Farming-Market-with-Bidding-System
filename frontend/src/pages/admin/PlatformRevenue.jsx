import React, { useState, useEffect } from 'react';
import {
  TrendingUp, DollarSign, CreditCard, Calendar, ArrowLeft, Download
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { format } from 'date-fns';

export default function PlatformRevenue() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    totalVolume: 0,
    totalRevenue: 0,
    chartData: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${BASE_URL}/admin/revenue`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await res.json();
      if (res.ok) {
        setData(result);
      }
    } catch (error) {
      console.error("Failed to fetch revenue", error);
    } finally {
      setLoading(false);
    }
  };

  // Use backend data directly. Backend now guarantees a 7-day zero-filled array if no data exists.
  const chartData = data.chartData || [];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin')}
            className="p-2 bg-[#1e293b] rounded-full hover:bg-[#334155] transition-colors"
          >
            <ArrowLeft className="text-slate-400" />
          </button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="text-emerald-400" />
              Financial Statistics
            </h1>
            <p className="text-slate-400 text-sm">Platform revenue and transaction volume</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#1e293b] hover:bg-[#334155] border border-white/5 rounded-lg transition-colors text-sm font-bold">
          <Download size={16} /> Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-900/40 to-slate-900/40 border border-emerald-500/20 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <DollarSign size={64} className="text-emerald-400" />
          </div>
          <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">Total Platform Earnings</p>
          <h3 className="text-4xl font-black">₹{data.totalRevenue.toLocaleString()}</h3>
          <p className="text-slate-400 text-xs mt-1">Net profit from commissions</p>
        </div>

        <div className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-500/20 p-6 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <CreditCard size={64} className="text-blue-400" />
          </div>
          <p className="text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">Gross Transaction Volume</p>
          <h3 className="text-4xl font-black">₹{data.totalVolume.toLocaleString()}</h3>
          <p className="text-slate-400 text-xs mt-1">Total value of goods sold</p>
        </div>

        <div className="bg-[#1e293b]/50 border border-white/5 p-6 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-400 mb-2">Platform Fee Rate</p>
            <h3 className="text-3xl font-bold text-white">2.5%</h3>
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20 mt-2 inline-block">Active</span>
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1e293b] border border-white/5 rounded-3xl p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-400" />
            Revenue Trend (7 Days)
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-1 bg-[#1e293b] border border-white/5 rounded-3xl p-6">
          <h3 className="text-lg font-bold mb-6">Recent Transactions</h3>
          {/* Can optionally add a list of recent orders here if API supports it */}
          <div className="flex flex-col items-center justify-center h-[300px] text-slate-500 text-sm">
            <p>No recent transaction data to display.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
