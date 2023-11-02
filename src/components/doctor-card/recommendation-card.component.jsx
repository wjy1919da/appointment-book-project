import React from 'react'
import locationIcon from '../../assets/doctor/search-card-locationIcon.png'
import DoctorProfileImage from '../../assets/doctor/doctor-profile-image.png'
import glassIcon from '../../assets/doctor/search-card-glassIcon.png'
import badgeIcon from '../../assets/doctor/search-card-badgeIcon.png'
import StarRate from '../starRate/starRate';
import './recommendation-card.styles.scss'
const RecommendationCard = ({doctor}) => {
    let displayText;
    if (Array.isArray(doctor.name)) {
        // if doctor.name is array
        displayText = doctor.name.length > 2 ? (doctor.name.slice(0, 2).join(', ') + '...') : doctor.name.join(', ');
    } else {
        // if doctor.name is string
        displayText = doctor.name;
    }

    return (
        <div className='recommendation-card-container'>
            <div className='recommendation-profile-img'>
               <img src={DoctorProfileImage} class="recommendation-img rounded-start" alt='recommendation-profile'></img>
            </div>
            <div className='recommendation-card-body'>
                <span className='recommendation-card-title'>{doctor.nickname}</span>
                <span className='recommendation-card-text'>
                    <img src={locationIcon} style={{height:"15px", marginTop:"4px", marginInlineStart:"2px", marginInlineEnd:"2px"}} alt="location" />
                    {doctor.address}
                </span>
                <span className='recommendation-card-text'>
                    <img src={glassIcon} style={{height:"15px", marginTop:"4px"}} alt="glass" />
                    {displayText}
                </span>
                <span className='recommendation-card-text'>
                    <img src={badgeIcon} style={{height:"15px", marginTop:"4px"}} alt="badge" />
                    {doctor.mechName}
                </span>
                <span className='recommendation-card-text'>
                     <StarRate rateScore ='4'/>
                </span>
            </div>
        </div>
    )
}

export default RecommendationCard