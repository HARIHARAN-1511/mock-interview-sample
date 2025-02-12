import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [showInterview, setShowInterview] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', experience: '', skills: '' });
  const [messages, setMessages] = useState([{ sender: "AI", text: "Welcome to the mock interview. Start speaking when ready!" }]);

  const videoRef = useRef(null);
  const streamRef = useRef(null); // Store media stream

  useEffect(() => {
    if (showInterview) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          streamRef.current = stream; // Store stream
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing camera: ", err));
    }
  }, [showInterview]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop()); // Stop all tracks
      streamRef.current = null;
    }
  };

  const endInterview = () => {
    stopCamera();
    setShowInterview(false);
  };

  if (showInterview) {
    return (
      <div className="interview-container">
        <div className="interview-section">
          {/* LEFT SECTION (Camera + Audio) */}
          <div className="left-section">
            {/* Camera Feed */}
            <div className="left-up">
              <video ref={videoRef} autoPlay className="video-feed" />
            </div>
            {/* Audio Input Placeholder */}
            <div className="left-down">
              <h3>User Audio (ML Model Processing...)</h3>
              <input type="text" placeholder="Transcribed speech will appear here..." disabled />
            </div>
          </div>

          {/* RIGHT SECTION (Chat UI) */}
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

        {/* FOOTER - End Interview */}
        <footer className="footer">
          <button onClick={endInterview} className="btn btn-danger">End Interview</button>
        </footer>
      </div>
    );
  }

  return (
    <div>
      {/* LOGIN PAGE */}
      <div className="hero-section">
        <h1>Welcome to AI Mock Interviewer</h1>
        <p>Prepare for your interviews with AI-powered feedback.</p>
      </div>
      <div className="login-container">
        <div className="login-card">
          <h2>Sign Up</h2>
          <p>Enter your details to begin your interview session.</p>
          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="btn btn-primary">Get Started</button>
          ) : (
            <>
              <input type="text" name="name" placeholder="Enter your name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <input type="email" name="email" placeholder="Enter your email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <input type="text" name="experience" placeholder="Years of experience" onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
              <input type="text" name="skills" placeholder="Key skills" onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
              <button onClick={() => setShowInterview(true)} className="btn btn-success">Start Interview</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
