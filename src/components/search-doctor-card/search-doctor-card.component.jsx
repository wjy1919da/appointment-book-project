import React from 'react';
import "./search-doctor-card.styles.scss";
import DoctorProfileImage from '../../assets/doctor/search-doctor-card-profile.png'
import locationIcon from '../../assets/doctor/search-card-locationIcon.png'
import glassIcon from '../../assets/doctor/search-card-glassIcon.png'
import badgeIcon from '../../assets/doctor/search-card-badgeIcon.png'
const SearchDoctorCard = () => {
    return (
        <div className='search-doctor-card-container'>
                <div className='doctor-profile-img'>
                    <img src={DoctorProfileImage} class="img-fluid rounded-start" alt="..."></img>
                </div>
                <div className="search-card-body">
                    <span className="search-card-title">Dr. Name Name</span>
                    <span className='search-card-text '>
                    <img src={locationIcon} style={{width:"18px",height:"18px"}}></img>
                        City, State
                    </span>
                    <span className='search-card-text '>
                        <img src={glassIcon} style={{width:"18px",height:"18px"}}></img>
                        Specialization in Field Field
                    </span>
                    <span className='search-card-text '>
                        <img src={badgeIcon} style={{width:"18px",height:"18px"}}></img>
                        License or Verification
                    </span>
                    <span className='search-card-text'>
                        <span className={"stars-container stars-40"}>★★★★★</span>
                    </span>
                </div>
        </div>
    )
}

export default SearchDoctorCard;