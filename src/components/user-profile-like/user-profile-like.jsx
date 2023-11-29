import React, { useState, useEffect } from 'react';
import usePostQueryStore from '../../postStore.ts';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

// components
import CommunityPost from '../components-posts/community-post/community-post.component';
import PostDetail from '../components-posts/community-post-detail/community-post-detail.component';

// hook
import { useGetUserLikededPost } from '../../hooks/useGetPosts';

// scss
import '../user-profile-post-area/user-profile-post-area.styles.scss';
import '../create-post/create-post.style.scss';

// images
import post1 from '../../assets/doctor/post3.png';
import userPostAvatar from '../../assets/post/user-profile-avatar.png';
import creatPostIcon from '../../assets/post/create-post-icon.png';

//import DoctorPostGrid from '../components-posts/community-post-grid/doctor-post-grid.component';
// import DoctorPostGrid from '../components-posts/community-post-grid/doctor-post-grid.component';
// import CreatePostOfUser from '../create-post/create-post';
// import UserProfileReview from '../user-profile-review-area/user-profile-review-area';
// import { useGetUserLikededPost } from '../../hooks/useGetPosts';

const UserProfileLike = () => {
  // calling hook
  const { data, isLoading, isError } = useGetUserLikededPost();

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

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [IsModalOpen, setIsModelOpen] = useState(false);
  // const [showCreatePost, setShowCreatePost] = useState(false);
  // const [activeTab, setActiveTab] = useState('like'); // By default, "like" is the active taba

  const setUserID = usePostQueryStore((state) => state.setUserID);
  const setUserName = usePostQueryStore((state) => state.setUserName);
  const setUserAvatar = usePostQueryStore((state) => state.setUserAvatar);

  const flatData = data?.pages?.flatMap((page) => page.data || []) || [];

  useEffect(() => {
    console.log('Likes Page Data', data);
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

  useEffect(() => {
    const images = [creatPostIcon, post1, userPostAvatar];

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

  const handleOnClick = (post) => {
    console.log('POST IS HERE', post);
    setIsModelOpen(true);
    setUserID(post.id);
    setUserName(post.username);
    setUserAvatar(post.avatar);
  };

  const postList = flatData.map((post, index) => (
    <div key={index} onClick={() => handleOnClick(post)}>
      <CommunityPost
        imageURL={post.coverImg || []}
        text={post.title || ''}
        profileImage={post.avatar || ''}
        authorName={post.username || ''}
        likes={post.like_count || 0}

        // key={index}
        // imageURL={post.coverImg}
        // text={post.title}
        // profileImage={userPostAvatar}
        // authorName='Anna'
        // likes={10}
        // isLike={true}
        // isProfile={true}
      />
    </div>
  ));

  // const samplePosts = Array(10).fill({
  //   pictures: post1,
  //   title: 'Sample Title',
  //   avatar: userPostAvatar,
  //   username: 'Sample Author',
  //   likeCount: 42,
  // });

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

      {IsModalOpen && (
        <PostDetail
          show={IsModalOpen}
          onHide={() => setIsModelOpen(false)}
          // isMobile={isMobile}
          // postUserName='userName'
          // postAvatar={userPostAvatar}
        />
      )}
    </div>
  );
};

export default UserProfileLike;
