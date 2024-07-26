"use client";
import React, { useEffect } from "react";
import { useWordictGame } from "../hooks/useWordictGame";
import { useToast } from "../hooks/useToast";
import GuessGrid from "../components/GuessGrid";
import Keyboard from "../components/Keyboard";

const Dashboard: React.FC = () => {
  const { addToast } = useToast();
  const {
    currentGuess,
    setCurrentGuess,
    guesses,
    gameStatus,
    incorrectLetters,
    error,
    submitGuess,
    resetGame,
    targetWord,
  } = useWordictGame();

  useEffect(() => {
    if (error) {
      addToast(error, "error");
    }
  }, [error, addToast]);

  useEffect(() => {
    if (gameStatus === "won") {
      addToast("Congratulations! You guessed the word!", "success");
    } else if (gameStatus === "lost") {
      addToast(`Game over. The word was ${targetWord}`, "info");
    }
  }, [gameStatus, targetWord, addToast]);

  const handleKeyPress = (key: string) => {
    if (gameStatus !== "playing") return;

    if (key === "Enter") {
      if (currentGuess.length === 4) {
        submitGuess(currentGuess);
      } else {
        addToast("Your guess must be 4 letters long.", "error");
      }
    } else if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (currentGuess.length < 4) {
      setCurrentGuess((prev) => prev + key.toLowerCase());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Wordict</h1>

      <GuessGrid guesses={guesses} currentGuess={currentGuess} />

      {gameStatus === "playing" && (
        <Keyboard
          onKeyPress={handleKeyPress}
          incorrectLetters={incorrectLetters}
        />
      )}

      {(gameStatus === "won" || gameStatus === "lost") && (
        <button
          onClick={resetGame}
          className="mt-4 p-2 bg-green-500 text-white rounded"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default Dashboard;
