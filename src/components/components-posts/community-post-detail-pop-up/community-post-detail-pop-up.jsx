import React, { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useToast } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

// stores
import usePostQueryStore from '../../../postStore.ts';
import userInfoQueryStore from '../../../userStore.ts';

// components
import CommentCard from '../../comment-card/comment-card';
// import CommunitySendMsg from '../community-send-msg/community-send-msg.component';
// import CommentReplyInput from "../../comment-card/comment-reply-input.jsx";

// hooks
import { useAddComment } from '../../../hooks/useComment';
import { useGetLikesPost } from '../../../hooks/useGetPosts.js';
import { useHighlightPost } from '../../../hooks/useGetPosts.js';
import { useRemoveHighlightPost } from '../../../hooks/useGetPosts.js';
import { useApiRequestSetPostDisplay } from '../../../hooks/useApiRequestPost'; // private
import { useApiRequestSetPostPublic } from '../../../hooks/useApiRequestPost'; // remove private

// scss
import './community-post-detail-pop-up.styles.scss';

// images
import BubblesIcon from '../../../assets/post/bubbles_icon.svg';
import ShareIcon from '../../../assets/post/share_icon.svg';
import heartIcon from '../../../assets/post/heart.png';
import heartIconFilled from '../../../assets/post/heart-fill-Icon.png';
import SendIcon from '../../../assets/post/send_icon.svg';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false); // like
  const [isHighlight, setIsHighlight] = useState(false); // highlight
  const [isPrivate, setIsPrivate] = useState(0); // private
  const [showCommentBox, setShowCommentBox] = useState(false); // comment box
  const [comment, setComment] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const setDescription = usePostQueryStore((state) => state.setDescription);
  const setPictures = usePostQueryStore((state) => state.setPictures);
  const [showArrows, setShowArrows] = useState(false);

  // refs
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textareaRef = useRef(null);

  // console.log("postQuery", postQuery);

  // chakura ui modal
  const {
    isOpen: isHighlightModalOpen,
    onOpen: openHighlightModal,
    onClose: closeHighlightModal,
  } = useDisclosure();

  const {
    isOpen: isRemoveHighlightModalOpen,
    onOpen: openRemoveHighlightModal,
    onClose: closeRemoveHighlightModal,
  } = useDisclosure();

  const {
    isOpen: isPrivateModalOpen,
    onOpen: openPrivateModal,
    onClose: closePrivateModal,
  } = useDisclosure();

  const {
    isOpen: isRemovePrivateModalOpen,
    onOpen: openRemovePrivateModal,
    onClose: closeRemovePrivateModal,
  } = useDisclosure();

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

  // highlight api import
  const { mutate: apiMutateHightlight } = useHighlightPost({
    onError: (error) => {
      toast({
        title: 'Failed.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  // remove highlight api import
  const { mutate: apiMutateRemoveHighlight } = useRemoveHighlightPost({
    onError: (error) => {
      toast({
        title: 'Failed to remove highlight.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  // highlight button label and modal toggle
  const toggleHighlight = () => {
    setIsHighlight((prev) => !prev);
    openHighlightModal();
  };

  // remove highlight button label and modal toggle
  const toggleRemoveHighlight = () => {
    setIsHighlight((prev) => !prev);
    openRemoveHighlightModal();
  };

  // highlight click call api
  const handleHighlight = () => {
    // console.log('POSTQUERY', postQuery);
    // setIsHighlight((prev) => (prev === 0 ? 1 : 0));
    apiMutateHightlight({
      id: postQuery.postID,
      isDisplay: isHighlight,
    });
  };

  // remove highlight click call api
  const handleRemoveHighlight = () => {
    // setIsHighlight((prev) => (prev === 0 ? 1 : 0));
    apiMutateRemoveHighlight({
      id: postQuery.postID,
      isDisplay: isHighlight,
    });
  };

  // private api import
  const { mutate: apiMutateSetPostDisplay } = useApiRequestSetPostDisplay({
    onError: (error) => {
      toast({
        title: 'Failed.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  //  remove private api import
  const { mutate: apiMutateSetPostPublic } = useApiRequestSetPostPublic({
    onError: (error) => {
      toast({
        title: 'Failed.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  // private button label and modal toggle
  const togglePrivate = () => {
    setIsPrivate((prev) => !prev);
    openPrivateModal();
  };

  // remove private button label and modal toggle
  const toggleRemovePrivate = () => {
    setIsPrivate((prev) => !prev);
    openRemovePrivateModal();
  };

  // private click call api
  const handlePrivate = () => {
    // console.log('POSTQUERY', postQuery);
    // setIsHighlight((prev) => (prev === 0 ? 1 : 0));
    apiMutateSetPostDisplay({
      id: postQuery.postID,
      isDisplay: isHighlight,
    });
  };

  // remove private click call api
  const handleRemovePrivate = () => {
    // setIsHighlight((prev) => (prev === 0 ? 1 : 0));
    apiMutateSetPostPublic({
      id: postQuery.postID,
      isDisplay: isHighlight,
    });
  };

  // private click call api
  // const toggleSetPostDisplay = () => {
  //   setIsPrivate((prev) => !prev);
  //   const apiMutation = isPrivate
  //     ? apiMutateSetPostPublic
  //     : apiMutateSetPostDisplay;
  //   if (validateTokenAndPopup()) {
  //     apiMutation({ id: postQuery.postID });
  //   }
  // };

  // api
  const { mutate: apiMutate } = useGetLikesPost({
    onError: (error) => {
      toast({
        title: 'Failed.',
        status: 'error',
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
      togglePopup(true, 'accountType');
      return false;
    }
    return true;
  };

  // const handleInputClick = (e) => {
  //   if (!userInfo.token) {
  //     e.preventDefault();
  //     togglePopup(true, 'accountType');
  //   }
  // };

  // comment box
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
        behavior: 'smooth',
      });
    }
  }, [showCommentBox, commentCount]);

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
    navigate(`/edit-post/${postQuery.postID}`);
    // navigate('/edit-post');
  };

  return (
    <div className='post-detail-popUp-container' ref={containerRef}>
      {/* Moblie */}
      <div className='post-detail-mobile-profile-container'>
        <div className='post-detail-mobile-profile'>
          <img
            src={postQuery.userAvatar}
            className='post-detail-mobile-avatar'
          ></img>
          <span className='post-detail-user-name-mobile'>
            {postQuery.userName}
          </span>
        </div>
      </div>

      {/* Web */}
      <div className='postdetail-popUp-left-container'>
        {!isMobile && picture && (
          <>
            <div
              className='post-detail-image-wrapper'
              onMouseEnter={() => setShowArrows(true)}
              onMouseLeave={() => setShowArrows(false)}
            >
              {currentImageIndex > 0 && showArrows && (
                <FontAwesomeIcon
                  className='arrow-icon arrow-left'
                  icon={faArrowLeft}
                  size='lg'
                  onClick={goToPreviousImage}
                  style={{ color: '#fafcff' }}
                />
              )}
              <img
                src={picture[currentImageIndex]}
                ref={imageRef}
                className='post-detail-image'
                alt='detail-pic'
              />
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
                <img
                  src={postQuery.userAvatar}
                  alt='Image-User-Picture'
                  className='user-detail-profile-image'
                />
                <span>{postQuery.userName}</span>
              </div>
              <div className='user-detail-button-container'>
                {/* {isDoctorAuthor && ( */}
                <button
                  className='button-highlight'
                  onClick={
                    isHighlight ? toggleRemoveHighlight : toggleHighlight
                  }
                >
                  {isHighlight ? 'Remove from Highlight' : 'Highlight'}
                </button>
                {/* )} */}

                {/* {isAuthor && ( */}
                <button
                  className='button-private'
                  onClick={isPrivate ? toggleRemovePrivate : togglePrivate}
                  // onClick={toggleSetPostDisplay}
                >
                  {isPrivate ? 'Remove from Private' : 'Private'}
                </button>
                {/* )} */}

                {/* {isAuthor && ( */}
                <button className='button-edit' onClick={handleGoToEdit}>
                  Edit your Post
                </button>
                {/* )} */}
              </div>
            </div>
          </>
        )}
        {isMobile && <img src={picture} ref={imageRef}></img>}
      </div>
      <div className='postdetail-popUp-right-container'>
        <div className='detail-top-content'>
          <div className='post-popUp-content'>
            <h2 className='postdetail-popUp-title'>{postQuery.title}</h2>
            <hr className='hr' />
            <p className='post-description'>{brief || 'No description'}</p>
            {tag && (
              <span className='post-tag-names'>
                {tag.map((t) => `#${t.tagName}`).join('')}
              </span>
            )}
            {postDate && <span className='post-date'>{postDate}</span>}
            <hr className='hr' />
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
                      showCommentBox={showCommentBox}
                      handleClickComment={handleClickComment}
                      handleFormSubmit={handleFormSubmit}
                      // onClick={handleInputClick}
                    />
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>

        <div className='comment-card-textarea-container'>
          {commentCount >= 0 && showCommentBox && (
            <>
              <div className='textarea-with-icon-post'>
                <textarea
                  // {...register("comment")}
                  onChange={(e) => setComment(e.target.value)}
                  ref={textareaRef}
                  type='text'
                  placeholder='Share Your Thoughts Here...'
                  className='post-comment-card-textarea'
                />
              </div>
              {/* <button
                    onClick={handleFormSubmit}
                    type='submit'
                    className='textarea-icon'
                  >
                    <img src={SendIcon} alt='sendIcon' />
                  </button> */}
            </>
          )}
        </div>

        {/* Web */}
        <div className='fixed-input-box'>
          <div className='post-detail-send-box-outer-container'>
            <div className='Icon-display'>
              <span className='Icon-count'>
                <img
                  // src={heartIcon}
                  src={liked ? heartIconFilled : heartIcon}
                  alt='Icon'
                  className='Icon-size'
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
              <img src={ShareIcon} alt="Image-Share-Icon" />
            </div> */}
          </div>
        </div>
      </div>

      {/* highlight modal */}
      <Modal isOpen={isHighlightModalOpen} onClose={closeHighlightModal}>
        <ModalOverlay
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <ModalContent
          backgroundColor='transparent'
          boxShadow='none'
          textAlign='center'
        >
          <ModalHeader color='#ffffff' fontSize='25px'>
            Highlight this post?
          </ModalHeader>
          <ModalFooter display='flex' justifyContent='space-between'>
            <Button
              color='#ffffff'
              backgroundColor='#675f5a'
              outline='none'
              _hover='none'
              mr={3}
              onClick={closeHighlightModal}
            >
              Cancel
            </Button>
            <Button
              color='#ffffff'
              backgroundColor='#f1a285'
              outline='none'
              _hover='none'
              onClick={handleHighlight}
            >
              Highlight
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* remove highlight modal */}
      <Modal isOpen={isRemoveHighlightModalOpen} onClose={closeHighlightModal}>
        <ModalOverlay
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <ModalContent
          backgroundColor='transparent'
          boxShadow='none'
          textAlign='center'
        >
          <ModalHeader color='#ffffff' fontSize='25px'>
            Remove This Pose from Highlight Cases?
          </ModalHeader>
          <ModalFooter display='flex' justifyContent='space-between'>
            <Button
              color='#ffffff'
              backgroundColor='#675f5a'
              outline='none'
              _hover='none'
              mr={3}
              onClick={closeRemoveHighlightModal}
            >
              Cancel
            </Button>
            <Button
              color='#ffffff'
              backgroundColor='#f1a285'
              outline='none'
              _hover='none'
              onClick={handleRemoveHighlight}
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* private modal */}
      <Modal isOpen={isPrivateModalOpen} onClose={closePrivateModal}>
        <ModalOverlay
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <ModalContent
          backgroundColor='transparent'
          boxShadow='none'
          textAlign='center'
        >
          <ModalHeader color='#ffffff' fontSize='25px'>
            Private this post?
          </ModalHeader>
          <ModalFooter display='flex' justifyContent='space-between'>
            <Button
              color='#ffffff'
              backgroundColor='#675f5a'
              outline='none'
              _hover='none'
              mr={3}
              onClick={closePrivateModal}
            >
              Cancel
            </Button>
            <Button
              color='#ffffff'
              backgroundColor='#f1a285'
              outline='none'
              _hover='none'
              onClick={handlePrivate}
            >
              Private
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* remove private modal */}
      <Modal isOpen={isRemovePrivateModalOpen} onClose={closeRemovePrivateModal}>
        <ModalOverlay
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <ModalContent
          backgroundColor='transparent'
          boxShadow='none'
          textAlign='center'
        >
          <ModalHeader color='#ffffff' fontSize='25px'>
            Remove This Pose from Private Cases?
          </ModalHeader>
          <ModalFooter display='flex' justifyContent='space-between'>
            <Button
              color='#ffffff'
              backgroundColor='#675f5a'
              outline='none'
              _hover='none'
              mr={3}
              onClick={closeRemovePrivateModal}
            >
              Cancel
            </Button>
            <Button
              color='#ffffff'
              backgroundColor='#f1a285'
              outline='none'
              _hover='none'
              onClick={handleRemovePrivate}
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CommunityPostDetailPopUP;
