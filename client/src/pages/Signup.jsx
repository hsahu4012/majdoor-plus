import { useState } from "react";
import { SECURITY_QUESTION_LIST } from "../utils/securityQuestions";
import { signup } from "../services/AuthService";

export default function Signup() {
    const [form, setForm] = useState({
        mobile: "",
        password: "",
        role: "worker",
        security1: "",
        answer1: "",
        security2: "",
        answer2: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const payload = {
            mobile: form.mobile,
            password: form.password,
            role: form.role,
            securityQuestions: [
                { questionId: parseInt(form.security1), answer: form.answer1 },
                { questionId: parseInt(form.security2), answer: form.answer2 }
            ]
        };

        try {
            const res = await signup(payload);
            alert(res?.data?.message || "Signup successful!");
        } catch (err) {
            console.log(err);
            const msg = err.response?.data?.message || err.response.data.error || "Signup failed";
            setError(msg);
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    const updateField = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Signup</h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <input placeholder="Mobile" value={form.mobile}
                onChange={(e) => updateField("mobile", e.target.value)}
                className="input" required />

            <input type="password" placeholder="Password" value={form.password}
                onChange={(e) => updateField("password", e.target.value)}
                className="input" required />

            <select value={form.role}
                onChange={(e) => updateField("role", e.target.value)}
                className="input">
                <option value="worker">Worker</option>
                <option value="employer">Employer</option>
            </select>

            <label>Security Question 1</label>
            <select value={form.security1}
                onChange={(e) => updateField("security1", e.target.value)}
                className="input" required>
                <option value="">Select Question</option>
                {SECURITY_QUESTION_LIST.map((q) => (
                    <option key={q.id} value={q.id}>{q.text}</option>
                ))}
            </select>

            <input placeholder="Answer 1" value={form.answer1}
                onChange={(e) => updateField("answer1", e.target.value)}
                className="input" required />

            <label>Security Question 2</label>
            <select value={form.security2}
                onChange={(e) => updateField("security2", e.target.value)}
                className="input" required>
                <option value="">Select Question</option>
                {SECURITY_QUESTION_LIST.map((q) => (
                    <option key={q.id} value={q.id}>{q.text}</option>
                ))}
            </select>

            <input placeholder="Answer 2" value={form.answer2}
                onChange={(e) => updateField("answer2", e.target.value)}
                className="input" required />

            <button type="submit" className="btn mt-4" disabled={loading}>
                {loading ? "Signing up..." : "Sign Up"}
            </button>
        </form>
    );
}
