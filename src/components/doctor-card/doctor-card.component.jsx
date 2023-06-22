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
                <img src={locationIcon} style={{width:"18px",height:"18px"}}></img>
                    {doctor.address}
                </span>
                <span className='search-card-text '>
                    <img src={glassIcon} style={{width:"18px",height:"18px"}}></img>
                    {doctor.programTitle}
                </span>
                <span className='search-card-text '>
                    <img src={badgeIcon} style={{width:"18px",height:"18px"}}></img>
                    {doctor.mechName}
                </span>
                <span className='search-card-text'>
                    <StarRate rateScore ='40'/>
                </span>
            </div>
        </div>
    )
}
export default DoctorCard;