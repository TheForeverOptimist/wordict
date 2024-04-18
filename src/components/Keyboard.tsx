import React from "react";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  usedLetters: Set<string>;
  isFilterActive: boolean;
}

const Keyboard: React.FC<KeyboardProps> = ({
  onKeyPress,
  onDelete,
  onEnter,
  usedLetters,
  isFilterActive,
}) => {
  const keysRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keysRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keysRow3 = ["Z", "X", "C", "V", "B", "N", "M"];

  // Function to determine button classes
  const getButtonClass = (key: string) => {
    const baseClass = "border-2 w-10 h-10 text-xl md:w-12 md:h-12 md:text-3xl";
    if (isFilterActive && usedLetters.has(key)) {
      return `${baseClass} bg-gray-400 text-white cursor-not-allowed`;
    }
    return `${baseClass} bg-slate-400 text-black`;
  };

  return (
    <div className="fixed inset-x-0 bottom-0 bg-gray-100 p-4">
      {[keysRow1, keysRow2, keysRow3].map((row, idx) => (
        <div key={idx} className="flex justify-center gap-1 mb-2">
          {row.map((key) => (
            <button
              key={key}
              disabled={isFilterActive && usedLetters.has(key)}
              onClick={() => onKeyPress(key)}
              className={getButtonClass(key)}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
      <div className="flex justify-center gap-1">
        <button
          onClick={onDelete}
          className="border-2 w-24 h-12 text-3xl bg-red-500 text-white"
        >
          Del
        </button>
        <button
          onClick={onEnter}
          className="border-2 w-24 h-12 text-3xl bg-blue-500 text-white"
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
