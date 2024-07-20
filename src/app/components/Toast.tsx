import React, {useEffect} from 'react'

interface ToastProps{
    message: string;
    type?: 'info' | 'success' | 'error';
    onDismiss:() => void
}

const Toast: React.FC<ToastProps> = ({message, type='info', onDismiss}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 3000);

        return() => clearTimeout(timer)
    }, [onDismiss])

    const baseClasses = "fixed bottom-4 right-4 px-4 py-2 rounded-md shadow-md transition-opacity duration-300"
    const typeClasses = {
        info: "bg-blue-500 text-white",
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white"
    }

    return(
        <div className={`${baseClasses} ${typeClasses[type]}`}>
            {message}
        </div>
    )







}

export default Toast