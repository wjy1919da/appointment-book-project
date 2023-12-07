import React, { useState, useEffect } from 'react';
import './community-post.styles.scss';
import heartIcon from '../../../assets/post/heart.png';
import { useMediaQuery } from 'react-responsive';
import heartIconFilled from '../../../assets/post/heart-fill-Icon.png';

// images
import defaultImage from '../../../assets/post/default_image.png';

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
  // console.log('Here is the ID', dummyId);

  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [width, setWidth] = useState('');
  const [liked, setLiked] = useState(isLike);
  const [displayImage, setDisplayImage] = useState(imageURL);

  useEffect(() => {
    if (isMobile) {
      setWidth('240px');
    } else {
      setWidth('186px');
    }
  }, [isMobile]);

  const toggleLike = () => {
    setLiked((prevLiked) => !prevLiked);
    // window.location.href = "/download";
  };

  const handleImageError = () => {
    setDisplayImage(defaultImage);
  };

  return (
    <div
      className='community-post-container'
      style={{
        width: isProfile ? '240px' : '100%',
        backgroundColor: dummyHighlight === 1 ? '#352C28' : '',
        
      }}
    >
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
              onClick={toggleLike}
              alt='Like Icon'
            />

            <span className='gray-text'>{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;
