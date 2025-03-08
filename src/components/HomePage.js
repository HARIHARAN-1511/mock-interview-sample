import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function HomePage({ startInterview }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', domain: '', file: null });

  return (
    <div className="min-h-screen bg-gradient-to-b from-lightblue-100 to-white">
      <div className="hero-section">
        <h1>Welcome to AI Mock Interviewer</h1>
        <p>Prepare for your interviews with AI-powered feedback.</p>
      </div>
      <div className="login-container">
        <div className="login-card">
          {showForm && (
            <button onClick={() => setShowForm(false)} className="top-left">
              <ArrowLeft size={24} />
            </button>
          )}
          <h2>Let's Get Started!!</h2>
          <p>Enter your details to begin your interview session.</p>
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="btn btn-primary">Get Started</button>
          ) : (
            <>
              <input type="text" name="name" placeholder="Enter your name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input type="text" name="domain" placeholder="Enter your domain" onChange={(e) => setFormData({ ...formData, domain: e.target.value })} />
              <input type="file" name="file" onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })} />
              <button onClick={() => startInterview()} className="btn btn-success">Start Interview</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
