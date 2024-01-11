import React, { useEffect, useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDoctorQueryStore from "../../store.ts";

//images
import glassIcon from "../../assets/user/glassesIcon.png";
import mailIcon from "../../assets/doctor/mailIcon.svg";
import phoneIcon from "../../assets/doctor/phoneIcon.svg";
import stripedGlobeIcon from "../../assets/doctor/stripedGlobeIcon.svg";
import badgeIcon from "../../assets/user/badgeIcon.png";
import locationIcon from "../../assets/user/locationIcon.png";
import gradIcon from "../../assets/user/Graduation Cap.png";
import verifiedBadge from "../../assets/doctor/Group.png";
import certified from "../../assets/user/Certificate.png";
import appointmentCalendar from "../../assets/doctor/calendar.png";

// components
import DoctorProfile from "../../components/component-individual-doctor/doctor-profile/doctor-profile";
import DoctorAbout from "../../components/component-individual-doctor/doctor-about/doctor-about.component";
import UserProfileDoctorPostGrid from "../../components/user-profile-doctor-post-grid/user-profile-doctor-post-grid";
import LogInAccessPopUp from "../../components/log-in-access-popup/log-in-access-popup.jsx";
import { Spinner } from "@chakra-ui/react";
import userInfoQueryStore from "../../userStore.ts";
import DoctorPostGrid from "../../components/community-post-grid/community-post-grid.component.jsx";

// hook
import { useGetDoctorInfo } from "../../hooks/useGetIndividualDoctor.js";
import { useGetDoctorAbout } from "../../hooks/useGetIndividualDoctor";
import { useGetDoctorReviews } from "../../hooks/useGetIndividualDoctor";
import { useFollowUser } from "../../hooks/useFollow.js";
import APIClient from "../../services/api-client.js";
import { useNavigate } from "react-router-dom";
import { retrieveUserFollowList } from "../../hooks/useAuth.js";
import { useGetDoctorPost } from "../../hooks/useApiRequestPostFilter.js";

// scss
import "./individual-doctor.styles.scss";

const IndividualDoctor = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { encodedMemberId } = useParams();
  const navigate = useNavigate();
  const doctorQuery = useDoctorQueryStore((state) => state.doctorQuery);
  const setMemberId = useDoctorQueryStore((state) => state.setMemberId);
  const setNickName = useDoctorQueryStore((state) => state.setNickName);
  const { data, error, isLoading } = useGetDoctorInfo();
  const {
    data: data2,
    error: error2,
    isLoading: isLoading2,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGetDoctorAbout();
  const {
    data: data3,
    error: error3,
    isLoading: isLoading3,
    fetchNextPage: fetchNextPage3,
    isFetchingNextPage: isFetchingNextPage3,
    hasNextPage: hasNextPage3,
  } = useGetDoctorReviews();
  const {
    data: postData,
    isLoading: postIsLoading,
    error: postIsError,
    fetchNextPage: postFetchNextPage,
    hasNextPage: postHasNextPage,
  } = useGetDoctorPost();
  console.log("doctor post data", postData, postIsLoading);
  const { nickname } = data?.nickname || {};
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["About", "Posts", "Likes"];

  useEffect(() => {
    setMemberId(encodedMemberId);
    if (data) {
      setNickName(data.nickname);
    }
  }, [encodedMemberId, data]);

  if (isLoading || isLoading2 || isLoading3) {
    return (
      <div className="chakra-spinner-container">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }

  if (error || error2 || error3) {
    navigate("../*");
  }

  // console.log('Doctor Data is: ', data);
  // console.log('Doctor data2 is: ', data2);
  // console.log('Doctor data3 is: ', data3);

  const selectTab = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="indv-doctor-page-container">
      <DoctorProfileInfo
        data={data}
        data3={data3}
        encodedMemberId={encodedMemberId}
      />

      <div className="indv-doctor-navbar">
        <div
          onClick={() => selectTab(0)}
          className={`indv-doctor-navbar-item ${
            activeTab === 0 ? "indv-active" : ""
          }`}
        >
          About
        </div>
        <div
          onClick={() => selectTab(1)}
          className={`indv-doctor-navbar-item ${
            activeTab === 1 ? "indv-active" : ""
          }`}
        >
          Posts
        </div>
        <div
          onClick={() => selectTab(2)}
          className={`indv-doctor-navbar-item ${
            activeTab === 2 ? "indv-active" : ""
          }`}
        >
          Like
        </div>
      </div>
      {activeTab === 0 && <DoctorAbout encodedMemberId={encodedMemberId} />}
      {activeTab === 1 && (
        <div className="individual-doctor-posts">
          {/* <UserProfileDoctorPostGrid /> */}
          <DoctorPostGrid
            data={postData}
            isLoading={postIsLoading}
            error={postIsError}
            fetchNextPage={postFetchNextPage}
            hasNextPage={postHasNextPage}
            download={false}
          />
        </div>
      )}
    </div>
  );

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

const DoctorProfileInfo = ({ data, data3, encodedMemberId }) => {
  // data3 = data?.data3;
  // data = data?.data;
  // console.log('data3 is: ', data3);

  // const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isUserFollowing, setIsUserFollowing] = useState(false);
  const [followers, setFollowers] = useState(
    data3?.pages[0]?.data?.data?.followers
  );
  const { doctorStars } = data3?.pages[0]?.data?.data || {};
  const { postNumber } = data3?.pages[0]?.data?.data || 0;
  // const {followers} = data3?.pages[0]?.data?.data || 0;
  const { followings } = data3?.pages[0]?.data?.data || 0;
  const togglePopUp = userInfoQueryStore((state) => state.togglePopup);

  useEffect(() => {
    // console.log('data1 is: ', data);
    // console.log('data3 is: ', data3);
    // setFollowers(data3?.pages[0]?.data?.data.followers);
    let followArray = localStorage.getItem("charmFollowedUsers");
    if (followArray !== null) {
      followArray = JSON.parse(followArray);
      if (followArray.includes(Number(encodedMemberId))) {
        setIsUserFollowing(true);
      }
    }
  }, [encodedMemberId]);

  // const result = useFollowUser(data?.memberId);
  // console.log('Result of follow is: ', result);

  const followUser = (userId) => {
    console.log("attempting to follow this doctor");
    const apiClient = new APIClient("/user_action/actions/follow");
    const fetchFollowUser = async () => {
      try {
        const res = await apiClient.post({
          userId: userId,
        });
        setIsUserFollowing(true);
        setFollowers(followers + 1);
        let followArray = localStorage.getItem("charmFollowedUsers");
        followArray = JSON.parse(followArray);
        followArray.push(userId);
        localStorage.setItem("charmFollowedUsers", JSON.stringify(followArray));
        return res.data;
      } catch (err) {
        if (err?.response?.status === 403) {
          // if the user tries to follow without logging in
          togglePopUp(true, "accountType");
          // setIsLoginPopupOpen(true);
        }
        console.log("Error trying to follow target: ", err.response.status);
      }
    };
    fetchFollowUser();
  };

  const unfollowUser = (userId) => {
    console.log("attempting to unfollow this doctor");
    const apiClient = new APIClient("/user_action/actions/unfollow");
    const fetchUnfollowUser = async () => {
      try {
        const res = await apiClient.post({
          userId: userId,
        });
        console.log("Res returned as: ", res);
        setIsUserFollowing(false);
        setFollowers(followers - 1);
        let followArray = localStorage.getItem("charmFollowedUsers");
        followArray = JSON.parse(followArray);
        const index = followArray.indexOf(userId);
        followArray.splice(index, 1);
        localStorage.setItem("charmFollowedUsers", JSON.stringify(followArray));
        return res.data;
      } catch (err) {
        if (err?.response?.status === 403) {
          // if the user tries to follow without logging in
          togglePopUp(true, "accountType");
          // setIsLoginPopupOpen(true);
        }
        console.log("Error trying to follow target: ", err.response.status);
      }
    };
    fetchUnfollowUser();
  };

  // console.log('isUserFollowing is: ', isUserFollowing);

  // const result = retrieveUserFollowList();

  // console.log('data is: ', data);
  // console.log('data3 is: ', data3);

  const navigate = useNavigate();

  const handleGoToAppointmentPageNow = () => {
    navigate("/doctor-appointment-1");
  };

  return (
    <>
      <div className="indv-doctor-info-container">
        <div className="indv-doctor-profile-picture-container">
          <img
            className="indv-doctor-profile-picture"
            src={data?.img}
            alt="Doctor"
          />
        </div>
        <div className="indv-doctor-info-sub-container">
          <div className="indv-doctor-info-row indv-top-row">
            <div className="indv-top-row-left-side">
              <div className="indv-doctor-name-container">
                {data?.nickname ? (
                  <h2 className="indv-doctor-name">Dr. {data.nickname}</h2>
                ) : (
                  <h2 className="indv-doctor-name">Doctor</h2>
                )}
              </div>
              <div className="indv-doctor-verified-container">
                <img
                  className="indv-doctor-verified-badge"
                  src={verifiedBadge}
                  alt="verified"
                />
              </div>
            </div>
            <div className="indv-top-row-right-side">
              <div className="indv-doctor-info-icon-container">
                <img
                  src={mailIcon}
                  className="indv-doctor-info-icon"
                  alt="email"
                />
              </div>
              <div className="indv-doctor-info-icon-container">
                <img
                  src={phoneIcon}
                  className="indv-doctor-info-icon"
                  alt="phone"
                />
              </div>
              <div className="indv-doctor-info-icon-container">
                <img
                  src={stripedGlobeIcon}
                  className="indv-doctor-info-icon"
                  alt="globe"
                />
              </div>
              {/* <div className='indv-appointment-management-container' >
                <img className='indv-appointment-mangament' src={appointmentCalendar} alt='calendar appointments' />
              </div> */}
            </div>
          </div>
          <div className="indv-doctor-info-row indv-second-row">
            <div className="indv-doctor-description-container">
              {data?.miaoshu ? (
                <p className="indv-doctor-description">{data.miaoshu}</p>
              ) : (
                <p className="indv-doctor-description">Cosmetic Doctor</p>
              )}
            </div>
          </div>
          <div className="indv-doctor-info-row indv-third-row">
            <div className="indv-posts-total-container">
              {postNumber} <span className="gray-text-container">posts</span>
            </div>
            <div className="indv-followers-total-container">
              {followers} <span className="gray-text-container">followers</span>
            </div>
            <div className="indv-following-total-container">
              {followings}{" "}
              <span className="gray-text-container">following</span>
            </div>
          </div>
          <div className="indv-doctor-info-row indv-fourth-row">
            <div className="indv-doctor-city-state-container indv-doctor-info-subrow">
              <img src={locationIcon} className="location-img" alt="location" />
              {data?.address && (
                <span className="indv-doctor-city-state indv-doctor-info">
                  {data?.address}
                </span>
              )}
            </div>
            <div className="indv-doctor-specialization-container indv-doctor-info-subrow">
              <img
                src={glassIcon}
                className="specialization-img"
                alt="specialization"
              />
              {data?.name?.length > 0 && (
                <span className="indv-doctor-specialization indv-doctor-info">
                  Specialization in {convertTitle(data?.name[0])}
                </span>
              )}
            </div>
            <div className="indv-doctor-verification-container indv-doctor-info-subrow">
              <img
                src={badgeIcon}
                className="verification-img"
                alt="verification"
              />
              <span className="indv-doctor-specialization indv-doctor-info">
                Verified by CharmLife
              </span>
            </div>
            <div className="indv-doctor-graduation-container indv-doctor-info-subrow">
              <img
                src={gradIcon}
                className="graduation-img"
                alt="graduation cap"
              />
              {data?.school && (
                <span className="indv-doctor-graduation indv-doctor-info">
                  {data.school}
                </span>
              )}
            </div>
            <div className="indv-doctor-certification-container indv-doctor-info-subrow">
              <img
                src={certified}
                className="certification-img"
                alt="graduation cap"
              />
              <span className="indv-doctor-certification indv-doctor-info">
                Board Certified
              </span>
            </div>
          </div>
          <div className="indv-doctor-info-row indv-fifth-row">
            {isUserFollowing ? (
              <button
                type="button"
                onClick={() => unfollowUser(data?.memberId)}
                className="indv-unfollow-button"
              >
                Unfollow
              </button>
            ) : (
              <button
                type="button"
                onClick={() => followUser(data?.memberId)}
                className="indv-button indv-follow-button"
              >
                Follow
              </button>
            )}
            {/* UNCOMMENT FOR 2.0 RELEASE (WHEN API IS IMPLEMENTED) */}
            {/* <button type='button' className='indv-button indv-consultation-button'>Book a Consultation with Me!</button> */}
          </div>
          {/* this is dummu button to navigate to doctor appointment page for demo */}
          <button onClick={handleGoToAppointmentPageNow}>Dummy</button>
        </div>
      </div>
    </>
  );
};

const convertTitle = (string) => {
  const splitItem = string.split("_");
  const upperCased = splitItem.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  const procedureTitle = upperCased.join(" ");
  return procedureTitle;
};

export default IndividualDoctor;
