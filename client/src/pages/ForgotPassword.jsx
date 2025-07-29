// client/src/pages/ForgotPassword.jsx

import { useState } from 'react';
import ForgotPasswordStep1 from './ForgotPasswordStep1';
import ForgotPasswordStep2 from './ForgotPasswordStep2';

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState('');
    const [questions, setQuestions] = useState([]);

    const handleContinue = (m, qs) => {
        setMobile(m);
        setQuestions(qs);
        setStep(2);
    };

    return (
        <>
            {step === 1 && (
                <ForgotPasswordStep1 onContinue={handleContinue} />
            )}
            {step === 2 && (
                <ForgotPasswordStep2 mobile={mobile} questions={questions} />
            )}
        </>
    );
}
