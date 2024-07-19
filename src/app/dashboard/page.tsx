"use client";
import React from 'react';
import { useWordictGame } from '../hooks/useWordictGame';
import GuessGrid from '../components/GuessGrid';
import Keyboard from '../components/Keyboard';



const Dashboard: React.FC = () => {
  const {
    currentGuess,
    setCurrentGuess,
    guesses,
    gameStatus,
    usedLetters,
    error,
    submitGuess,
    resetGame,
  } = useWordictGame();

  const handleKeyPress = (key: string) => {
    if (currentGuess.length < 4) {
      setCurrentGuess((prev) => prev + key);
    }
  };

  const handleDelete = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    submitGuess(currentGuess);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Wordict</h1>

      {gameStatus === "playing" && (
        <>
          <input
            type="text"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
            className="mb-4 p-2 border border-gray-300"
            maxLength={4}
          />
          <button
            onClick={handleSubmit}
            className="mb-4 p-2 bg-blue-500 text-white"
          >
            Submit Guess
          </button>
        </>
      )}

      {guesses.map((guess, index) => (
        <GuessGrid key={index} guess={guess.word} symbols={guess.feedback} />
      ))}

      {gameStatus === "won" && (
        <div className="text-green-500 text-xl font-bold mb-4">
          Congratulations! You've guessed the word correctly.
        </div>
      )}

      {gameStatus === "lost" && (
        <div className="text-red-500 text-xl font-bold mb-4">
          Sorry, you've run out of guesses. The word was:{" "}
          {/* Add logic to reveal the word */}
        </div>
      )}

      {(gameStatus === "won" || gameStatus === "lost") && (
        <button
          onClick={resetGame}
          className="mb-4 p-2 bg-green-500 text-white"
        >
          Play Again
        </button>
      )}

      <Keyboard
        onKeyPress={handleKeyPress}
        onDelete={handleDelete}
        onEnter={handleSubmit}
        usedLetters={usedLetters}
      />

      {error && <Toast message={error} />}
    </div>
  );
};

export default Dashboard;