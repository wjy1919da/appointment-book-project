import { useState, useEffect } from 'react';
import AccountNotFoundPage from './not-found';
import "./account-setting.styles.scss";
import UserProfilePage from '../../components/user-profile-page/user-profile-page';

const AccountSetup = () => {
    const [showNotFound, setShowNotFound] = useState(false);
    const [showProfilePage, setShowProfilePage] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleClick = () => {
        setShowNotFound(true);
    };
    const goToUserProfile = () => {
        setShowProfilePage(true);
    }
    return (
        <div className="account-setting-container">
            {showProfilePage ? (<UserProfilePage/>) : (
            showNotFound ? (
                <AccountNotFoundPage/>
            ) : (
            
                <div>
                    <button class="account-setting-button" onClick={goToUserProfile}>Account Setting</button>
                    <div className="account-setting-left-pink"></div>
                    <div className="account-setting-right-pink">
                        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
                            <circle opacity="0.8" cx="60" cy="60" r="60" fill="url(#paint0_linear_2443_10240)"/>
                            <defs>
                                <linearGradient id="paint0_linear_2443_10240" x1="8.9407e-07" y1="60" x2="120" y2="60" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#F48C8A"/>
                                <stop offset="1" stop-color="#F0A484"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none" transform="translate(24,-94)">
                            <g clip-path="url(#clip0_2443_10233)">
                                <g filter="url(#filter0_d_2443_10233)">
                                <path d="M36 4C18.36 4 4 18.36 4 36C4 53.64 18.36 68 36 68C53.64 68 68 53.64 68 36C68 18.36 53.64 4 36 4ZM36 64C20.56 64 8 51.44 8 36C8 20.56 20.56 8 36 8C51.44 8 64 20.56 64 36C64 51.44 51.44 64 36 64Z" fill="#FBFCFF"/>
                                <path d="M36 4C18.36 4 4 18.36 4 36C4 53.64 18.36 68 36 68C53.64 68 68 53.64 68 36C68 18.36 53.64 4 36 4ZM36 64C20.56 64 8 51.44 8 36C8 20.56 20.56 8 36 8C51.44 8 64 20.56 64 36C64 51.44 51.44 64 36 64Z" stroke="#FBFCFF" stroke-width="0.5" stroke-miterlimit="10"/>
                                </g>
                                <g filter="url(#filter1_d_2443_10233)">
                                <path d="M39.1603 16.41C35.5203 15.43 31.6303 16.21 28.6503 18.51C25.7003 20.78 23.9803 24.29 23.9903 28C23.9903 29.1 24.8903 30 25.9903 30C27.0903 30 27.9903 29.1 27.9903 28C27.9903 25.5 29.1203 23.2 31.0903 21.67C33.1003 20.14 35.7103 19.63 38.1503 20.28C40.8303 20.98 43.0103 23.16 43.7103 25.84C44.7203 29.74 42.9303 33.61 39.3503 35.27C36.0903 36.77 33.9903 40.25 33.9903 44.11V46C33.9903 47.1 34.8903 48 35.9903 48C37.0903 48 37.9903 47.1 37.9903 46V44.11C37.9903 41.79 39.1803 39.75 41.0303 38.89C46.3903 36.41 49.0903 30.63 47.5903 24.83C46.4903 20.71 43.2703 17.5 39.1603 16.4V16.41Z" fill="#FBFCFF"/>
                                <path d="M39.1603 16.41C35.5203 15.43 31.6303 16.21 28.6503 18.51C25.7003 20.78 23.9803 24.29 23.9903 28C23.9903 29.1 24.8903 30 25.9903 30C27.0903 30 27.9903 29.1 27.9903 28C27.9903 25.5 29.1203 23.2 31.0903 21.67C33.1003 20.14 35.7103 19.63 38.1503 20.28C40.8303 20.98 43.0103 23.16 43.7103 25.84C44.7203 29.74 42.9303 33.61 39.3503 35.27C36.0903 36.77 33.9903 40.25 33.9903 44.11V46C33.9903 47.1 34.8903 48 35.9903 48C37.0903 48 37.9903 47.1 37.9903 46V44.11C37.9903 41.79 39.1803 39.75 41.0303 38.89C46.3903 36.41 49.0903 30.63 47.5903 24.83C46.4903 20.71 43.2703 17.5 39.1603 16.4V16.41Z" stroke="#FBFCFF" stroke-width="0.5" stroke-miterlimit="10"/>
                                </g>
                                <g filter="url(#filter2_d_2443_10233)">
                                <path d="M33 54C33 55.66 34.34 57 36 57C37.66 57 39 55.66 39 54C39 52.34 37.66 51 36 51C34.34 51 33 52.34 33 54Z" fill="#FBFCFF"/>
                                <path d="M33 54C33 55.66 34.34 57 36 57C37.66 57 39 55.66 39 54C39 52.34 37.66 51 36 51C34.34 51 33 52.34 33 54Z" stroke="#FBFCFF" stroke-width="0.5" stroke-miterlimit="10"/>
                                </g>
                            </g>
                            <defs>
                                <filter id="filter0_d_2443_10233" x="1.75" y="3.75" width="68.5" height="68.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="2"/>
                                <feGaussianBlur stdDeviation="1"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0.1875 0 0 0 0 0.1875 0 0 0 0 0.1875 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2443_10233"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2443_10233" result="shape"/>
                                </filter>
                                <filter id="filter1_d_2443_10233" x="21.7402" y="15.7454" width="28.5107" height="36.5046" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="2"/>
                                <feGaussianBlur stdDeviation="1"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0.1875 0 0 0 0 0.1875 0 0 0 0 0.1875 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2443_10233"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2443_10233" result="shape"/>
                                </filter>
                                <filter id="filter2_d_2443_10233" x="30.75" y="50.75" width="10.5" height="10.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                <feOffset dy="2"/>
                                <feGaussianBlur stdDeviation="1"/>
                                <feComposite in2="hardAlpha" operator="out"/>
                                <feColorMatrix type="matrix" values="0 0 0 0 0.1875 0 0 0 0 0.1875 0 0 0 0 0.1875 0 0 0 0.1 0"/>
                                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2443_10233"/>
                                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2443_10233" result="shape"/>
                                </filter>
                                <clipPath id="clip0_2443_10233">
                                <rect width="72" height="72" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div className="account-security-table">
                        <span className="heading-text">Security</span><br></br>
                        <br></br>
                        <br></br>
                        <span className="subtext">Change Password</span><br></br>
                        <button className="subtext-button" onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 12H21M21 12L12.5 3.5M21 12L12.5 20.5" stroke="#675D59" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <hr className="line"></hr>
                        <span className="subtext">Security Questions</span><br></br>
                        <button className="subtext-button" onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 12H21M21 12L12.5 3.5M21 12L12.5 20.5" stroke="#675D59" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <hr className="line"></hr>
                        <span className="subtext">Login History</span><br></br>
                        <button className="subtext-button" onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 12H21M21 12L12.5 3.5M21 12L12.5 20.5" stroke="#675D59" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div className="account-privacy-table">
                        <span className="heading-text">Privacy</span><br></br>
                        <br></br>
                        <br></br>
                        <span className="subtext">Profile Visibility</span><br></br>
                        <button className="subtext-button" onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 12H21M21 12L12.5 3.5M21 12L12.5 20.5" stroke="#675D59" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <hr className="line"></hr>
                        <span className="subtext">Data Sharing</span><br></br>
                        <button className="subtext-button" onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 12H21M21 12L12.5 3.5M21 12L12.5 20.5" stroke="#675D59" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <hr className="line"></hr>
                        <span className="subtext">Activity Status</span><br></br>
                        <button className="subtext-button" onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 12H21M21 12L12.5 3.5M21 12L12.5 20.5" stroke="#675D59" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div className="account-payment-table">
                        <span className="heading-text">Payment</span><br></br>
                        <br></br>
                        <br></br>
                        <span className="subtext">Payment Method</span><br></br>
                        <button className="subtext-button" onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 12H21M21 12L12.5 3.5M21 12L12.5 20.5" stroke="#675D59" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <hr className="line"></hr>
                        <span className="subtext">Billing Address</span><br></br>
                        <button className="subtext-button" onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 12H21M21 12L12.5 3.5M21 12L12.5 20.5" stroke="#675D59" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <hr className="line"></hr>
                        <span className="subtext">Subscription</span><br></br>
                        <button className="subtext-button" onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 12H21M21 12L12.5 3.5M21 12L12.5 20.5" stroke="#675D59" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div className="account-deactivation-and-deletion-table">
                        <span className="heading-text">Deactivation & Deletion</span><br></br>
                        <br></br>
                        <br></br>
                        <span className="subtext">Deactivate Account</span><br></br>
                        <button className="subtext-button" onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 12H21M21 12L12.5 3.5M21 12L12.5 20.5" stroke="#675D59" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                        <hr className="line"></hr>
                        <span className="subtext">Delete Account</span><br></br>
                        <button className="subtext-button" onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 12H21M21 12L12.5 3.5M21 12L12.5 20.5" stroke="#675D59" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AccountSetup;