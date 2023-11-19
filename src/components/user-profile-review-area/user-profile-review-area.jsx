import React, { useState, useRef } from 'react';
import Hashids from 'hashids';
// import { Link } from 'react-router-dom';

// components
import DoctorSearchCard from '../doctor-search-card/doctor-search-card.component';
import HomeSpinner from '../home-spinner/home-spinner.component';
import CollapseButton from '../collapse-button/collapse-button.component';
// import DoctorCard from '../doctor-card/doctor-card.component';
// import StarRate from '../starRate/starRate';
// import UserProfileReviewCard from '../user-profile-review-card/user-profile-review-card';

// scss
import './user-profile-review-area.style.scss';
// import '../starRate/starRate.styles.scss';

// custom hooks
import {
  useSearchMultiConditionsPopUp,
  useSearchMultiConditions,
} from '../../hooks/useSearchDoctors';

// images
import RightArrow from '../../assets/post/arrow-right.svg';
// import DoctorProfilePicture from '../../assets/post/doctor_profile_picture.svg';
// import LocationPinIcon from '../../assets/post/location_pin.svg';
// import SpecializationIcon from '../../assets/post/glasses.svg';
// import VerficationIcon from '../../assets/post/verified_badge_icon.svg';

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

  const [clicked, setClicked] = useState(Array(doctorsCard.length).fill(false));

  const handleClickRecommendDoctor = (index) => {
    const updatedClickedState = [...clicked];
    updatedClickedState[index] = !updatedClickedState[index];
    setClicked(updatedClickedState);
  };

  const hashids = new Hashids('Encode the Url');
  const [activeTab, setActiveTab] = useState('like'); // By default, "like" is the active taba
  // const mergeDoctorsByNickname = (pages) => {
  //     const mergedDoctors = {};

  //     // Flatten the data into a single array
  //     const flatData = pages.flatMap(page => page.data || []);

  //     flatData.forEach(doctor => {
  //       const { nickname, name } = doctor;

  //       if (mergedDoctors[nickname]) {
  //         // If doctor already exists, add the new programTitle to the existing one
  //         mergedDoctors[nickname].name.push(name);
  //       } else {
  //         // If doctor doesn't exist, add them to the object
  //         mergedDoctors[nickname] = {
  //           ...doctor,
  //           name: [name],  // Use an array to store programTitles
  //         };
  //       }
  //     });

  //     // Convert the object back into an array
  //     return Object.values(mergedDoctors);
  // };

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
  const dataArray = data?.pages[0].data;

  if (isLoading) return <HomeSpinner />;

  return (
    <div className='user-profile-review-container'>
      <div className='review-recommande-doctor'>
        {/* <div
          className='scroll-indicator scroll-left'
          onClick={handleLeftScroll}
        >
          &lt;
        </div> */}
        {/* <div
          className='review-recommande-doctor-list-container'
          ref={doctorCardListRef}
        > */}
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
        {/* </div> */}
        {/* <div
          className='scroll-indicator scroll-right'
          onClick={handleRightScroll}
        >
          &gt;
        </div> */}
      </div>
      <div className='recommend-doctor-highly-rated-container'>
        <h3 className='recommend-doctor-highly-rated-title'>
          Highly Rated by Charlotte
        </h3>
        <img src={RightArrow} alt='DownArrow' />
      </div>
      <div className='recommande-doctor-summary'>
        <div className='recommend-doctor-box-wrapper'>
          {dataArray?.map((x, index) => (
            <DoctorSearchCard doctorObj={x} key={index} />
            //   <div
            //     key={index}
            //     className={`recommend-doctor-box ${
            //       clicked[index] ? 'recommend-doctor-filtered-box-1' : ''
            //     }`}
            //     onClick={() => handleClickRecommendDoctor(index)}
            //   >
            //     <div className='box-1'>
            //       <img src={DoctorProfilePicture} alt='' />
            //       <div className='username-review-card-rate-star'>
            //         <StarRate rateScore={5} />
            //       </div>
            //     </div>
            //     <div className='box-2'>
            //       <div className='location-box'>
            //         <img
            //           src={LocationPinIcon}
            //           alt=''
            //           className='doctor-recommend-icon'
            //         />
            //         <span className='city-name'>{x.cityName}</span>
            //       </div>
            //       <h1 className='doctor-name'>{x.name}</h1>
            //       <div className='specialization-box'>
            //         <img
            //           src={SpecializationIcon}
            //           alt=''
            //           className='doctor-recommend-icon'
            //         />
            //         <span>{x.field}</span>
            //       </div>
            //       <div className='verification-box'>
            //         <img
            //           src={VerficationIcon}
            //           alt=''
            //           className='doctor-recommend-icon'
            //         />
            //         <span>{x.license}</span>
            //       </div>
            //     </div>
            //   </div>
          ))}
        </div>

        <div className='section-container-user-profile'>
          <CollapseButton title = "Face"/>
          <CollapseButton title = "Breast"/>
          <CollapseButton title = "Body"/>
        </div>

        {/* <div className='summary-title'>
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
        </div> */}
      </div>
    </div>
  );
};

export default UserProfileReview;
