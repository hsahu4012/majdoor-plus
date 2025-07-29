import { useState } from "react";
import { getSecurityQuestions } from "../services/AuthService";

export default function ForgotPasswordStep1({ onContinue }) {
    const [mobile, setMobile] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await getSecurityQuestions(mobile);
        if (res.questions) {
            onContinue(mobile, res.questions);
        } else {
            alert(res.error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            <input placeholder="Enter mobile number"
                value={mobile} onChange={(e) => setMobile(e.target.value)} className="input" />
            <button type="submit" className="btn mt-4">Continue</button>
        </form>
    );
}
