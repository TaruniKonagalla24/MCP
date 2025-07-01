// CodingPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CodingPage.css';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import api from '../api/axios';

const languageExtensions = {
  javascript: javascript(),
  python: python(),
  cpp: cpp(),
};

const ChatBot = ({ isOpen, onClose, hackathonId, code, language }) => {
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.username || 'there';
  
  const [messages, setMessages] = useState([
    { text: `Hi ${username}, how can I help today?`, sender: 'bot' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const userMessage = inputMessage;
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setInputMessage('');
    setIsTyping(true);
    
    try {
      // Add temporary "typing" message
      setMessages(prev => [...prev, { text: 'Typing...', sender: 'bot', isTyping: true }]);
      
      const response = await api.post('/Hackathon/Chatbot', {
        usermessage: userMessage,
        hackathonid: hackathonId,
        answer: code,
        programmingLanguage: language
      });

      // Remove typing indicator and add actual response
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      setMessages(prev => [...prev, { text: response.data.messages, sender: 'bot' }]);
    } catch (err) {
      // Remove typing indicator and show error
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      setMessages(prev => [...prev, { 
        text: `Sorry, I encountered an error: ${err.message}`, 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <div className="chatbot-header">
        <h3>Coding Assistant</h3>
        <button onClick={onClose} className="chatbot-close-btn">×</button>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender} ${message.isTyping ? 'typing' : ''}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isTyping}
        />
        <button onClick={handleSendMessage} disabled={isTyping}>
          {isTyping ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

const CodingPage = () => {
  const { challengeId } = useParams();
  const [code, setCode] = useState('// Start coding here');
  const [language, setLanguage] = useState('javascript');
  const [showHint, setShowHint] = useState(false);
  const [output, setOutput] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [problemData, setProblemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
        console.log('data received:' + challengeId)
        const response = await api.post('/Hackathon/gethackathon', null, {
          params: {
            hackathonid: challengeId
          }
        });
        setProblemData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchProblemData();
  }, [challengeId]);

  const handleRun = async () => {
    try {
      const response = await api.post('/Hackathon/evaluateHackathon', {
        hackathonid: challengeId,
        answer: code,
        programmingLanguage: language
      });
      
      setOutput(`Score: ${response.data.score}\nMessage: ${response.data.messages}`);
      setShowOutput(true);
    } catch (err) {
      setOutput(`Error: ${err.message}`);
      setShowOutput(true);
    }
  };

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const evalResponse = await api.post('/Hackathon/evaluateHackathon', {
        hackathonid: challengeId,
        answer: code,
        programmingLanguage: language
      });

      await api.post('/Hackathon/submitHackathon', {
        hackathonId: parseInt(challengeId),
        userid: userData.id,
        score: evalResponse.data.score,
        messages: evalResponse.data.messages
      });

      setOutput(`Submitted successfully!\nScore: ${evalResponse.data.score}\nMessage: ${evalResponse.data.messages}`);
      setShowOutput(true);
    } catch (err) {
      setOutput(`Error: ${err.message}`);
      setShowOutput(true);
    }
  };

  if (isLoading) {
    return <div className="coding-page">Loading...</div>;
  }

  if (error) {
    return <div className="coding-page">Error: {error}</div>;
  }

  if (!problemData) {
    return <div className="coding-page">No problem data found</div>;
  }

  let testCases = [];
  try {
    testCases = JSON.parse(problemData.testCases);
  } catch (e) {
    console.error('Error parsing test cases:', e);
  }

  return (
    <div className="coding-page">
      <div className="left-panel">
        <div className="problem-title">{problemData.problem}</div>
        <p>{problemData.description}</p>
        
        {testCases.length > 0 && (
          <div className="sample-io">
            <strong>Sample Input:</strong> {JSON.stringify(testCases[0].input)} <br />
            <strong>Sample Output:</strong> {JSON.stringify(testCases[0].output)}
          </div>
        )}

        <button className="hint-section" onClick={() => setShowHint(!showHint)}>
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        {showHint && (
          <div>
            Hint: {problemData.hints.split('\n').map((hint, i) => (
              <p key={i}>{hint}</p>
            ))}
          </div>
        )}
      </div>
      <div className="right-panel">
        <div className="language-select">
          <label>Select Language:</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
        </div>
        <CodeMirror
          value={code}
          height="550px"
          width="800px"
          theme={dracula}
          extensions={[languageExtensions[language]]}
          onChange={(val) => setCode(val)}
        />
        <div className="editor-controls">
          <button onClick={handleRun}>Run</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        {showOutput && (
          <div className="output-box">
            {output.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}
      </div>
      
      {/* Chatbot toggle button */}
      {!showChatbot && (
        <button 
          className="chatbot-toggle-btn"
          onClick={() => setShowChatbot(true)}
        >
          Need Help?
        </button>
      )}
      
      {/* Chatbot component */}
      <ChatBot 
        isOpen={showChatbot} 
        onClose={() => setShowChatbot(false)}
        hackathonId={challengeId}
        code={code}
        language={language}
      />
    </div>
  );
};

export default CodingPage;