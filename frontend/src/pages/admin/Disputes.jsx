import React, { useState, useEffect } from 'react';
import {
  Gavel, CheckCircle, XCircle, AlertTriangle,
  MessageSquare, User, ArrowLeft, Filter
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Disputes() {
  const navigate = useNavigate();
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchDisputes();
  }, []);

  const fetchDisputes = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${BASE_URL}/admin/disputes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setDisputes(data);
      }
    } catch (error) {
      console.error("Failed to fetch disputes", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id, status, resolutionText) => {
    try {
      const token = localStorage.getItem('jwt');
      const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      await fetch(`${BASE_URL}/admin/disputes/${id}/resolve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, resolution: resolutionText })
      });
      // Refresh
      fetchDisputes();
    } catch (error) {
      console.error("Resolution failed", error);
    }
  };

  const filteredDisputes = filter === 'all'
    ? disputes
    : disputes.filter(d => d.status === filter);

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
              <Gavel className="text-orange-400" />
              Dispute Resolution
            </h1>
            <p className="text-slate-400 text-sm">Manage and arbitrate conflicts</p>
          </div>
        </div>

        <div className="bg-[#1e293b] rounded-lg p-1 flex gap-1 border border-white/5">
          {['all', 'open', 'resolved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-md text-sm font-bold capitalize transition-colors ${filter === f ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Disputes List */}
      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <p className="text-center text-slate-500 py-10">Loading disputes...</p>
        ) : filteredDisputes.length === 0 ? (
          <div className="text-center py-20 bg-[#1e293b]/50 rounded-3xl border border-white/5">
            <CheckCircle size={48} className="mx-auto text-emerald-500/20 mb-4" />
            <h3 className="text-xl font-bold text-white">No Disputes Found</h3>
            <p className="text-slate-500">Peace and harmony pending.</p>
          </div>
        ) : (
          filteredDisputes.map(dispute => (
            <DisputeCard key={dispute._id} dispute={dispute} onResolve={handleResolve} />
          ))
        )}
      </div>

    </div>
  );
}

function DisputeCard({ dispute, onResolve }) {
  const [expanded, setExpanded] = useState(false);
  const [resolutionText, setResolutionText] = useState("");

  return (
    <motion.div
      layout
      className={`bg-[#1e293b] border ${dispute.status === 'open' ? 'border-orange-500/30' : 'border-white/5'} rounded-2xl p-6 shadow-xl`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <div className={`p-3 rounded-xl ${dispute.status === 'open'
            ? 'bg-orange-500/10 text-orange-400'
            : 'bg-emerald-500/10 text-emerald-400'
            }`}>
            <AlertTriangle size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg">{dispute.reason}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold border uppercase ${dispute.status === 'open' ? 'bg-orange-500/20 text-orange-400 border-orange-500/20' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
                }`}>
                {dispute.status}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-2 max-w-2xl">{dispute.description}</p>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1"><User size={12} /> Raised by: <span className="text-white">{dispute.raisedBy?.name || 'Unknown'}</span></div>
              <div>ID: {dispute._id}</div>
            </div>
          </div>
        </div>

        {dispute.status === 'open' && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-4 py-2 bg-[#0f172a] hover:bg-white/5 border border-white/10 rounded-lg text-sm font-bold transition-colors"
          >
            {expanded ? "Cancel" : "Take Action"}
          </button>
        )}
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-white/5">
              <h4 className="font-bold mb-2">Resolution Note</h4>
              <textarea
                value={resolutionText}
                onChange={(e) => setResolutionText(e.target.value)}
                placeholder="Enter details regarding the resolution..."
                className="w-full bg-[#0f172a] border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 mb-4 min-h-[100px]"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => onResolve(dispute._id, 'resolved', resolutionText)}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} /> Resolve in Favor of Reporter
                </button>
                <button
                  onClick={() => onResolve(dispute._id, 'rejected', resolutionText)}
                  className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <XCircle size={18} /> Dismiss Dispute
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
