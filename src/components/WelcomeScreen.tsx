import React, { useEffect, useState } from 'react';
import Star from '../../public/assets/star.svg'

interface WelcomeScreenProps{
    onDone: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({onDone}) => {
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
            <Star className="w-24 h-24 logo-animate" />
        </div>
    )






}

export default WelcomeScreen;