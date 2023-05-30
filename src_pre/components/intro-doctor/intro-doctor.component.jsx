import React from 'react';
import "./intro-doctor.styles.scss";
import aboutDoctor from '../../assets/doctor/About-Our-Doctors.png'
const IntroDoctor = () => {
    return (
        <div className='intro-doctor-container'>

            <img src={aboutDoctor} style={{width:"1440px"}}></img>
        </div>
    )
}

export default IntroDoctor;