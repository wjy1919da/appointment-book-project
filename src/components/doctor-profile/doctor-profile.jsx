import React from 'react';
import "./doctor-profile.styles.scss";
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import DoctorProfileImage from '../../assets/doctor/doctor-profile-image.png';
import locationIcon from '../../assets/doctor/search-card-locationIcon.png';
import glassIcon from '../../assets/doctor/search-card-glassIcon.png';
import badgeIcon from '../../assets/doctor/search-card-badgeIcon.png';
import ConsultDoctorButton from '../consult-doctor-button/consult-doctor-button.component';
import FollowButton from '../follow-button/follow-button.component';
import useDoctorQueryStore from '../../store.ts';
import {useSearchMultiConditionsPopUp} from '../../hooks/useSearchDoctors';
import backIcon from '../../assets/doctor/left_back.png';
const DoctorProfile = () => {
    const { nickname } = useParams();
    console.log("name in profile",nickname)
    const setDoctorName = useDoctorQueryStore((state) => state.setDoctorName);
    useEffect(() => {
        setDoctorName(nickname);
    }, [nickname]);
    const {
        data,
        error,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
   } = useSearchMultiConditionsPopUp();
   if(data && data.pages){
     console.log("doctor-profile.component.jsx: data",data.pages[0].data[0].nickname);
   }

    const profileData = data?.pages[0]?.data[0];
    
    return (
        <div className='doctor-profile-container'>
            <img src={DoctorProfileImage} class="img-fluid rounded-start" alt="..." style={{width:"160px",height:"160px"}}></img>
            {profileData && 
                <div className="profile-card-body">
                    {profileData.nickname && <span className="search-card-title">{profileData.nickname}</span>}
                    {profileData.address &&
                        <span className='search-card-text '>
                            <img src={locationIcon} style={{height:"18px", marginTop:"4px", marginInlineStart:"2px", marginInlineEnd:"2px"}}></img>
                            {profileData.address}
                        </span>
                    }
                    {profileData.programTitle &&
                        <span className='search-card-text '>
                            <img src={glassIcon} style={{height:"18px", marginTop:"4px"}}></img>
                            {profileData.programTitle}
                        </span>
                    }
                    <span className='search-card-text '>
                        <img src={badgeIcon} style={{height:"18px", marginTop:"4px"}}></img>
                        License or Verification
                    </span>
                    <span className='starRate'>
                        <span className={"stars-container stars-40"}>★★★★★</span>
                    </span>
                </div>
            }
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
            <div className='doctor-profile-back'>
                <Link to='/doctor'>
                    <img src={backIcon} style={{height:"24px", display:"inline-block", marginInlineEnd:"10px", marginBottom:"3px"}} />
                    <span className='back-link'>All Doctors</span>
                </Link>
            </div>
        </div>
    )
}

export default DoctorProfile;