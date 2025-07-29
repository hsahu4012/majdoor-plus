import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPasswordStep1 from "./pages/ForgotPasswordStep1";
import ForgotPasswordStep2 from "./pages/ForgotPasswordStep2";
import { useState } from "react";

export default function App() {
  const [step, setStep] = useState("login");
  const [resetState, setResetState] = useState({});

  if (step === "signup") return <Signup />;
  if (step === "login") return <Login />;
  if (step === "forgot1") return (
    <ForgotPasswordStep1 onContinue={(mobile, questions) => {
      setResetState({ mobile, questions });
      setStep("forgot2");
    }} />
  );
  if (step === "forgot2") return <ForgotPasswordStep2 {...resetState} />;

  return null;
}
