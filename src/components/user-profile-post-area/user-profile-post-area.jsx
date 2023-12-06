import { useState, useEffect } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import usePostQueryStore from '../../postStore.ts';
import { useMediaQuery } from 'react-responsive';

// components
import CreatePostOfUser from '../create-post/create-post';
import CommunityPost from '../components-posts/community-post/community-post.component';
import PostDetail from '../components-posts/community-post-detail/community-post-detail.component';
// import UserProfileReview from '../user-profile-review-area/user-profile-review-area';

// hook
// import { useGetUserPostedPost } from '../../hooks/useGetPosts.js';

// scss
import './user-profile-post-area.styles.scss';
import '../create-post/create-post.style.scss';

// images
import post1 from '../../assets/doctor/post3.png';
import creatPostIcon from '../../assets/post/create-post-icon.png';
import userPostAvatar from '../../assets/post/user-profile-avatar.png';

const UserProfilePost = ({ showCreatePost, setShowCreatePost }) => {
  // calling hook
  // const {
  //   data,
  //   error,
  //   isLoading,
  //   // fetchNextPage,
  //   // isFetchingNextPage,
  //   // hasNextPage,
  // } = useGetUserPostedPost();

  // dummy data
  const data = {
    pages: [
      {
        code: 100,
        msg: 'Success',
        data: [
          {
            id: 135,
            memberId: 125,
            title: '1223@¥¥',
            brief: null,
            coverImg:
              'http://app.charm-life.com/uploads/20230717/61c09ccb7324ba82e4642e9853536f4b.png',
            like_count: 1,
            avatar: 'default_avatar.jpg',
            username: 'Unknown User',
          },
          {
            id: 75,
            memberId: 94,
            title: '我们的生活方式是什么意思123',
            brief: '山水大酒店对面一个人的时候我就不知道了',
            coverImg:
              'http://dxm72.zihai.shop/uploads/20220819/7399be71bbdacc8037682ef726e5d45a.png',
            like_count: 2,
            avatar:
              'http://dxm72.zihai.shop/uploads/20220321/baf4631f46ca84d67baefc36657f95e8.png',
            username: 'zbzm',
          },
          {
            id: 77,
            memberId: 35,
            title: '今天',
            brief: '不过这个',
            coverImg:
              'http://dxm72.zihai.shop/uploads/20220723/3785cf8e2c338bc9954d3c8cb2fad62e.png',
            like_count: 3,
            avatar:
              'http://dxm72.zihai.shop/uploads/20220321/baf4631f46ca84d67baefc36657f95e8.png',
            username: 'John',
          },
        ],
      },
    ],
  };

  // const data = [
  //   {
  //     id: 135,
  //     memberId: 125,
  //     title: '1223@¥¥',
  //     brief: null,
  //     coverImg:
  //       'http://app.charm-life.com/uploads/20230717/61c09ccb7324ba82e4642e9853536f4b.png',
  //     like_count: 1,
  //     avatar: 'default_avatar.jpg',
  //     username: 'Unknown User',
  //   },
  //   {
  //     id: 75,
  //     memberId: 94,
  //     title: '我们的生活方式是什么意思123',
  //     brief: '山水大酒店对面一个人的时候我就不知道了',
  //     coverImg:
  //       'http://dxm72.zihai.shop/uploads/20220819/7399be71bbdacc8037682ef726e5d45a.png',
  //     like_count: 2,
  //     avatar:
  //       'http://dxm72.zihai.shop/uploads/20220321/baf4631f46ca84d67baefc36657f95e8.png',
  //     username: 'zbzm',
  //   },
  //   {
  //     id: 77,
  //     memberId: 35,
  //     title: '今天',
  //     brief: '不过这个',
  //     coverImg:
  //       'http://dxm72.zihai.shop/uploads/20220723/3785cf8e2c338bc9954d3c8cb2fad62e.png',
  //     like_count: 3,
  //     avatar:
  //       'http://dxm72.zihai.shop/uploads/20220321/baf4631f46ca84d67baefc36657f95e8.png',
  //     username: 'John',
  //   },
  // ];

  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [IsModalOpen, setIsModelOpen] = useState(false);
  // const [activeTab, setActiveTab] = useState('like');
  //const [showCreatePost, setShowCreatePost] = useState(false);

  const setUserID = usePostQueryStore((state) => state.setUserID);
  const flatData = data?.pages?.flatMap((page) => page.data || []) || [];

  useEffect(() => {
    console.log('Posts Page Data', data);
  }, [data]);

  // create a post + icon button
  const handleIconClick = () => {
    setShowCreatePost(true);
  };

  // width
  const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });

  const [gutterwidth, setGutterWidth] = useState('20px');

  const breakPoint = {
    default: 4,
    2500: 4,
    2047: 4,
    1700: 4,
    1024: 4,
    767: 3,
    430: 2,
  };

  const setPostID = (ID) => {
    console.log(ID);

    setIsModelOpen(true);
    setUserID(ID);
    setUserAvatar(userPostAvatar);
    setUserName('wyj');
  };

  const postList = flatData.map((post, index) => (
    <div
      key={index}
      onClick={() => setPostID(post.id, post.avatar, post.username)}
    >
        <CommunityPost
          dummyId={post.id}
          imageURL={post.coverImg || []}
          text={post.title || ''}
          profileImage={post.avatar || ''}
          authorName={post.username || ''}
          likes={post.like_count || 0}
          // imageURL={post.coverImg}
          // text={post.title}
        />
    </div>
  ));

  // var userName;
  // var avatar;

  //console.log('userpostedCallBackdata', data);
  //console.log('userPostedpostin', flatData);

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

  // if (flatData.length === 0) {
  //   return null; // 或者你可以选择返回null来完全不渲染组件
  // }

  // const samplePosts = Array(10).fill({
  //   pictures: post1,
  //   title: 'Sample Title',
  //   avatar: userPostAvatar,
  //   username: 'Sample Author',
  //   likeCount: 42,
  // });

  return (
    <div className='user-profile-post-area-container'>
      {!showCreatePost && imagesLoaded && (
        <div className='choose-picture-conatiner-post'>
          <ResponsiveMasonry
            columnsCountBreakPoints={breakPoint}
            gutter={gutterwidth}
          >
            <Masonry gutter={gutterwidth}>
              {/* CreatePostIcon as the first post */}

              <div className='choose-picture-section-image-post'>
                <img
                  src={creatPostIcon}
                  onClick={handleIconClick}
                  className='choose-picture-section-image'
                  alt='Create Post'
                />
              </div>

              {/* archive posts button */}
              <div className='archive-posts-button-container'>
                <span className='archive-title'>Archived Posts</span>
              </div>

              {/* Rest of the posts */}
              {postList}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}

      {showCreatePost && <CreatePostOfUser />}

      {IsModalOpen && (
        <PostDetail
          show={IsModalOpen}
          onHide={() => setIsModelOpen(false)}
          isMobile={isMobile}
          postUserName={userName}
          postAvatar={userAvatar}
        />
      )}
    </div>
  );
};

export default UserProfilePost;
