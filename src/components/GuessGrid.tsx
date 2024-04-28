import React, { useEffect, useState } from "react";

//@ts-ignore
const GuessGrid = ({ guess, symbols }) => {
  const[flipped, setFlipped] = useState(Array(guess.length).fill(false))

  useEffect(() => {
    guess.split('').forEach((_, index) => {
      setTimeout(() => {
        setFlipped(f => {
          const newFlips = [...f]
          newFlips[index] = true; //flip this card
          return newFlips
        });
      }, index * 500)
    });
    //cleanup timeouts when component unmounts or the guess changes
    return ()=> {
      guess.split('').forEach((_, index) => {
        clearTimeout(index);
      })
    }
    }, [guess]) //makes sure we do this everytime the guess changes


    return (
        <div className="flex items-center justify-center space-x-2 mb-4">
      {guess.split('').map((letter, index) => (
        <div key={index} className="flex flex-col items-center justify-center m-1">
          <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center border-2 text-xl font-bold uppercase">
            <div>
              {letter}
            </div>
          </div>
        </div>
      ))}
      <div className="text-xl font-bold uppercase border-2 border-black-300 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center ">{symbols}</div>
    </div>
  );
};
export default GuessGrid;