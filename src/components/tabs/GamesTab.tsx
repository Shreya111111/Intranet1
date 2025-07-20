import React, { useState, useEffect } from 'react';
import { Gamepad2, Trophy, Target, Brain, Zap, Play, RotateCcw, Award, Users } from 'lucide-react';
import { gameScores, quizQuestions } from '../../data/mockData';
import { useTheme } from '../../context/ThemeContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useConfetti } from '../../hooks/useConfetti';

interface GamesTabProps {
  onNotify: (notification: any) => void;
}

export const GamesTab: React.FC<GamesTabProps> = ({ onNotify }) => {
  const [activeGame, setActiveGame] = useState<'trivia' | 'memory' | 'leaderboard'>('leaderboard');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [userScores, setUserScores] = useLocalStorage<any[]>('user-game-scores', []);
  const [memoryCards, setMemoryCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [memoryScore, setMemoryScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const { isDark } = useTheme();
  const { triggerConfetti } = useConfetti();

  // Initialize memory game
  useEffect(() => {
    const cards = [...Array(8)].map((_, i) => i).concat([...Array(8)].map((_, i) => i));
    setMemoryCards(cards.sort(() => Math.random() - 0.5));
  }, []);

  // Timer for trivia
  useEffect(() => {
    if (gameStarted && activeGame === 'trivia' && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(-1); // Time's up
    }
  }, [timeLeft, gameStarted, showResult, activeGame]);

  const startTrivia = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const isCorrect = answerIndex === quizQuestions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 100);
      onNotify({
        type: 'success',
        title: 'Correct! 🎉',
        message: '+100 points',
        duration: 2000
      });
    } else {
      onNotify({
        type: 'error',
        title: 'Incorrect',
        message: `Correct answer: ${quizQuestions[currentQuestion].options[quizQuestions[currentQuestion].correctAnswer]}`,
        duration: 3000
      });
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        // Game finished
        const finalScore = isCorrect ? score + 100 : score;
        const newScore = {
          id: Date.now().toString(),
          playerName: 'You',
          score: finalScore,
          game: 'Company Trivia',
          timestamp: new Date().toISOString(),
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        };
        setUserScores(prev => [newScore, ...prev].slice(0, 10));
        setGameStarted(false);
        
        if (finalScore > 400) {
          triggerConfetti(document.body);
        }
        
        onNotify({
          type: 'success',
          title: 'Game Complete! 🏆',
          message: `Final score: ${finalScore} points`,
          duration: 4000
        });
      }
    }, 2000);
  };

  const handleMemoryCardClick = (index: number) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
      return;
    }

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      if (memoryCards[newFlipped[0]] === memoryCards[newFlipped[1]]) {
        // Match found
        setMatchedCards([...matchedCards, ...newFlipped]);
        setMemoryScore(memoryScore + 50);
        setFlippedCards([]);
        
        if (matchedCards.length + 2 === memoryCards.length) {
          // Game complete
          triggerConfetti(document.body);
          onNotify({
            type: 'success',
            title: 'Memory Game Complete! 🧠',
            message: `Score: ${memoryScore + 50} points in ${moves + 1} moves`,
            duration: 4000
          });
        }
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const resetMemoryGame = () => {
    const cards = [...Array(8)].map((_, i) => i).concat([...Array(8)].map((_, i) => i));
    setMemoryCards(cards.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatchedCards([]);
    setMemoryScore(0);
    setMoves(0);
  };

  const allScores = [...gameScores, ...userScores].sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Game Center
          </h1>
          <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Take a break and challenge yourself with fun games
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <div className="flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Your best: {Math.max(...userScores.map(s => s.score), 0)} pts
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Selection */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 mb-8`}>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveGame('leaderboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
              activeGame === 'leaderboard' ? 'bg-blue-500 text-white' : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Leaderboard</span>
          </button>
          <button
            onClick={() => setActiveGame('trivia')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
              activeGame === 'trivia' ? 'bg-blue-500 text-white' : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Company Trivia</span>
          </button>
          <button
            onClick={() => setActiveGame('memory')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
              activeGame === 'memory' ? 'bg-blue-500 text-white' : isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>Memory Game</span>
          </button>
        </div>
      </div>

      {/* Leaderboard */}
      {activeGame === 'leaderboard' && (
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg text-white">
              <Trophy className="w-5 h-5" />
            </div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Top Players
            </h2>
          </div>
          
          <div className="space-y-4">
            {allScores.slice(0, 10).map((score, index) => (
              <div
                key={score.id}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30' :
                  index === 1 ? 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600' :
                  index === 2 ? 'bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30' :
                  isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8">
                  {index === 0 && <Trophy className="w-6 h-6 text-yellow-500" />}
                  {index === 1 && <Award className="w-6 h-6 text-gray-500" />}
                  {index === 2 && <Award className="w-6 h-6 text-orange-500" />}
                  {index > 2 && (
                    <span className={`font-bold ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <img
                  src={score.avatar}
                  alt={score.playerName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700"
                />
                <div className="flex-1">
                  <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {score.playerName}
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {score.game} • {new Date(score.timestamp).toLocaleDateString()}
                  </div>
                </div>
                <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {score.score.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Company Trivia */}
      {activeGame === 'trivia' && (
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg text-white">
                <Brain className="w-5 h-5" />
              </div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Company Trivia
              </h2>
            </div>
            {gameStarted && (
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    Score: {score}
                  </span>
                </div>
                <div className={`px-3 py-1 rounded-lg ${timeLeft <= 10 ? 'bg-red-500 text-white animate-pulse' : isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <span className={`text-sm font-medium ${timeLeft <= 10 ? 'text-white' : isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {timeLeft}s
                  </span>
                </div>
              </div>
            )}
          </div>

          {!gameStarted ? (
            <div className="text-center py-12">
              <Brain className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Test Your Company Knowledge
              </h3>
              <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Answer questions about our company history, values, and culture
              </p>
              <button
                onClick={startTrivia}
                className="flex items-center space-x-2 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 hover:scale-105 mx-auto"
              >
                <Play className="w-5 h-5" />
                <span>Start Game</span>
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span className={`text-sm px-2 py-1 rounded-full ${isDark ? 'bg-purple-900/30 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
                    {quizQuestions[currentQuestion].category}
                  </span>
                </div>
                <div className={`w-full h-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              <h3 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {quizQuestions[currentQuestion].question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showResult && handleAnswer(index)}
                    disabled={showResult}
                    className={`p-4 text-left rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                      showResult
                        ? index === quizQuestions[currentQuestion].correctAnswer
                          ? 'border-green-500 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : selectedAnswer === index
                          ? 'border-red-500 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          : isDark ? 'border-gray-600 bg-gray-700 text-gray-300' : 'border-gray-300 bg-gray-50 text-gray-600'
                        : isDark ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-white' : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-900'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showResult && (
                <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <strong>Explanation:</strong> {quizQuestions[currentQuestion].explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Memory Game */}
      {activeGame === 'memory' && (
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg text-white">
                <Target className="w-5 h-5" />
              </div>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Memory Challenge
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Score: {memoryScore}
                </span>
              </div>
              <div className={`px-3 py-1 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Moves: {moves}
                </span>
              </div>
              <button
                onClick={resetMemoryGame}
                className="flex items-center space-x-2 px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
            {memoryCards.map((card, index) => (
              <button
                key={index}
                onClick={() => handleMemoryCardClick(index)}
                className={`aspect-square rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                  flippedCards.includes(index) || matchedCards.includes(index)
                    ? 'border-green-500 bg-green-100 dark:bg-green-900/30'
                    : isDark ? 'border-gray-600 bg-gray-700 hover:bg-gray-600' : 'border-gray-300 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {flippedCards.includes(index) || matchedCards.includes(index) ? (
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-green-600">
                    {['🎯', '🚀', '💡', '⭐', '🎨', '🔥', '💎', '🏆'][card]}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Zap className={`w-8 h-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                )}
              </button>
            ))}
          </div>

          {matchedCards.length === memoryCards.length && (
            <div className="text-center mt-8">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h3 className={`text-lg font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Congratulations! 🎉
              </h3>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                You completed the memory game in {moves} moves with a score of {memoryScore}!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};