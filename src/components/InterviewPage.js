import { useEffect, useRef, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export default function InterviewPage({ endInterview }) {
  const [messages, setMessages] = useState([{ sender: "AI", text: "Welcome to the mock interview. Start speaking when ready!" }]);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing camera: ", err));

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="interview-container relative">
      <button onClick={endInterview} className="top-left">
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
