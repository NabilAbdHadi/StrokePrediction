import React from 'react'

function NumberTextfield(props) {
    return (
        <div>
            <div className="mb-3 form-group" >
                <label for={props.id} className="form-label">{props.placeholder}</label>
                <input type="number" name={props.name} className="form-control" id={props.id} min={props.min} step={props.step} />
                
            </div>
        </div>
    )
}

export default NumberTextfield;

