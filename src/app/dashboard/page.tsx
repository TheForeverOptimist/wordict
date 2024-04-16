"use client";
import GuessGrid from "../../components/GuessGrid";
import InputDisplay from "@/components/InputDisplay";
import Keyboard from "@/components/Keyboard";
import React, { useState } from "react";

interface Guess {
  guess: string;
  symbols: string;
}

interface DashboardProps {
  initialGuesses?: Guess[];
}

const Dashboard: React.FC<DashboardProps> = ({ initialGuesses = [] }) => {
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<Guess[]>(initialGuesses);
  const correctWord = "STOP"; // example

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentGuess(event.target.value.toUpperCase());
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length !== 4) {
      alert("Please enter a 4 letter word");
      return;
    }

    let correctCount = 0;
    let misplacedCount = 0;
    let correctSymbols = "";

    correctWord.split("").forEach((char, idx) => {
      if (currentGuess[idx] === char) {
        correctCount++;
        correctSymbols += "✅";
      } else if (correctWord.includes(currentGuess[idx])) {
        misplacedCount++;
        correctSymbols += "✨";
      }
    });

    setGuesses((prevGuesses) => [
      ...prevGuesses,
      { guess: currentGuess, symbols: correctSymbols },
    ]);
    setCurrentGuess(""); //reset input for the next guess
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <input
        type="text"
        value={currentGuess}
        onChange={handleInputChange}
        className="mb-4 p-2 border border-gray-300"
        maxLength={4}
      />
      <button
        onClick={handleSubmitGuess}
        className="mb-4 p-2 bg-blue-500 text-white"
      >
        Play
      </button>
      {guesses.map((data, index) => (
        <GuessGrid key={index} guess={data.guess} symbols={data.symbols} />
      ))}
      <Keyboard />
    </div>
  );
};
