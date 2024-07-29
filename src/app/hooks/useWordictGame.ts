import { useState, useEffect, useCallback, useMemo } from "react";
import { canPlay, recordPlayTime } from "../../lib/playTimeManager";
import wordData from "../../../words.json";

export interface Guess {
  word: string;
  feedback: string;
}

const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

export const useWordictGame = () => {
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [targetWord, setTargetWord] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">(
    "playing"
  );
  const [incorrectLetters, setIncorrectLetters] = useState(new Set<string>());
  const [correctLetters, setCorrectLetters] = useState<Set<string>>(new Set());
  const [partiallyCorrectLetters, setPartiallyCorrectLetters] = useState<
    Set<string>
  >(new Set());
  const [error, setError] = useState<string | null>(null);

  const allWords = useMemo(() => {
    return wordData.allWords.reduce((acc, letterGroup) => {
      return [...acc, ...letterGroup.words];
    }, [] as string[]);
  }, []);

  const getDailyWord = useCallback(() => {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const seed = hashCode(today);
    const index = Math.abs(seed) % allWords.length;
    return allWords[index].toUpperCase();
  }, [allWords]);

  useEffect(() => {
    if (canPlay()) {
      const word = getDailyWord();
      setTargetWord(word);
      setGameStatus("playing");
    } else {
      setError(
        "You can only play once every 24 hours. Please come back tomorrow"
      );
      setGameStatus("lost");
    }
  }, [getDailyWord]);

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

      const upperGuess = guess.toUpperCase();
      let feedback = "";
      const newCorrectLetters = new Set(correctLetters);
      const newPartiallyCorrectLetters = new Set(partiallyCorrectLetters);
      const newIncorrectLetters = new Set(incorrectLetters);

      for (let i = 0; i < 4; i++) {
        if (upperGuess[i] === targetWord[i]) {
          feedback += "*";
          newCorrectLetters.add(upperGuess[i]);
        } else if (targetWord.includes(upperGuess[i])) {
          feedback += "!";
          newPartiallyCorrectLetters.add(upperGuess[i]);
        } else {
          feedback += " ";
          newIncorrectLetters.add(upperGuess[i]);
        }
      }

      setCorrectLetters(newCorrectLetters);
      setPartiallyCorrectLetters(newPartiallyCorrectLetters);
      setIncorrectLetters(newIncorrectLetters);

      setGuesses((prev) => [...prev, { word: upperGuess, feedback }]);

      if (feedback === "****") {
        setGameStatus("won");
        recordPlayTime();
      } else if (guesses.length >= 9) {
        setGameStatus("lost");
        recordPlayTime();
      }

      setCurrentGuess("");
    },
    [
      targetWord,
      guesses.length,
      incorrectLetters,
      correctLetters,
      partiallyCorrectLetters,
    ]
  );

  const resetGame = useCallback(() => {
    if (canPlay()) {
      setGuesses([]);
      setCurrentGuess("");
      setIncorrectLetters(new Set());
      setCorrectLetters(new Set());
      setPartiallyCorrectLetters(new Set());
      const newWord = getDailyWord();
      setTargetWord(newWord);
      setGameStatus("playing");
    } else {
      setError(
        "You can only play once every 24 hours. Please come back later."
      );
      setGameStatus("lost");
    }
  }, [getDailyWord]);

  return {
    currentGuess,
    setCurrentGuess,
    guesses,
    gameStatus,
    incorrectLetters,
    correctLetters,
    partiallyCorrectLetters,
    error,
    submitGuess,
    resetGame,
    targetWord,
  };
};
