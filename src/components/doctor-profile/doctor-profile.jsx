import React from 'react';
import "./doctor-profile.styles.scss";
import { useParams } from 'react-router-dom';
import DoctorProfileImage from '../../assets/doctor/doctor-profile-image.png'
import locationIcon from '../../assets/doctor/search-card-locationIcon.png'
import glassIcon from '../../assets/doctor/search-card-glassIcon.png'
import badgeIcon from '../../assets/doctor/search-card-badgeIcon.png'
import ConsultDoctorButton from '../consult-doctor-button/consult-doctor-button';
import FollowButton from '../follow-button/follow-button';
import StarRate from '../starRate/starRate';

const DoctorProfile = () => {
    const { name } = useParams();
    return (
        <div className='doctor-profile-container'>
            
                <img src={DoctorProfileImage} class="img-fluid rounded-start" alt="..." style={{width:"160px",height:"160px"}}></img>
                    <div className="profile-card-body">
                    <span className="search-card-title">Dr. Name Name</span>
                    <span className='search-card-text '>
                    <img src={locationIcon} style={{width:"18px",height:"18px"}}></img>
                        City, State
                    </span>
                    <span className='search-card-text '>
                        <img src={glassIcon} style={{width:"18px",height:"18px"}}></img>
                        Specialization in Field
                    </span>
                    <span className='search-card-text '>
                        <img src={badgeIcon} style={{width:"18px",height:"18px"}}></img>
                        License or Verification
                    </span>
                    <span className='starRate'>
                        <StarRate rateScore = "50"/>
                    </span>
                </div>
                <div className="post-follower-following">
                    <div className="info-showlist">
                        <span className="infor-number">3</span>
                        <span className="infor-text">Posts</span>
                    </div>
                    <div className="info-showlist">
                        <span className="infor-number">320</span>
                        <span className="infor-text">Follower</span>
                    </div>
                    <div className="info-showlist">
                        <span className="infor-number">52</span>
                        <span className="infor-text">Following</span>
                    </div>
                </div>
                <div className="consult-follow-button">
                    <ConsultDoctorButton title='Consult Doctor'/>
                    <FollowButton title='Follow'/>
                </div>
            </div>
       
    )
}

export default DoctorProfile;