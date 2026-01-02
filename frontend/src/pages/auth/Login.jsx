import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Shield, ShoppingBag, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState("consumer");
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      id: "consumer",
      title: "Consumer",
      desc: "Buy Fresh",
      icon: <ShoppingBag className="w-8 h-8 text-white" />,
      color: "from-green-500 to-emerald-700",
      redirect: "/consumer/home",
    },
    {
      id: "farmer",
      title: "Farmer",
      desc: "Sell Harvest",
      icon: <User className="w-8 h-8 text-white" />,
      color: "from-yellow-500 to-orange-700",
      redirect: "/farmer",
    },
    {
      id: "admin",
      title: "Admin",
      desc: "Control",
      icon: <Shield className="w-8 h-8 text-white" />,
      color: "from-blue-500 to-indigo-700",
      redirect: "/admin",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);

    if (result.success) {
      if (result.role !== role) {
        setError(`Please login with a ${role} account (You logged in as ${result.role})`);
        setLoading(false);
        return;
      }
      const selectedRole = roles.find((r) => r.id === role);
      navigate(selectedRole.redirect);
    } else {
      setError(result.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden font-sans">

      {/* 3D Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-yellow-500/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">

        {/* Left Side: Special 3D Role Selection */}
        <div className="space-y-6">
          <div>
            <h1 className="text-5xl font-black text-white mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-gray-400 text-lg">Choose your portal to continue.</p>
          </div>

          <div className="grid gap-4">
            {roles.map((r) => (
              <div
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl
                 ${role === r.id
                    ? `border-transparent ring-2 ring-offset-2 ring-offset-[#0f172a] ring-${r.color.split(' ')[1].replace('to-', '')}`
                    : 'border-white/10 hover:border-white/30 bg-white/5'
                  }`}
              >
                {/* Active Gradient Background */}
                {role === r.id && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${r.color} opacity-100 transition-opacity duration-300`}></div>
                )}

                <div className="relative p-6 flex items-center justify-between z-10">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-md shadow-inner`}>
                      {r.icon}
                    </div>
                    <div>
                      <h3 className={`text-xl font-bold ${role === r.id ? 'text-white' : 'text-gray-200'}`}>{r.title} Portal</h3>
                      <p className={`text-sm ${role === r.id ? 'text-white/80' : 'text-gray-500'}`}>{r.desc}</p>
                    </div>
                  </div>
                  {role === r.id && (
                    <div className="bg-white/20 p-2 rounded-full animate-pulse">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Glassmorphism Login Form */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl relative">

          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
            <div className="text-9xl font-black text-white leading-none tracking-tighter transform rotate-12">
              {role === 'consumer' ? 'C' : role === 'farmer' ? 'F' : 'A'}
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-2 capitalize relative z-10">{role} Login</h2>
          <p className="text-gray-400 mb-8 relative z-10">Secure access to your dashboard.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl text-sm backdrop-blur-md">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="name@example.com"
                className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all placeholder-gray-600"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all placeholder-gray-600"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-green-400 hover:text-green-300 font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:from-green-400 hover:to-emerald-500 transform hover:-translate-y-0.5 transition-all
               ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              New to TerraFresh?{' '}
              <button onClick={() => navigate('/signup')} className="text-white font-bold hover:underline">
                Create Account
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
