import { useState, useEffect, useRef } from "react";
import React from "react";
// import userInfoQueryStore from '../../userStore.ts';

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

const CommentCard = ({ avatar, name, date, commentText, onClick, replies }) => {
  // console.log("comment avatar", avatar);
  // console.log("comment replies", replies);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState(3); // 初始显示3条回复
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen); // Toggle the isPanelOpen state
    if (!isPanelOpen && visibleReplies > 3) {
      setVisibleReplies(3); // If panel is being closed, reset to show only 3 replies
    }
  };

  const handleShowMoreReplies = () => {
    setVisibleReplies(replies.length); // 展开所有回复
  };

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

  // reply comment
  // const handleClickReply = () => {
  //   setShowReplyCommentBox(!showReplyCommentBox);
  // };

  return (
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
                      // onClick={handleClickReply}
                      className="comment-card-button"
                    >
                      Reply
                    </button>
                  </div>
                  <div className="comment-card-third-line">
                    {replies && replies.length > 0 && (
                      <Accordion allowToggle>
                        <AccordionItem>
                          <AccordionPanel pb={4}>
                            {replies.slice(0, visibleReplies).map((reply) => (
                              <CommentCard
                                key={reply.id}
                                avatar={reply.avatar}
                                name={reply.userName}
                                commentText={reply.content}
                                date={formatDate(reply.commentDate)}
                                replies={reply.comments}
                              />
                            ))}
                            {/* Show more or less buttons */}
                            {replies.length > 3 && visibleReplies === 3 && (
                              <button onClick={handleShowMoreReplies}>
                                Show More
                              </button>
                            )}
                            {/* {visibleReplies > 3 && (
                              <AccordionButton onClick={togglePanel}>
                                Collapse All
                              </AccordionButton>
                            )} */}
                          </AccordionPanel>
                          <AccordionButton onClick={togglePanel}>
                            {/* <button> */}
                            {/* <Box flex="1" textAlign="left"> */}
                            {isPanelOpen ? "Collapse" : "Replies"}
                            {/* </Box> */}
                            <AccordionIcon />
                            {/* </button> */}
                          </AccordionButton>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="likeCount-commentCount">
              <span>
                <img
                  className="post-detail-icon"
                  src={HeartIcon}
                  alt="like"
                  // onClick={onClick}
                ></img>
              </span>
              {/* <span>
                    <img className='post-detail-icon' src={commentIcon} alt='comment' onClick={onClick}></img>
                </span> */}
            </div>
          </div>
        </div>
        {/* 
        <div className="comment-card-reply-input-container">
          {showReplyCommentBox && (
            <>
              <textarea
                ref={textareaRef}
                type="text"
                placeholder="Reply Comments..."
                className="comment-card-reply-input"
              />
              <img
                src={SendIcon}
                alt="Icon-Send"
                className="comment-card-reply-send-icon"
              />
            </>
          )}
        </div> */}
      </div>
    </div>
  );
};

export default CommentCard;
