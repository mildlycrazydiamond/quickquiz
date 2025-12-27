import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Home } from 'lucide-react';
import { QUIZ_DATA } from './quizData';

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
      return "bg-slate-700 hover:bg-slate-600 border-slate-600 hover:border-blue-500 cursor-pointer text-gray-100";
    }
    
    if (optionIndex === currentQuestionData.correctAnswer) {
      return "bg-green-900 border-green-500 cursor-default text-green-200";
    }
    
    if (optionIndex === selectedAnswer && optionIndex !== currentQuestionData.correctAnswer) {
      return "bg-red-900 border-red-500 cursor-default text-red-200";
    }
    
    return "bg-slate-700 border-slate-600 cursor-default opacity-80 text-gray-300";
  };

  // Start screen
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center text-gray-100">
          <div className="mb-6">
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🧠</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">SRK Fan Quiz</h1>
            <p className="text-gray-300">How big a fan are you?</p>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-6 mb-8 space-y-3 text-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Total Rounds</span>
              <span className="font-semibold text-blue-300">{QUIZ_DATA.totalRounds}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Questions per Round</span>
              <span className="font-semibold text-blue-300">{QUIZ_DATA.questionsPerRound}</span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-600 pt-3">
              <span className="text-gray-300 font-medium">Total Questions</span>
              <span className="font-bold text-blue-300">{totalQuestions}</span>
            </div>
          </div>
          
          <button
            onClick={() => setGameStarted(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
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
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center text-gray-100">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl">🏆</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-100 mb-2">Quiz Complete!</h2>
            <p className="text-gray-300">Congratulations on completing all rounds</p>
          </div>
          
          <div className="bg-slate-700 rounded-xl p-8 mb-8">
            <div className="text-6xl font-bold text-blue-300 mb-2">{percentage}%</div>
            <div className="text-xl text-gray-200 mb-4">{totalScore} / {totalQuestions}</div>
            <div className="text-sm text-gray-300">
              {percentage >= 80 ? "Outstanding! 🌟" : percentage >= 60 ? "Great job! 👏" : percentage >= 40 ? "Good effort! 💪" : "Keep practicing! 📚"}
            </div>
          </div>
          
          <button
            onClick={handleStartOver}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
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
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full">
          <div className="text-center mb-8 text-gray-100">
            <div className="inline-block bg-slate-700 rounded-full px-4 py-2 mb-4">
              <span className="text-sm font-medium text-blue-300">Round {currentRound} of {QUIZ_DATA.totalRounds}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100 mb-2">Round Complete!</h2>
            <p className="text-gray-300">{currentRoundData.name}</p>
          </div>
          
          <div className="bg-slate-700 rounded-xl p-6 mb-8 text-center text-gray-100">
            <div className="text-5xl font-bold text-blue-300 mb-2">{roundScore} / {currentRoundData.questions.length}</div>
            <div className="text-gray-300">Questions Correct</div>
            <div className="mt-4 text-2xl font-semibold text-gray-200">{percentage}%</div>
          </div>
          
          <div className="bg-slate-700/60 rounded-lg p-4 mb-6 text-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">Overall Progress</span>
              <span className="font-semibold text-gray-200">{totalScore} / {totalQuestions}</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {currentRound < QUIZ_DATA.totalRounds ? (
              <button
                onClick={handleNextRound}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Next Round
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleNextRound}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                View Final Results
                <ArrowRight size={20} />
              </button>
            )}
            
            <button
              onClick={handleRestartRound}
              className="w-full bg-slate-700 hover:bg-slate-600 text-gray-100 font-semibold py-4 rounded-xl border-2 border-slate-600 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              Restart Round
            </button>
            
            <button
              onClick={handleStartOver}
              className="w-full bg-transparent hover:bg-slate-700 text-gray-300 font-medium py-3 rounded-xl border border-slate-600 transition-colors flex items-center justify-center gap-2"
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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 max-w-2xl w-full text-gray-100">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-block bg-slate-700 rounded-full px-4 py-2">
              <span className="text-sm font-medium text-blue-300">Round {currentRound} of {QUIZ_DATA.totalRounds}</span>
            </div>
            <div className="text-sm text-gray-300">
              Score: <span className="font-semibold text-blue-300">{totalScore}</span>
            </div>
          </div>
          
          <h3 className="text-lg text-indigo-600 font-medium mb-2">{currentRoundData.name}</h3>
          
          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 bg-slate-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
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
          <h2 className="text-xl md:text-2xl font-semibold text-gray-100 mb-6">
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
                  <span className="font-medium text-gray-100">{option}</span>
                  {isAnswered && (
                    <span>
                      {index === currentQuestionData.correctAnswer ? (
                        <CheckCircle className="text-green-300" size={24} />
                      ) : index === selectedAnswer ? (
                        <XCircle className="text-red-300" size={24} />
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            {currentQuestion < currentRoundData.questions.length - 1 ? 'Next Question' : 'Finish Round'}
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}