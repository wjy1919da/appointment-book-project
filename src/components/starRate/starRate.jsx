import React from 'react';
import "./starRate.styles.scss";


const StarRate = ({rateScore}) => {

    return (
        <div className="starRate-container">
            <span className={`stars-container stars-${rateScore}`}>★★★★★</span>
        </div>
    )
}

export default StarRate;
