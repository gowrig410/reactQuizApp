import React, { useState } from 'react';
import './App.css'; // Import the CSS file
import Quiz from './components/Quiz';

const App = () => {
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const handleQuizComplete = (finalScore) => {
    setScore(finalScore);
    setIsQuizCompleted(true);
  };

  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {isQuizCompleted ? (
        <div>
          <h2>Your Score: {score}</h2>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      ) : (
        <Quiz onComplete={handleQuizComplete} />
      )}
    </div>
  );
};

export default App;
