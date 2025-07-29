import { Routes, Route, useNavigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ForgotPasswordStep1 from './pages/ForgotPasswordStep1';
import ForgotPasswordStep2 from './pages/ForgotPasswordStep2';
import Dashboard from './pages/Dashboard';     // placeholder
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { useState } from 'react';
import ForgotPassword from './pages/ForgotPassword';

export default function App() {
  const [resetState, setResetState] = useState({ mobile: '', questions: [] });
  const navigate = useNavigate();

  const handleContinue = (mobile, questions) => {
    setResetState({ mobile, questions });
    // after storing, navigate to step 2
    navigate('/reset');
  };

  return (
    <AuthProvider>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* add more protected routes here */}
      </Routes>
    </AuthProvider>
  );
}
