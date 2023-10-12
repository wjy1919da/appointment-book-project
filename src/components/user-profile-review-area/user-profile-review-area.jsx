import React, { useState, useRef } from 'react';
import Hashids from 'hashids';
import { Link } from 'react-router-dom';

// components
import StarRate from '../starRate/starRate';
import UserProfileReviewCard from '../user-profile-review-card/user-profile-review-card';
import DoctorCard from '../doctor-card/doctor-card.component';

// scss
import './user-profile-review-area.style.scss';
// import '../starRate/starRate.styles.scss';

// custom hooks
import {
  useSearchMultiConditionsPopUp,
  useSearchMultiConditions,
} from '../../hooks/useSearchDoctors';

// images
import DoctorProfilePicture from '../../assets/post/doctor_profile_picture.svg';
import LocationPinIcon from '../../assets/post/location_pin.svg';
import SpecializationIcon from '../../assets/post/glasses.svg';
import VerficationIcon from '../../assets/post/verified_badge_icon.svg';

// others
// import { useMemo } from 'react';
// import DoctorSearchPopup from '../components-doctor-search/doctor-search-popup/doctor-search-popup.component';
//import DoctorPostGrid from '../components-posts/community-post-grid/doctor-post-grid.component';
//import CreatePostOfUser from '../create-post/create-post';
import { InputGroup, SimpleGrid, Text } from '@chakra-ui/react';

const UserProfileReview = () => {
  const doctorsCard = [
    {
      cityName: 'City, State',
      name: 'Dr. Name Name',
      field: 'Specialization in Field Field',
      license: 'License or Verification',
      locationIcon: '../../assets/post/location_pin.svg',
      fieldIcon: '../../assets/post/glasses.svg',
      licenseIcon: '../../assets/post/verified_badge_icon.svg',
    },
    {
      cityName: 'City, State',
      name: 'Dr. Name Name',
      field: 'Specialization in Field Field',
      license: 'License or Verification',
      locationIcon: '../../assets/post/location_pin.svg',
      fieldIcon: '../../assets/post/glasses.svg',
      licenseIcon: '../../assets/post/verified_badge_icon.svg',
    },
    {
      cityName: 'City, State',
      name: 'Dr. Name Name',
      field: 'Specialization in Field Field',
      license: 'License or Verification',
      locationIcon: '../../assets/post/location_pin.svg',
      fieldIcon: '../../assets/post/glasses.svg',
      licenseIcon: '../../assets/post/verified_badge_icon.svg',
    },
  ];

  const hashids = new Hashids('Encode the Url');
  const [activeTab, setActiveTab] = useState('like'); // By default, "like" is the active taba
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useSearchMultiConditionsPopUp();
  const doctorCardListRef = useRef(null);
  const handleRightScroll = () => {
    const container = doctorCardListRef.current;
    if (container) {
      container.scrollLeft += 200; // Scroll by 200 pixels to the right
    }
  };

  const handleLeftScroll = () => {
    const container = doctorCardListRef.current;
    if (container) {
      container.scrollLeft -= 200; // Scroll by 200 pixels to the left
    }
  };
  const mergedData = data ? data.pages.flatMap((page) => page.data || []) : [];
  // const mergedData = useMemo(() => {
  //     return data ? mergeDoctorsByNickname(data.pages) : [];
  //    }, [data]);

  return (
    <div className='user-profile-review-container'>
      <div className='review-recommande-doctor'>
        {/* <div
          className='scroll-indicator scroll-left'
          onClick={handleLeftScroll}
        >
          &lt;
        </div> */}
        <div
          className='review-recommande-doctor-list-container'
          ref={doctorCardListRef}
        >
          {/* SAVE !!!!!!! */}
          {/* {isLoading ? */}
          {/* <div><p>is Loading</p></div> : */}
          {/* {data && (
            <div className='custom-grid'>
              {mergedData &&
                mergedData.map(
                  (item, i) =>
                    item.nickname && (
                      <div key={i} className='doctor-search-card-container'>
                        <Link to={`/doctor/${hashids.encode(item.memberId)}`}>
                          <DoctorCard doctor={item} />
                        </Link>
                      </div>
                    )
                )}
            </div>
          )} */}
        </div>
        {/* <div
          className='scroll-indicator scroll-right'
          onClick={handleRightScroll}
        >
          &gt;
        </div> */}
      </div>
      <div className='recommande-doctor-summary'>
        {/* ME */}
        <div className='recommend-doctor-box-wrapper'>
          {doctorsCard.map((x, index) => (
            <div
              className={`recommend-doctor-box ${
                index === 0 && 'recommend-doctor-filtered-box-1'
              }`}
            >
              <div className='box-1'>
                <img src={DoctorProfilePicture} alt='' />
                <div className='username-review-card-rate-star'>
                  <StarRate rateScore={5} />
                </div>
              </div>
              <div className='box-2'>
                <div className='location-box'>
                  <img
                    src={LocationPinIcon}
                    alt=''
                    className='doctor-recommend-icon'
                  />
                  <span className='city-name'>{x.cityName}</span>
                </div>
                <h1 className='doctor-name'>{x.name}</h1>
                <div className='specialization-box'>
                  <img
                    src={SpecializationIcon}
                    alt=''
                    className='doctor-recommend-icon'
                  />
                  <span>{x.field}</span>
                </div>
                <div className='verification-box'>
                  <img
                    src={VerficationIcon}
                    alt=''
                    className='doctor-recommend-icon'
                  />
                  <span>{x.license}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='summary-title'>
          <span>How did User_Name think?</span>
        </div>
        <div className='summary-rate'>
          <span>The Review Title</span>
          <StarRate rateScore={4} />
        </div>
        <div className='summary-text'>
          <span>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </span>
        </div>
      </div>
      <div className='user-profile-review-divider'></div>
      <div className='recommande-doctor-reviews'>
        <div>
          <span>Recent reviews from others</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <UserProfileReviewCard />
          <UserProfileReviewCard />
          <UserProfileReviewCard />
        </div>
      </div>
    </div>
  );
};

export default UserProfileReview;
