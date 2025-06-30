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

const CodingPage = () => {
  const { challengeId  } = useParams(); // this gives you the challenge id from URL
  const [code, setCode] = useState('// Start coding here');
  const [language, setLanguage] = useState('javascript');
  const [showHint, setShowHint] = useState(false);
  const [output, setOutput] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [problemData, setProblemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
       console.log('data received:'+challengeId )
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
  }, [challengeId ]);

  const handleRun = async () => {
    try {
      const response = await api.post('/Hackathon/evaluateHackathon', {
        hackathonid: challengeId ,
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
        const userData = JSON.parse(localStorage.getItem('user'));      // First evaluate to get the score
      const evalResponse = await api.post('/Hackathon/evaluateHackathon', {
        hackathonid: challengeId ,
        answer: code,
        programmingLanguage: language
      });

      // Then submit the result
      await api.post('/Hackathon/submitHackathon', {
        hackathonId: parseInt(challengeId ),
        
        userid: userData.id, // You should replace this with actual user ID from your auth system
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

  // Parse test cases if they're stored as a string
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
    </div>
  );
};

export default CodingPage;