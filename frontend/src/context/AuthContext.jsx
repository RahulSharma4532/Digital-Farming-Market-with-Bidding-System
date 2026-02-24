import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for token on mount
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user');

            if (token && savedUser) {
                try {
                    setUser(JSON.parse(savedUser));
                } catch (e) {
                    console.error("Failed to parse user data", e);
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json().catch(async (e) => {
                const text = await response.text();
                console.error("Failed to parse JSON. Status:", response.status, "Body:", text.slice(0, 200));
                throw new Error(`Server returned invalid response (${response.status}). Check API URL: ${API_URL}`);
            });
            console.log("Login API Response:", data); // Debug Log

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            if (!data.user) {
                throw new Error("Invalid response from server: User data missing");
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            return { success: true, role: data.user.role };
        } catch (error) {
            console.error("Login Context Error:", error);
            return { success: false, message: error.message };
        }
    };

    const register = async (name, email, password, role) => {
        try {
            const BASE_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await response.json().catch(async (e) => {
                const text = await response.text();
                console.error("Failed to parse JSON. Status:", response.status, "Body:", text.slice(0, 200));
                throw new Error(`Server returned invalid response (${response.status}). Check API URL: ${BASE_URL}`);
            });
            console.log("Register API Response:", data); // Debug Log

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            if (!data.user) {
                throw new Error("Invalid response from server: User data missing");
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            return { success: true, role: data.user.role };
        } catch (error) {
            console.error("Register Context Error:", error);
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/';
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
