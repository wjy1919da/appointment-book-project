import React, { useState, useEffect } from 'react';

// components
import CommunityPost from '../components-posts/community-post/community-post.component';

// hook
import { useGetUserPostedPost } from '../../hooks/useGetPosts';

// scss
import '../user-profile-post-area/user-profile-post-area.styles.scss';
import '../create-post/create-post.style.scss';

// images
import post1 from '../../assets/doctor/post3.png';
import userPostAvatar from '../../assets/post/user-profile-avatar.png';

// utils
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import creatPostIcon from '../../assets/post/create-post-icon.png';

//import DoctorPostGrid from '../components-posts/community-post-grid/doctor-post-grid.component';
// import DoctorPostGrid from '../components-posts/community-post-grid/doctor-post-grid.component';
// import CreatePostOfUser from '../create-post/create-post';
// import UserProfileReview from '../user-profile-review-area/user-profile-review-area';
// import { useGetUserLikededPost } from '../../hooks/useGetPosts';

const UserProfileLike = () => {
  const [activeTab, setActiveTab] = useState('like'); // By default, "like" is the active taba
  const [imagesLoaded, setImagesLoaded] = useState(false);
  //const [showCreatePost, setShowCreatePost] = useState(false);

  // calling hook
  const { data, isLoading, isError } = useGetUserPostedPost();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const [gutterwidth, setGutterWidth] = useState('10px');
  const breakPoint = {
    default: 4,
    2500: 4,
    2047: 4,
    1700: 4,
    1024: 4,
    767: 3,
    430: 2,
  };

  // const {
  //   data,
  //   error,
  //   isLoading,
  //   fetchNextPage,
  //   isFetchingNextPage,
  //   hasNextPage,
  // } = useGetUserLikededPost();
  // console.log('userCallBackdata', data);
  // const flatData = data ? data.pages.flatMap((page) => page.data) : [];
  // console.log('userPostedpostin', flatData);

  useEffect(() => {
    const images = [creatPostIcon, post1, userPostAvatar]; // Add all images here

    let loadedImagesCount = 0;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImagesCount += 1;
        if (loadedImagesCount === images.length) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  const samplePosts = Array(10).fill({
    pictures: post1,
    title: 'Sample Title',
    avatar: userPostAvatar,
    username: 'Sample Author',
    likeCount: 42,
  });

  const postList = samplePosts.map((post, index) => (
    <CommunityPost
      key={index}
      imageURL={post.pictures}
      text={post.title}
      profileImage={post.avatar}
      authorName={post.username}
      likes={post.likeCount}
      isLike={true}
      isProfile={true}
    />
  ));

  return (
    <div className='user-profile-post-area-container'>
      {imagesLoaded && (
        <div className='choose-picture-conatiner-post'>
          <ResponsiveMasonry
            columnsCountBreakPoints={breakPoint}
            gutter={gutterwidth}
          >
            <Masonry gutter={gutterwidth}>
              {/* CreatePostIcon as the first post */}

              {/* Rest of the posts */}
              {postList}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}
    </div>
  );
};

export default UserProfileLike;
