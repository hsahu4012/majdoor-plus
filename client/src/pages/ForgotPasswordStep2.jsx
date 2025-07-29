import { useState } from "react";
import { SECURITY_QUESTION_LIST } from "../utils/securityQuestions";
import { resetPassword } from "../services/AuthService";

export default function ForgotPasswordStep2({ mobile, questions }) {
    const [answers, setAnswers] = useState(["", ""]);
    const [newPass, setNewPass] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await resetPassword({
            mobile,
            answers,
            newPassword: newPass
        });
        alert(res.message || res.error);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Answer Security Questions</h2>

            {questions.map((q, idx) => {
                const questionText = SECURITY_QUESTION_LIST.find(qs => qs.id === q.questionId)?.text;
                return (
                    <div key={q.questionId} className="mb-3">
                        <label>{questionText}</label>
                        <input value={answers[idx] || ""}
                            onChange={(e) => {
                                const copy = [...answers];
                                copy[idx] = e.target.value;
                                setAnswers(copy);
                            }}
                            className="input" required />
                    </div>
                );
            })}

            <input type="password" placeholder="New Password"
                value={newPass} onChange={(e) => setNewPass(e.target.value)} className="input" />

            <button type="submit" className="btn mt-4">Reset</button>
        </form>
    );
}
