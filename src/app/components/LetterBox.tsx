import React from 'react';

interface LetterBoxProps{
    letter: string;
}

const LetterBox: React.FC<LetterBoxProps>= ({ letter }) => {
  return (
    <div className="w-12 h-12 border-2 border-gray-300 flex items-center justify-center text-xl font-bold bg-white">
      {letter}
    </div>
  );
};

export default LetterBox;