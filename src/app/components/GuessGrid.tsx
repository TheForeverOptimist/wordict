import React, { useEffect, useRef, useState } from "react";

interface GuessGridProps{
  guess: string;
  symbols: string;
}


const GuessGrid: React.FC<GuessGridProps> = ({ guess, symbols }) => {
  const [flipped, setFlipped] = useState(Array(guess.length).fill(false));
  const [flashing, setFlashing] = useState(Array(guess.length).fill(false));
  const [boxesVisible, setBoxesVisible] = useState(
    Array(symbols.length).fill(false)
  );
  const [symbolsVisible, setSymbolsVisible] = useState(
    Array(symbols.length).fill(false)
  );
  const timeoutIds = useRef([]);

  useEffect(() => {
    let lastFlashingTimeoutId: any;

    guess.split("").forEach((_, index) => {
      const flashTimes = 8; // Number of times to flash
      let flashCount = 0;

      const intervalId = setInterval(() => {
        setFlashing((f) => {
          const newFlashes = [...f];
          newFlashes[index] = !newFlashes[index]; // Toggle flash state
          return newFlashes;
        });

        flashCount++;
        if (flashCount === flashTimes * 2) {
          // Since we toggle, count to double
          clearInterval(intervalId); // Stop flashing
          setFlipped((f) => {
            // Set to flipped to show final symbol
            const newFlips = [...f];
            newFlips[index] = true;
            return newFlips;
          });
          setFlashing((f) => {
            // Turn off flashing
            const newFlashes = [...f];
            newFlashes[index] = false;
            return newFlashes;
          });

          // Schedule empty boxes and symbols appearance only after the last letter finishes flashing
          if (index === guess.length - 1) {
            lastFlashingTimeoutId = setTimeout(() => {
              symbols.split("").forEach((_, idx) => {
                setTimeout(() => {
                  setBoxesVisible((b) => {
                    const newBoxes = [...b];
                    newBoxes[idx] = true;
                    return newBoxes;
                  });
                  // Start showing symbols after all boxes are visible
                  setTimeout(() => {
                    setSymbolsVisible((s) => {
                      const newSymbols = [...s];
                      newSymbols[idx] = true;
                      return newSymbols;
                    });
                  }, (idx + 1) * 500); // Delay for symbols appearing
                }, idx * 500); // Delay for boxes appearing
              });
            }, 500); // Delay after the last letter finishes flashing
          }
        }
      }, 100); // Adjust timing to control speed of flash

      timeoutIds.current.push(intervalId); // Store interval ID for cleanup
    });

    return () => {
      timeoutIds.current.forEach(clearInterval); // Clear all intervals
      clearTimeout(lastFlashingTimeoutId); // Ensure we also clear the last timeout
      timeoutIds.current = []; // Reset the timeout IDs array
    };
  }, [guess]); // Makes sure we do this every time the guess changes

return (
  <div className="grid grid-cols-[repeat(8,minmax(48px,1fr))] gap-2 mb-4 ml-2em">
    {guess.split("").map((letter, index) => (
      <div key={index} className="flex items-center justify-center">
        <div
          className={`w-12 h-12 flex items-center justify-center border-2 text-xl font-bold uppercase ${
            flashing[index] ? "bg-yellow-500" : "bg-transparent"
          }`}
        >
          {letter}
        </div>
      </div>
    ))}
    {boxesVisible.map((visible, index) => (
      <div key={index} className="flex items-center justify-center m-1">
        <div className="w-12 h-12 flex items-center justify-center border-2 text-xl font-bold uppercase bg-gray-100">
          {symbolsVisible[index] && visible ? (
            <div>{symbols[index]}</div>
          ) : null}
        </div>
      </div>
    ))}
  </div>
);
};
export default GuessGrid;