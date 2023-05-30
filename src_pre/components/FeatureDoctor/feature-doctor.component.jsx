import React from 'react';
import "./feature-doctor.styles.scss";
import FeatureDoctorCard from '../feature-doctor-card/feature-doctor-card.component';
import image1 from '../../assets/doctor/featureDoctor1.png'
import image2 from '../../assets/doctor/featureDoctor2.png'
import image3 from '../../assets/doctor/featureDoctor3.png'
import image4 from '../../assets/doctor/featureDoctor4.png'

const FeatureDoctor = () => {

    return (
        <div className='featured-doctor-container'>
            <span className="featured-doctor-title">Featured Doctor in your Area</span>
            <div className="feature-doctor-list">
                <FeatureDoctorCard imageURL={image1} starRate={50}/>
                <FeatureDoctorCard imageURL={image2} starRate={50}/>
                <FeatureDoctorCard imageURL={image3} starRate={40}/> 
                <FeatureDoctorCard imageURL={image4} starRate={40}/>
            </div>
        </div>
    )
}

export default FeatureDoctor;
