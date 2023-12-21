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
  id,
  dummyHighlight,
  dummyPrivate,
  imageURL,
  text,
  profileImage,
  authorName,
  likes,
  isProfile,
}) => {
  console.log('Likes:', likes);

  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const postQuery = usePostQueryStore((state) => state.postQuery);

  const [width, setWidth] = useState('');
  const [displayImage, setDisplayImage] = useState(imageURL);

  // like states ready
  const [isLiked, setIsLiked] = useState(false);
  const [countLikes, setCountLikes] = useState(likes);

  useEffect(() => {
    if (isMobile) {
      setWidth('240px');
    } else {
      setWidth('186px');
    }
  }, [isMobile]);

    // default image when image is not loaded
    const handleImageError = () => {
      setDisplayImage(defaultImage);
    };

  // likes hook import
  const { mutate: apiLikeMutate } = useGetLikesPost();

  // like button
  // prevent to open pop up when like button is clicked
  const handleHeartIconClick = (e) => {
    e.stopPropagation();
    apiLikeMutate({ postId: id });

    setIsLiked((prevLiked) => {
      const newCountLikes = prevLiked ? countLikes - 1 : countLikes + 1;
      setCountLikes(newCountLikes);
      // console.log('newCountLikes', newCountLikes);

      // save the likes to local storage
      localStorage.setItem(`post_${id}_liked`, !prevLiked);
      localStorage.setItem(`post_${id}_likes`, newCountLikes.toString());

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
              src={isLiked ? heartIconFilled : heartIcon}
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
