import { useState, useEffect, useRef } from 'react';
import usePostQueryStore from '../../postStore.ts';
// import userInfoQueryStore from '../../userStore.ts';

// hooks
import { useGetCommentLikesPost } from '../../hooks/useGetPosts.js';

// scss
import './comment-card.styles.scss';
import '../components-posts/community-post-detail-pop-up/community-post-detail-pop-up.styles.scss';

// images
import heartIcon from '../../assets/post/heart.png';
import heartIconFilled from '../../assets/post/heart-fill-Icon.png';
import SendIcon from '../../assets/post/send_icon.svg';

// import commentIcon from '../../assets/post/chat_bubble.png';
// import CommentReplyInput from './comment-reply-input';

const CommentCard = ({ avatar, name, date, commentText, commentId }) => {
  // console.log('comment avatar', avatar);
  console.log('COMMENT NAME', commentId);

  const [showReplyCommentBox, setShowReplyCommentBox] = useState(false); // reply comment box
  const [likedComment, setLikedComment] = useState(false); // like commment
  const postQuery = usePostQueryStore((state) => state.postQuery);

  // refs
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (showReplyCommentBox && textareaRef.current && containerRef.current) {
      textareaRef.current.focus();
      containerRef.current.scrollTo({
        top: textareaRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  }, [showReplyCommentBox]);

  const formatDate = (dateString) => {
    const dateParts = dateString.split('/');
    const month = dateParts[0];
    const day = dateParts[1];
    const formattedDate = `${month}/${day}`;
    return formattedDate;
  };

  const newDate = formatDate(date);

  function convertUnicode(input) {
    return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a, b) =>
      String.fromCharCode(parseInt(b, 16))
    );
  }

  // like comment
  const { mutate: apiCommentLikeMutate, data: likeData } =
    useGetCommentLikesPost();


  const handleClickCommentLike = (commentId) => {
    console.log('COMMENT ID', commentId);
    setLikedComment((prev) => !prev);
    apiCommentLikeMutate({ commentId: commentId });
  };

  // reply comment
  const handleClickReply = () => {
    setShowReplyCommentBox(!showReplyCommentBox);
  };

  return (
    <div className='comment-card-container'>
      <div className='comment-card-inner-container'>
        <div className='comment-card-detail-container'>
          <div className='comment-card-profile-information-wrapper'>
            <div className='reviewer-profile-information'>
              <div className='reviewer-progile-avatar'>
                <img
                  src={avatar}
                  className='reviewer-avatar'
                  alt='avatar'
                ></img>
              </div>
              <div className='reviewer-information'>
                <div className='userName-date'>
                  <span className='detail-gray-font'>
                    {name ? convertUnicode(name) : ''}
                  </span>
                  <span className='detail-comment-text'>
                    {commentText ? convertUnicode(commentText) : ''}
                  </span>
                  <div className='comment-card-second-line'>
                    <span className='comment-card-date'>{date}</span>
                    <button
                      onClick={handleClickReply}
                      className='comment-card-button'
                    >
                      Reply
                    </button>
                  </div>
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

        <div className='comment-card-reply-input-container'>
          {showReplyCommentBox && (
            <>
              {/* <hr /> */}
              <textarea
                ref={textareaRef}
                type='text'
                placeholder='Reply Comments...'
                className='comment-card-reply-input'
              />
              <img
                src={SendIcon}
                alt='Icon-Send'
                className='comment-card-reply-send-icon'
              />
              {/* <CommentReplyInput textareaRef={textareaRef} /> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
