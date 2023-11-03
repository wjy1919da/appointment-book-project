import { Link } from 'react-router-dom';
import React, { forwardRef } from 'react';
import Instagram from '../../assets/home/instagram.svg';
import TikTok from '../../assets/home/tiktok.svg';
import Facebook from '../../assets/home/facebook.svg';
import Linkedin from '../../assets/home/linkedin.svg';
import { useMediaQuery } from 'react-responsive';

import './footer.styles.scss';

const Footer = (props,)=> {
    //const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
    return (
        <div className='home-footer-container'>
        {isMobile?(
                <div className='footer-mobile-container'>
                    <div className='footer-mobile-text'>
                        
                            <Link>procedure</Link>|
                            <Link>Doctors</Link>|
                            <Link>Posts</Link>
                        
                    </div>
                    <div className='footer-mobile-subtext'>
                        <p>@ 2023 Charm Life. All right reserved. Charm Life, 
                            9100 Wilshire Blvd, Beverly Hills, CA 90212</p>
                    </div>
                    <div className='social-media-icons'>
                            <a className='social-media-link' href='https://www.instagram.com/charm_life_official/?igshid=YmMyMTA2M2Y%3D' target='_blank' rel='noreferrer'>
                                <img className='social-media-icon' src={Instagram} alt='instagram' />
                            </a>
                            <a className='social-media-link' href='https://www.tiktok.com/@charmlifecl?_t=8YEeyJyGDjm&_r=1https://www.tiktok.com/@charmlifecl?_t=8YEeyJyGDjm&_r=1' target='_blank' rel='noreferrer'>
                                <img className='social-media-icon' src={TikTok} alt='tiktok' />
                            </a>
                            <a className='social-media-link' href='https://www.facebook.com/profile.php?id=100063997782773&mibextid=LQQJ4d' target='_blank' rel='noreferrer'>
                                <img className='social-media-icon' src={Facebook} alt='facebook' />
                            </a>
                            <a className='social-media-link' href='https://www.linkedin.com/company/charm-life' target='_blank' rel='noreferrer'>
                                <img className='social-media-icon' src={Linkedin} alt='linkedin' />
                            </a>
                    </div>
                </div>
            
        ):(
        <div className='footer-container'>
            <div className='row'>
                <div className='col-md-4 col-sm-12'>
                    <div className='footer-nav-container'>
                        <p className='footer-nav-title'>
                            About Us
                        </p>
                        <Link className='footer-nav-link' to='/procedure/facial'>
                            Procedures
                        </Link>
                        <Link className='footer-nav-link' to='/doctor'>
                            Doctors
                        </Link>
                        <Link className='footer-nav-link' to='/instrument'>
                            Instruments
                        </Link>
                    </div>
                </div>
                <div className='col-md-4 col-sm-12'>
                    <div className='footer-nav-container'>
                        <Link className='footer-nav-title' to='/contact-us'>
                            Contact Us
                        </Link >
                        <p className='footer-nav-contact-title'>
                            Address:
                        </p>
                        <p className='footer-nav-contact-content'>
                            9100 Wilshire Blvd,  Beverly hills, CA 90212
                        </p>
                        <p className='footer-nav-contact-title'>
                            Email:
                        </p>
                        <p className='footer-nav-contact-content'>
                            marketing@charm-life.com
                        </p>
                    </div>
                </div>
                <div className='col-md-4 col-sm-12'>
                    <div className='footer-nav-container'>
                        <p className='footer-nav-title'>
                            Follow Us
                        </p>
                        <div className='social-media-icons'>
                            <a className='social-media-link' href='https://www.instagram.com/charm_life_official/?igshid=YmMyMTA2M2Y%3D' target='_blank' rel='noreferrer'>
                                <img className='social-media-icon' src={Instagram} alt='instagram' />
                            </a>
                            <a className='social-media-link' href='https://www.tiktok.com/@charmlifecl?_t=8YEeyJyGDjm&_r=1https://www.tiktok.com/@charmlifecl?_t=8YEeyJyGDjm&_r=1' target='_blank' rel='noreferrer'>
                                <img className='social-media-icon' src={TikTok} alt='tiktok' />
                            </a>
                            <a className='social-media-link' href='https://www.facebook.com/profile.php?id=100063997782773&mibextid=LQQJ4d' target='_blank' rel='noreferrer'>
                                <img className='social-media-icon' src={Facebook} alt='facebook' />
                            </a>
                            <a className='social-media-link' href='https://www.linkedin.com/company/charm-life' target='_blank' rel='noreferrer'>
                                <img className='social-media-icon' src={Linkedin} alt='linkedin' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )}
        </div>
    )
}
;

export default Footer;