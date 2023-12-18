import { useState, useEffect, useRef } from "react";
import React from "react";
import { useToast } from "@chakra-ui/react";
import usePostQueryStore from "../../postStore.ts";
// hooks
import { useGetCommentLikesPost } from "../../hooks/useGetPosts.js";

// scss
import "./comment-card.styles.scss";
import "../components-posts/community-post-detail-pop-up/community-post-detail-pop-up.styles.scss";

// images
import HeartIcon from "../../assets/post/heart.png";
import SendIcon from "../../assets/post/send_icon.svg";

// import commentIcon from '../../assets/post/chat_bubble.png';
import CommentReplyInput from "./comment-reply-input";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";

const CommentCard = ({
  avatar,
  name,
  date,
  commentText,
  commentId,
  onClick,
  replies,
}) => {
  // console.log("comment avatar", avatar);
  console.log("comment replies", replies);
  const [isOpen, setIsOpen] = useState(false);

  const handleCustomButtonClick = () => {
    setIsOpen(!isOpen);
  };
  const toast = useToast();
  var commentId = commentId;
  const postQuery = usePostQueryStore((state) => state.postQuery);
  const setTempCommentStatus = usePostQueryStore(
    (state) => state.setTempCommentStatus
  );
  const setCommentId = usePostQueryStore((state) => state.setCommentId);
  
  const [showCommentBox, setShowCommentBox] = useState(false);

  const [visibleReplies, setVisibleReplies] = useState(3);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen); // Toggle the isPanelOpen state
    if (!isPanelOpen && visibleReplies > 3) {
      setVisibleReplies(3); // If panel is being closed, reset to show only 3 replies
    }
  };

  const handleShowMoreReplies = () => {
    setVisibleReplies(replies.length);
  };

  // refs
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  // useEffect(() => {
  //   if (showReplyCommentBox && textareaRef.current && containerRef.current) {
  //     textareaRef.current.focus();
  //     containerRef.current.scrollTo({
  //       top: textareaRef.current.offsetTop,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [showReplyCommentBox]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US");
    return formattedDate;
  };

  const newDate = formatDate(date);

  function convertUnicode(input) {
    return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a, b) =>
      String.fromCharCode(parseInt(b, 16))
    );
  }

  // like comment
  const { mutate: apiCommentLikeMutate } = useGetCommentLikesPost({
    onError: (error) => {
      toast({
        title: "Failed.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });


  const handleClickCommentLike = (commentId) => {
    console.log('COMMENT ID', commentId);
    setLikedComment((prev) => !prev);
    apiCommentLikeMutate({ commentId: commentId });
  };

  // reply comment
  const handleClickReply = () => {
    setCommentId(commentId);
    if (postQuery.tempCommentStatus === "reply") {
      setTempCommentStatus(false);
    } else {
      setTempCommentStatus(true, "reply");
    }
  };


  return (
    <div>
      <div className="comment-card-container">
        <div className="comment-card-inner-container">
          <div className="comment-card-detail-container">
            <div className="comment-card-profile-information-wrapper">
              <div className="reviewer-profile-information">
                <div className="reviewer-progile-avatar">
                  <img
                    src={avatar}
                    className="reviewer-avatar"
                    alt="avatar"
                  ></img>
                </div>
                <div className="reviewer-information">
                  <div className="userName-date">
                    <span className="detail-gray-font">
                      {name ? convertUnicode(name) : ""}
                    </span>
                    <span className="detail-comment-text">
                      {commentText ? convertUnicode(commentText) : ""}
                    </span>
                    <div className="comment-card-second-line">
                      <span className="comment-card-date">{date}</span>
                      <button
                        onClick={() => handleClickReply(commentId)}
                        className="comment-card-button"
                      >
                        Reply
                      </button>
                    </div>
                    <div className="comment-card-third-line"></div>
                  </div>
                </div>
              </div>

            <div className='likeCount-commentCount'>
              <span>
                <img
                  className='post-detail-icon'
                  src={likedComment ? heartIconFilled : heartIcon}
                  alt='like'
                  onClick={() => handleClickCommentLike(commentId)}
                  // onClick={onClick}
                ></img>
              </span>
              {/* <span>
                    <img className='post-detail-icon' src={commentIcon} alt='comment' onClick={onClick}></img>
                </span> */}
            </div>
          </div>
        </div>
      </div>
      {replies && replies.length > 0 && (
        <Accordion allowToggle>
          <AccordionItem className="custom-accordion-item">
            <AccordionPanel pb={4}>
              {replies.slice(0, visibleReplies).map((reply) => (
                <CommentCard
                  key={reply.id}
                  avatar={reply.avatar}
                  name={reply.userName}
                  commentText={reply.content}
                  commentId={reply.id}
                  date={formatDate(reply.commentDate)}
                  replies={reply.comments || []}
                />
              ))}
              {/* Show more or less buttons */}
              {replies.length > 3 && visibleReplies === 3 && (
                <button
                  onClick={handleShowMoreReplies}
                  className="comment-card-show-more-button"
                >
                  Show More Replies
                </button>
              )}
            </AccordionPanel>
            <AccordionButton
              onClick={togglePanel}
              className="custom-accordion-button"
            >
              {isPanelOpen ? "Close All" : "Show Replys"}
              <AccordionIcon />
            </AccordionButton>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default CommentCard;
