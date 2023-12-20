import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

// hooks
import { useGetLikesPost } from '../../../hooks/useGetPosts';

// stores
import usePostQueryStore from '../../../postStore.ts';

// scss
import './community-post.styles.scss';

// images
import defaultImage from '../../../assets/post/default_image.png';
import LockIcon from '../../../assets/post/lock_icon.svg';
import heartIcon from '../../../assets/post/heart.png';
import heartIconFilled from '../../../assets/post/heart-fill-Icon.png';

const CommunityPost = ({
  dummyHighlight,
  dummyPrivate,
  imageURL,
  text,
  profileImage,
  authorName,
  likes,
  isLike,
  isProfile,
}) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [width, setWidth] = useState('');
  const [liked, setLiked] = useState(isLike);
  const [displayImage, setDisplayImage] = useState(imageURL);
  const [countLikes, setCountLikes] = useState(0);

  const postQuery = usePostQueryStore((state) => state.postQuery);
  // const setCounter = usePostQueryStore((state) => state.setCounter);

  useEffect(() => {
    if (isMobile) {
      setWidth('240px');
    } else {
      setWidth('186px');
    }
  }, [isMobile]);

  // likes hook import
  const { mutate: apiLikeMutate } = useGetLikesPost();

  // set default image when image is not loaded function is here
  const handleImageError = () => {
    setDisplayImage(defaultImage);
  };

  // like button function is here
  // prevent to open pop up when like button is clicked
  const handleHeartIconClick = (e) => {
    e.stopPropagation();
    apiLikeMutate({ postId: postQuery.postID });
    setLiked((prevLiked) => {
      const newCountLikes = prevLiked ? countLikes - 1 : countLikes + 1;
      setCountLikes(newCountLikes);
      console.log('newCountLikes', newCountLikes);
      return !prevLiked;
    });
  };

  return (
    <div
      className='community-post-container'
      style={{
        width: isProfile ? '240px' : '100%',
        backgroundColor: dummyHighlight === 1 ? '#352C28' : '',
      }}
    >
      {dummyPrivate === 1 && (
        <img
          src={LockIcon}
          alt='Icon-Lock'
          className='community-post-icon-lock'
        />
      )}

      <div className='post-Image'>
        <img
          src={displayImage}
          className='postImage'
          onError={handleImageError}
        />
      </div>
      <div className='post-information'>
        <span className='post-text'>{text}</span>
        <div className='profile'>
          <div className='profileImage'>
            <img className='profile-pic' src={profileImage}></img>
            <span className='gray-text'>{authorName}</span>
          </div>
          <div className='likeNumber'>
            <img
              src={liked ? heartIconFilled : heartIcon}
              className='heartIcon'
              onClick={(e) => handleHeartIconClick(e)}
              alt='Like Icon'
            />

            {/* <span className='gray-text'>{likes}</span> */}
            <span className='gray-text'>{countLikes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;
