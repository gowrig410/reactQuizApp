import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const questions = [
    {
      question: "What is JSX?",
      options: [
        "A templating language",
        "A JavaScript syntax extension",
        "A type of CSS",
        "A framework"
      ],
      answer: "A JavaScript syntax extension"
    },
    {
      question: "Which method is used to update the state in React?",
      options: [
        "updateState()",
        "setState()",
        "changeState()",
        "modifyState()"
      ],
      answer: "setState()"
    },
    {
      question: "Which hook is used to handle side effects in React?",
      options: [
        "useState",
        "useEffect",
        "useReducer",
        "useCallback"
      ],
      answer: "useEffect"
    },
    {
      question: "What is the virtual DOM?",
      options: [
        "A virtual representation of the actual DOM",
        "A library in React",
        "A React hook",
        "A method to directly manipulate the DOM"
      ],
      answer: "A virtual representation of the actual DOM"
    },
    {
      question: "How do you pass data from a parent component to a child component?",
      options: [
        "Using state",
        "Using props",
        "Using refs",
        "Using context"
      ],
      answer: "Using props"
    }
  ];

  const totalQuestions = questions.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds for each question
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  const [isAnswered, setIsAnswered] = useState(false); // Track if the user has answered
  const [isQuizComplete, setIsQuizComplete] = useState(false); // Track if the quiz is completed

  // Timer logic
  useEffect(() => {
    if (timeLeft === 0 && !isAnswered) {
      handleNextQuestion();
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isAnswered]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsAnswered(true);

    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    // Automatically move to the next question after 2 seconds
    setTimeout(handleNextQuestion, 2000);
  };

  const handleNextQuestion = () => {
    setTimeLeft(10); // Reset timer for next question
    setSelectedOption(null); // Reset the selected option
    setIsAnswered(false); // Reset answered state

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setIsQuizComplete(true);
    }
  };

  // Progress bar calculation
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Function to render final message based on score
  const renderFinalMessage = () => {
    if (score === 0) {
      return <p>Oops, better luck next time! Your score is 0.</p>;
    } else if (score === totalQuestions) {
      return <p>Congratulations! You got a perfect score of {score}!</p>;
    } else {
      return <p>Well done! You scored {score} out of {totalQuestions}.</p>;
    }
  };

  return (
    <div>
      {isQuizComplete ? (
        <div>
          <h2>Quiz Completed!</h2>
          {renderFinalMessage()}
        </div>
      ) : (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>

          <ul>
            {questions[currentQuestion].options.map((option, index) => {
              let optionStyle = {};
              if (isAnswered) {
                if (option === questions[currentQuestion].answer) {
                  optionStyle = { backgroundColor: 'green', color: 'white' }; // Correct answer
                } else if (option === selectedOption) {
                  optionStyle = { backgroundColor: 'red', color: 'white' }; // Incorrect answer
                }
              }

              return (
                <li
                  key={index}
                  onClick={() => !isAnswered && handleOptionClick(option)}
                  style={optionStyle}
                  className="option"
                >
                  {option}
                </li>
              );
            })}
          </ul>

          <div className="timer">
            <p>Time Left: {timeLeft}s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
