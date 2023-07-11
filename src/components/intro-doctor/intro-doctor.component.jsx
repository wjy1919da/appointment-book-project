import React from 'react';
import "./intro-doctor.styles.scss";
import icon1 from '../../assets/doctor/iconoir_verified-user.png';
import icon2 from '../../assets/doctor/iconoir_chat-bubble-empty.png';
import icon3 from '../../assets/doctor/iconoir_coins.png';
import { useBreakpointValue } from '@chakra-ui/react';
const IntroDoctor = ({isMobile}) => {
    const titles = [
        'Verified Doctors',
        'Transparent Rating',
        'Exclusive Offers'
    ];
    const texts = [
        'All of our doctors hold legal licenses and undergo thorough verification processes to ensure their qualifications and expertise.',
        'Real customers rate and comment on our doctors based on their cosmetic treatment experiences, offering reliable insights.',
        'Doctors provide exclusive discounts and coupons on our app, making high-quality healthcare more affordable.'
    ];
    
    return (
        <div>
            {isMobile?(
                <div className="intro-doctor-container-mobile">
                    <div className='intro-card-mobile'>
                        <h6 className='intro-card-title-mobile'>{ titles[0] }</h6>
                        <div className="intro-card-img-text-mobile">
                            <img src={icon1} alt="icon1" />
                            <p className='intro-card-text-mobile'>{ texts[0] }</p>
                        </div>
                    </div>
                    <div className='intro-card-mobile'>
                        <h6 className='intro-card-title-mobile'>{ titles[1] }</h6>
                        <div className="intro-card-img-text-mobile">
                            <img src={icon2} alt="icon1" />
                            <p className='intro-card-text-mobile'>{ texts[1] }</p>
                        </div>
                    </div>
                    <div className='intro-card-mobile'>
                        <h6 className='intro-card-title-mobile'>{ titles[2] }</h6>
                        <div className="intro-card-img-text-mobile">
                            <img src={icon3} alt="icon1" />
                            <p className='intro-card-text-mobile'>{ texts[1] }</p>
                        </div>
                    </div>
                </div>
            ):(
            <div className='intro-doctor-container'>
                <div className='intro-card'>
                    <img src={icon1} alt="icon1" />
                    <h6 className='intro-card-title'>{ titles[0] }</h6>
                    <p className='intro-card-text'>{ texts[0] }</p>
                </div>
                <div className='intro-card'>
                    <img src={icon2} alt="icon2" />
                    <h6 className='intro-card-title'>{ titles[1] }</h6>
                    <p className='intro-card-text'>{ texts[1] }</p>
                </div>
                <div className='intro-card'>
                    <img src={icon3} alt="icon3" />
                    <h6 className='intro-card-title'>{ titles[2] }</h6>
                    <p className='intro-card-text'>{ texts[2] }</p>
                </div>
            </div>
            )};
        </div>
    )
}

export default IntroDoctor;