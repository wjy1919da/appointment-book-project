import DoctorImg from '../../assets/home/doctor_mobile.svg';
import vector from '../../assets/home/Vector.png';
import './home-doctor-page.styles.scss'
import HomeLink from '../home-link/home-link.component';
import StarRate from '../starRate/starRate';
import HomeMobileSubText from '../../routes/home/home-mobile-subText.component';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

import { Fragment } from 'react';

const HomeDoctorPage = () => {
    const isMobile = useMediaQuery({ query: `(max-width: 576px)` });
    return(
        <div className='Home-doctor-page'>
            {isMobile&&<Fragment>
                <div className='home-doctor-page-pic animate__animated animate__slideInUp'></div>
                {<img src={DoctorImg} alt='doctorImg' className='doctor-page-img'></img> }
                <div className = 'doctor-page-name-card'>
                    <h5 className='card-title'>Dr. Amir Karam</h5>
                    <p className='card-content'>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p>
                    <span className='starRatePart'>
                        <StarRate rateScore='50'/>
                    </span>
               </div>
                </Fragment>}
            {!isMobile&&<div className='home-doctor-page-pic animate__animated animate__slideInUp'>
               {<img src={DoctorImg} alt='doctorImg' className='doctor-page-img'></img> }
                <div className = 'doctor-page-name-card'>
                    <h5 className='card-title'>Dr. Amir Karam</h5>
                    <p className='card-content'>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</p>
                    <span className='starRatePart'>
                        <StarRate rateScore='50'/>
                    </span>
               </div>
             </div>}
            <div className='home-doctor-page-container'>  
                {!isMobile&&<Fragment>
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
                            <HomeLink title= "View More Doctors" href = "/doctor"/>
                            <img src={vector} alt="arrow" style={{width:"18px",height:"17px",marginTop:"3px",marginLeft:"10px", border: "None"}}></img>
                        </div>
                    </div>
                </Fragment>}
                {isMobile&&<Fragment>
                    <HomeMobileSubText title='Consult' content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut'></HomeMobileSubText>
                    <div style={{marginTop: '10px'}}>
                        <Link to='/doctor' className='home-mobile-share-link'>View More Doctors</Link>
                    </div>
                </Fragment>}
            </div>
        </div>
    )
}
export default HomeDoctorPage;