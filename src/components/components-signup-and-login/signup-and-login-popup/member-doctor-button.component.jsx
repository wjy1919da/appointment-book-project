import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; 

const MemberAndDoctorButton = (props) => {
    const [isActive, setIsActive] = useState(false);

    const activeStyle = {
        borderRadius: '8px',
        border: 'none',
        background: '#675D59'
    };

    const defaultStyle = {
        borderRadius: '8px',
        border: '2px solid #675D59',
        color: '#675D59'
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
        >
            {props.title}
        </Button>
    );
};

export default MemberAndDoctorButton; // Don't forget to export the component
