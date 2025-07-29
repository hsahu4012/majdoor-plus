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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            mobile: form.mobile,
            password: form.password,
            role: form.role,
            securityQuestions: [
                { questionId: parseInt(form.security1), answer: form.answer1 },
                { questionId: parseInt(form.security2), answer: form.answer2 }
            ]
        };
        const res = await signup(payload);
        alert(res.message || res.error);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Signup</h2>

            <input placeholder="Mobile" value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                className="input" required />

            <input type="password" placeholder="Password" value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input" required />

            <select value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="input">
                <option value="worker">Worker</option>
                <option value="employer">Employer</option>
            </select>

            <label>Security Question 1</label>
            <select value={form.security1}
                onChange={(e) => setForm({ ...form, security1: e.target.value })}
                className="input" required>
                <option value="">Select Question</option>
                {SECURITY_QUESTION_LIST.map((q) => (
                    <option key={q.id} value={q.id}>{q.text}</option>
                ))}
            </select>

            <input placeholder="Answer 1" value={form.answer1}
                onChange={(e) => setForm({ ...form, answer1: e.target.value })}
                className="input" required />

            <label>Security Question 2</label>
            <select value={form.security2}
                onChange={(e) => setForm({ ...form, security2: e.target.value })}
                className="input" required>
                <option value="">Select Question</option>
                {SECURITY_QUESTION_LIST.map((q) => (
                    <option key={q.id} value={q.id}>{q.text}</option>
                ))}
            </select>

            <input placeholder="Answer 2" value={form.answer2}
                onChange={(e) => setForm({ ...form, answer2: e.target.value })}
                className="input" required />

            <button type="submit" className="btn mt-4">Sign Up</button>
        </form>
    );
}
