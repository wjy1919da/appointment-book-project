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
} from "@chakra-ui/react";

// stores
import usePostQueryStore from "../../../postStore.ts";
import userInfoQueryStore from "../../../userStore.ts";

// components
import CommentCard from "../../comment-card/comment-card";

// hooks
import { useAddComment } from "../../../hooks/useComment";
import { useRplyComment } from "../../../hooks/useComment";
import { useGetLikesPost } from "../../../hooks/useGetPosts.js";
import { useHighlightPost } from "../../../hooks/useGetPosts.js";
import { useRemoveHighlightPost } from "../../../hooks/useGetPosts.js";
import { useApiRequestSetPostDisplay } from "../../../hooks/useApiRequestPost"; // private
import { useApiRequestSetPostPublic } from "../../../hooks/useApiRequestPost"; // remove private

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
import { is } from "date-fns/locale";
import { set } from "date-fns";

const CommunityPostDetailPopUP = ({
  picture,
  brief,
  tag,
  postDate,
  comments,
  likeCount,
  collectCount,
  commentCount,
  isPrivate,
  isHighlight,
}) => {
  const postQuery = usePostQueryStore((state) => state.postQuery);
  // console.log("my post detail", postQuery.userAvatar);
  const refresh = usePostQueryStore((state) => state.refresh);
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false); // like
  // const [isHighlight, setIsHighlight] = useState(false); // highlight
  // const [isPrivate, setIsPrivate] = useState(0); // private
  const setIsPrivate = usePostQueryStore((state) => state.setIsPrivate);
  const setIsHighlight = usePostQueryStore((state) => state.setIsHighlight);
  const [comment, setComment] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const setDescription = usePostQueryStore((state) => state.setDescription);
  const setPictures = usePostQueryStore((state) => state.setPictures);
  const [showArrows, setShowArrows] = useState(false);
  const [modalStatus, setModalStatus] = useState("");
  // Reply comment
  const setTempCommentStatus = usePostQueryStore((s) => s.setTempCommentStatus);

  // refs
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textareaRef = useRef(null);

  // chakura ui modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalHeader, setModalHeader] = useState("");
  const [modalContent, setModalContent] = useState("");

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

  // highlight api import
  const { mutate: apiMutateHightlight } = useHighlightPost({
    onError: (error) => {
      toast({
        title: "Failed.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  // remove highlight api import
  const { mutate: apiMutateRemoveHighlight } = useRemoveHighlightPost({
    onError: (error) => {
      toast({
        title: "Failed to remove highlight.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  // private api import
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

  //  remove private api import
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
  const handlePrivateClick = () => {
    if (validateTokenAndPopup()) {
      setModalStatus("private");
      if (!postQuery.isPrivate) {
        setModalHeader("Private Post");
        setModalContent("Private");
      } else {
        setModalHeader("Remove Private");
        setModalContent("Remove Private");
      }
      onOpen();
    }
  };
  // console.log("postQuery", postQuery);
  // private click call api
  const handlePrivate = () => {
    if (validateTokenAndPopup()) {
      setIsPrivate(!postQuery.isPrivate);
      const apiMutation = postQuery.isPrivate
        ? apiMutateSetPostPublic
        : apiMutateSetPostDisplay;
      if (validateTokenAndPopup()) {
        apiMutation({ id: postQuery.postID });
      }
      onClose();
    }
  };
  const handleHighlightClick = () => {
    if (validateTokenAndPopup()) {
      setModalStatus("highlight");
      if (!postQuery.isHighlight) {
        setModalHeader("Highlight Post");
        setModalContent("Highlight");
      } else {
        setModalHeader("Remove Highlight");
        setModalContent("Remove Highlight");
      }
      onOpen();
    }
  };
  // highlight click call api
  const handleHighlight = () => {
    if (validateTokenAndPopup()) {
      setIsHighlight(!postQuery.isHighlight);
      const apiHighlightMutation = postQuery.isHighlight
        ? apiMutateRemoveHighlight
        : apiMutateHightlight;
      if (validateTokenAndPopup()) {
        apiHighlightMutation({ id: postQuery.postID });
      }
      onClose();
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
    if (validateTokenAndPopup()) {
      setLiked((prev) => !prev);
      if (validateTokenAndPopup()) {
        apiMutate({ postId: postQuery.postID });
      }
    }
  };
  const { mutate } = useAddComment({
    onError: (error) => {
      toast({
        title: "Failed.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { mutate: apiReplyComment } = useRplyComment({
    onError: (error) => {
      toast({
        title: "Failed.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validateTokenAndPopup()) {
      if (postQuery.tempCommentStatus === "comment") {
        mutate({
          dynamicId: postQuery.postID,
          text: comment,
        });
      }
      if (postQuery.tempCommentStatus === "reply") {
        apiReplyComment({
          commentId: postQuery.commentId,
          text: comment,
        });
      }
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

  // comment box
  const handleClickComment = () => {
    setTempCommentStatus(true, "comment");
  };

  // when click the comment button it will scroll down to textarea
  useEffect(() => {
    const rightContainer = document.querySelector(".detail-top-content");

    let debounceTimer;
    const handleScroll = () => {
      setTempCommentStatus(false);
    };

    if (rightContainer) {
      rightContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (rightContainer) {
        rightContainer.removeEventListener("scroll", handleScroll);
      }
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, []);

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
                    onClick={handleHighlightClick}
                  >
                    {postQuery.isHighlight
                      ? "Remove from Highlight"
                      : "Highlight"}
                  </button>
                )}

                {isAuthor && (
                  <button
                    className="button-private"
                    onClick={handlePrivateClick}
                  >
                    {postQuery.isPrivate ? "Remove from Private" : "Private"}
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
                      commentId={comment.id}
                      replies={comment.comments || []}
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
                  src={liked ? heartIconFilled : heartIcon}
                  alt="Icon"
                  className="Icon-size"
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

      {/* highlight modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <ModalContent
          backgroundColor="transparent"
          boxShadow="none"
          textAlign="center"
        >
          <ModalHeader color="#ffffff" fontSize="25px">
            {modalHeader}
          </ModalHeader>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button
              color="#ffffff"
              backgroundColor="#675f5a"
              outline="none"
              _hover="none"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              color="#ffffff"
              backgroundColor="#f1a285"
              outline="none"
              _hover="none"
              onClick={
                modalStatus === "private" ? handlePrivate : handleHighlight
              }
            >
              {modalContent}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommunityPostDetailPopUP;
