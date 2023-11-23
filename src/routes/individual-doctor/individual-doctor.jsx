import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useDoctorQueryStore from '../../store.ts';

//images
import glassIcon from "../../assets/user/glassesIcon.png";
import badgeIcon from "../../assets/user/badgeIcon.png";
import locationIcon from "../../assets/user/locationIcon.png";
import gradIcon from "../../assets/user/Graduation Cap.png";
import verifiedBadge from '../../assets/doctor/Group.png';
import certified from "../../assets/user/Certificate.png";
import appointmentCalendar from '../../assets/doctor/calendar.png';

// components
import DoctorProfile from '../../components/component-individual-doctor/doctor-profile/doctor-profile';
import DoctorAbout from '../../components/component-individual-doctor/doctor-about/doctor-about.component';
import HomeSpinner from '../../components/home-spinner/home-spinner.component';
import UserProfileDoctorPostGrid from '../../components/user-profile-doctor-post-grid/user-profile-doctor-post-grid';
import ErrorMsg from '../../components/error-msg/error-msg.component';

// hook
import { useGetDoctorInfo } from '../../hooks/useGetIndividualDoctor.js';
import { useGetDoctorAbout } from '../../hooks/useGetIndividualDoctor';
import { useGetDoctorReviews } from '../../hooks/useGetIndividualDoctor';

// scss
import './individual-doctor.styles.scss';

const IndividualDoctor = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { encodedMemberId } = useParams();
  const doctorQuery = useDoctorQueryStore((state) => state.doctorQuery);
  const setMemberId = useDoctorQueryStore((state) => state.setMemberId);
  const setNickName = useDoctorQueryStore((state) => state.setNickName);
  const { data, error, isLoading } = useGetDoctorInfo();
  const { data: data2, error: error2, isLoading: isLoading2, isFetchingNextPage, fetchNextPage, hasNextPage } = useGetDoctorAbout();
  const {
    data: data3,
    error: error3,
    isLoading: isLoading3,
    fetchNextPage: fetchNextPage3,
    isFetchingNextPage: isFetchingNextPage3,
    hasNextPage: hasNextPage3
}  = useGetDoctorReviews();
  const { nickname } = data?.nickname || {};
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['About', 'Posts', 'Likes'];

  useEffect(() => {
    setMemberId(encodedMemberId);
    if (data) {
      setNickName(data.nickname);
    }
  }, [encodedMemberId, data]);

  if (isLoading || isLoading2) {
    return <HomeSpinner />;
  }

  if (error || error2) {
    return (
      <div>
        <ErrorMsg />
      </div>
    );
  }

  console.log('Doctor Data is: ', data);
  console.log('Doctor data2 is: ', data2);
  console.log('Doctor data3 is: ', data3);

  const selectTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div className='indv-doctor-page-container' >
      <DoctorProfileInfo data={data} data3={data3} />
      
      <div className="indv-doctor-navbar">
          <div onClick={() => setActiveTab(0)} className={`indv-doctor-navbar-item ${activeTab === 0 ? "indv-active" : ""}`}>About</div>
          <div onClick={() => setActiveTab(1)} className={`indv-doctor-navbar-item ${activeTab === 1 ? "indv-active" : ""}`}>Posts</div>
          <div onClick={() => setActiveTab(2)} className={`indv-doctor-navbar-item ${activeTab === 2 ? "indv-active" : ""}`}>Like</div>
      </div>
      {activeTab === 0 && <DoctorAbout />}
      {activeTab === 1 && (
            <div className='individual-doctor-posts'>
              <UserProfileDoctorPostGrid />
            </div>
          )}
    </div>
  )

  // return (
    // <div className='individual-page-container'>
    //   <div className='individual-doctor-container'>
    //     <div className='individual-doctor-left-container'>
    //       {data && (
    //         <DoctorProfile
    //           nickname={data.nickname}
    //           projects={data.name}
    //           mechName={data.mechName}
    //           address={data.address}
    //         />
    //       )}
    //     </div>
    //     <div className='individual-doctor-right-container'>
    //       <div className='individual-doctor-tabs'>
    //         {tabs.map((item, index) => (
    //           <div
    //             key={index}
    //             className={`individual-doctor-tab ${
    //               activeTab === index ? 'active' : ''
    //             }`}
    //             onClick={() => selectTab(index)}
    //           >
    //             {item}
    //             <div className='individual-doctor-tab-underline'></div>
    //           </div>
    //         ))}
    //       </div>
    //       {activeTab === 0 && <DoctorAbout />}
    //       {activeTab === 1 && (
    //         <div className='individual-doctor-posts'>
    //           <UserProfileDoctorPostGrid />
    //         </div>
    //       )}
    //       {activeTab === 2 && <DoctorReviewGrid />}
    //     </div>
    //   </div>
    // </div>
