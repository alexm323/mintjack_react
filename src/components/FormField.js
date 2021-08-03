import React from 'react'

const FormField = (props) => {
    return (
        <div className="formField">
            <label htmlFor={props.for}>{props.label}</label>
            <input  className={props.inputClass} 
                    type={props.inputType} 
                    id={props.inputId} 
                    name={props.inputName}
                    value={props.value}
                    onChange={props.onChange}
                    required
                    >
            </input>
        </div>
    )
}

export default FormField