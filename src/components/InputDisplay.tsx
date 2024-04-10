import React, { useEffect } from 'react';
import {useState} from 'react'
import MaxWidthWrapper from './MaxWidthWrapper';
import { Button } from './ui/button';

export default function InputDisplay(){
    const[inputValue, setInputValue] = useState('');

    useEffect(() => {
        const handleKeyPress = (e) => {
            if(e.key === 'Backspace') {
                setInputValue((prev) => prev.slice(0, -1))
            } else if (e.key.length === 1 && /^[a-zzA-Z]$/.test(e.key) && inputValue.length < 4){
                setInputValue((prev) => (prev + e.key).slice(0,4).toUpperCase())
            }
        }
        window.addEventListener('keydown', handleKeyPress);

        //cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [inputValue]);

    return (
      <MaxWidthWrapper>
        <div className="flex justify-center gap-2.5">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="w-12 h-12 border-b-2 border-black text-center align-middle text-2xl leading-[50px]"
            >
              {inputValue[index] || ""}
            </div>
          ))}
          <Button
            className=" w-30 h-10 align-middle text-center text-2xl leading-[50px]"
            disabled={inputValue.length < 4}
          >
            Play!
          </Button>
        </div>
      </MaxWidthWrapper>
    );
}