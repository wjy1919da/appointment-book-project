import React from "react";
import "./doctor-profile.styles.scss";
import { Link, useNavigate } from "react-router-dom";
import DoctorProfileImage from "../../../assets/doctor/doctor-profile-image.png";
import locationIcon from "../../../assets/doctor/search-card-locationIcon.png";
import glassIcon from "../../../assets/doctor/search-card-glassIcon.png";
import badgeIcon from "../../../assets/doctor/search-card-badgeIcon.png";
import FollowButton from "../../follow-button/follow-button.component";
import { useGetDoctorReviews } from "../../../hooks/useGetIndividualDoctor";
import StarRate from "../../starRate/starRate";
import backIcon from "../../../assets/doctor/left_back.png";
import { useMediaQuery } from "react-responsive";
import HomeButton from "../../home-button/home-button.component";
import { useCreateOrRetrieveChannel } from "../../hooks/useCreateOrRetrieveChannel.js";
import ProfileMessage from "../../profile-message/profile-message.component";
import userInfoQueryStore from "../../../userStore";
import useDoctorQueryStore from "../../../store.ts";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
const DoctorProfile = ({ nickname, projects, mechName, address }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 767px)` });
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const doctorQuery = useDoctorQueryStore((state) => state.doctorQuery);
  const buttonHeight = isMobile ? "50px" : "56px";
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useGetDoctorReviews();

  const { doctorStars } = data?.pages[0]?.data?.data || {};
  const { postNumber } = data?.pages[0]?.data?.data || {};
  const { followers } = data?.pages[0]?.data?.data || {};
  const { followings } = data?.pages[0]?.data?.data || {};
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/download");
  };
  const { mutate: createOrRetrieveChannel, data: channelData } =
    useCreateOrRetrieveChannel(APP_ID, USER_ID);
  useEffect(() => {
    if (userInfo.userId && doctorQuery.nickName) {
      createOrRetrieveChannel(userInfo.userId, doctorQuery.nickName);
    }
  }, [doctorQuery.nickName]);
  const inboxDisclosure = useDisclosure();
  return (
    <div className="doctor-profile-container">
      <img
        src={DoctorProfileImage}
        class="img-fluid rounded-start individual-doctor-pic"
        alt="..."
        style={{ width: "160px", height: "160px" }}
      ></img>
      <div className="profile-card-body">
        {nickname && <span className="search-card-title">{nickname}</span>}
        <span className="starRate">
          <StarRate rate={doctorStars || 4} />
        </span>
        {address && (
          <span className="search-card-text ">
            <img
              src={locationIcon}
              style={{
                height: "18px",
                marginTop: "4px",
                marginInlineStart: "2px",
                marginInlineEnd: "2px",
              }}
              alt="location"
            ></img>
            {address}
          </span>
        )}
        {projects && (
          <span className="search-card-text ">
            <img
              src={glassIcon}
              style={{ height: "18px", marginTop: "4px" }}
              alt="glass"
            ></img>
            {projects.join(", ")}
          </span>
        )}
        <span className="search-card-text ">
          <img
            src={badgeIcon}
            style={{ height: "18px", marginTop: "4px" }}
            alt="badge"
          ></img>
          Charm Verified
        </span>
      </div>
      <div className="post-follower-following">
        <div className="info-showlist">
          <span className="infor-number">{postNumber || 0}</span>
          <span className="infor-text">Posts</span>
        </div>
        <div className="info-showlist">
          <span className="infor-number">{followers || 0}</span>
          <span className="infor-text">Follower</span>
        </div>
        <div className="info-showlist">
          <span className="infor-number">{followings || 0}</span>
          <span className="infor-text">Following</span>
        </div>
      </div>
      {/* Link is unavaliable so I hide these buttons */}
      <div className="consult-follow-button">
        <HomeButton
          height={buttonHeight}
          title="Consult Doctor"
          href="/download"
        />
        <FollowButton title="Follow" onClick={handleOnClick} />
        {/* Inbox test button */}
        <div onClick={inboxDisclosure.onOpen}>SendMessage</div>
      </div>
      <div className="doctor-profile-back">
        <Link to="/doctor">
          <img
            src={backIcon}
            className="back-link-icon"
            style={{
              display: "inline-block",
              marginInlineEnd: "10px",
              marginBottom: "3px",
            }}
            alt="back"
          />
          <span className="back-link">All Doctors</span>
        </Link>
      </div>
      <Modal
        onClose={inboxDisclosure.onClose}
        isOpen={inboxDisclosure.isOpen}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent width="1200px" maxW="1400px">
          <ModalHeader>Inbox</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProfileMessage isConversion={false} />
          </ModalBody>
          <ModalFooter>
            {/* <Button onClick={inboxDisclosure.onClose}>Close</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DoctorProfile;
