import Footer from '../../components/footer/footer.component';
import './doctor.styles.scss';
import HomeTitle from '../../components/home-title/home-title.component';
import DoctorSearchBackground from '../../assets/doctor/doctor-search-background.png';
import DoctorSearchPhone from '../../assets/doctor/doctor-search-phone.png';
import FeatureDoctor from '../../components/components-doctor-search/doctor-search-feature/doctor-search-feature.component';
import IntroDoctor from '../../components/components-doctor-search/doctor-search-info/doctor-search-info.component';
import DoctorSearchMultiInput from '../../components/components-doctor-search/doctor-search-multiInput/doctor-search-multiInput.component';
import DoctorPostGrid from '../../components/components-posts/community-post-grid/doctor-post-grid.component';
import { useLayoutEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import DoctorMobilWebpage from '../../components/components-doctor-search/doctor-mobile-webpage/doctor-mobile-web';
const Doctor = () => {
    useLayoutEffect(() => {
       window.scrollTo(0, 0);
    });
    const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });

    return (
        <div className='doctor-container animate__animated animate__fadeIn'>
            <div>
                {isMobile ? (
                    <DoctorMobilWebpage/>
                ) : (
                    <div className='doctor-search-outer-container'>
                        <div className='doctor-search-header-container'>
                            <div className='doctor-search-header-title-container'>
                                <HomeTitle title='Find the Right Doctor At Your Fingertip' isMobile={isMobile} />
                            </div>
                            <div className='doctor-search-header-pic-container animate__animated animate__slideInUp'>
                                <img src={DoctorSearchBackground} alt='Doctor Search Background' className='doctor-search-header-pic' />
                                <img src={DoctorSearchPhone} alt='Doctor Search Phone' className='doctor-search-header-phone-pic' />
                            </div>
                        </div>
                        <div className='doctor-search-search-bar-outer-container'>
                            <div className='doctor-search-outter-box'>
                                <DoctorSearchMultiInput />
                            </div>
                        </div>
                        <div className='doctor-intro-container'>
                            <IntroDoctor isMobile={isMobile}/>
                        </div>
                        <FeatureDoctor />
                        <span className="doctor-title">Post by doctor</span>
                        <div className='doctor-post-grid-container'>
                            <DoctorPostGrid />
                        </div>
                    </div>
                )}
            </div>
            <Footer isMobile={isMobile} />
        </div>
    )
};

export default Doctor;
