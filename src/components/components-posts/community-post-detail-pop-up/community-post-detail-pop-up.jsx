import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

// scss
import "./community-post-detail-pop-up.styles.scss";

// images
import BubblesIcon from "../../../assets/post/bubbles_icon.svg";
import ShareIcon from "../../../assets/post/share_icon.svg";
import heartIcon from "../../../assets/post/heart.png";
import heartIconFilled from "../../../assets/post/heart-fill-Icon.png";

const CommunityPostDetailPopUP = ({
  picture,
  brief,
  tag,
  postDate,
  comments,
  likeCount,
  collectCount,
  commentCount,
  id,
}) => {
  const postQuery = usePostQueryStore((state) => state.postQuery);
  const refresh = usePostQueryStore((state) => state.refresh);
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [isHighlight, setIsHightlight] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const setTitle = usePostQueryStore((state) => state.setTitle);
  const setDescription = usePostQueryStore((state) => state.setDescription);
  const setPictures = usePostQueryStore((state) => state.setPictures);

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textareaRef = useRef(null);

  const toast = useToast();

  const schema = z.object({
    comment: z
      .string()
      .nonempty("Comment is required")
      .min(5, "Comment must be at least 5 characters long"),
  });

  // console.log("userInfo in post detail" ,userInfo);

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

  const toggleGetLikes = () => {
    setLiked((prev) => !prev);

    const likesData = {
      postId: id,
    };

    if (!userInfo?.token) {
      toast({
        title: "Please login first.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    console.log("Likes API is called. Yay!", likesData);
    apiMutate(likesData);
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

  const onSubmit = (formData) => {
    console.log("submit comment is called");
    if (!userInfo.token) {
      togglePopup(true, "login");
      return;
    }
    if (errors.comment) {
      alert(errors.comment.message);
      return;
    }
    mutate({
      dynamicId: id,
      text: formData.comment,
    });
  };

  useEffect(() => {
    if (data?.code === 100) {
      // alert("send comment" ,data.msg);
      reset({ comment: "" });
      refresh();
    } else if (data?.code === 500 || data?.code === 403) {
      alert(data.msg);
    }
  }, [data]);

  const handleInputClick = (e) => {
    // console.log("handleInputClick" ,userInfo.token);

    if (!userInfo.token) {
      e.preventDefault();
      togglePopup(true, "login");
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

  const ndate = formatDate(postDate);
  if (
    !picture &&
    !tag &&
    !postDate &&
    !likeCount &&
    !collectCount &&
    !comments &&
    !commentCount &&
    !brief
  ) {
    return null;
  }

  function convertUnicode(input) {
    if (!input) return "";
    return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a, b) =>
      String.fromCharCode(parseInt(b, 16))
    );
  }

  const handleGoToEdit = () => {
    setDescription(brief);
    setPictures(picture);
    navigate("/edit-post");
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
        {/* <div>
          <button
            className="doctor-search-button"
            // style={{
            //   width: "90px",
            //   height: "30px",
            //   radius: "8px",
            //   fontSize: "10px",
            // }}
            onClick={() => (window.location.href = "/download")}
          >
            Try Charm Life
          </button>
        </div> */}
      </div>

      {/* Web */}
      <div className="postdetail-popUp-left-container">
        {!isMobile && picture && (
          <>
            <div className="post-detail-image-wrapper">
              <FontAwesomeIcon
                className="arrow-icon arrow-left"
                icon={faArrowLeft}
                size="lg"
                onClick={goToPreviousImage} // Go to previous image when this icon is clicked
              />
              <img
                src={picture[currentImageIndex]}
                ref={imageRef}
                className="post-detail-image"
                alt="detail-pic"
              />
              <FontAwesomeIcon
                className="arrow-icon arrow-right"
                icon={faArrowRight}
                size="lg"
                onClick={goToNextImage} // Go to next image when this icon is clicked
              />
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
                <button className="button-highlight" onClick={handleHighlight}>
                  {isHighlight ? "Remove from Highlight" : "Highlight"}
                </button>

                <button className="button-private">Private</button>
                <button className="button-edit" onClick={handleGoToEdit}>
                  Edit your Post
                </button>
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
            <span className="post-tag-names">
              #Doctor reviews #Breast Augmentation
            </span>
            <span className="post-date">5/10/2023</span>
            <hr className="hr" />
            {/* {tag && <span className='detail-red-font'>{tag}</span>}
            {postDate && <span className='detail-gray-font'>{ndate}</span>} */}
          </div>
          {/* <div className='post-popUp-break-lines'></div> */}
          <div className="post-popUp-comments">
            <span className="detail-gray-font">{commentCount} comments</span>
            {/* {comments&&<CommentCard avatar={comments.avatar} name={comments./>} */}
            <div className="comment-detail">
              {comments &&
                comments.map((comment, index) => {
                  if (comment && comment.content) {
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="comment-card-input-container">
                {commentCount >= 0 && showCommentBox && (
                  <>
                    <hr />
                    <div className="textarea-with-icon">
                      <textarea
                        {...register("comment")}
                        // ref={textareaRef}
                        type="text"
                        placeholder="Type Something..."
                        className="comment-card-input"
                        onClick={handleInputClick}
                      />
                      <button type="submit">
                        {/* <FontAwesomeIcon icon={faPaperPlane} className="textarea-icon"/> */}
                        submit
                      </button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Mobile */}
        {/* <div className='post-detail-mobile-download-button'>
          <img
            src={DownArrow}
            style={{ marginTop: "50px", width: "15px", height: "13px" }}
          ></img>
          <span className="join-community-text">
            Join the Charm Life Community to View More
          </span>
          <button
            className="doctor-search-button"
            // style={{
            //   width: "150px",
            //   height: "40px",
            //   radius: "20px",
            //   fontSize: "15px",
            //   marginTop: "10px",
            // }}
            onClick={() => (window.location.href = "/download")}
          >
            Try Charm Life
          </button>
        </div> */}

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
            <div className="share-icon">
              <img src={ShareIcon} alt="Image-Share-Icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostDetailPopUP;
