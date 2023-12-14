import DoctorImg from '../../../assets/home/doctor_mobile.svg';
import vector from '../../../assets/home/Vector.png';
import './home-doctor-page.styles.scss'
import HomeLink from '../home-link/home-link.component';
import StarRate from '../../starRate/starRate';
import HomeMobileSubText from '../home-text-mobile/home-mobile-subText.component';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import HomeButtonPink from '../../home-button-pink/home-button-pink';
import { Fragment } from 'react';

const HomeDoctorPage = () => {
    const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
    const isIpad = useMediaQuery({ query: `(min-width: 768px) and (max-width: 1023px)` });
    const isMobileOrIpad = isMobile || isIpad;
    return(
        <div className='Home-doctor-page'>
            {isMobile&&<Fragment>
                <div className='home-doctor-page-pic animate__animated animate__slideInUp'></div>
                {<img src={DoctorImg} alt='doctorImg' className='doctor-page-img'></img> }
                <div className = 'doctor-page-name-card'>
                    <h5 className='card-title'>Dr. Amir Karam</h5>
                    <p className='card-content'>American Board of Medical Specialties®; American Board of Dermatology®</p>
                    <span className='starRatePart'>
                        <StarRate rateScore='50'/>
                    </span>
               </div>
                </Fragment>}
            {!isMobile&&<div className='home-doctor-page-pic animate__animated animate__slideInUp'>
               {<img src={DoctorImg} alt='doctorImg' className='doctor-page-img'></img> }
                <div className = 'doctor-page-name-card'>
                    <h5 className='card-title'>Dr. Lisa Chipps</h5>
                    <p className='card-content'>American Board of Medical Specialties®; American Board of Dermatology®</p>
                    <span className='starRatePart'>
                        <StarRate rateScore='50'/>
                    </span>
               </div>
             </div>}
            <div className='home-doctor-page-container'>  
                {!isMobileOrIpad&&<Fragment>
                     <div className='home-doctor-page-text'>
                        <span className='home-doctor-page-text1'>Consult A Doctor</span>
                     </div>
                     <div className='home-doctor-page-subText'>
                        <span className = 'doctor-page-post-Text'>
                            Our platform collaborates with top professionals and institutions to provide 
                            you with expert advice and support. 
                            Consult with our trusted partners about surgery procedures, 
                            coupons, and more.
                        </span>
                        <div className='home-doctor-page-link'>
                            {/* <HomeLink title= "View More Doctors" href = "/doctor"/> */}
                            <HomeButtonPink title='Consult a doctor' href='/doctor'/>
                            {/* <img src={vector} alt="arrow" style={{width:"18px",height:"17px",marginTop:"3px",marginLeft:"10px", border: "None"}}></img> */}
                        </div>
                    </div>
                </Fragment>}
                {isMobileOrIpad&&<Fragment>
                    <HomeMobileSubText title='Consult' content=' Our platform collaborates with top professionals and institutions to provide 
                            you with expert advice and support.'></HomeMobileSubText>
                    <div style={{marginTop: '10px'}}>
                        <Link to='/doctor' className='home-mobile-share-link'>View More Doctors</Link>
                        
                    </div>
                </Fragment>}
            </div>
        </div>
    )
}
export default HomeDoctorPage;