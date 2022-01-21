import React from 'react'

function NumberTextfield(props) {
    return (
        <div>
            <div className="form-group" >
                <label for={props.id} className="form-label font-semibold text-blue-700">{props.placeholder}</label>
                <input type="number" name={props.name} className="form-control" id={props.id} min={props.min} step={props.step} />
                
            </div>
        </div>
    )
}

export default NumberTextfield;

