import React from 'react';
import { Button } from 'react-bootstrap'; 


const NextButton = (props) => {
    return (
        <Button
            variant="primary"
            style={{ 
                background: 'linear-gradient(90deg, #F48C8A 0%, #F0A484 100%)',
                border: 'none'
            }}
            type={props.type} // added this line to utilize the type prop
            disabled={props.disabled}
        >
            {props.title}
        </Button>
    );
};

export default NextButton;
