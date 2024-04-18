import React from "react";

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onEnter: () => void;
}

const Keyboard: React.FC<KeyboardProps> = ({
  onKeyPress,
  onDelete,
  onEnter,
}) => {
  const keysRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keysRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keysRow3 = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4">
      <div className="flex justify-center gap-1 mb-2">
        {keysRow1.map((key) => (
          <button
            key={key}
            onClick={() => onKeyPress(key)}
            className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 text-black font-bold uppercase rounded shadow"
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-1 mb-2">
        {keysRow2.map((key) => (
          <button
            key={key}
            onClick={() => onKeyPress(key)}
            className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 text-black font-bold uppercase rounded shadow"
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-1 mb-2">
        {keysRow3.map((key) => (
          <button
            key={key}
            onClick={() => onKeyPress(key)}
            className="w-8 h-8 md:w-10 md:h-10 bg-gray-200 text-black font-bold uppercase rounded shadow"
          >
            {key}
          </button>
        ))}
        <button
          onClick={onEnter}
          className="w-16 h-8 md:w-20 md:h-10 bg-blue-500 text-white font-bold uppercase rounded shadow"
        >
          Enter
        </button>
        <button
          onClick={onDelete}
          className="w-16 h-8 md:w-20 md:h-10 bg-red-500 text-white font-bold uppercase rounded shadow"
        >
          Del
        </button>
      </div>
    </div>
  );
};

export default Keyboard;
