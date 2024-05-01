import React from 'react'

const GuessRow = ({letters = ['', '', '', ''], symbols = ['', '', '', '']}) => {
    return(
        <div className='flex items-center justify-start space-x-2 border w-[16em] h-10 p-2 m-2 bg-gray-200'>
            {letters.map((letter, index) => (
                <LetterBox key={index} letter={letter} />
            ))}
            {symbols.map((symbol, index) => (
                <SymbolSpot key={index} symbol={symbol} />
            ))}
        </div>
    );
};

export default GuessRow