import React, { useEffect, useRef, useState } from "react";

interface GuessGridProps {
  guess: string;
  symbols: string;
}

// Define a type alias for timeout IDs that works in both Node.js and browser environments
type TimeoutId = ReturnType<typeof setTimeout>;

const GuessGrid: React.FC<GuessGridProps> = ({ guess, symbols }) => {
  const [flipped, setFlipped] = useState<boolean[]>(
    Array(guess.length).fill(false)
  );
  const [flashing, setFlashing] = useState<boolean[]>(
    Array(guess.length).fill(false)
  );
  const [boxesVisible, setBoxesVisible] = useState<boolean[]>(
    Array(symbols.length).fill(false)
  );
  const [symbolsVisible, setSymbolsVisible] = useState<boolean[]>(
    Array(symbols.length).fill(false)
  );
  const timeoutIds = useRef<TimeoutId[]>([]);

  useEffect(() => {
    let lastFlashingTimeoutId: TimeoutId;

    guess.split("").forEach((_, index) => {
      const flashTimes = 8;
      let flashCount = 0;

      const intervalId = setInterval(() => {
        setFlashing((f) => {
          const newFlashes = [...f];
          newFlashes[index] = !newFlashes[index];
          return newFlashes;
        });

        flashCount++;
        if (flashCount === flashTimes * 2) {
          clearInterval(intervalId);
          setFlipped((f) => {
            const newFlips = [...f];
            newFlips[index] = true;
            return newFlips;
          });
          setFlashing((f) => {
            const newFlashes = [...f];
            newFlashes[index] = false;
            return newFlashes;
          });

          if (index === guess.length - 1) {
            lastFlashingTimeoutId = setTimeout(() => {
              symbols.split("").forEach((_, idx) => {
                const boxTimeoutId = setTimeout(() => {
                  setBoxesVisible((b) => {
                    const newBoxes = [...b];
                    newBoxes[idx] = true;
                    return newBoxes;
                  });
                  const symbolTimeoutId = setTimeout(() => {
                    setSymbolsVisible((s) => {
                      const newSymbols = [...s];
                      newSymbols[idx] = true;
                      return newSymbols;
                    });
                  }, 500);
                  timeoutIds.current.push(symbolTimeoutId);
                }, idx * 500);
                timeoutIds.current.push(boxTimeoutId);
              });
            }, 500);
          }
        }
      }, 100);

      timeoutIds.current.push(intervalId);
    });

    return () => {
      timeoutIds.current.forEach(clearTimeout);
      if (lastFlashingTimeoutId) clearTimeout(lastFlashingTimeoutId);
      timeoutIds.current = [];
    };
  }, [guess, symbols]);

  return (
    <div className="grid grid-cols-[repeat(8,minmax(48px,1fr))] gap-2 mb-4 ml-8">
      {guess.split("").map((letter, index) => (
        <div key={index} className="flex items-center justify-center">
          <div
            className={`w-12 h-12 flex items-center justify-center border-2 text-xl font-bold uppercase ${
              flashing[index] ? "bg-yellow-500" : "bg-transparent"
            }`}
          >
            {flipped[index] ? letter : ""}
          </div>
        </div>
      ))}
      {boxesVisible.map((visible, index) => (
        <div
          key={`symbol-${index}`}
          className="flex items-center justify-center"
        >
          <div className="w-12 h-12 flex items-center justify-center border-2 text-xl font-bold uppercase bg-gray-100">
            {symbolsVisible[index] && visible ? symbols[index] : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GuessGrid;
