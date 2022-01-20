import React from 'react'

function Header({title, description}) {
    return (
        <div className='py-5 text-center'>
                <h2>{title}</h2>    
                <p className="lead">{description}</p>
        </div>
    )
}

export default Header