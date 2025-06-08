import React, { useState } from 'react';
import BackToAdminDashboard from './BackToAdminDashboard';
import './AdminReview.css';

const mockSubmissions = [
  {
    id: 1,
    username: 'user1',
    challengeTitle: 'Sorting Algorithm',
    submissionDate: '2025-06-08',
    codeSnippet: `function bubbleSort(arr) { /* ... */ }`,
    currentScore: null,
    currentFeedback: '',
  },
  {
    id: 2,
    username: 'user2',
    challengeTitle: 'API Integration',
    submissionDate: '2025-06-07',
    codeSnippet: `fetch('/api/data').then(response => response.json())`,
    currentScore: 8,
    currentFeedback: 'Good implementation, but needs error handling',
  },
  // Add more mock submissions here
];

const AdminReview = () => {
  const [submissions, setSubmissions] = useState(mockSubmissions);

  // Handle feedback change
  const handleFeedbackChange = (id, feedback) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, currentFeedback: feedback } : sub
      )
    );
  };

  // Handle score change
  const handleScoreChange = (id, score) => {
    const parsedScore = Number(score);
    if (parsedScore >= 0 && parsedScore <= 10) {
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub.id === id ? { ...sub, currentScore: parsedScore } : sub
        )
      );
    }
  };

  // Handle submit review (for now just alert)
  const handleSubmitReview = (id) => {
    const submission = submissions.find((sub) => sub.id === id);
    alert(
      `Feedback for ${submission.username} on "${submission.challengeTitle}" saved.\n` +
      `Score: ${submission.currentScore}\n` +
      `Feedback: ${submission.currentFeedback}`
    );
    // Here you could call API to save review permanently
  };

  return (
    <div className="admin-review-container">
      <BackToAdminDashboard />
      <h2>Admin Review - Submitted Challenges</h2>

      {submissions.length === 0 && <p>No submissions to review.</p>}

      {submissions.map((sub) => (
        <div key={sub.id} className="submission-card">
          <h3>{sub.challengeTitle}</h3>
          <p>
            <strong>Submitted by:</strong> {sub.username} &nbsp; | &nbsp;{' '}
            <strong>Date:</strong> {sub.submissionDate}
          </p>

          <pre className="code-block">{sub.codeSnippet}</pre>

          <label>
            Score (0 to 10):{' '}
            <input
              type="number"
              min="0"
              max="10"
              value={sub.currentScore ?? ''}
              onChange={(e) => handleScoreChange(sub.id, e.target.value)}
            />
          </label>

          <label>
            Feedback:{' '}
            <textarea
              rows="3"
              value={sub.currentFeedback}
              onChange={(e) => handleFeedbackChange(sub.id, e.target.value)}
              placeholder="Write feedback here..."
            />
          </label>

          <button
            className="submit-review-btn"
            onClick={() => handleSubmitReview(sub.id)}
          >
            Submit Review
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminReview;
