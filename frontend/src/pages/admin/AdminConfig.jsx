import React, { useState, useEffect } from 'react';
import {
    Settings, Save, RefreshCw, Server, Shield,
    CreditCard, Bell, Database, ToggleLeft, ToggleRight, ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AdminConfig() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [config, setConfig] = useState({
        maintenanceMode: false,
        allowRegistration: true,
        platformFee: 2.5,
        emailNotifications: true,
        autoApproveFarmers: false,
        debugMode: false
    });

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const BASE_URL = import.meta.env.VITE_API_URL;
            const res = await fetch(`${BASE_URL}/admin/config`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await res.json();
            if (res.ok) {
                setConfig(data);
            }
        } catch (error) {
            console.error("Failed to fetch settings", error);
        } finally {
            setInitialLoading(false);
        }
    };

    const handleToggle = (key) => {
        setConfig(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleChange = (key, value) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('jwt');
            const BASE_URL = import.meta.env.VITE_API_URL;
            const res = await fetch(`${BASE_URL}/admin/config`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(config)
            });

            if (res.ok) {
                alert("System configuration updated successfully!");
            } else {
                alert("Failed to save configuration.");
            }
        } catch (error) {
            console.error("Failed to save settings", error);
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-slate-500">
                Loading configuration...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-white font-sans p-8">

            {/* Header */}
            <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin')}
                        className="p-2 bg-[#1e293b] rounded-full hover:bg-[#334155] transition-colors"
                    >
                        <ArrowLeft className="text-slate-400" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-2">
                            <Settings className="text-emerald-400 animate-spin-slow" />
                            System Configuration
                        </h1>
                        <p className="text-slate-400 text-sm">Global platform settings and parameters</p>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                    {loading ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <div className="max-w-4xl mx-auto grid gap-6">

                {/* General Settings */}
                <Section title="General Settings" icon={<Server className="text-blue-400" />}>
                    <Toggle
                        label="Maintenance Mode"
                        desc="Suspend all user activities except for admins"
                        checked={config.maintenanceMode}
                        onChange={() => handleToggle('maintenanceMode')}
                        danger={true}
                    />
                    <div className="h-px bg-white/5 my-4" />
                    <Toggle
                        label="Allow New Registrations"
                        desc="Enable sign-ups for Consumers and Farmers"
                        checked={config.allowRegistration}
                        onChange={() => handleToggle('allowRegistration')}
                    />
                    <div className="h-px bg-white/5 my-4" />
                    <Toggle
                        label="Debug Mode"
                        desc="Show verbose error logs in frontend console"
                        checked={config.debugMode}
                        onChange={() => handleToggle('debugMode')}
                    />
                </Section>

                {/* Financial Settings */}
                <Section title="Financial Parameters" icon={<CreditCard className="text-emerald-400" />}>
                    <div className="flex items-center justify-between py-2">
                        <div>
                            <p className="font-bold text-white">Platform Fee (%)</p>
                            <p className="text-xs text-slate-400">Commission taken from each auction sale</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                value={config.platformFee}
                                onChange={(e) => handleChange('platformFee', e.target.value)}
                                className="bg-[#0f172a] border border-white/10 rounded-lg px-3 py-1 w-20 text-right focus:outline-none focus:border-emerald-500"
                            />
                            <span className="text-slate-500">%</span>
                        </div>
                    </div>
                </Section>

                {/* Verification Rules */}
                <Section title="Verification & Security" icon={<Shield className="text-purple-400" />}>
                    <Toggle
                        label="Auto-Approve Farmers"
                        desc="Automatically verify farmers with valid Aadhar numbers (Not Recommended)"
                        checked={config.autoApproveFarmers}
                        onChange={() => handleToggle('autoApproveFarmers')}
                        danger={true}
                    />
                    <div className="h-px bg-white/5 my-4" />
                    <Toggle
                        label="Email Notifications"
                        desc="Send email alerts for login and security events"
                        checked={config.emailNotifications}
                        onChange={() => handleToggle('emailNotifications')}
                    />
                </Section>

            </div>
        </div>
    );
}

function Section({ title, icon, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1e293b]/50 backdrop-blur-md border border-white/5 rounded-2xl p-6"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#0f172a] rounded-lg border border-white/5">
                    {icon}
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
            <div>{children}</div>
        </motion.div>
    );
}

function Toggle({ label, desc, checked, onChange, danger }) {
    return (
        <div className="flex items-center justify-between py-2">
            <div>
                <p className={`font-bold ${danger && checked ? 'text-red-400' : 'text-white'}`}>{label}</p>
                <p className="text-xs text-slate-400">{desc}</p>
            </div>
            <button
                onClick={onChange}
                className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${checked
                    ? (danger ? 'bg-red-500' : 'bg-emerald-500')
                    : 'bg-[#0f172a] border border-white/10'
                    }`}
            >
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${checked ? 'translate-x-6' : 'translate-x-0'
                    }`} />
            </button>
        </div>
    );
}
