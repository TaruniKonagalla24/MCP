// CodingPage.js
import React, { useState } from 'react';
import './CodingPage.css';
import CodeMirror from '@uiw/react-codemirror';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
const languageExtensions = {
javascript: javascript(),
python: python(),
cpp: cpp(),
};
const CodingPage = () => {
const [code, setCode] = useState('// Start coding here');
const [language, setLanguage] = useState('javascript');
const [showHint, setShowHint] = useState(false);
const [output, setOutput] = useState('');
const[showOutput, setShowOutput] = useState(false);
const handleRun = () => {
   setOutput('Output: This is a mock output.');
   setShowOutput(true);
};
const handleSubmit = () => {
   setOutput('Submitted! Score: 80/100 (Mock response)');
   setShowOutput(true);
};
return (
<div className="coding-page">
<div className="left-panel">
<div className="problem-title">Reverse a String</div>
<p>Write a function that reverses a string.</p>
<div className="sample-io">
<strong>Sample Input:</strong> "hello" <br />
<strong>Sample Output:</strong> "olleh"
</div>
<button className="hint-section" onClick={() => setShowHint(!showHint)}>
         {showHint ? 'Hide Hint' : 'Show Hint'}
</button>
       {showHint && (
<div >
           Hint: Use <code>split()</code>, <code>reverse()</code>, <code>join()</code>.
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
       {showOutput && <div className="output-box">{output}</div>}
</div>
</div>
);
};
export default CodingPage;