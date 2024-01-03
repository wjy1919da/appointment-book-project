import React from "react";

const CommentCardSkeleton = () => {
  return (
    <div>
      <div className="comment-card-container">
        <div className="comment-card-inner-container">
          <div className="comment-card-detail-container">
            <div className="comment-card-profile-information-wrapper">
              <div className="reviewer-profile-information">
                <div className="reviewer-progile-avatar">
                  <SkeletonCircle size="8" />
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
    </div>
  );
};

export default CommentCardSkeleton;
