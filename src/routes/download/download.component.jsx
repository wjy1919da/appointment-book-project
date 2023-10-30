import { Link } from 'react-router-dom';
import './download.styles.scss';
import iPhone from '../../assets/download/iphone.png';
import QRiOS from '../../assets/download/QR-code-iOS.png';
import BadgeiOS from '../../assets/download/iOS-Badges.png';
import QRAndroid from '../../assets/download/QR-code-Android.png';
import BadgeAndroid from '../../assets/download/Android-Badges.png';
import Footer from '../../components/footer/footer.component';
import iPhoneMobile from '../../assets/download/iphone.png'
import { useMediaQuery } from 'react-responsive';
//src/assets/download/iphone.png
const Download = () => {
    
    const isMobile = useMediaQuery({ query: `(max-width: 1023px)` });
    return (
        <div className='download-container'>
            <div className='download-div'>
                    <div className='download-pics'>
                        <div className='decorator'></div>
                        {!isMobile&&<img className='phone-pic' src={iPhone} alt='iphone'></img>}
                        {isMobile&&<img className='phone-pic' src={iPhoneMobile} alt='iphoneMobile'></img>}
                    </div>
                    <div className='QR-codes-div'>
                        <p className='QR-title'>Get the Charm App</p>
                        <p className='QR-subtitle'>Your Charming Life Starts Here</p>
                        <div className='QR-codes'>
                            <div className='QR-code'>
                                <img className='QR-code-pic' src={QRiOS} alt='QR-ios'></img>
                                <Link className='download-link'>
                                    <img className='download-btn' src={BadgeiOS} alt='download-ios'></img>
                                </Link>
                            </div>
                            <div className='QR-code'>
                                <img className='QR-code-pic' src={QRAndroid} alt='QR-android'></img>
                                <Link className='download-link'>
                                    <img className='download-btn' src={BadgeAndroid} alt='download-android'></img>
                                </Link>
                            </div>
                        </div>
                    </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Download;