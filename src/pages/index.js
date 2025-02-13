import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function Home() {
  const [showInterview, setShowInterview] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', domain: '', file: null });
  const [messages, setMessages] = useState([{ sender: "AI", text: "Welcome to the mock interview. Start speaking when ready!" }]);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (showInterview) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing camera: ", err));
    }
  }, [showInterview]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const endInterview = () => {
    stopCamera();
    setShowInterview(false);
  };

  if (showInterview) {
    return (
      <div className="interview-container relative">
        <style jsx>{`
          .relative {
            position: relative;
          }
          
          .top-left {
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 1000;
            background: white;
            padding: 8px;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
        `}</style>
        
        <button onClick={() => setShowInterview(false)} className="top-left">
          <ArrowLeft size={24} />
        </button>
        
        <div className="interview-section">
          <div className="left-section">
            <div className="left-up">
              <video ref={videoRef} autoPlay className="video-feed" />
            </div>
            <div className="left-down">
              <h3>User Audio (ML Model Processing...)</h3>
              <input type="text" placeholder="Transcribed speech will appear here..." disabled />
            </div>
          </div>
          <div className="right-section">
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender === "AI" ? "ai" : "user"}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <input
              type="text"
              className="chat-input"
              placeholder="Type your response..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setMessages([...messages, { sender: "User", text: e.target.value }]);
                  e.target.value = "";
                }
              }}
            />
          </div>
        </div>
        <footer className="footer">
          <button onClick={endInterview} className="btn btn-danger">End Interview</button>
        </footer>
      </div>
    );
  }

  return (
    <div className="relative">
      <style jsx>{`
        .login-card {
          position: relative;
        }
        
        .top-left {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 1000;
          background: white;
          padding: 8px;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
      `}</style>
      
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
          <h2>Sign Up</h2>
          <p>Enter your details to begin your interview session.</p>
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="btn btn-primary">Get Started</button>
          ) : (
            <>
              <input type="text" name="name" placeholder="Enter your name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input type="text" name="domain" placeholder="Enter your domain" onChange={(e) => setFormData({ ...formData, domain: e.target.value })} />
              <input type="file" name="file" onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })} />
              <button onClick={() => setShowInterview(true)} className="btn btn-success">Start Interview</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}