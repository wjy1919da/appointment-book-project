import { Link } from 'react-router-dom';
import './download.styles.scss';
import iPhone from '../../assets/download/iPhone.svg';
import QRiOS from '../../assets/download/QR-code-iOS.png';
import BadgeiOS from '../../assets/download/iOS-Badges.png';
import QRAndroid from '../../assets/download/QR-code-Android.png';
import BadgeAndroid from '../../assets/download/Android-Badges.png';

const Download = () => {
    

    return (
        <div className='download-div'>
            <div className='download-pics'>
                <div className='decorator'></div>
                <img className='phone-pic' src={iPhone} alt='iphone'></img>
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
    )
}

export default Download;