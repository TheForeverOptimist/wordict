import React from "react";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  incorrectLetters: Set<string>;
  correctLetters: Set<string>;
  partiallyCorrectLetters: Set<string>;
}

const Keyboard: React.FC<KeyboardProps> = ({
  onKeyPress,
  incorrectLetters,
  correctLetters,
  partiallyCorrectLetters,
}) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

  const getKeyClass = (key: string) => {
    const lowerKey = key.toLowerCase();
    if (correctLetters.has(lowerKey)) return "bg-green-500 text-white";
    if (partiallyCorrectLetters.has(lowerKey))
      return "bg-yellow-500 text-white";
    if (incorrectLetters.has(lowerKey)) return "bg-gray-400 text-white";
    return "bg-gray-200 hover:bg-gray-300";
  };

  return (
    <div className="mt-4">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`mx-1 p-2 rounded ${getKeyClass(key)} ${
                key === "Enter" || key === "Backspace" ? "px-4" : "w-10"
              }`}
            >
              {key === "Backspace" ? "←" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
