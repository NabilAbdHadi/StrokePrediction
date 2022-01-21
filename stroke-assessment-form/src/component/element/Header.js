import React from 'react'

function Header({title, description}) {
    return (
        <div className='py-1 md:py-3 lg:py-5 text-center container border-bottom whitespace-pre-wrap'>
                <h2 className='font-extrabold text-normal sm:text-xl md:text-3xl lg:text-5xl text-blue-600 uppercase py-2'>{title}</h2>    
                <p className="font-normal sm:text-sm md:text-lg lg:text-2xl">{description}</p>
        </div>
    )
}

export default Header