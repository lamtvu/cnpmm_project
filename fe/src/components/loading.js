import React from 'react'

const Loading = ({ ...rest }) => {
    return (
        <div className='w-full overflow-hidden h-1'>
            <div className='h-1 bg-blue-300 animate-runleft'></div>
        </div>
    )
}

export default Loading
