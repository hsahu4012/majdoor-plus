import { useState } from "react";
import { login } from "../services/AuthService";

export default function Login() {
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await login({ mobile, password });
        if (res.token) {
            localStorage.setItem("token", res.token);
            alert("Login successful");
        } else {
            alert(res.error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <input placeholder="Mobile" value={mobile}
                onChange={(e) => setMobile(e.target.value)} className="input" />
            <input type="password" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)} className="input" />
            <button type="submit" className="btn mt-4">Login</button>
        </form>
    );
}
