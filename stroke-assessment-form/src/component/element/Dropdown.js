import React from 'react'

function Dropdown({name, id, placeholder, option }) {
    
    return (
        <div>
            <div className="mb-3 form-group" >
                <label for={id} className="form-label dark-background">{placeholder}</label>
                <select className="form-control" name={name} id={id} >
                    <option value="" disabled selected></option>
                    {Object.entries(option).map(([key,value])=>(
                        <option value={value}>{key}</option>
                    ))}
                </select>
                
            </div>
        </div>
    )
}

export default Dropdown;
