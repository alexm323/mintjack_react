import React from 'react'

const styles = {
    button: {
        width: '8.5rem',
    }
}
const Button = (props) => {
    return(
        <div className={props.buttonDivClass}>
        <button style={styles.button}
                type="submit" 
                className={props.buttonClass} 
                >
                {props.svg}
                {props.buttonText}
        </button>
    </div> 
    )
}

export default Button