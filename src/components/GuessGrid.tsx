

import React from 'react';

export default function GuessGrid({isGuessed, word, guess}){
    return (
    

        <div>
        <div className="grid grid-cols-4x4em grid-rows-10x4em mb-1 mt-6 gap-2">
            {new Array(4).fill(0).map((_, i) => (
                <div key={i} className='flex items-center justify-center w-16 h-16 border border-gray-400 bg-black text-white font-bold uppercase'>{guess[i]}</div>
            ))}

        </div>
        </div>
    );
}