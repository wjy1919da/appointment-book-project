import React, { useState,useRef } from 'react';
//import DoctorPostGrid from '../components-posts/community-post-grid/doctor-post-grid.component';
//import CreatePostOfUser from '../create-post/create-post';
import './user-profile-review-area.style.scss';
import { useMemo } from 'react';
import Hashids from 'hashids';
import StarRate from '../starRate/starRate';
import UserProfileReviewCard from '../user-profile-review-card/user-profile-review-card';
import { Link } from 'react-router-dom';
import {
    InputGroup,
    SimpleGrid,
    Text
  } from '@chakra-ui/react';
import DoctorCard from '../doctor-card/doctor-card.component';
import {useSearchMultiConditionsPopUp ,useSearchMultiConditions} from '../../hooks/useSearchDoctors';
import DoctorSearchPopup from '../components-doctor-search/doctor-search-popup/doctor-search-popup.component';
const UserProfileReview = () => {
    const hashids = new Hashids('Encode the Url');
    const [activeTab, setActiveTab] = useState("like");  // By default, "like" is the active taba
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
    const {
        data,
        error,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
   } = useSearchMultiConditionsPopUp();
   const doctorCardListRef = useRef(null);
   const handleRightScroll = () => {
    const container = doctorCardListRef.current;
    if(container) {
        container.scrollLeft += 200;  // Scroll by 200 pixels to the right
    }
    }

    const handleLeftScroll = () => {
        const container = doctorCardListRef.current;
        if(container) {
            container.scrollLeft -= 200;  // Scroll by 200 pixels to the left
        }
    }
    const mergedData = useMemo(() => {
        return data ? mergeDoctorsByNickname(data.pages) : [];
       }, [data]);
    return (
        <div className="user-profile-review-container">
            <div className='review-recommande-doctor'>
             <div className="scroll-indicator scroll-left" onClick={handleLeftScroll}>&lt;</div> 
            <div className='review-recommande-doctor-list-container' ref={doctorCardListRef}>
                {/* {isLoading ? */}
                    {/* <div><p>is Loading</p></div> : */}
                    {(data && 
                        <div className="custom-grid">
                            {mergedData && mergedData.map((item, i) => (
                                item.nickname && 
                                <div key={i} className='doctor-search-card-container'>
                                    <Link to={`/doctor/${hashids.encode(item.memberId)}`}>
                                        <DoctorCard doctor={item} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                    </div>
                   <div className="scroll-indicator scroll-right" onClick={handleRightScroll}>&gt;</div>
            </div>
            <div className='recommande-doctor-summary'>
                <div className='summary-title'>
                    <span>How did User_Name think?</span>
                </div>
                <div className='summary-rate'>
                        <span>The review Title</span>
                        <StarRate rateScore = {4}/>

                </div>
                <div className='summary-text'>
                    <span>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </span>
                </div>
            </div>
            <div className='user-profile-review-divider'>
            </div>
            <div className='recommande-doctor-reviews'>
                <div>
                    <span>Recent reviews from others</span>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
                    <UserProfileReviewCard/>
                    <UserProfileReviewCard/>
                    <UserProfileReviewCard/>
                </div>
            </div>
        </div>
    )
}

export default UserProfileReview;