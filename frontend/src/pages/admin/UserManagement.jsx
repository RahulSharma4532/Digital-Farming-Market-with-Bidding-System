import React, { useState, useEffect } from 'react';
import {
  Users, Search, Filter, MoreVertical, Shield, AlertCircle,
  CheckCircle, XCircle, Trash2, Ban, Mail, Phone, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch Users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        setLoading(false);
        return;
      }

      const BASE_URL = import.meta.env.VITE_API_URL || 'https://digital-farming-market-with-bidding.onrender.com/api';
      const res = await fetch(`${BASE_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setLoading(false);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('jwt');
      // Optimistic update
      setUsers(users.map(u => {
        if (u._id === id) {
          return { ...u, isActive: !u.isActive };
        }
        return u;
      }));

      const BASE_URL = import.meta.env.VITE_API_URL || 'https://digital-farming-market-with-bidding.onrender.com/api';
      await fetch(`${BASE_URL}/admin/users/${id}/status`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error("Status toggle failed", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        const token = localStorage.getItem('jwt');
        // Optimistic UI
        setUsers(users.filter(u => u._id !== id));

        const BASE_URL = import.meta.env.VITE_API_URL || 'https://digital-farming-market-with-bidding.onrender.com/api';
        await fetch(`${BASE_URL}/admin/users/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (error) {
        console.error("Delete failed", error);
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "All" || user.role === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

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
              <Users className="text-blue-400" />
              User Governance
            </h1>
            <p className="text-slate-400 text-sm">Manage accounts, roles, and permissions</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#1e293b] border border-[#334155] rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-64"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="bg-[#1e293b] border border-[#334155] rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 appearance-none cursor-pointer hover:bg-[#334155] transition-colors"
            >
              <option value="All">All Roles</option>
              <option value="consumer">Consumers</option>
              <option value="farmer">Farmers</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1e293b]/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
            <Users size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Total Users</p>
            <p className="text-2xl font-black">{users.length}</p>
          </div>
        </div>
        <div className="bg-[#1e293b]/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
            <Shield size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Active Accounts</p>
            <p className="text-2xl font-black">{users.filter(u => u.isActive).length}</p>
          </div>
        </div>
        <div className="bg-[#1e293b]/50 backdrop-blur-md p-6 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
            <Ban size={24} />
          </div>
          <div>
            <p className="text-slate-400 text-xs uppercase font-bold tracking-wider">Suspended</p>
            <p className="text-2xl font-black">{users.filter(u => !u.isActive).length}</p>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#1e293b] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#0f172a] text-slate-400 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="p-6">User Identity</th>
                <th className="p-6">Role & Status</th>
                <th className="p-6">Contact Info</th>
                <th className="p-6">Activity</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-500">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center font-bold text-lg text-white/50">
                          {user.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white text-base">{user.name}</p>
                          <p className="text-slate-500 text-xs">ID: #{user._id.slice(-6)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex flex-col gap-2 items-start">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${uRoleColor(user.role)} uppercase`}>
                          {user.role}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <span className={`w-1.5 h-1.5 rounded-full ${user.isActive ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                          <span className={user.isActive ? 'text-emerald-400' : 'text-red-400'}>
                            {user.isActive ? 'Active' : 'Suspended'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Mail size={14} />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Calendar size={14} />
                          <span>Joined {user.createdAt ? format(new Date(user.createdAt), 'MMM dd, yyyy') : 'N/A'}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 text-slate-300">
                      {user.role === 'consumer' ? 'N/A Orders' : 'N/A Products'}
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleStatusToggle(user._id, user.isActive)}
                          className={`p-2 rounded-lg border transition-all ${user.isActive
                            ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                            }`}
                          title={user.isActive ? "Suspend Account" : "Activate Account"}
                        >
                          {user.isActive ? <Ban size={16} /> : <CheckCircle size={16} />}
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 bg-slate-700/50 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/5 hover:border-red-500/20 rounded-lg transition-all"
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-slate-500">
                    <div className="flex flex-col items-center gap-3">
                      <Search size={32} className="opacity-50" />
                      <p>No users found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-white/5 bg-[#1e293b]/50 text-center text-xs text-slate-500">
          Showing {filteredUsers.length} of {users.length} total users
        </div>
      </div>

    </div>
  );
}

function uRoleColor(role) {
  switch (role) {
    case 'admin': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    case 'farmer': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    default: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
  }
}

function Calendar({ size }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}
