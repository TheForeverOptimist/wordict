import React from 'react'
import LetterBox from './LetterBox';
import SymbolSpot from './SymbolSpot';


const GuessRow = ({guessNumber = 1, letters = ['', '', '', ''], onLetterInput, symbols = ['', '', '', '']}) => {
    return (
      <div className="flex items-center justify-start space-x-2 border w-[18em] h-14 p-2 m-2 bg-white rounded-md">
        <div className="md:text-xl lg:text-2xl text-black font-bold">
          {guessNumber}
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="w-6 h-10 bg-gray-300 items-center justify-center rounded-md"
          >
            {letters[index] || ""}
          </div>
        ))}
        {symbols.map((symbol, index) => (
          <SymbolSpot key={index} symbol={symbol} />
        ))}
      </div>
    );
};

export default GuessRow