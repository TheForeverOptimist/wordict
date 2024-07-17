import React from 'react'

const LetterBox = ({letter}) => {
    return(
        <div className='w-6 h-10 bg-gray-300 items-center justify-center rounded-md'>
            {letter}
        </div>
    )
}

export default LetterBox