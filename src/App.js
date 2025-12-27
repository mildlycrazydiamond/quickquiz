import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Home } from 'lucide-react';

// Dummy quiz data - easily replaceable
const QUIZ_DATA = {
  questionsPerRound: 5,
  totalRounds: 3,
  rounds: [
    {
      id: 1,
      name: "General Knowledge",
      questions: [
        {
          id: 1,
          question: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          correctAnswer: 2
        },
        {
          id: 2,
          question: "Which planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correctAnswer: 1
        },
        {
          id: 3,
          question: "What is the largest ocean on Earth?",
          options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
          correctAnswer: 3
        },
        {
          id: 4,
          question: "Who painted the Mona Lisa?",
          options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
          correctAnswer: 1
        },
        {
          id: 5,
          question: "What is the smallest country in the world?",
          options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
          correctAnswer: 1
        }
      ]
    },
    {
      id: 2,
      name: "Science & Technology",
      questions: [
        {
          id: 6,
          question: "What does CPU stand for?",
          options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Unity"],
          correctAnswer: 1
        },
        {
          id: 7,
          question: "What is the speed of light?",
          options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "200,000 km/s"],
          correctAnswer: 0
        },
        {
          id: 8,
          question: "What is H2O commonly known as?",
          options: ["Oxygen", "Hydrogen", "Water", "Carbon Dioxide"],
          correctAnswer: 2
        },
        {
          id: 9,
          question: "Who developed the theory of relativity?",
          options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Niels Bohr"],
          correctAnswer: 1
        },
        {
          id: 10,
          question: "What is the powerhouse of the cell?",
          options: ["Nucleus", "Ribosome", "Mitochondria", "Chloroplast"],
          correctAnswer: 2
        }
      ]
    },
    {
      id: 3,
      name: "History & Culture",
      questions: [
        {
          id: 11,
          question: "In which year did World War II end?",
          options: ["1943", "1944", "1945", "1946"],
          correctAnswer: 2
        },
        {
          id: 12,
          question: "Who was the first President of the United States?",
          options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
          correctAnswer: 1
        },
        {
          id: 13,
          question: "What ancient wonder was located in Alexandria?",
          options: ["Hanging Gardens", "Colossus", "Lighthouse", "Pyramid"],
          correctAnswer: 2
        },
        {
          id: 14,
          question: "Which civilization built Machu Picchu?",
          options: ["Aztec", "Maya", "Inca", "Olmec"],
          correctAnswer: 2
        },
        {
          id: 15,
          question: "In which year did the Berlin Wall fall?",
          options: ["1987", "1988", "1989", "1990"],
          correctAnswer: 2
        }
      ]
    }
  ]
};

