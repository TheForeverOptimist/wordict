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
  const[usedLetters, setUsedLetters] = useState(new Set<string>());
  const[isFilterActive, setIsFilterActive] = useState(false)

  const handleKeyPress = (key: string) => {
    if(currentGuess.length < 4) {
      setCurrentGuess(prev => prev + key)
    }
  }

  const handleDelete = () => {
    setCurrentGuess(prev => prev.slice(0, -1))
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentGuess(event.target.value.toUpperCase());
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length !== 4) {
      alert("Please enter a 4 letter word");
      return;
    }

    const letters = currentGuess.split("");
    const uniqueLetters = new Set(letters);
    if (uniqueLetters.size !== letters.length) {
      alert("Please do not repeat letters in your guess");
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
      } else{
        setUsedLetters(prev => new Set(prev).add(currentGuess[idx]))
      }
    });

    setGuesses((prevGuesses) => {
      const newGuesses = [
        ...prevGuesses,
        { guess: currentGuess, symbols: correctSymbols },
      ];
      if (newGuesses.length >= 10 || correctSymbols === "✅✅✅✅") {
        if (correctSymbols === "✅✅✅✅") {
          alert("Congratulations! You've guessed the word correctly.");
        } else {
          alert("You've reached 10 guesses. You lost!");
        }
        return []; // Clear guesses to restart or end the game
      }
      return newGuesses;
    });

    setCurrentGuess(""); // Reset input for the next guess
    if (correctSymbols === "✅✅✅✅" || guesses.length >= 9) {
      setUsedLetters(new Set()); // Clear used letters as the game resets
    }
  };
    
    
  const toggleFilter = () => {
    setIsFilterActive(prev => !prev)
  }
    

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
      <button
        className="mb-4 p-2 bg-blue-500 text-white"
        onClick={(toggleFilter) => setIsFilterActive((prev) => !prev)}
      >
        {isFilterActive ? "Hints Off" : "Hints On"}
      </button>
      {guesses.map((data, index) => (
        <GuessGrid key={index} guess={data.guess} symbols={data.symbols} />
      ))}
      <Keyboard
        onKeyPress={handleKeyPress}
        onDelete={handleDelete}
        onEnter={handleSubmitGuess}
        usedLetters={usedLetters}
        isFilterActive={isFilterActive}
      />
    </div>
  );
};


export default Dashboard;