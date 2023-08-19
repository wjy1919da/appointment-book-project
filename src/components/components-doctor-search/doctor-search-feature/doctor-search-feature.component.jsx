import React, { useState } from 'react';
import "./doctor-search-feature.styles.scss";
import FeatureDoctorCard from '../doctor-search-feature-card/doctor-search-feature-card.component';
import image1 from '../../../assets/doctor/featureDoctor1.png'
import image2 from '../../../assets/doctor/featureDoctor2.png'
import image3 from '../../../assets/doctor/featureDoctor3.png'
import image4 from '../../../assets/doctor/featureDoctor4.png'
import arrowRightIcon from '../../../assets/home/next-arrow.png';
import arrowLeftIcon from '../../../assets/home/previous-arrow.png'
import { useMediaQuery } from 'react-responsive';

const DoctorSearchFeature = () => {
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const featureDoctorCards = [
      { imageURL: image1, starRate: 50 },
      { imageURL: image2, starRate: 50 },
      { imageURL: image3, starRate: 50 },
      { imageURL: image4, starRate: 50 }
    ];
    const handleNextCard = () => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % featureDoctorCards.length);
    };
    const handlePreviousCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex - 1) % featureDoctorCards.length);
    };
    const currentCard = featureDoctorCards[currentCardIndex];
    const isMobile = useMediaQuery({ query: `(max-width: 1024px)` }); 
    const isPhone = useMediaQuery({ query: `(max-width: 767px)` });
    const isIpad = useMediaQuery({query: `(min-width: 768px) and (max-width:1024px)` });
    return (
        <div>
        {isMobile?
        (
        <div className='featured-doctor-container-mobile'>
          <span className="featured-doctor-title-mobile">Feature Doctor</span>
          <div className="feature-doctor-list-mobile">
            <img src={arrowLeftIcon} alt="Next" className="next-arrow" onClick={handlePreviousCard}/>
            <FeatureDoctorCard imageURL={currentCard.imageURL} starRate={currentCard.starRate} /> 
            <img src={arrowRightIcon} alt="Next" className="next-arrow" onClick={handleNextCard}/>
          </div>
        </div>
        ):(
        <div>
          <div className='featured-doctor-container'>
            <span className="featured-doctor-title">Featured Doctor in your Area</span>
            <div className="feature-doctor-list">
                <FeatureDoctorCard imageURL={image1} starRate={50}/>
                <FeatureDoctorCard imageURL={image2} starRate={50}/>
                <FeatureDoctorCard imageURL={image3} starRate={50}/> 
                <FeatureDoctorCard imageURL={image4} starRate={50}/>
            </div>
          </div>
        </div>
      )}
      </div>
    );
    
}

export default DoctorSearchFeature;
