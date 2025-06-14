// components/Chatbot.js
import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi! How can I help you today?' }
  ]);

  const handleQuestion = (question, answer) => {
    setMessages([...messages, { type: 'user', text: question }, { type: 'bot', text: answer }]);
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>Help Assistant</span>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-questions">
            <button onClick={() => handleQuestion(
              'I am stuck in a challenge',
              'Try reviewing the problem statement and break it into smaller parts. Need more help? Reach out to support.'
            )}>
              I’m stuck in a challenge
            </button>
            <button onClick={() => handleQuestion(
              'Where is my progress?',
              'You can check your progress in the “Progress” tab on the dashboard.'
            )}>
              Where is my progress?
            </button>
            <button onClick={() => handleQuestion(
              'How do I submit a challenge?',
              'Go to Hackathons → View Challenge → Submit Code. Admin will review and provide feedback.'
            )}>
              How do I submit a challenge?
            </button>
          </div>
        </div>
      ) : (
        <button className="chatbot-icon" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;
