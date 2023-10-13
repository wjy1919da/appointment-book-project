import React from 'react';
import { Button } from 'react-bootstrap'; 


const NextButton = (props) => {
    return (
        <Button
            variant="primary"
            style={{ 
                background: 'linear-gradient(90deg, #F48C8A 0%, #F0A484 100%)',
                border: 'none',
                width: '300px',
                padding: '18px 40px',
            }}
            // type={props.type}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.title}
        </Button>
    );
};

export default NextButton;





