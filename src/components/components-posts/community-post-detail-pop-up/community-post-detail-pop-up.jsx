import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ChakraModal from '../../chakra-modal/chakra-modal.jsx';

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
} from '@chakra-ui/react';

// stores
import usePostQueryStore from '../../../postStore.ts';
import userInfoQueryStore from '../../../userStore.ts';

// components
import CommentCard from '../../comment-card/comment-card';

// hooks
import { useAddComment } from '../../../hooks/useComment';
import { useRplyComment } from '../../../hooks/useComment';
import { useGetLikesPost } from '../../../hooks/useInteractPosts.js';
import { useHighlightPost } from '../../../hooks/useInteractPosts.js';
import { useRemoveHighlightPost } from '../../../hooks/useInteractPosts.js';
import { useApiRequestSetPostDisplay } from '../../../hooks/useInteractPosts.js'; // private
import { useApiRequestSetPostPublic } from '../../../hooks/useInteractPosts.js'; // remove private

// scss
import './community-post-detail-pop-up.styles.scss';

// images
import BubblesIcon from '../../../assets/post/bubbles_icon.svg';
import ShareIcon from '../../../assets/post/share_icon.svg';
import heartIcon from '../../../assets/post/heart.svg';
import heartIconFilled from '../../../assets/post/heart-filled-icon.svg';
import SendIcon from '../../../assets/post/send_icon.svg';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DarkLeftArrowIcon from '../../../assets/post/left-arrorw-dark.svg';
// import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

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
  isLiked,
  onHide
}) => {
  // like count
  const [popupLikeCount, setPopupLikeCount] = useState(likeCount || 0);
  const [isPopupLiked, setIsPopupLiked] = useState(isLiked); // like

  useEffect(() => {
    setPopupLikeCount(likeCount);
    setIsPopupLiked(isLiked);
  }, [likeCount, isLiked]);

  const postQuery = usePostQueryStore((state) => state.postQuery);
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(true);
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);
  const isMobile = useMediaQuery({ query: '(max-width: 744px)' });
  // const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const iPhoneScreen = useMediaQuery({ query: '(max-width: 375px)' });
  const navigate = useNavigate();
  const setIsPrivate = usePostQueryStore((state) => state.setIsPrivate);
  const setIsHighlight = usePostQueryStore((state) => state.setIsHighlight);
  const [comment, setComment] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const setDescription = usePostQueryStore((state) => state.setDescription);
  const setPictures = usePostQueryStore((state) => state.setPictures);
  const [showArrows, setShowArrows] = useState(false);
  const [modalStatus, setModalStatus] = useState('');
  // Reply comment
  const setTempCommentStatus = usePostQueryStore((s) => s.setTempCommentStatus);

  // refs
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textareaRef = useRef(null);

  // chakura ui modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalHeader, setModalHeader] = useState('');
  const [modalContent, setModalContent] = useState('');

  const toast = useToast();
  var isAuthor = userInfo.userId == postQuery.memberID;
  var isDoctorAuthor =
    userInfo.userId == postQuery.memberID &&
    localStorage.getItem('accountType') === '2';
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
      .nonempty('Comment is required')
      .min(5, 'Comment must be at least 5 characters long'),
  });

  // * * * * * * * * highlight / private hook
  // highlight api import
  const { mutate: apiMutateHightlight, isSuccess: highlightSuccess } =
    useHighlightPost();

  // remove highlight api import
  const {
    mutate: apiMutateRemoveHighlight,
    isSuccess: removeHighlightSuccess,
  } = useRemoveHighlightPost();

  // private api import
  const { mutate: apiMutateSetPostDisplay, isSuccess: privatePostSuceess } =
    useApiRequestSetPostDisplay();

  //  remove private api import
  const {
    mutate: apiMutateSetPostPublic,
    isSuccess: removePrivatePostSuccess,
  } = useApiRequestSetPostPublic();

  // private click
  const handlePrivateClick = () => {
    if (validateTokenAndPopup()) {
      console.log('postQuery.isPrivate', postQuery.isPrivate);
      setModalStatus('private');
      if (!!postQuery.isPrivate) {
        setModalHeader('Private Post');
        setModalContent('Private');
      } else {
        setModalHeader('Remove Private');
        setModalContent('Remove');
      }
      onOpen();
    }
  };
  // console.log("postQuery", postQuery);

  // private click call api
  const handlePrivate = () => {
    if (validateTokenAndPopup()) {
      setIsPrivate(!postQuery.isPrivate);
      const apiMutation =
        postQuery.isPrivate == 0
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
      setModalStatus('highlight');
      if (!postQuery.isHighlight) {
        setModalHeader('Highlight Post');
        setModalContent('Highlight');
      } else {
        setModalHeader('Remove Highlight');
        setModalContent('Remove');
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
      // refreshMyPost();
      onClose();
    }
  };

  // * * * * * * * * likes hook
  const { mutate: apiLikePopupMutate } = useGetLikesPost();
  // like buttton
  const toggleGetLikes = () => {
    if (validateTokenAndPopup()) {
      let newCountLikes = isPopupLiked
        ? popupLikeCount - 1
        : popupLikeCount + 1;
      setPopupLikeCount(newCountLikes);
      setIsPopupLiked((prev) => !prev);
      if (validateTokenAndPopup()) {
        apiLikePopupMutate({ postId: postQuery.postID });
        // refreshMyPost();
      }
    }
  };

  const {
    mutate,
    isSuccess: addCommentSucces,
    data: commentData,
  } = useAddComment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    mutate: apiReplyComment,
    isSuccess: addRplySuccess,
    data: replyData,
  } = useRplyComment();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (validateTokenAndPopup()) {
      if (postQuery.tempCommentStatus === 'comment') {
        mutate({
          dynamicId: postQuery.postID,
          text: comment,
        });
      }
      if (postQuery.tempCommentStatus === 'reply') {
        apiReplyComment({
          commentId: postQuery.commentId,
          text: comment,
        });
      }
    }
  };

  const validateTokenAndPopup = () => {
    if (!userInfo.token) {
      togglePopup(true, 'accountType');
      return false;
    }
    return true;
  };

  // comment box
  const handleClickComment = () => {
    setTempCommentStatus(true, 'comment');
  };

  // when click the comment button it will scroll down to textarea
  useEffect(() => {
    const rightContainer = document.querySelector('.detail-top-content');

    let debounceTimer;
    const handleScroll = () => {
      setTempCommentStatus(false);
    };

    if (rightContainer) {
      rightContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (rightContainer) {
        rightContainer.removeEventListener('scroll', handleScroll);
      }
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US');
    return formattedDate;
  };

  function convertUnicode(input) {
    if (!input) return '';
    return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a, b) =>
      String.fromCharCode(parseInt(b, 16))
    );
  }

  const handleGoToEdit = () => {
    setDescription(brief);
    setPictures(picture);
    navigate('/posts/edit-post');
  };

  return (
    <div className='post-detail-popUp-container' ref={containerRef}>
      {/* Moblie */}
      {/* <div className='post-detail-mobile-profile-container'>
        <div className='post-detail-mobile-profile'>
          <img
            src={postQuery.userAvatar}
            className='post-detail-mobile-avatar'
          ></img>
          <span className='post-detail-user-name-mobile'>
            {postQuery.userName}
          </span>
        </div>
      </div> */}

      <div className='postdetail-popUp-left-container'>
        {/* {!isMobile && picture && ( */}
        <>
          <div
            className='post-detail-image-wrapper'
            onMouseEnter={() => setShowArrows(true)}
            onMouseLeave={() => setShowArrows(false)}
          >
            {/* dark left arrow */}
            <img
              src={DarkLeftArrowIcon}
              alt='Icon'
              className='popup-dark-left-arrow-icon'
              style={{ width: '24px', height: '24px' }}
              onClick={onHide}
            />
            {currentImageIndex > 0 && showArrows && (
              <FontAwesomeIcon
                className='arrow-icon arrow-left'
                icon={faArrowLeft}
                size='lg'
                onClick={goToPreviousImage}
                style={{ color: '#fafcff' }}
              />
            )}
            {picture && isImageLoaded ? (
              <img
                src={picture[currentImageIndex]}
                ref={imageRef}
                onError={() => setIsImageLoaded(false)}
                className='post-detail-image'
                alt='detail-pic'
              />
            ) : (
              <div className='post-detail-grey-image'></div>
            )}
            {currentImageIndex < picture.length - 1 && showArrows && (
              <FontAwesomeIcon
                className='arrow-icon arrow-right'
                icon={faArrowRight}
                size='lg'
                onClick={goToNextImage}
                style={{ color: '#fafcff' }}
              />
            )}
            {showArrows && (
              <div className='image-index-tag'>
                {currentImageIndex + 1} / {picture.length}
              </div>
            )}
          </div>
          <div className='user-detail'>
            <div className='user-detail-inner'>
              {isAvatarLoaded && postQuery.userAvatar ? (
                <img
                  src={postQuery.userAvatar}
                  alt='Image-User-Picture'
                  className='user-detail-profile-image'
                  onError={() => setIsAvatarLoaded(false)}
                />
              ) : (
                <div className='post-detail-grey-circle'></div>
              )}
              <span>{postQuery.userName}</span>
            </div>

            <div className='user-detail-button-container'>
              {isDoctorAuthor && (
                <button
                  className='button-highlight'
                  onClick={handleHighlightClick}
                >
                  {postQuery.isHighlight
                    ? 'Remove from Highlight'
                    : 'Highlight'}
                </button>
              )}
              {isAuthor && (
                <button className='button-private' onClick={handlePrivateClick}>
                  {postQuery.isPrivate == 0 ? 'Remove from Private' : 'Private'}
                </button>
              )}
              {isAuthor && (
                <button className='button-edit' onClick={handleGoToEdit}>
                  Edit your Post
                </button>
              )}
            </div>
          </div>
        </>
        {/* )} */}
        {/* {isMobile && <img src={picture} ref={imageRef}></img>} */}
      </div>
      <div className='postdetail-popUp-right-container'>
        <div className='detail-top-content'>
          <div className='post-popUp-content'>
            <h2 className='postdetail-popUp-title'>{postQuery.title}</h2>
            <hr
              className='hr'
              style={{ display: isMobile ? 'none' : 'block' }}
            />
            <p className='post-description'>{brief || 'No description'}</p>
            {tag && (
              <span className='post-tag-names'>
                {tag.map((t) => `#${t.tagName}`).join('')}
              </span>
            )}
            {postDate && <span className='post-date'>{postDate}</span>}
            {/* <hr className='hr' /> */}
          </div>
          {/* <div className='post-popUp-break-lines'></div> */}
          <div className='post-popUp-comments'>
            <span className='detail-gray-font'>{commentCount} comments</span>
            {/* {comments&&<CommentCard avatar={comments.avatar} name={comments./>} */}
            <div className='comment-detail'>
              {comments?.map((comment, index) => {
                if (comment?.content) {
                  return (
                    <CommentCard
                      key={index}
                      avatar={comment.avatar || ''}
                      name={comment.userName || ''}
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
          <div className='comment-card-textarea-container'>
            <div className='textarea-with-icon-post'>
              {/* <div> */}
              <textarea
                onChange={(e) => setComment(e.target.value)}
                ref={textareaRef}
                type='text'
                placeholder={
                  postQuery.tempCommentStatus === 'reply'
                    ? 'Reply'
                    : 'Share Your Thoughts Here...'
                }
                className='post-comment-card-textarea'
              />
              <button onClick={handleFormSubmit} className='textarea-icon'>
                <img src={SendIcon} alt='sendIcon' />
              </button>
              {/* </div> */}
            </div>
          </div>
        )}

        <div className='fixed-input-box'>
          <div className='post-detail-send-box-outer-container'>
            <div className='Icon-display'>
              <span className='Icon-count'>
                <img
                  // src={heartIcon}
                  src={isPopupLiked ? heartIconFilled : heartIcon}
                  alt='Icon'
                  className='Icon-size'
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
              <span className='Icon-count'>
                <img
                  src={BubblesIcon}
                  alt='Icon'
                  className='Icon-size'
                  onClick={handleClickComment}
                />
                {commentCount}
              </span>
            </div>
            {/* <div className="share-icon">
              <img src={ShareIcon} alt="Image-Share-Icon" />b
            </div> */}
          </div>
        </div>
      </div>
      <ChakraModal
        title={modalHeader}
        cancelButtonText='Cancel'
        approveButtonText={modalContent}
        approveCallback={
          modalStatus === 'private' ? handlePrivate : handleHighlight
        }
        isModalOpen={isOpen}
        closeModalFunc={onClose}
      />
    </div>
  );
};

export default CommunityPostDetailPopUP;
