import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Shield, ShoppingBag, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [role, setRole] = useState("consumer");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      id: "consumer",
      title: "Consumer",
      desc: "Order Quality Produce",
      icon: <ShoppingBag className="w-6 h-6 text-white" />,
      color: "from-green-500 to-emerald-700",
      redirect: "/consumer/home",
    },
    {
      id: "farmer",
      title: "Farmer",
      desc: "Sell to the World",
      icon: <User className="w-6 h-6 text-white" />,
      color: "from-yellow-500 to-orange-700",
      redirect: "/farmer",
    },
    {
      id: "admin",
      title: "Admin",
      desc: "Platform Manager",
      icon: <Shield className="w-6 h-6 text-white" />,
      color: "from-blue-500 to-indigo-700",
      redirect: "/admin",
    },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(formData.name, formData.email, formData.password, role);

    if (result.success) {
      const selectedRole = roles.find((r) => r.id === role);
      navigate(selectedRole.redirect);
    } else {
      setError(result.message || 'Signup failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden font-sans">

      {/* 3D Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[30%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">

        {/* Left Side: Dynamic Role Selection */}
        <div className="space-y-8 order-2 md:order-1">
          <div>
            <h1 className="text-5xl font-black text-white mb-2 tracking-tight">Join TerraFresh</h1>
            <p className="text-gray-400 text-lg">Select your account type to get started.</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
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

                <div className="relative p-5 flex items-center justify-between z-10">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-xl bg-white/20 backdrop-blur-md shadow-inner`}>
                      {r.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${role === r.id ? 'text-white' : 'text-gray-200'}`}>{r.title}</h3>
                      <p className={`text-xs ${role === r.id ? 'text-white/80' : 'text-gray-500'}`}>{r.desc}</p>
                    </div>
                  </div>
                  {role === r.id && (
                    <div className="bg-white/20 p-1.5 rounded-full animate-pulse">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Glassmorphism Signup Form */}
        <div className="order-1 md:order-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-10 shadow-3xl relative">

          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <div className="text-8xl font-black text-white leading-none tracking-tighter">
              +
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2 capitalize relative z-10">Create {role} Account</h2>
          <p className="text-gray-400 mb-6 relative z-10 text-sm">Fill in your details to register.</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl text-sm backdrop-blur-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-5 relative z-10">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all placeholder-gray-600"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="name@example.com"
                className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all placeholder-gray-600"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#0f172a]/50 border border-white/10 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all placeholder-gray-600"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3.5 rounded-xl font-bold text-lg hover:shadow-lg hover:from-green-400 hover:to-emerald-500 transform hover:-translate-y-0.5 transition-all mt-4
               ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating Account...' : 'Get Started'}
            </button>
          </form>

          <div className="mt-8 text-center bg-white/5 rounded-xl p-4">
            <p className="text-gray-400 text-sm">
              Already have an account?{' '}
              <button onClick={() => navigate('/')} className="text-white font-bold hover:underline">
                Log In
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
