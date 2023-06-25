import React from 'react';
import { Link } from 'react-router-dom';
import './doctor-card.styles.scss';
import DoctorProfileImage from '../../assets/doctor/doctor-profile-image.png'
import locationIcon from '../../assets/doctor/search-card-locationIcon.png'
import glassIcon from '../../assets/doctor/search-card-glassIcon.png'
import badgeIcon from '../../assets/doctor/search-card-badgeIcon.png'
import StarRate from '../starRate/starRate';

const DoctorCard = ({doctor}) => {
    console.log("doctor card: ",doctor);
    return (
         <div className='search-doctor-card-container'>
            <div className='doctor-profile-img'>
                <img src={DoctorProfileImage} class="img-fluid rounded-start" alt="..."></img>
            </div>
            <div className="search-card-body">
                <span className="search-card-title">{doctor.nickname}</span>
                <span className='search-card-text '>
                    <img src={locationIcon} style={{height:"18px", marginTop:"4px", marginInlineStart:"2px", marginInlineEnd:"2px"}}></img>
                    {doctor.address}
                </span>
                <span className='search-card-text '>
                    <img src={glassIcon} style={{height:"18px", marginTop:"4px"}}></img>
                    {doctor.programTitle}
                </span>
                <span className='search-card-text '>
                    <img src={badgeIcon} style={{height:"18px", marginTop:"4px"}}></img>
                    {doctor.mechName}
                </span>
                <span className='search-card-text'>
                    <StarRate rateScore ='4'/>
                </span>
            </div>
        </div>
    )
}
export default DoctorCard;