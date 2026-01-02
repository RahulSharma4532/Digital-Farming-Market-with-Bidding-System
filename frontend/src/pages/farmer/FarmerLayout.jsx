import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Package, Gavel, DollarSign, LogOut, ShoppingBag, ShieldCheck } from "lucide-react";

export default function FarmerLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const sidebarLinks = [
    { name: "Overview", icon: <LayoutDashboard size={20} />, path: "/farmer" },
    { name: "Inventory", icon: <Package size={20} />, path: "/farmer/products" },
    { name: "Live Auctions", icon: <Gavel size={20} />, path: "/farmer/live" },
    { name: "Global Sales", icon: <ShoppingBag size={20} />, path: "/farmer/buy" },
    { name: "Earnings", icon: <DollarSign size={20} />, path: "/farmer/earnings" },
    { name: "Verification", icon: <ShieldCheck size={20} />, path: "/farmer/verification" },
  ];

  return (
    <div className="flex min-h-screen bg-[#faf8f2] font-sans">

      {/* Sidebar */}
      <aside className="w-64 bg-[#0b1c2d] text-white flex flex-col fixed h-full z-10">
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🌱 TerraFresh
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/farmer' && location.pathname.startsWith(link.path));
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/farmer'}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                    ? "bg-[#15803d] text-white shadow-lg shadow-green-900/20 font-medium"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-green-900/50 flex items-center justify-center text-green-400 font-bold">
              {user?.name?.charAt(0) || 'F'}
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold truncate text-sm">{user?.name || 'Farmer'}</p>
              <p className="text-gray-500 text-xs truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
