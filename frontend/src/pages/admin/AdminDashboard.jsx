import React, { useState, useEffect } from 'react';
import {
  Users, DollarSign, Activity, AlertTriangle, ShieldCheck, Search,
  Menu, Bell, ChevronRight, LayoutDashboard, Gavel, FileText, Settings,
  Leaf, TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import io from 'socket.io-client';

// Mock Data for "Live" Feel
const activityData = [
  { time: '10:00', users: 120, bids: 45 },
  { time: '10:30', users: 145, bids: 80 },
  { time: '11:00', users: 180, bids: 120 },
  { time: '11:30', users: 220, bids: 160 },
  { time: '12:00', users: 250, bids: 200 },
  { time: '12:30', users: 300, bids: 240 },
];

const revenueMock = [
  { name: 'Mon', value: 12000 },
  { name: 'Tue', value: 19000 },
  { name: 'Wed', value: 15000 },
  { name: 'Thu', value: 24000 },
  { name: 'Fri', value: 28000 },
  { name: 'Sat', value: 32000 },
  { name: 'Sun', value: 29000 },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    activeFarmers: 0,
    verificationQueue: 0,
    liveAuctions: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);


  useEffect(() => {
    fetchStats();
    fetchNotifications();

    // Socket Connection
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log("Admin Dashboard Connected to Socket");
    });

    socket.on('admin_notification', (newNotif) => {
      setNotifications(prev => [newNotif, ...prev]);
      setUnreadCount(prev => prev + 1);

      // Optional: Trigger a toast or sound here

      // If it's a farmer verification, update stats instantly
      if (newNotif.message.includes("registered")) {
        setStats(prev => ({
          ...prev,
          verificationQueue: prev.verificationQueue + 1
        }));
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch('http://localhost:5000/api/admin/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.isRead).length);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        const token = localStorage.getItem('jwt');
        await fetch(`http://localhost:5000/api/admin/notifications/${notification._id}/read`, {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` }
        });
        // Update local state
        setNotifications(prev => prev.map(n => n._id === notification._id ? { ...n, isRead: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
      } catch (error) {
        console.error("Failed to mark read");
      }
    }
    if (notification.link) {
      navigate(notification.link);
      setShowNotifications(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('jwt'); // Assuming consistent token key
      const res = await fetch('http://localhost:5000/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
    }
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Command Center", path: "/admin", active: true },
    { icon: <Activity size={20} />, label: "Live Monitor", path: "/admin/live" },
    { icon: <ShieldCheck size={20} />, label: "Verification", path: "/admin/farmer-verification", badge: stats.verificationQueue > 0 ? stats.verificationQueue.toString() : null },
    { icon: <Users size={20} />, label: "Governance", path: "/admin/users" },
    { icon: <Gavel size={20} />, label: "Disputes", path: "/admin/disputes" },
    { icon: <TrendingUp size={20} />, label: "Financials", path: "/admin/revenue" },
    { icon: <Settings size={20} />, label: "Configuration", path: "/admin/config" },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans flex overflow-hidden selection:bg-emerald-500/30">

      {/* Sidebar */}
      <motion.aside
        initial={{ width: 280 }}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="h-screen bg-[#1e293b]/50 backdrop-blur-xl border-r border-white/5 flex flex-col z-20"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Leaf className="text-white w-6 h-6" />
          </div>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-xl font-bold tracking-tight">Terra<span className="text-emerald-400">Fresh</span></h1>
              <p className="text-xs text-slate-400">Admin Console v2.0</p>
            </motion.div>
          )}
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 group ${item.active
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              <div className={`${item.active ? 'text-emerald-400' : 'group-hover:text-white'}`}>
                {item.icon}
              </div>
              {sidebarOpen && (
                <motion.div className="flex-1 flex justify-between items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <span className="font-medium text-sm">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-0.5 rounded-full border border-red-500/20">
                      {item.badge}
                    </span>
                  )}
                </motion.div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px]">
              <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center">
                <span className="font-bold text-xs">AD</span>
              </div>
            </div>
            {sidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white">Super Admin</p>
                <p className="text-xs text-emerald-400">● Online</p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto">
        {/* Background Gradients */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 p-8">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Command Center</h2>
              <p className="text-slate-400">System Overview & Live Metrics</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Menu size={20} />
              </button>

              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <Bell className="text-slate-400 hover:text-white cursor-pointer transition-colors" size={24} />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0f172a]" />
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-80 bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                      <div className="p-4 border-b border-white/5 flex justify-between items-center">
                        <h3 className="font-bold text-white">Notifications</h3>
                        <span className="text-xs text-slate-400">{unreadCount} unread</span>
                      </div>
                      <div className="max-h-[300px] overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-slate-500 text-sm">
                            No new notifications
                          </div>
                        ) : (
                          notifications.map(notif => (
                            <div
                              key={notif._id}
                              onClick={() => handleNotificationClick(notif)}
                              className={`p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors ${!notif.isRead ? 'bg-white/5' : ''}`}
                            >
                              <div className="flex gap-3">
                                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${notif.type === 'error' ? 'bg-red-500' :
                                  notif.type === 'warning' ? 'bg-orange-500' :
                                    notif.type === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                                  }`} />
                                <div>
                                  <p className={`text-sm font-semibold ${!notif.isRead ? 'text-white' : 'text-slate-400'}`}>
                                    {notif.title}
                                  </p>
                                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{notif.message}</p>
                                  <p className="text-[10px] text-slate-600 mt-2">
                                    {new Date(notif.createdAt).toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="p-2 border-t border-white/5 text-center">
                        <button className="text-xs text-emerald-400 hover:text-emerald-300 font-medium">
                          View All Activity
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">

            {/* Primary Stats */}
            <StatCard
              title="Total Revenue"
              value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`}
              trend="+12.5%"
              trendUp={true}
              icon={<DollarSign className="text-emerald-400" />}
              gradient="from-emerald-500/10 to-teal-500/10"
              borderColor="border-emerald-500/20"
            />
            <StatCard
              title="Active Farmers"
              value={stats.activeFarmers.toString()}
              trend="+8.2%"
              trendUp={true}
              icon={<Users className="text-blue-400" />}
              gradient="from-blue-500/10 to-cyan-500/10"
              borderColor="border-blue-500/20"
            />
            <StatCard
              title="Live Auctions"
              value={stats.liveAuctions.toString()}
              trend="ACTIVE"
              trendUp={true}
              icon={<Activity className="text-purple-400" />}
              gradient="from-purple-500/10 to-pink-500/10"
              borderColor="border-purple-500/20"
            />
            <StatCard
              title="Verification Queue"
              value={stats.verificationQueue.toString()}
              trend={stats.verificationQueue > 5 ? "Urgent" : "Normal"}
              trendUp={stats.verificationQueue <= 5}
              icon={<ShieldCheck className="text-orange-400" />}
              gradient="from-orange-500/10 to-red-500/10"
              borderColor="border-orange-500/20"
            />

            {/* Main Chart Area */}
            <div className="md:col-span-2 lg:col-span-3 bg-[#1e293b]/50 backdrop-blur-md rounded-3xl border border-white/5 p-6 relative overflow-hidden group">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity size={18} className="text-blue-400" />
                  Live Platform Traffic
                </h3>
                <div className="flex gap-2">
                  <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold border border-green-500/20 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    LIVE
                  </span>
                </div>
              </div>

              <div className="h-[300px] w-full min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorBids" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px', color: '#fff' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                    <Area type="monotone" dataKey="bids" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorBids)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Side Metric / Quick Actions */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-[#1e293b]/50 backdrop-blur-md rounded-3xl border border-white/5 p-6 h-full">
                <h3 className="text-lg font-bold text-white mb-6">Revenue Trend</h3>
                <div className="h-[200px] w-full min-h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.revenueTrend || []}>
                      <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Tooltip
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Weekly Growth</span>
                    <span className="text-emerald-400 font-bold">
                      {/* Simple calculation or placeholder for growth */}
                      {stats.revenueTrend && stats.revenueTrend.length > 0 && stats.revenueTrend[6].value > 0 ? "+100%" : "0%"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="md:col-span-3 lg:col-span-4 bg-[#1e293b]/50 backdrop-blur-md rounded-3xl border border-white/5 p-8 flex flex-wrap gap-4 items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Quick Actions</h3>
                <p className="text-slate-400 text-sm">Common administrative tasks</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => navigate('/admin/farmer-verification')}
                  className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
                >
                  <ShieldCheck size={18} />
                  Verify Farmers
                </button>
                <button
                  onClick={() => navigate('/admin/disputes')}
                  className="flex items-center gap-2 bg-[#334155] hover:bg-[#475569] text-white px-6 py-3 rounded-xl font-bold transition-all"
                >
                  <AlertTriangle size={18} />
                  View Disputes
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, trend, trendUp, icon, gradient, borderColor }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-gradient-to-br ${gradient} backdrop-blur-md border ${borderColor} p-6 rounded-3xl relative overflow-hidden group`}
    >
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:bg-white/10 transition-colors">
            {icon}
          </div>
          <span className={`text-xs font-bold px-2 py-1 rounded-full border ${trendUp ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' : 'bg-orange-500/20 text-orange-400 border-orange-500/20'}`}>
            {trend}
          </span>
        </div>
        <h3 className="text-3xl font-black text-white tracking-tight">{value}</h3>
        <p className="text-slate-400 text-sm font-medium mt-1">{title}</p>
      </div>
    </motion.div>
  );
}
