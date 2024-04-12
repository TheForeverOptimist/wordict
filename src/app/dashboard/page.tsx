"use client"
import GuessGrid from '@/components/GuessGrid'
import InputDisplay from '@/components/InputDisplay'
import Keyboard from '@/components/Keyboard'
import React from 'react'





export default function Dashboard(){



    return(
        <div className='flex flex-col items-center justify-center'>
            {/* <LampDemo /> */}
            <InputDisplay />
            {new Array(10).fill(0).map((_, i) => {
                return <GuessGrid key={i} word={"tests"} guess={"guess"} isGuessed={false} />
            })}
            <Keyboard />

        </div>
        
        
    )
}