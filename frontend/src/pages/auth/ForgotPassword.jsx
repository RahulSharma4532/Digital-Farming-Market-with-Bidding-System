import { useState } from 'react';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 relative">
                <button
                    onClick={() => navigate('/login')}
                    className="absolute left-8 top-8 text-gray-400 hover:text-gray-600"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="text-center mb-8 mt-4">
                    <h2 className="text-2xl font-bold text-gray-800">Forgot Password?</h2>
                    <p className="text-gray-500 mt-2">Enter your email to receive a reset link</p>
                </div>

                {submitted ? (
                    <div className="text-center animate-fadeIn">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Check your mail</h3>
                        <p className="text-gray-500 mb-6">We have sent a password recover instructions to your email.</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
                        >
                            Back to Login
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
                        >
                            Send Reset Link
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
