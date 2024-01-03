import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

// scss
import "./community-post-detail-pop-up.styles.scss";

// images
import BubblesIcon from "../../../assets/post/bubbles_icon.svg";
import ShareIcon from "../../../assets/post/share_icon.svg";
import heartIcon from "../../../assets/post/heart.png";
import heartIconFilled from "../../../assets/post/heart-fill-Icon.png";

const CommunityPostDetailPopUPSkeleton = ({}) => {
  return (
    <div className="post-detail-popUp-container" ref={containerRef}>
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
            <Skeleton height="200px" width="100%" />
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
            <SkeletonText mt="4" noOfLines={1} spacing="4" />
            <hr className="hr" />
          </div>
          {/* <div className='post-popUp-break-lines'></div> */}
          <div className="post-popUp-comments">
            <span className="detail-gray-font">{commentCount} comments</span>
            {/* {comments&&<CommentCard avatar={comments.avatar} name={comments./>} */}
            <div className="comment-detail">
              {comments?.map((comment, index) => {
                if (comment?.content) {
                  return (
                    <CommentCard
                      key={index}
                      avatar={comment.avatar || ""}
                      name={comment.userName || ""}
                      commentText={convertUnicode(comment.content)}
                      date={formatDate(comment.commentDate)}
                      commentId={comment.id}
                      replies={comment.comments || []}
                      likeCount={comment.likeCount}
                      isLiked={comment.isLike}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
        {postQuery.tempCommentStatus && (
          <div className="comment-card-textarea-container">
            <div className="textarea-with-icon-post">
              {/* <div> */}
              <textarea
                onChange={(e) => setComment(e.target.value)}
                ref={textareaRef}
                type="text"
                placeholder={
                  postQuery.tempCommentStatus === "reply"
                    ? "Reply"
                    : "Share Your Thoughts Here..."
                }
                className="post-comment-card-textarea"
              />
              <button onClick={handleFormSubmit} className="textarea-icon">
                <img src={SendIcon} alt="sendIcon" />
              </button>
              {/* </div> */}
            </div>
          </div>
        )}

        {/* Web */}
        <div className="fixed-input-box">
          <div className="post-detail-send-box-outer-container">
            <div className="Icon-display">
              <span className="Icon-count">
                <img
                  // src={heartIcon}
                  src={isPopupLiked ? heartIconFilled : heartIcon}
                  alt="Icon"
                  className="Icon-size"
                  onClick={toggleGetLikes}
                />
                {popupLikeCount}
              </span>
              {/* <span className='Icon-count'>
                  <img
                    src={StarIcon}
                    alt="Icon"
                    className="Icon-size"
                    onClick={handleInputClick}
                  />
                  {collectCount}
                </span> */}
              <span className="Icon-count">
                <img
                  src={BubblesIcon}
                  alt="Icon"
                  className="Icon-size"
                  onClick={handleClickComment}
                />
                {commentCount}
              </span>
            </div>
            {/* <div className="share-icon">
              <img src={ShareIcon} alt="Image-Share-Icon" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostDetailPopUPSkeleton;
