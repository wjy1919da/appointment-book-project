import React from 'react'
import './custom-input.styles.scss';

const CustomInput = React.forwardRef((props, ref) => {
    const { className, ...otherProps } = props; 
    return (
        <input className={`underline-input ${className || ''}`} ref={ref} {...otherProps} />
    );
});


// ref makes it suitable for the react-form-hook
// ...otherProps means the input is able to accept the props which are not defined in the input component

export default CustomInput 