export default function QuizApp() {
  const [currentRound, setCurrentRound] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [roundScore, setRoundScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [showRoundResult, setShowRoundResult] = useState(false);
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const currentRoundData = QUIZ_DATA.rounds[currentRound - 1];
  const currentQuestionData = currentRoundData?.questions[currentQuestion];
  const totalQuestions = QUIZ_DATA.questionsPerRound * QUIZ_DATA.totalRounds;

  const handleAnswerSelect = (optionIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);
    
    if (optionIndex === currentQuestionData.correctAnswer) {
      setRoundScore(prev => prev + 1);
      setTotalScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < currentRoundData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowRoundResult(true);
    }
  };

  const handleNextRound = () => {
    if (currentRound < QUIZ_DATA.totalRounds) {
      setCurrentRound(prev => prev + 1);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setRoundScore(0);
      setShowRoundResult(false);
    } else {
      setShowFinalResult(true);
      setShowRoundResult(false);
    }
  };

  const handleRestartRound = () => {
    const questionsInRound = currentRoundData.questions.length;
    setTotalScore(prev => prev - roundScore);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setRoundScore(0);
    setShowRoundResult(false);
  };

  const handleStartOver = () => {
    setCurrentRound(1);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setRoundScore(0);
    setTotalScore(0);
    setShowRoundResult(false);
    setShowFinalResult(false);
    setGameStarted(false);
  };

  const getOptionClass = (optionIndex) => {
    if (!isAnswered) {
      return "bg-white hover:bg-indigo-50 border-gray-200 hover:border-indigo-300 cursor-pointer";
    }
    
    if (optionIndex === currentQuestionData.correctAnswer) {
      return "bg-green-50 border-green-500 cursor-default";
    }
    
    if (optionIndex === selectedAnswer && optionIndex !== currentQuestionData.correctAnswer) {
      return "bg-red-50 border-red-500 cursor-default";
    }
    
    return "bg-gray-50 border-gray-200 cursor-default opacity-60";
  };

  // Start screen
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🧠</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Quiz Master</h1>
            <p className="text-gray-600">Test your knowledge across multiple rounds</p>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-6 mb-8 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Total Rounds</span>
              <span className="font-semibold text-indigo-600">{QUIZ_DATA.totalRounds}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Questions per Round</span>
              <span className="font-semibold text-indigo-600">{QUIZ_DATA.questionsPerRound}</span>
            </div>
            <div className="flex items-center justify-between border-t border-indigo-200 pt-3">
              <span className="text-gray-700 font-medium">Total Questions</span>
              <span className="font-bold text-indigo-600">{totalQuestions}</span>
            </div>
          </div>
          
          <button
            onClick={() => setGameStarted(true)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Final result screen
  if (showFinalResult) {
    const percentage = Math.round((totalScore / totalQuestions) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">🏆</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600">Congratulations on completing all rounds</p>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 mb-8">
            <div className="text-6xl font-bold text-indigo-600 mb-2">{percentage}%</div>
            <div className="text-xl text-gray-700 mb-4">{totalScore} / {totalQuestions}</div>
            <div className="text-sm text-gray-600">
              {percentage >= 80 ? "Outstanding! 🌟" : percentage >= 60 ? "Great job! 👏" : percentage >= 40 ? "Good effort! 💪" : "Keep practicing! 📚"}
            </div>
          </div>
          
          <button
            onClick={handleStartOver}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <Home size={20} />
            Start Over
          </button>
        </div>
      </div>
    );
  }

  // Round result screen
  if (showRoundResult) {
    const percentage = Math.round((roundScore / currentRoundData.questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-block bg-indigo-100 rounded-full px-4 py-2 mb-4">
              <span className="text-sm font-medium text-indigo-700">Round {currentRound} of {QUIZ_DATA.totalRounds}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Round Complete!</h2>
            <p className="text-gray-600">{currentRoundData.name}</p>
          </div>
          
          <div className="bg-indigo-50 rounded-xl p-6 mb-8 text-center">
            <div className="text-5xl font-bold text-indigo-600 mb-2">{roundScore} / {currentRoundData.questions.length}</div>
            <div className="text-gray-600">Questions Correct</div>
            <div className="mt-4 text-2xl font-semibold text-gray-700">{percentage}%</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Overall Progress</span>
              <span className="font-semibold text-gray-700">{totalScore} / {totalQuestions}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {currentRound < QUIZ_DATA.totalRounds ? (
              <button
                onClick={handleNextRound}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Next Round
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleNextRound}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                View Final Results
                <ArrowRight size={20} />
              </button>
            )}
            
            <button
              onClick={handleRestartRound}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 rounded-xl border-2 border-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              Restart Round
            </button>
            
            <button
              onClick={handleStartOver}
              className="w-full bg-white hover:bg-gray-50 text-gray-500 font-medium py-3 rounded-xl border border-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <Home size={18} />
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz question screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl w-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-block bg-indigo-100 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-indigo-700">Round {currentRound} of {QUIZ_DATA.totalRounds}</span>
            </div>
            <div className="text-sm text-gray-600">
              Score: <span className="font-semibold text-indigo-600">{totalScore}</span>
            </div>
          </div>
          
          <h3 className="text-lg text-indigo-600 font-medium mb-2">{currentRoundData.name}</h3>
          
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / currentRoundData.questions.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {currentQuestion + 1}/{currentRoundData.questions.length}
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
            {currentQuestionData.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${getOptionClass(index)}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">{option}</span>
                  {isAnswered && (
                    <span>
                      {index === currentQuestionData.correctAnswer ? (
                        <CheckCircle className="text-green-600" size={24} />
                      ) : index === selectedAnswer ? (
                        <XCircle className="text-red-600" size={24} />
                      ) : null}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Next button */}
        {isAnswered && (
          <button
            onClick={handleNextQuestion}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            {currentQuestion < currentRoundData.questions.length - 1 ? 'Next Question' : 'Finish Round'}
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}