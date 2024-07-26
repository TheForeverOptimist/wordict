import { useState, useEffect, useCallback } from "react";
import { canPlay, recordPlayTime } from "../../lib/playTimeManager";

export interface Guess {
  word: string;
  feedback: string;
}

export const useWordictGame = () => {
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [targetWord, setTargetWord] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [usedLetters, setUsedLetters] = useState(new Set<string>());
  const [error, setError] = useState<string | null>(null);

  const fetchNewWord = useCallback(async () => {
    try {
      const response = await fetch("/api/word");
      const { word } = response.json();
      setTargetWord(word.toUpperCase());
    } catch (err) {
      setError("Failed to fetch a new word. Please try again.");
    }
  }, []);

  useEffect(() => {
    if (canPlay()) {
      fetchNewWord();
    } else {
      setError(
        "You can only play once every 24 hours. Please come back tomorrow"
      );
    }
  }, [fetchNewWord]);

  const submitGuess = useCallback(
    (guess: string) => {
      if (guess.length !== 4) {
        setError("Your guess must be 4 letters long.");
        return;
      }

      if (new Set(guess).size !== 4) {
        setError("Your guess cannot contain repeat letters");
        return;
      }

      setError(null);

      let feedback = "";
      const newUsedLetters = new Set(usedLetters);

      for (let i = 0; i < 4; i++) {
        if (guess[i] === targetWord[i]) {
          feedback += "✅";
        } else if (targetWord.includes(guess[i])) {
          feedback += "✨";
        } else {
          newUsedLetters.add(guess[i]);
        }
      }

      setUsedLetters(newUsedLetters);
      setGuesses((prev) => [...prev, { word: guess, feedback }]);

      if (feedback === "✅✅✅✅") {
        setGameStatus("won");
        recordPlayTime();
      } else if (guesses.length === 9) {
        setGameStatus("lost");
        recordPlayTime();
      }

      setCurrentGuess("");
    },
    [targetWord, guesses.length, usedLetters]
  );

  const resetGame = useCallback(() => {
    if (canPlay()) {
      setGuesses([]);
      setCurrentGuess("");
      setGameStatus("playing");
      setUsedLetters(new Set());
      fetchNewWord();
    } else {
      setError(
        "You can only play once every 24 hours. Please come back later."
      );
    }
  }, [fetchNewWord]);

  return {
    currentGuess,
    setCurrentGuess,
    guesses,
    gameStatus,
    usedLetters,
    error,
    submitGuess,
    resetGame,
  };
};
