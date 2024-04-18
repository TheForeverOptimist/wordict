import React from "react";

//@ts-ignore
const GuessGrid = ({ guess, symbols }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {guess.split('').map((letter, index) => (
        <div key={index} className="w-8 h-8 md:w-12 flex items-center justify-center border-2 text-xl font-bold uppercase">{letter}</div>
      ))}
      <div className="text-lg border border-black-300">{symbols}</div>
    </div>
  );
};

export default GuessGrid;
