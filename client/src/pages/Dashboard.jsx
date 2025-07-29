// client/src/pages/Dashboard.jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 glass">
                <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                    Welcome, {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </h1>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                    This is your dashboard. You can build your job feed, calendar view, and other widgets here.
                </p>
                <div className="flex space-x-4">
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    >
                        Home
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
