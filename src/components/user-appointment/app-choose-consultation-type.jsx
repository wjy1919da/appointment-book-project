import { useState } from 'react';
import './app-choose-consultation-type.scss';

import VideoCallIcon from '../../assets/doctor/video-call-icon.svg';
import VoiceIcon from '../../assets/doctor/voice-icon.svg';
import PhoneIcon from '../../assets/doctor/phone-icon.svg';


const AppConsultationType = () => {
    const [consultationType, setConsultationType] = useState('');
    const consultationArray = ['Video', 'Audio'];
    const consultationImages = [VideoCallIcon, VoiceIcon];

    const handleConsultationClick = (index) => {
        if (index === consultationType) setConsultationType('');
        else setConsultationType(index);
    }

    return (
        <div className="user-appointment-consultation-type-container">
            <div className="user-appointment-consultation-type-header-container">
                <h2 className="user-appointment-consultation-type-header">Please choose from the following list of available consultations.</h2>
            </div>
            <div className="user-appointment-consultation-type-consultation-section">
                {consultationArray.map((item,index) => <span key={index}><ConsultationDisplay imageLink={consultationImages[index]} consultationTitle={item} consultationCost={'$20 / 30min'} isSelected={index === consultationType} onClick={() => handleConsultationClick(index)} /></span> )}
            </div>
        </div>
    )
}

const ConsultationDisplay = ({imageLink, consultationTitle, consultationCost, isSelected, onClick}) => {
    const title = `${consultationTitle} Consultation`
    return (
        <div className='user-appointment-consultation-item-container'>
            <div className={`user-appointment-consultation-item-image-container ${isSelected && 'user-appointment-consultation-item-image-container-selected'}`} onClick={onClick}>
                <img src={imageLink} alt={consultationTitle} className={`user-appointment-consultation-item-image ${isSelected && 'user-appointment-consultation-item-filter'}`} />
            </div>
            <div className='user-appointment-consultation-item-title-container'>
                <h4 className='user-appointment-consultation-title'>{title}</h4>
            </div>
            <div className='user-appointment-consultation-item-cost-container'>
                <h4 className='user-appointment-consultation-cost'>{consultationCost}</h4>
            </div>
        </div>
    )
}

export default AppConsultationType;