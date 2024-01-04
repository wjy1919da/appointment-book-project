import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import CommentCardSkeleton from "../../comment-card/comment-card-skeleton";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  Card,
  CardBody,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";
// images
import BubblesIcon from "../../../assets/post/bubbles_icon.svg";
import heartIcon from "../../../assets/post/heart.png";

// scss
import "./community-post-detail-pop-up.styles.scss";

const CommunityPostDetailPopUPSkeleton = () => {
  let comments = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className="post-detail-popUp-container">
      {/* Moblie */}
      {/* <div className="post-detail-mobile-profile-container">
        <div className="post-detail-mobile-profile">
          <img
            src={postQuery.userAvatar}
            className="post-detail-mobile-avatar"
          ></img>
          <span className="post-detail-user-name-mobile">
            {postQuery.userName}
          </span>
        </div>
      </div> */}

      {/* Web */}
      <div className="postdetail-popUp-left-container">
        <>
          <div className="post-detail-image-wrapper">
            <Skeleton height="100%" width="100%" />
          </div>
          <div className="user-detail">
            <div className="user-detail-inner">
              <SkeletonCircle size="10" />
            </div>
          </div>
        </>
        {/* {isMobile && <img src={picture} ref={imageRef}></img>} */}
      </div>
      <div className="postdetail-popUp-right-container">
        <div className="detail-top-content">
          <div className="post-popUp-content">
            <SkeletonText mt="4" noOfLines={1} spacing="4" />
            <hr className="hr" />
          </div>
          {/* <div className='post-popUp-break-lines'></div> */}
          <div className="post-popUp-comments">
            <div className="comment-detail">
              {comments.map((comment, index) => {
                return <CommentCardSkeleton />;
              })}
            </div>
          </div>
        </div>
        <div className="fixed-input-box">
          <div className="post-detail-send-box-outer-container">
            <div className="Icon-display">
              <span className="Icon-count">
                <img src={heartIcon} alt="Icon" className="Icon-size" />
              </span>
              <span className="Icon-count">
                <img src={BubblesIcon} alt="Icon" className="Icon-size" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostDetailPopUPSkeleton;
