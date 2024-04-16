import React from "react";

//@ts-ignore
const GuessGrid = ({ guess, symbols }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="text-lg font-bold uppercase">{guess}</div>
      <div className="text-lg">{symbols}</div>
    </div>
  );
};

export default GuessGrid;
