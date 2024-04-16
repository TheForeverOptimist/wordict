"use client"
import GuessGrid from '../../components/GuessGrid'
import InputDisplay from '@/components/InputDisplay'
import Keyboard from '@/components/Keyboard'
import React, { useState } from 'react'





export default function Dashboard(){
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([]);
    const correctWord = 'STOP'; // example


    const handleInputChange = (event) => {
        setCurrentGuess(event.target.value.toUpperCase());
    }

    const handleSubmitGuess =




    return (
        <div className='flex flex-col items-center justify-center p-4'>
            <input type="text" value={currentGuess} onChange={handleInputChange} className='mb-4 p-2 border border-gray-300' maxLength={4} />
            <button onClick={handleSubmitGuess} className='mb-4 p-2 bg-blue-500 text-white'>
                Play
            </button>
            {guesses.map((data, index) => {
                <GuessGrid key={index} guess={data.guess} symbols={data.symbols} />
            })}
            <Keyboard />

        </div>
    )
}