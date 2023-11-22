import { useNavigate } from "react-router-dom";
import doctorAvartar from "../../assets/doctor/doctor-profile-image.png";
import doctorVerify from "../../assets/doctor/Group.png";
import calendar from "../../assets/doctor/calendar.png";
import glassIcon from "../../assets/user/glassesIcon.png";
import badgeIcon from "../../assets/user/badgeIcon.png";
import locationIcon from "../../assets/user/locationIcon.png";
import gradIcon from "../../assets/user/Graduation Cap.png";
import certified from "../../assets/user/Certificate.png";
import "./doctor-own-profile-Basic.styles.scss";
import { useGetUserInfo } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import userInfoQueryStore from "../../userStore";
import HomeSpinner from "../home-spinner/home-spinner.component";
const DocotorOwnBasic = () => {
  //   const { data, isLoading, isError, error } = useGetUserInfo();
  //   if (data) {
  //     console.log("data in doctor profile", data);
  //   }
  //   if (isLoading) {
  //     return <HomeSpinner />;
  //   }
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  return (
    <div className="doctor-own-basic-conatiner ">
      <div className="doctor-own-basic-avatar">
        <img
          src={doctorAvartar}
          className="doctor-own-avatar-img"
          style={{ width: "180px", height: "180px" }}
        ></img>
      </div>
      <div className="doctor-own-basic-info">
        <div className="doctor-own-basic-top-name">
          <div className="doctor-own-basic-name">
            {userInfo.username && (
              <span className="doctor-own-name-text">{userInfo.username}</span>
            )}
            <img
              src={doctorVerify}
              style={{ width: "25px", height: "25px" }}
            ></img>
          </div>
          <div className="doctor-own-basic-edits-buttons">
            <Link to="/userProfileEdit" className="top-edit-button-1">
              edit profile
            </Link>
            <Link to="/userAppointment" className="top-edit-button-2">
              <img src={calendar} className="doctor-calendar-img"></img>
            </Link>
          </div>
        </div>
        <div className="doctor-own-basic-top-text">
          <div className="doctor-own-basic-specialization">
            {userInfo.description && (
              <span className="doctor-specialization-text">
                {userInfo.description}
              </span>
            )}
          </div>
          <div className="doctor-own-basic-app-button">
            <button className="text-management-button">
              Manage Appointments
            </button>
          </div>
        </div>
        <div className="doctor-own-basic-medium">
          <div className="doctor-follow-like-follower">
            <span className="doctor-follow-number">
              {userInfo.postCount || 0}
            </span>
            <span className="doctor-own-follow-text">posts</span>
          </div>
          <div className="doctor-follow-like-follower">
            <span className="doctor-follow-number">
              {userInfo.followerCount || 0}
            </span>
            <span className="doctor-own-follow-text">follower</span>
          </div>
          <div className="doctor-follow-like-follower">
            <span className="doctor-follow-number">
              {userInfo.followingCount || 0}
            </span>
            <span className="doctor-own-follow-text">following</span>
          </div>
        </div>
        <div className="doctor-own-basic-bottom">
          <div className="doctor-info-category">
            <img src={locationIcon} className="doctor-own-info-icon"></img>
            <span className="doctor-own-info-text">City,State</span>
          </div>
          <div className="doctor-info-category">
            <img src={glassIcon} className="doctor-own-info-icon"></img>
            <span className="doctor-own-info-text">
              specilization in Field{" "}
            </span>
          </div>
          <div className="doctor-info-category">
            <img src={badgeIcon} className="doctor-own-info-icon"></img>
            <span className="doctor-own-info-text">verified by CharmLife</span>
          </div>
          <div className="doctor-info-category">
            <img src={gradIcon} className="doctor-own-info-icon"></img>
            <span className="doctor-own-info-text">University of Arizona</span>
          </div>
          <div className="doctor-info-category">
            <img src={certified} className="doctor-own-info-icon"></img>
            <span className="doctor-own-info-text">
              Board Certified Dermetiologist
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocotorOwnBasic;
