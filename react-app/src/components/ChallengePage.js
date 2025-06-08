import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ChallengePage.css';

const ChallengePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const localStorageKey = `submissions_challenge_${id}`;

  const challengeMap = {
    1: "Build a complete To-Do App using React, context API and routing.",
    2: "Use any AI model to analyze fake news detection from dataset.",
    3: "Design backend for blog platform with CRUD and auth features."
  };

  const [submission, setSubmission] = useState('');
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(localStorageKey);
    if (saved) {
      setSubmissions(JSON.parse(saved));
    }
  }, [id]);

  const handleSubmit = () => {
    if (!submission.trim()) {
      alert('Please enter your solution before submitting.');
      return;
    }

    const newEntry = {
      code: submission,
      submittedAt: new Date().toLocaleString(),
      score: null,
      feedback: null
    };

    const updatedSubmissions = [newEntry, ...submissions];
    setSubmissions(updatedSubmissions);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedSubmissions));
    setSubmission('');
    alert('Submission saved successfully!');
  };

  return (
    <div className="challenge-container">
      <button className="back-button" onClick={() => navigate('/hackathons')}>
        ← Back to Hackathons
      </button>

      <h2>Challenge #{id}</h2>
      <p className="description">{challengeMap[id] || 'Challenge not found.'}</p>

      <textarea
        rows="10"
        placeholder="Write your solution/code here..."
        value={submission}
        onChange={(e) => setSubmission(e.target.value)}
      ></textarea>
      <br />
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>

      {submissions.length > 0 && (
        <div className="submission-preview">
          <h3>📜 Past Submissions</h3>
          {submissions.map((s, index) => (
            <div key={index} className="single-submission">
              <p><strong>Submitted at:</strong> {s.submittedAt}</p>
              <pre>{s.code}</pre>

              <p>
                <strong>Score:</strong>{' '}
                {s.score !== null ? `${s.score}/100` : <em>Pending Review</em>}
              </p>
              <p>
                <strong>Feedback:</strong>{' '}
                {s.feedback ? s.feedback : <em>Not yet provided</em>}
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChallengePage;
