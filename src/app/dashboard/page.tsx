"use client"
import InputDisplay from '@/components/InputDisplay'
import { LampDemo } from '@/components/ui/LampDemo'
import React from 'react'
import { useState } from "react"





export default function Dashboard(){
    const[inputValue, setInputvalue] = useState('')



    return(
        <>
        {/* <LampDemo /> */}
        <InputDisplay />
        
        </>
    )
}