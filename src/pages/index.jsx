import { useState } from 'react';
import HomePage from '../components/HomePage';
import InterviewPage from '../components/InterviewPage';
import AnalysisPage from '../components/AnalysisPage';

export default function MainPage() {
  const [step, setStep] = useState("home");

  const startInterview = () => setStep("interview");
  const endInterview = () => setStep("analysis");
  const restartInterview = () => setStep("home");

  return (
    <>
      {step === "home" && <HomePage startInterview={startInterview} />}
      {step === "interview" && <InterviewPage endInterview={endInterview} />}
      {step === "analysis" && <AnalysisPage restartInterview={restartInterview} />}
    </>
  );
}
