import React, { useEffect, useState } from 'react';

const WelcomeScreen = () => {
    const [visible, setVisbible] = useState<boolean>(true)

    useEffect(() => {
        //set timer to hide welcome screen after 2 seconds

        const timer = setTimeout(() => {
            setVisbible(false);
        }, 2000)

        return () => clearTimeout(timer);
    }, [])

    if(!visible) return null;

    return(
        <div className='fixed top-0 left-0 w-100% h-100% bg-transparent flex justify-center items-center'>

        </div>
    )






}

export default WelcomeScreen;