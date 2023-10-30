import backgroundImage from '../../../assets/home/ring.svg'
import  PhoneImage from '../../../assets/home/iphone.svg'
import HomeText from '../home-text/home-text.component';
import HomeButton from '../../home-button/home-button.component';
import './home-doctors.styles.scss';
import arrowLeft from '../../../assets/home/appleLinkArrow.png'
import videoURL from '../../../assets/home/vertical-video.mp4';
import React, { useRef, useEffect, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
const HomeDoctors = () => {
    const videoRef = useRef(null);
    const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
    // const videoUrl = "https://www.youtube.com/embed/AZprJCr5FE0";
    useEffect(() => {
      const videoElement = videoRef.current;
      if (videoElement) {  // Check if videoElement exists
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
      }
    }, []);
  
    return (
        <div className = 'home-doctors-container'>
          {!isMobile&&<Fragment>
            <div  className='home-doctors-background'>
                <div className = 'home-doctor-apple-section'>
                    <img className='phone-image' src={PhoneImage} alt="Phone" />
                    {/* <div className='home-doctor-video'>
                      <video ref={videoRef} src = {videoURL}  controls autoPlay muted/>
                    </div> */}
                    <div  className='phone-image-background'>     
                    </div>
                </div>
                <div className='home-doctor-apple-link-section'>
                    <div className='home-doctor-apple-link-subArea1'></div>
                    <div className='home-doctor-apple-link-left-area'>
                      <div className='home-doctor-apple-link-textArea'>
                        <span className='apple-link-text1'>Try Charm</span>
                        <span className='apple-link-text2'>Scan to download</span>
                      </div>
                      <div className='home-doctor-left-area-arrow'> 
                        <img src = {arrowLeft}></img>
                      </div>
                    </div>
                    <div className='home-doctor-apple-link-subArea2'>
                    </div>
                </div>

            </div>
            <div className='home-doctor-apple-link-signUp-area'>
                  <Link className='signUp-link'>Sign up as a Doctor</Link>
                  <Link className='signUp-link'>Sign up as a member</Link>
            </div>
            {/* <div className='home-doctors-text'>
                    <HomeText 
                        title="Community" 
                        content={`Our app is a welcoming community of beauty lovers like you.
                    Join us today and connect with like-minded individuals who share your passion for personal care.`}
                    />
                    <div className='home-doctors-button'>
                        <HomeButton height="56px" title="Download App" href = "/download"/>
                    </div>
            </div> */}
          </Fragment>
        }
          {isMobile&&<Fragment>
              <div className='home-mobile-app-background'>
                <div className='home-mobile-app-phone'>
                  <div className='home-mobile-app-phone-screen'></div>
                </div>
              </div>
              <div className='home-mobile-app-button-container'>
                <HomeButton title="Try Charm App" href = "/download"/>
              </div>
              <div className='home-mobile-app-text'>
                    Join us today and connect with like-minded individuals who share your passion for personal care. 
              </div>
          </Fragment>}
        </div>
    )
}

export default HomeDoctors;