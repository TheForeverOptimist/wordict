import React from 'react';

interface HintBoxProps{
    hint: string;
}

const HintBox: React.FC<HintBoxProps>=({hint})=> {
    return (
        <div className='w-12 h-12 border-2 border-gray-300 flex items-center justify-center text-xl'>
            {hint}
        </div>
    )
}


export default HintBox