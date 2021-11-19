import React, { useEffect } from 'react'

const Dialog = ({ show, onTurnOff, children, ...rest }) => {
    useEffect(() => {
        if (show)
            document.body.style.overflowY = 'hidden'
        return () => {
            document.body.style.overflowY = 'auto'
        }
    }, [show])
    return (
        <>
            {show && < div className='fixed w-full h-screen top-0 left-0 z-20'>
                <div className='w-full h-screen bg-black opacity-50' onClick={() => onTurnOff()}></div>
                <div className='bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-md'>
                    {children}
                </div>
            </div>}
        </>
    )
}

export default Dialog
