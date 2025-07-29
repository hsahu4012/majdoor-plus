import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!mobile || !password) {
            setError("Mobile and password are required");
            return;
        }

        try {
            await login(mobile, password); // moved logic to context
        } catch (err) {
            setError(err?.response?.data?.error || "Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Login</h2>

            <input
                placeholder="Mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded mb-2"
                required
            />

            {error && <p className="text-red-500 mt-1">{error}</p>}

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full"
            >
                Login
            </button>
        </form>
    );
}
