import { useState } from "react";
import { getSecurityQuestions } from "../services/AuthService";

export default function ForgotPasswordStep1({ onContinue }) {
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await getSecurityQuestions(mobile);

            if (res?.data?.questions) {
                onContinue(mobile, res.data.questions);
            } else {
                setError("Security questions not found.");
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
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>

            <input
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="input w-full border px-2 py-1 rounded"
                required
            />

            {error && <p className="text-red-500 mt-2">{error}</p>}

            <button
                type="submit"
                className="btn mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
                Continue
            </button>
        </form>
    );
}
