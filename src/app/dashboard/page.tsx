"use client"

import InputDisplay from '@/components/InputDisplay'
import Keyboard from '@/components/Keyboard'
import { LampDemo } from '@/components/ui/LampDemo'
import React from 'react'
import { useState } from "react"





export default function Dashboard(){



    return(
        <>
        {/* <LampDemo /> */}
        <InputDisplay />

        <Keyboard />
        
        </>
    )
}