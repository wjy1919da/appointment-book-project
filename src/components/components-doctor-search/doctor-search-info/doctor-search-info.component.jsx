import React from 'react';
import "./doctor-search-info.styles.scss";
import icon1 from '../../../assets/doctor/iconoir_verified-user.png';
import icon2 from '../../../assets/doctor/iconoir_chat-bubble-empty.png';
import icon3 from '../../../assets/doctor/iconoir_coins.png';
import { useBreakpointValue } from '@chakra-ui/react';
import { useMediaQuery } from 'react-responsive';
const IntroDoctor = () => {
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
    //const isMobile = useMediaQuery({ query: `(max-width: 1133px)` }); 
    const isPhone = useMediaQuery({ query: `(max-width: 743.50px)` });
    const isIpad = useMediaQuery({query: `(min-width: 744px) and (max-width:1132.99px)` });
    const isUnder1133 = useMediaQuery({ query: `(max-width: 1132.99px)` });
    return (
        <div>
            {isUnder1133?(
                <div className="intro-doctor-container-mobile">
                    <div className='intro-card-mobile'>
                        {isPhone?(
                            
                            <>
                            <div className='intro-card-title-mobile'>
                                <img src={icon1} alt="icon1" />
                                <p className='intro-card-title-mobile-text' >{ titles[0] }</p>
                            </div>
                            <div className="intro-card-img-text-mobile">
                                <p className='intro-card-text-mobile'>{ texts[0] }</p>
                            </div>
                            </>
                            )
                        // {isIpad&&
                        :(
                            <>
                            <div style={{display:'flex',alignItems:'center',marginLeft:'-10%'}}>
                                <img src={icon1} alt="icon1" />
                                <div style={{marginLeft:'0px'}}>
                                    <h6 className='intro-card-title-mobile'>{ titles[0] }</h6>
                                </div>
                            </div>
                            <p className='intro-card-text-mobile' style={{display:'flex',alignItems:'center',marginLeft:'-4%'}}>{ texts[0] }</p>
                            </>
                        )}
                    </div>
                    <div className='intro-card-mobile'>
                        {isPhone?(
                            
                            <>
                            <div className='intro-card-title-mobile'>
                                <img src={icon2} alt="icon1" />
                                <p className='intro-card-title-mobile-text' >{ titles[1] }</p>
                            </div>
                            <div className="intro-card-img-text-mobile">
                                <p className='intro-card-text-mobile'>{ texts[1] }</p>
                            </div>
                            </>
                            ):
                        // {isIpad&&
                        (
                            <>
                            <div style={{display:'flex',alignItems:'center',marginLeft:'-5%'}}>
                                <img src={icon2} alt="icon1" />
                                <div style={{display:'flex',marginRight:'-11%'}}>
                                    <h6 className='intro-card-title-mobile'>{ titles[1] }</h6>
                                </div>
                            </div>
                            <p className='intro-card-text-mobile' style={{display:'flex',alignItems:'center',marginLeft:'-4%'}}>{ texts[1] }</p>
                            </>
                        )
                        // (
                        //     <>
                        //     <img src={icon2} alt="icon1" />
                        //     <h6 className='intro-card-title-mobile'>{ titles[1] }</h6>
                        //     <p className='intro-card-text-mobile'>{ texts[1] }</p>
                        //     </>
                        // )
                        }
                    </div>
                    <div className='intro-card-mobile'>
                        {isPhone?(
                            
                            <>
                            <div className='intro-card-title-mobile'>
                                <img src={icon3} alt="icon1" />
                                <p className='intro-card-title-mobile-text' >{ titles[2] }</p>
                            </div>
                            <div className="intro-card-img-text-mobile">
                                <p className='intro-card-text-mobile'>{ texts[2] }</p>
                            </div>
                            </>
                            ):
                        (
                            <>
                            <div style={{display:'flex',alignItems:'center',marginLeft:'-15%'}}>
                                <img src={icon3} alt="icon1" />
                                <div style={{display:'flex',marginLeft:'0%'}}>
                                    <h6 className='intro-card-title-mobile'>{ titles[2] }</h6>
                                </div>
                            </div>
                            <p className='intro-card-text-mobile' style={{display:'flex',alignItems:'center',marginLeft:'-4%'}}>{ texts[2] }</p>
                            </>
                        )
                        // (
                        // // {isIpad&&
                        //     <>
                        //     <img src={icon3} alt="icon1" />
                        //     <h6 className='intro-card-title-mobile'>{ titles[2] }</h6>
                        //     <p className='intro-card-text-mobile'>{ texts[2] }</p>
                        //     </>
                        // )
                        }
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
            )}
        </div>
    )
}

export default IntroDoctor;