//   );
};

const DoctorProfileInfo = (data, data3) => {
  data3 = data?.data3;
  data = data?.data;
  console.log('data3 is: ', data3);
  const { doctorStars } = data3?.pages[0]?.data?.data || {};
  const {postNumber} = data3?.pages[0]?.data?.data || 0;
  const {followers} = data3?.pages[0]?.data?.data || 0;
  const {followings} = data3?.pages[0]?.data?.data || 0;
  
  // console.log('data is: ', data);
  // console.log('data3 is: ', data3);

  return (
      <div className='indv-doctor-info-container' >
        <div className='indv-doctor-profile-picture-container' >
          <img className='indv-doctor-profile-picture' src={data?.img} alt='Doctor' />
        </div>
        <div className='indv-doctor-info-sub-container' >
          <div className='indv-doctor-info-row indv-top-row' >
            <div className='indv-top-row-left-side' >
              <div className='indv-doctor-name-container'>
                {data?.nickname && <h2 className='indv-doctor-name'>Dr. {data.nickname}</h2>}
              </div>
              <div className='indv-doctor-verified-container' >
                <img className='indv-doctor-verified-badge' src={verifiedBadge} alt='verified' />
              </div>
            </div>
            <div className='indv-top-row-right-side' >
              {/* <div className='indv-edit-profile-button-container' >
                <button type='button' className='indv-edit-profile-button'>Edit Profile</button>
              </div>
              <div className='indv-appointment-management-container' >
                <img className='indv-appointment-mangament' src={appointmentCalendar} alt='calendar appointments' />
              </div> */}
            </div>
          </div>
          <div className='indv-doctor-info-row indv-second-row' >
            <div className='indv-doctor-description-container' >
              {data?.miaoshu ? <p className='indv-doctor-description' >{data.miaoshu}</p> : <p className='indv-doctor-description'>Cosmetic Doctor</p>}
            </div>
          </div>
          <div className='indv-doctor-info-row indv-third-row' >
            <div className='indv-posts-total-container' >
              {postNumber} <span className='gray-text-container'>posts</span>
            </div>
            <div className='indv-followers-total-container' >
              {followers} <span className='gray-text-container'>followers</span>
            </div>
            <div className='indv-following-total-container' >
              {followings} <span className='gray-text-container'>following</span>
            </div>
          </div>
          <div className='indv-doctor-info-row indv-fourth-row' >
            <div className='indv-doctor-city-state-container indv-doctor-info-subrow' >
              <img src={locationIcon} className='location-img' alt='location' />
              {data?.address && <span className='indv-doctor-city-state indv-doctor-info'>{data?.address}</span>}
            </div>
            <div className='indv-doctor-specialization-container indv-doctor-info-subrow' >
              <img src={glassIcon} className='specialization-img' alt='specialization' />
              {data?.name?.length > 0 && <span className='indv-doctor-specialization indv-doctor-info'>Specialization in {data?.name[0]}</span>}
            </div>
            <div className='indv-doctor-verification-container indv-doctor-info-subrow' >
              <img src={badgeIcon} className='verification-img' alt='verification' />
              <span className='indv-doctor-specialization indv-doctor-info'>Verified by CharmLife</span>
            </div>
            <div className='indv-doctor-graduation-container indv-doctor-info-subrow' >
              <img src={gradIcon} className='graduation-img' alt='graduation cap' />
              {data?.school && <span className='indv-doctor-graduation indv-doctor-info'>{data.school}</span>}
            </div>
            <div className='indv-doctor-certification-container indv-doctor-info-subrow' >
              <img src={certified} className='certification-img' alt='graduation cap' />
              <span className='indv-doctor-certification indv-doctor-info'>Board Certified</span>
            </div>
          </div>
          <div className='indv-doctor-info-row indv-fifth-row'>
            <div className='indv-consultation-button-container' >
              <button type='button' className='indv-consultation-button'>Book A Consultation</button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default IndividualDoctor;
