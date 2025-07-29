import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiLogin } from '../services/AuthService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Load user from localStorage on app start
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token && role) {
            setUser({ token, role });
        }
    }, []);

    const login = async (mobile, password) => {
        const { data } = await apiLogin({ mobile, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        setUser({ token: data.token, role: data.role });
        navigate('/dashboard');
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
