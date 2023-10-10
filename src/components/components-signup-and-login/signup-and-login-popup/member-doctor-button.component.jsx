import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; 

const MemberAndDoctorButton = (props) => {
    const [isActive, setIsActive] = useState(false);

    const activeStyle = {
        borderRadius: '8px',
        border: 'none',
        background: '#675D59',
        width: '300px',
        padding: '18px 40px',

    };

    const defaultStyle = {
        borderRadius: '8px',
        border: '2px solid #675D59',
        background: 'white',
        color: '#675D59',
        width: '300px',
        padding: '18px 40px',
    };    

    const handleButtonClick = () => {
        setIsActive(!isActive);
        // If there's an additional onClick handler passed as a prop, call it
        if (props.onClick) {
            props.onClick();
        }
    }

    return (
        <Button
            variant="primary"
            style={isActive ? activeStyle : defaultStyle}
            onClick={handleButtonClick}
            disabled={props.disabled}
        >
            {props.title}
        </Button>
    );
};

export default MemberAndDoctorButton; 