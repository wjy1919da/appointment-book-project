import Footer from '../../components/footer/footer.component';
import './doctor.styles.scss';
import HomeTitle from '../../components/home-title/home-title.component';
import DoctorSearchBackground from '../../assets/doctor/doctor-search-background.png';
import DoctorSearchPhone from '../../assets/doctor/doctor-search-phone.png';
import FeatureDoctor from '../../components/FeatureDoctor/feature-doctor.component';
import IntroDoctor from '../../components/intro-doctor/intro-doctor.component';
import DoctorSearchMultiInput from '../../components/doctor-search-multiInput/doctor-search-multiInput.component';
import DoctorPostGrid from '../../components/doctor-post-grid/doctor-post-grid.component';

import { useLayoutEffect, useState } from 'react';


const Doctor = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  return (

        <div className='doctor-container animate__animated animate__fadeIn'>
            <div>
            {isMobile?(
            <div className='doctor-search-outer-continer-mobile'>
                <div className='doctor-search-hearder-container-mobile'>
                    <div className='doctor-search-header-title-and-bar'>
                        <HomeTitle title='Find Your Doctor' isMobile={isMobile} />
                        <DoctorSearchMultiInput isMobile={isMobile}/>
                    </div>
                    <div className='doctor-search-header-pic-container-mobile animate_animated animated_slideInUp'>
                        <img src = {DoctorSearchBackground} className="doctor-search-header-pic-mobile"></img>
                    </div>
                </div>
                <div className="doctor-intro-container-mobile">
                  <IntroDoctor isMobile={isMobile}/> 
                </div>
                <div className="doctor-feature-doctor-container-mobile">
                  <FeatureDoctor isMobile={isMobile}/>
                </div>
                <div className='doctor-post-part-mobile'>
                  <span className="doctor-post-title-mobile">Post by doctor</span>
                  <div className='doctor-post-grid-container-mobile'>
                         <DoctorPostGrid /> 
                  </div>
                </div>
                <Footer/>
            </div>
            
          ):(
              <div className='doctor-search-outer-container'>
                  <div className='doctor-search-header-container'>
                      <div className='doctor-search-header-title-container'>
                          <HomeTitle title='Find the Right Doctor
                                              At Your Fingertip' isMobile={isMobile}/>
                       
                      </div>
                      <div className='doctor-search-header-pic-container animate__animated animate__slideInUp'>
                            {<img src={DoctorSearchBackground} alt='doctor-search-background' className='doctor-search-header-pic'></img>}
                            {<img src={DoctorSearchPhone} alt='doctor-search-phone' className='doctor-search-header-phone-pic'></img>}
                      </div>
                  </div>
                <div className='doctor-search-search-bar-outer-container'>
                    <div className = 'doctor-search-outter-box'>
                      <DoctorSearchMultiInput />
                    </div>
                  </div>
                  <div className='doctor-intro-container'>
                    <IntroDoctor />
                  </div>
                <FeatureDoctor />
                <span className="doctor-title">Post by doctor</span>
                <div className='doctor-post-grid-container'>
                      <DoctorPostGrid />
                </div>
                <Footer isMobile={isMobile}/> 
              </div> 
              )}   
               
            </div>
            
      </div>
  
  );
};

export default Doctor;
