import React from 'react';
import "./doctor-profile.styles.scss";
import { Link, useParams,useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import DoctorProfileImage from '../../assets/doctor/doctor-profile-image.png'
import locationIcon from '../../assets/doctor/search-card-locationIcon.png'
import glassIcon from '../../assets/doctor/search-card-glassIcon.png'
import badgeIcon from '../../assets/doctor/search-card-badgeIcon.png'
import ConsultDoctorButton from '../consult-doctor-button/consult-doctor-button.component';
import FollowButton from '../follow-button/follow-button.component';
import useDoctorQueryStore from '../../store.ts';
import {useSearchMultiConditionsPopUp} from '../../hooks/useSearchDoctors';
import StarRate from '../starRate/starRate';
import backIcon from '../../assets/doctor/left_back.png';
import { useMemo } from 'react';
const mergeDoctorsByNickname = (pages) => {
    const mergedDoctors = {};
  
    // Flatten the data into a single array
    const flatData = pages.flatMap(page => page.data || []);
  
    flatData.forEach(doctor => {
      const { nickname, name } = doctor;
  
      if (mergedDoctors[nickname]) {
        // If doctor already exists, add the new programTitle to the existing one
        mergedDoctors[nickname].name.push(name);
      } else {
        // If doctor doesn't exist, add them to the object
        mergedDoctors[nickname] = {
          ...doctor,
          name: [name],  // Use an array to store programTitles
        };
      }
    });
  
    // Convert the object back into an array
    return Object.values(mergedDoctors);
};
const DoctorProfile = ({posts, follower, following,doctorStars}) => {
    
    const { nickname } = useParams();
    
    const setDoctorName = useDoctorQueryStore((state) => state.setDoctorName);
    const setField = useDoctorQueryStore((state) => state.setField);
    const setLocation = useDoctorQueryStore((state) => state.setLocation);
    useEffect(() => {
        setDoctorName(nickname);
        setField("");
        setLocation("");
    }, [nickname]);
    const {
        data,
        error,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
   } = useSearchMultiConditionsPopUp();
   const mergedData = useMemo(() => {
    return data ? mergeDoctorsByNickname(data.pages) : [];
   }, [data]);
    const profileData = data?.pages[0]?.data[0];
    
    return (
            <div className='doctor-profile-container'>
            <img src={DoctorProfileImage} class="img-fluid rounded-start individual-doctor-pic" alt="..." style={{width:"160px",height:"160px"}}></img>
            {mergedData && mergedData[0] && 
                <div className="profile-card-body">
                    {mergedData[0].nickname && <span className="search-card-title">{mergedData[0].nickname}</span>}

                    <span className='starRate'>
                        <StarRate rate={doctorStars || 4}/>
                    </span>
                  
                    {mergedData[0].address &&
                        <span className='search-card-text '>
                            <img src={locationIcon} style={{height:"18px", marginTop:"4px", marginInlineStart:"2px", marginInlineEnd:"2px"}} alt='location'></img>
                            {mergedData[0].address}
                        </span>
                    }
                    {mergedData[0].name &&
                        <span className='search-card-text '>
                            <img src={glassIcon} style={{height:"18px", marginTop:"4px"}} alt='glass'></img>
                            {mergedData[0].name.join(', ')}
                        </span>
                    }
                    <span className='search-card-text '>
                        <img src={badgeIcon} style={{height:"18px", marginTop:"4px"}} alt='badge'></img>
                         Charm Verified
                    </span>
                </div>
            }
            <div className="post-follower-following">
                <div className="info-showlist">
                    <span className="infor-number">{posts || 0}</span>
                    <span className="infor-text">Posts</span>
                </div>
                <div className="info-showlist">
                    <span className="infor-number">{follower|| 0}</span>
                    <span className="infor-text">Follower</span>
                </div>
                <div className="info-showlist">
                    <span className="infor-number">{following ||0}</span>
                    <span className="infor-text">Following</span>
                </div>
            </div>
            <div className="consult-follow-button">
                <ConsultDoctorButton title='Consult Doctor'/>
                <FollowButton title='Follow'/>
            </div>
            <div className='doctor-profile-back'>
                <Link to='/doctor'>
                    <img src={backIcon} className='back-link-icon' style={{display:"inline-block", marginInlineEnd:"10px", marginBottom:"3px"}} alt='back'/>
                    <span className='back-link'>All Doctors</span>
                </Link>
            </div>
          </div>
        
    )
}

export default DoctorProfile;