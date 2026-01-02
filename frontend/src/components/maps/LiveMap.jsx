import { MapPin } from 'lucide-react';

export default function LiveMap() {
    return (
        <div className="relative w-full h-full bg-slate-800 rounded-2xl overflow-hidden border border-white/10 shadow-inner group">
            {/* Mock Map Background */}
            <div className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>

            {/* Pins */}
            <div className="absolute top-1/3 left-1/4 animate-bounce duration-[2000ms]">
                <MapPin className="w-8 h-8 text-green-500 drop-shadow-[0_4px_8px_rgba(34,197,94,0.5)] fill-current" />
            </div>
            <div className="absolute bottom-1/3 right-1/3 animate-bounce duration-[2500ms]">
                <MapPin className="w-6 h-6 text-blue-500 drop-shadow-[0_4px_8px_rgba(59,130,246,0.5)] fill-current" />
            </div>

            <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 text-xs text-white">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2 animate-pulse"></span>
                Live Driver Tracking
            </div>
        </div>
    );
}
