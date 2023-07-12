import backgroundImage from '../../assets/home/ring.svg'
import  PhoneImage from '../../assets/home/iphone.svg'
import PhoneScreen from '../../assets/home/iphoneScreen.svg'
import HomeText from '../home-text/home-text.component';
import HomeButton from '../home-button/home-button.component';
import './home-doctors.styles.scss'
import videoURL from '../../assets/home/App-Demo-V10.mp4';
import React, { useRef, useEffect } from 'react';
// phone image
const HomeDoctors = () => {
    const videoRef = useRef(null);
    // const videoUrl = "https://www.youtube.com/embed/AZprJCr5FE0";
    useEffect(() => {
        const videoElement = videoRef.current;
    
        const options = {
          root: null,
          rootMargin: '0px',
          threshold: 0.5, // Adjust this threshold value as per your needs
        };
    
        const callback = (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              videoElement.play();
            } else {
              videoElement.pause();
            }
          });
        };
    
        const observer = new IntersectionObserver(callback, options);
        observer.observe(videoElement);
    
        return () => {
          observer.unobserve(videoElement);
        };
      }, []);
    return (
        <div className = 'home-doctors-container'>
            <div  className='home-doctors-background' style={{ backgroundImage: `url(${backgroundImage})` }}>
                {/* <div className = 'home-doctor-apple-section'>
                     <img className='phone-image' src={PhoneImage} alt="Phone" />
                    <div className = 'home-doctor-apple-screen'>
                        <img className='phone-screen' src={PhoneScreen} alt="Phone Screen" />
                    </div> 
                    
                </div> */}
                <div className='home-doctor-video'>
                    <video ref={videoRef} src = {videoURL} style={{width:'1280px',height:'800px'}} controls autoPlay muted/>
                </div>
                <div className='home-doctors-text'>
                    <HomeText 
                        title="Community" 
                        content={`Our app is a welcoming community of beauty lovers like you.
                    Join us today and connect with like-minded individuals who share your passion for personal care.`}
                    />
                    <div className='home-doctors-button'>
                        <HomeButton title="Download App" href = "/download"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeDoctors;