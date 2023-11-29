import React, { useEffect, useRef} from 'react';
import { useMediaQuery } from 'react-responsive';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { Button } from 'react-bootstrap';

// stores
import usePostQueryStore from '../../../postStore.ts';
import userInfoQueryStore from '../../../userStore.ts';

// components
import CommentCard from '../../comment-card/comment-card';
// import CommunitySendMsg from '../community-send-msg/community-send-msg.component';

// hooks
import { useAddComment } from '../../../hooks/useComment';

// scss
import './community-post-detail-pop-up.styles.scss';

// images
import HeartIcon from '../../../assets/post/heart_icon.svg';
import StarIcon from '../../../assets/post/star_icon.svg';
import BubblesIcon from '../../../assets/post/bubbles_icon.svg';
import ShareIcon from '../../../assets/post/share_icon.svg';
import DownArrow from '../../../assets/post/down-arrow.png';
// import UserImage from '../../../assets/post/user_image.svg';
// import heartIcon from '../../../assets/post/heart.png';
// import commentIcon from '../../../assets/post/chat_bubble.png';
// import collectIcon from '../../../assets/post/star.png';

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
  // userName,
  // userAvatar,
}) => {
  const postQuery = usePostQueryStore((state) => state.postQuery);
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const refresh = usePostQueryStore((state) => state.refresh);
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });

  const schema = z.object({
    comment: z
      .string()
      .nonempty('Comment is required')
      .min(5, 'Comment must be at least 5 characters long'),
  });

  //console.log("userInfo in post detail ",userInfo);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (formData) => {
    //console.log("formData ",formData);
    // set post id and comment text
    if (!userInfo.token) {
      togglePopup(true, 'login');
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

  const { mutate, data, isLoading, isError, error } = useAddComment();

  useEffect(() => {
    if (data?.code === 100) {
      //alert("send comment ",data.msg);
      reset({ comment: '' });
      refresh();
    } else if (data?.code === 500 || data?.code === 403) {
      alert(data.msg);
    }
  }, [data]);

  const handleInputClick = (e) => {
    //console.log("handleInputClick ",userInfo.token);
    if (!userInfo.token) {
      e.preventDefault(); // 阻止默认行为
      togglePopup(true, 'login');
    }
  };

  // pop up height adjustment
  const adjustContainerHeight = () => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (container && image) {
      container.style.height = '400px';
      image.style.maxHeight = '100%';
    }
  };

  // const adjustContainerHeight = () => {
  //   const container = containerRef.current;
  //   const image = imageRef.current;
  //   if (container && image) {
  //     container.style.height = image.offsetHeight + 70 + 'px';
  //   }
  // };

  const handleImageLoad = () => {
    adjustContainerHeight();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US');
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
    if (!input) return ''; // Return an empty string if input is null, undefined, or empty string
    return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a, b) =>
      String.fromCharCode(parseInt(b, 16))
    );
  }

  return (
    <div className='post-detail-popUp-container' ref={containerRef}>
      {/* Moblie */}
      <div className='post-detail-mobile-profile-container'>
        <div className='post-detail-mobile-profile'>
          <img src={postQuery.userAvatar} className='post-detail-mobile-avatar'></img>
          <span>{postQuery.userName}</span>
        </div>
        <div>
          <button
            className='doctor-search-button'
            style={{
              width: '90px',
              height: '30px',
              radius: '8px',
              fontSize: '10px',
            }}
            onClick={() => (window.location.href = '/download')}
          >
            Try Charm Life
          </button>
        </div>
      </div>
      {/* Web */}
      <div className='postdetail-popUp-left-container'>
        {!isMobile && picture && (
          <>
            <img
              src={picture}
              ref={imageRef}
              onLoad={handleImageLoad}
              className='post-detail-image'
              alt='detail-pic'
            ></img>

            <div className='user-detail'>
              <div className='user-detail-inner'>
                <img src={postQuery.userAvatar} alt='Image-User-Picture' className='user-detail-profile-image' />
                <span>{postQuery.userName}</span>
              </div>
              <div className='user-detail-button-container'>
                <button className='button-archive'>Archive</button>
                <button className='button-edit'>Edit your Post</button>
              </div>
            </div>
          </>
        )}
        {isMobile && (
          <img
            src={picture}
            ref={imageRef}
            style={{ borderRadius: '10px' }}
          ></img>
        )}
      </div>
      <div className='postdetail-popUp-right-container'>
        <div className='detail-top-content'>
          <div className='post-popUp-content'>
            {!isMobile && brief && <span>{brief}</span>}
            <hr className='hr' />
            <p className='post-description'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
              voluptatum quae doloremque non voluptates eius sapiente, explicabo
              quasi suscipit quo. Delectus, tempora. Quo esse sapiente ut cumque
              amet error ipsum.
            </p>
            <span className='post-tag-names'>
              #Doctor reviews #Breast Augmentation
            </span>
            <span className='post-date'>5/10/2023</span>
            <hr className='hr' />
            {/* {tag && <span className='detail-red-font'>{tag}</span>}
            {postDate && <span className='detail-gray-font'>{ndate}</span>} */}
          </div>
          {/* <div className='post-popUp-break-lines'></div> */}
          <div className='post-popUp-comments'>
            <span className='detail-gray-font'>{commentCount} comments</span>
            {/* {comments&&<CommentCard avatar={comments.avatar} name={comments./>} */}
            <div className='comment-detail'>
              {comments &&
                comments.map((comment, index) => {
                  if (comment && comment.content) {
                    return (
                      <CommentCard
                        key={index}
                        avatar={comment.avatar || ''}
                        name={comment.userName || ''}
                        commentText={convertUnicode(comment.content)}
                        date={formatDate(comment.commentDate)}
                        onClick={handleInputClick}
                      />
                    );
                  }
                  return null; // Or handle this case differently
                })}
            </div>
            {!userInfo.token && <div>Login to view more....</div>}
          </div>
        </div>
        {/* Mobile */}
        <div className='post-detail-mobile-download-button'>
          <img
            src={DownArrow}
            style={{ marginTop: '50px', width: '15px', height: '13px' }}
          ></img>
          <span className='join-community-text'>
            Join the Charm Life Community to View More
          </span>
          <button
            className='doctor-search-button'
            style={{
              width: '150px',
              height: '40px',
              radius: '20px',
              fontSize: '15px',
              marginTop: '10px',
            }}
            onClick={() => (window.location.href = '/download')}
          >
            Try Charm Life
          </button>
        </div>
        {/* Web */}
        <div className='fixed-input-box'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='post-detail-send-box-outer-container'>
              <div className='Icon-display'>
                <span className='Icon-count'>
                  <img
                    src={HeartIcon}
                    alt='Icon'
                    className='Icon-size'
                    onClick={handleInputClick}
                  />
                  {likeCount}
                </span>
                <span className='Icon-count'>
                  <img
                    src={StarIcon}
                    alt='Icon'
                    className='Icon-size'
                    onClick={handleInputClick}
                  />
                  {collectCount}
                </span>
                <span className='Icon-count'>
                  <img
                    src={BubblesIcon}
                    alt='Icon'
                    className='Icon-size'
                    onClick={handleInputClick}
                  />
                  {commentCount}
                </span>
                <div className='share-icon'>
                  <img src={ShareIcon} alt='Image-Share-Icon' />
                </div>
              </div>

              {/* <div className='comment-send-msg-container'> 
                <CommunitySendMsg isValid={isValid} />
               </div> */}
              {/* 
               <Button
                as='input'
                type='submit'
                value='send'
                disabled={!isValid}
                style={{ backgroundColor: 'orange', border: 'orange' }}
              />  */}
            </div>
            <div className='new-comment-input'>
              <input
                {...register('comment')}
                type='text'
                placeholder='Enter your comment'
                className='input-blank'
                onClick={handleInputClick}
              />
              <p>{errors.comment?.message}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommunityPostDetailPopUP;
