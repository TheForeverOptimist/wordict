import React from "react";
import LetterBox from "./LetterBox";
import HintBox from "./HintBox";
import { Guess } from "../hooks/useWordictGame";

interface GuessGridProps {
  guesses: Guess[];
  currentGuess: string;
}

const GuessGrid: React.FC<GuessGridProps> = ({ guesses, currentGuess }) => {
  return (
    <div className="mb-4">
      {guesses.map((guess, index) => (
        <div key={index} className="flex mb-2">
          <div className="flex mr-2">
            {guess.word.split("").map((letter, letterIndex) => (
              <LetterBox key={letterIndex} letter={letter.toUpperCase()} />
            ))}
          </div>
          <div className="flex">
            {guess.feedback.split("").map((hint, hintIndex) => (
              <HintBox key={hintIndex} hint={hint} />
            ))}
          </div>
        </div>
      ))}
      <div className="flex mb-2">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <LetterBox
              key={index}
              letter={
                currentGuess[index] ? currentGuess[index].toUpperCase() : ""
              }
            />
          ))}
      </div>
    </div>
  );
};

export default GuessGrid;
