import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// import { Button } from 'react-bootstrap';

// stores
import usePostQueryStore from "../../../postStore.ts";
import userInfoQueryStore from "../../../userStore.ts";

// components
import CommentCard from "../../comment-card/comment-card";
// import CommunitySendMsg from '../community-send-msg/community-send-msg.component';

// hooks
import { useAddComment } from "../../../hooks/useComment";
import { useGetLikesPost } from "../../../hooks/useGetPosts.js";
import { useApiRequestSetPostDisplay } from "../../../hooks/useApiRequestPost";
import { useApiRequestSetPostPublic } from "../../../hooks/useApiRequestPost";

// scss
import "./community-post-detail-pop-up.styles.scss";

// images
import BubblesIcon from "../../../assets/post/bubbles_icon.svg";
import ShareIcon from "../../../assets/post/share_icon.svg";
import heartIcon from "../../../assets/post/heart.png";
import heartIconFilled from "../../../assets/post/heart-fill-Icon.png";
import SendIcon from "../../../assets/post/send_icon.svg";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import CommentReplyInput from "../../comment-card/comment-reply-input.jsx";

const CommunityPostDetailPopUP = ({
  picture,
  brief,
  tag,
  postDate,
  comments,
  likeCount,
  collectCount,
  commentCount,
}) => {
  // console.log("tag", postDate);
  const postQuery = usePostQueryStore((state) => state.postQuery);
  const refresh = usePostQueryStore((state) => state.refresh);
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [isHighlight, setIsHightlight] = useState(false);
  const [isPrivate, setIsPrivate] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const setDescription = usePostQueryStore((state) => state.setDescription);
  const setPictures = usePostQueryStore((state) => state.setPictures);
  const [showArrows, setShowArrows] = useState(false);

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textareaRef = useRef(null);
  // console.log("postQuery", postQuery);

  const toast = useToast();
  var isAuthor = userInfo.userId == postQuery.memberID;
  var isDoctorAuthor =
    userInfo.userId == postQuery.memberID &&
    localStorage.getItem("accountType") === "2";
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : picture.length - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < picture.length - 1 ? prevIndex + 1 : 0
    );
  };

  const schema = z.object({
    comment: z
      .string()
      .nonempty("Comment is required")
      .min(5, "Comment must be at least 5 characters long"),
  });
  // Set post display(private/public)
  const { mutate: apiMutateSetPostDisplay } = useApiRequestSetPostDisplay({
    onError: (error) => {
      toast({
        title: "Failed.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });
  const { mutate: apiMutateSetPostPublic } = useApiRequestSetPostPublic({
    onError: (error) => {
      toast({
        title: "Failed.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });
  const toggleSetPostDisplay = () => {
    setIsPrivate((prev) => !prev);
    const apiMutation = isPrivate
      ? apiMutateSetPostPublic
      : apiMutateSetPostDisplay;
    if (validateTokenAndPopup()) {
      apiMutation({ id: postQuery.postID });
    }
  };

  // api
  const { mutate: apiMutate } = useGetLikesPost({
    onError: (error) => {
      toast({
        title: "Failed.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const toggleGetLikes = () => {
    setLiked((prev) => !prev);
    if (validateTokenAndPopup()) {
      apiMutate({ postId: postQuery.postID });
    }
  };
  const { mutate, data, isLoading, isError, error } = useAddComment();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validateTokenAndPopup()) {
      // console.log("mutate is called");
      mutate({
        dynamicId: postQuery.postID,
        text: comment,
      });
      refresh();
    }
  };

  const validateTokenAndPopup = () => {
    if (!userInfo.token) {
      togglePopup(true, "accountType");
      return false;
    }
    return true;
  };

  const handleInputClick = (e) => {
    if (!userInfo.token) {
      e.preventDefault();
      togglePopup(true, "accountType");
    }
  };

  const handleClickComment = () => {
    setShowCommentBox((prev) => !prev);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // when click the comment button it will scroll down to textarea
  useEffect(() => {
    if (showCommentBox && textareaRef.current && containerRef.current) {
      textareaRef.current.focus();
      containerRef.current.scrollTo({
        top: textareaRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  }, [showCommentBox, commentCount]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US");
    return formattedDate;
  };

  function convertUnicode(input) {
    if (!input) return "";
    return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a, b) =>
      String.fromCharCode(parseInt(b, 16))
    );
  }

  const handleGoToEdit = () => {
    setDescription(brief);
    setPictures(picture);
    navigate(`/edit-post/${postQuery.postID}`);
    // navigate('/edit-post');
  };

  // highlight
  const handleHighlight = () => {
    setIsHightlight((prev) => !prev);
  };

  return (
    <div className="post-detail-popUp-container" ref={containerRef}>
      {/* Moblie */}
      <div className="post-detail-mobile-profile-container">
        <div className="post-detail-mobile-profile">
          <img
            src={postQuery.userAvatar}
            className="post-detail-mobile-avatar"
          ></img>
          <span className="post-detail-user-name-mobile">
            {postQuery.userName}
          </span>
        </div>
      </div>

      {/* Web */}
      <div className="postdetail-popUp-left-container">
        {!isMobile && picture && (
          <>
            <div
              className="post-detail-image-wrapper"
              onMouseEnter={() => setShowArrows(true)}
              onMouseLeave={() => setShowArrows(false)}
            >
              {currentImageIndex > 0 && showArrows && (
                <FontAwesomeIcon
                  className="arrow-icon arrow-left"
                  icon={faArrowLeft}
                  size="lg"
                  onClick={goToPreviousImage}
                  style={{ color: "#fafcff" }}
                />
              )}
              <img
                src={picture[currentImageIndex]}
                ref={imageRef}
                className="post-detail-image"
                alt="detail-pic"
              />
              {currentImageIndex < picture.length - 1 && showArrows && (
                <FontAwesomeIcon
                  className="arrow-icon arrow-right"
                  icon={faArrowRight}
                  size="lg"
                  onClick={goToNextImage}
                  style={{ color: "#fafcff" }}
                />
              )}
              {showArrows && (
                <div className="image-index-tag">
                  {currentImageIndex + 1} / {picture.length}
                </div>
              )}
            </div>
            <div className="user-detail">
              <div className="user-detail-inner">
                <img
                  src={postQuery.userAvatar}
                  alt="Image-User-Picture"
                  className="user-detail-profile-image"
                />
                <span>{postQuery.userName}</span>
              </div>
              <div className="user-detail-button-container">
                {isDoctorAuthor && (
                  <button
                    className="button-highlight"
                    onClick={handleHighlight}
                  >
                    {isHighlight ? "Remove from Highlight" : "Highlight"}
                  </button>
                )}
                {isAuthor && (
                  <button
                    className="button-private"
                    onClick={toggleSetPostDisplay}
                  >
                    {isPrivate ? "Remove from private" : "Private"}
                  </button>
                )}
                {isAuthor && (
                  <button className="button-edit" onClick={handleGoToEdit}>
                    Edit your Post
                  </button>
                )}
                {isAuthor && (
                  <button className="button-edit" onClick={handleGoToEdit}>
                    Edit your Post
                  </button>
                )}
              </div>
            </div>
          </>
        )}
        {isMobile && <img src={picture} ref={imageRef}></img>}
      </div>
      <div className="postdetail-popUp-right-container">
        <div className="detail-top-content">
          <div className="post-popUp-content">
            <h2 className="postdetail-popUp-title">{postQuery.title}</h2>
            <hr className="hr" />
            <p className="post-description">{brief || "No description"}</p>
            {tag && (
              <span className="post-tag-names">
                {tag.map((t) => `#${t.tagName}`).join("")}
              </span>
            )}
            {postDate && <span className="post-date">{postDate}</span>}
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
                      onClick={handleInputClick}
                    />
                  );
                }
                return null;
              })}
            </div>
            {/* <form> */}
            <div className="comment-card-input-container">
              {commentCount >= 0 && showCommentBox && (
                <div className="textarea-with-icon-post">
                  <textarea
                    // {...register("comment")}
                    onChange={(e) => setComment(e.target.value)}
                    ref={textareaRef}
                    type="text"
                    placeholder="Type Something..."
                    className="post-comment-card-input"
                  />
                  <button
                    onClick={handleFormSubmit}
                    type="submit"
                    className="textarea-icon"
                  >
                    <img src={SendIcon} alt="sendIcon" />
                  </button>
                </div>
              )}
            </div>
            {/* </form> */}
          </div>
        </div>

        {/* Web */}
        <div className="fixed-input-box">
          <div className="post-detail-send-box-outer-container">
            <div className="Icon-display">
              <span className="Icon-count">
                <img
                  // src={heartIcon}
                  src={liked ? heartIconFilled : heartIcon}
                  alt="Icon"
                  className="Icon-size"
                  // onClick={handleInputClick}
                  onClick={toggleGetLikes}
                />
                {likeCount}
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

export default CommunityPostDetailPopUP;
