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

import heartIcon from "../../assets/post/heart.png";
import heartIconFilled from "../../assets/post/heart-fill-Icon.png";
import SendIcon from "../../assets/post/send_icon.svg";
import PlayIcon from "../../assets/post/Play.svg";

// import commentIcon from '../../assets/post/chat_bubble.png';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  SkeletonCircle,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

const CommentCard = ({
  avatar,
  name,
  date,
  commentText,
  commentId,
  onClick,
  replies,
  likeCount,
  isLiked,
  replyAuthor,
}) => {
  const [likedComment, setLikedComment] = useState(isLiked || 0); // like commment
  const [commentLikeCount, setCommentLikeCount] = useState(likeCount); // like count
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(true);
  useEffect(() => {
    setCommentLikeCount(likeCount);
    setLikedComment(isLiked);
  }, [likeCount, isLiked]);

  const toast = useToast();
  const postQuery = usePostQueryStore((state) => state.postQuery);
  const setTempCommentStatus = usePostQueryStore(
    (state) => state.setTempCommentStatus
  );
  const setCommentId = usePostQueryStore((state) => state.setCommentId);

  const [visibleReplies, setVisibleReplies] = useState(3);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen); // Toggle the isPanelOpen state
    if (!isPanelOpen && visibleReplies > 3) {
      setVisibleReplies(3); // If panel is being closed, reset to show only 3 replies
    }
  };
  const handleAvatarError = (e) => {
    setIsAvatarLoaded(false);
  };

  const handleShowMoreReplies = () => {
    setVisibleReplies(replies.length);
  };

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
    setLikedComment((prev) => !prev);
    let newCountLikes = likedComment
      ? commentLikeCount - 1
      : commentLikeCount + 1;
    setCommentLikeCount(newCountLikes);
    apiCommentLikeMutate({ commentId: commentId });
  };

  // reply comment
  const handleClickReply = () => {
    setCommentId(commentId);
    setTempCommentStatus(true, "reply");
  };

  return (
    <div>
      <div className="comment-card-container">
        <div className="comment-card-inner-container">
          <div className="comment-card-detail-container">
            <div className="comment-card-profile-information-wrapper">
              <div className="reviewer-profile-information">
                <div className="reviewer-progile-avatar">
                  {avatar && isAvatarLoaded ? (
                    <img
                      src={avatar}
                      className="reviewer-avatar"
                      alt="avatar"
                      onError={handleAvatarError}
                    ></img>
                  ) : (
                    <SkeletonCircle size="8" />
                  )}
                </div>
                <div className="reviewer-information">
                  <div className="userName-date">
                    <div className="reply-author-container">
                      <span className="detail-gray-font">
                        {name ? convertUnicode(name) : ""}
                      </span>
                      {replyAuthor && (
                        <img src={PlayIcon} className="reply-icon" />
                      )}
                      {replyAuthor && (
                        <span className="detail-gray-font">{replyAuthor}</span>
                      )}
                    </div>

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

              <div className="likeCount-commentCount">
                <span>
                  <img
                    className="post-detail-icon"
                    src={likedComment ? heartIconFilled : heartIcon}
                    alt="like"
                    onClick={() => handleClickCommentLike(commentId)}
                  ></img>
                </span>
                <div className="likeCount-text">{commentLikeCount}</div>
              </div>
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
                  likeCount={reply.likeCount}
                  isLiked={reply.isLike}
                  replyAuthor={name}
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
