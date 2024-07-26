import React from "react";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  incorrectLetters: Set<string>;
}

const Keyboard: React.FC<KeyboardProps> = ({
  onKeyPress,
  incorrectLetters,
}) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
  ];

  return (
    <div className="mt-4">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center mb-2">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`mx-1 p-2 rounded ${
                incorrectLetters.has(key.toLowerCase())
                  ? "bg-gray-400 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              } ${key === "Enter" || key === "Backspace" ? "px-4" : "w-10"}`}
              disabled={key !== "Enter" && key !== "Backspace"}
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
