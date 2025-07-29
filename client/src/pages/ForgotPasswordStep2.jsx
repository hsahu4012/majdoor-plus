import { useState } from "react";
import { SECURITY_QUESTION_LIST } from "../utils/securityQuestions";
import { resetPassword } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordStep2({ mobile, questions }) {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState(["", ""]);
    const [newPass, setNewPass] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const res = await resetPassword({
                mobile,
                answers,
                newPassword: newPass,
            });

            if (res?.data?.message) {
                setSuccess(res.data.message);
                alert(res.data.message); // or navigate to login page
                navigate('/login');
            } else {
                setError("Unexpected response from server.");
            }
        } catch (err) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Answer Security Questions</h2>

            {questions.map((q, idx) => {
                const questionText = SECURITY_QUESTION_LIST.find(qs => qs.id === q.questionId)?.text;
                return (
                    <div key={q.questionId} className="mb-3">
                        <label className="block font-medium mb-1">{questionText}</label>
                        <input
                            value={answers[idx] || ""}
                            onChange={(e) => {
                                const copy = [...answers];
                                copy[idx] = e.target.value;
                                setAnswers(copy);
                            }}
                            className="input w-full border px-2 py-1 rounded"
                            required
                        />
                    </div>
                );
            })}

            <input
                type="password"
                placeholder="New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="input w-full border px-2 py-1 rounded mt-3"
                required
            />

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-600 mt-2">{success}</p>}

            <button type="submit" className="btn mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                Reset
            </button>
        </form>
    );
}
