import React, { useState, useEffect } from 'react';
import {
  CheckCircle, XCircle, FileText, ChevronRight, Search,
  ShieldCheck, AlertTriangle, User, MapPin, Calendar,
  ExternalLink, Eye, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function FarmerVerification() {
  const navigate = useNavigate();
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [farmers, setFarmers] = useState([]);
  const [animateCard, setAnimateCard] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingFarmers();
  }, []);

  const fetchPendingFarmers = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch('http://localhost:5000/api/admin/farmers/pending', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setFarmers(data || []);
        if (data && data.length > 0) {
          setSelectedFarmer(data[0]);
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch pending farmers", error);
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setAnimateCard(true);
    try {
      const token = localStorage.getItem('jwt');
      await fetch(`http://localhost:5000/api/admin/farmers/${id}/verify`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });

      setTimeout(() => {
        const newList = farmers.filter(f => f._id !== id);
        setFarmers(newList);
        setSelectedFarmer(newList.length > 0 ? newList[0] : null);
        setAnimateCard(false);
      }, 500);

    } catch (error) {
      console.error("Verification failed", error);
      setAnimateCard(false);
    }
  };

  const handleReject = async (id) => {
    setAnimateCard(true);
    try {
      const token = localStorage.getItem('jwt');
      await fetch(`http://localhost:5000/api/admin/farmers/${id}/reject`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });

      setTimeout(() => {
        const newList = farmers.filter(f => f._id !== id);
        setFarmers(newList);
        setSelectedFarmer(newList.length > 0 ? newList[0] : null);
        setAnimateCard(false);
      }, 500);
    } catch (error) {
      console.error("Rejection failed", error);
      setAnimateCard(false);
    }
  };

  // Helper to safely access documents since schema might return empty array
  const documents = selectedFarmer?.documents || [];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans flex flex-col items-center p-6">

      {/* Header */}
      <div className="w-full max-w-7xl mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin')}
            className="p-2 bg-[#1e293b] rounded-full hover:bg-[#334155] transition-colors"
          >
            <ArrowLeft className="text-slate-400" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ShieldCheck className="text-emerald-400" />
              Verification Queue
            </h1>
            <p className="text-slate-400 text-sm">Review pending farmer applications</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-[#1e293b] px-4 py-2 rounded-full border border-[#334155]">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search Application ID..."
            className="bg-transparent outline-none text-sm w-64"
          />
        </div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">

        {/* Left List Panel */}
        <div className="col-span-4 bg-[#1e293b]/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/5 bg-[#1e293b]/80">
            <h3 className="font-bold text-slate-300">Pending ({farmers.length})</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {loading ? (
              <div className="h-full flex items-center justify-center text-slate-500">Loading...</div>
            ) : farmers.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <CheckCircle size={48} className="mb-4 text-emerald-500/20" />
                <p>All caught up!</p>
              </div>
            ) : (
              farmers.map((farmer) => (
                <div
                  key={farmer._id}
                  onClick={() => setSelectedFarmer(farmer)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedFarmer?._id === farmer._id
                    ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    : 'bg-[#0f172a]/40 border-transparent hover:bg-[#0f172a]/60'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={farmer.avatar || "https://cdn-icons-png.flaticon.com/512/1144/1144709.png"} alt={farmer.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold truncate ${selectedFarmer?._id === farmer._id ? 'text-emerald-400' : 'text-white'}`}>
                        {farmer.farmName || "Unnamed Farm"}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">{farmer.name}</p>
                    </div>
                    {farmer.riskScore === 'Medium' && <span className="w-2 h-2 rounded-full bg-orange-500"></span>}
                    {farmer.riskScore === 'Low' && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>Applied: {farmer.createdAt ? format(new Date(farmer.createdAt), 'MMM dd') : 'N/A'}</span>
                    <ChevronRight size={14} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Detail Panel */}
        <div className="col-span-8 bg-[#1e293b] rounded-3xl border border-white/5 relative overflow-hidden flex flex-col">
          {selectedFarmer ? (
            <AnimatePresence mode='wait'>
              {!animateCard && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="h-full flex flex-col"
                >
                  {/* Banner */}
                  <div className="h-32 bg-gradient-to-r from-emerald-900/40 to-slate-900/40 border-b border-white/5 relative">
                    <div className="absolute -bottom-10 left-8 flex items-end gap-6">
                      <img src={selectedFarmer.avatar || "https://cdn-icons-png.flaticon.com/512/1144/1144709.png"} className="w-24 h-24 rounded-2xl border-4 border-[#1e293b] shadow-xl object-cover" />
                      <div className="mb-3">
                        <h2 className="text-2xl font-bold">{selectedFarmer.farmName || "Unnamed Farm"}</h2>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1"><User size={14} /> {selectedFarmer.name}</span>
                          <span className="flex items-center gap-1"><MapPin size={14} /> {selectedFarmer.location || "Location Unknown"}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-14 px-8 pb-32 overflow-y-auto custom-scrollbar">

                    {/* Risk Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="bg-[#0f172a] p-4 rounded-xl border border-white/5">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Risk Score</p>
                        <p className={`text-lg font-bold ${selectedFarmer.riskScore === 'Low' ? 'text-emerald-400' : 'text-orange-400'}`}>
                          {selectedFarmer.riskScore || "Low"} Risk
                        </p>
                      </div>
                      <div className="bg-[#0f172a] p-4 rounded-xl border border-white/5">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Docs Verified</p>
                        <p className="text-lg font-bold text-white">0/{documents.length} Checked</p>
                      </div>
                      <div className="bg-[#0f172a] p-4 rounded-xl border border-white/5">
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Contact</p>
                        <p className="text-sm font-medium text-white truncate">{selectedFarmer.email}</p>
                      </div>
                    </div>

                    {/* Documents Grid */}
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <FileText size={20} className="text-blue-400" />
                      Submitted Documents
                    </h3>
                    {documents.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4">
                        {documents.map((doc, i) => (
                          <div key={i} className="bg-[#0f172a] p-4 rounded-xl border border-white/5 group hover:border-white/10 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                <FileText size={18} />
                              </div>
                              <span className={`text-xs font-bold px-2 py-1 rounded-full border ${doc.status === 'valid'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : doc.status === 'rejected'
                                  ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                  : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                                }`}>
                                {doc.status.toUpperCase()}
                              </span>
                            </div>
                            <p className="font-bold text-sm">{doc.type}</p>
                            <p className="text-xs text-slate-500 mb-4">ID: {doc.idNumber || "N/A"}</p>
                            <button className="w-full py-2 bg-[#1e293b] hover:bg-[#334155] rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors">
                              <Eye size={14} /> Inspect Document
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-sm">No documents submitted yet.</p>
                    )}
                  </div>

                  {/* Sticky Footer Actions */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#1e293b]/90 backdrop-blur-xl border-t border-white/5 flex gap-4">
                    <button
                      onClick={() => handleReject(selectedFarmer._id)}
                      className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <XCircle size={20} />
                      Reject Application
                    </button>
                    <button
                      onClick={() => handleApprove(selectedFarmer._id)}
                      className="flex-[2] bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                    >
                      <CheckCircle size={20} />
                      Approve & Verify Farmer
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            !loading && (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <div className="w-16 h-16 bg-[#0f172a] rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck size={32} />
                </div>
                <p>Select an applicant to review details</p>
              </div>
            )
          )}
        </div>

      </div>
    </div>
  );
}
