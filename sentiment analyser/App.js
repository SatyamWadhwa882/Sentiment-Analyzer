import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const analyzeSentiment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/analyze', { text });
      setResult(response.data);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }
  };

  return (
    <div className="App">
      <h1>Sentiment Analyzer</h1>
      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to analyze"
      />
      <br />
      <button onClick={analyzeSentiment}>Analyze Sentiment</button>
      {result && (
        <div>
          <h2>Sentiment Analysis Result</h2>
          <p>Positive: {result.pos}</p>
          <p>Neutral: {result.neu}</p>
          <p>Negative: {result.neg}</p>
          <p>Compound: {result.compound}</p>
        </div>
      )}
    </div>
  );
}

export default App;
