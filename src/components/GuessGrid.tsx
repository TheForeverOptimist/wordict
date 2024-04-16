import React, { ReactNode } from "react";

export default function GuessGrid({ isGuessed, word, guess }) {
  return (
    <div>
      <div className="grid grid-cols-4x4em grid-rows-10x4em mb-1 mt-6 gap-2">
        {new Array(4).fill(0).map((_, i) => {
          const bgColor = !isGuessed
            ? "bg-black"
            : guess[i] === word[i]
            ? "bg-green-500"
            : word.includes(guess[i])
            ? "bg-yellow-500"
            : "bg-black";
          return (
            <div
              key={i}
        className={`flex items-center justify-center w-16 h-16 border border-gray-400  text-white font-bold uppercase ${bgColor}`}
            >
              {guess[i]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
