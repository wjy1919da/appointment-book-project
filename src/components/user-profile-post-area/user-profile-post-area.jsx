import { useState, useEffect } from 'react';
import CreatePostOfUser from '../create-post/create-post';
import './user-profile-post-area.styles.scss';
import '../create-post/create-post.style.scss';
import { useGetUserPostedPost } from '../../hooks/useGetPosts';
import userPostAvatar from '../../assets/post/user-profile-avatar.png';
import post1 from '../../assets/doctor/post3.png';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import creatPostIcon from '../../assets/post/create-post-icon.png';
import CommunityPost from '../components-posts/community-post/community-post.component';
import usePostQueryStore from '../../postStore.ts';
import PostDetail from '../components-posts/community-post-detail/community-post-detail.component';
import UserProfileReview from '../user-profile-review-area/user-profile-review-area';
import { useMediaQuery } from 'react-responsive';

// images
import ArchiveFilter from '../../assets/post/archive_filter.svg';

const UserProfilePost = ({ showCreatePost, setShowCreatePost }) => {
  const [activeTab, setActiveTab] = useState('like'); // By default, "like" is the active taba
  //const [showCreatePost, setShowCreatePost] = useState(false);

  const setUserID = usePostQueryStore((state) => state.setUserID);

  const handleIconClick = () => {
    setShowCreatePost(true); // Show the CreatePostOfUser component when the icon is clicked
  };

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

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [IsModalOpen, setIsModelOpen] = useState(false);
  const {
    data,

    error,

    isLoading,

    fetchNextPage,

    isFetchingNextPage,

    hasNextPage,
  } = useGetUserPostedPost();

  var userName;
  var avatar;

  const handleOnClick = (userName, avatar) => {
    setIsModelOpen(true);
    userName = userName;
    avatar = avatar;
    setUserID(143);
  };

  console.log('userpostedCallBackdata', data);

  const flatData = data ? data.pages.flatMap((page) => page.data) : [];

  console.log('userPostedpostin', flatData);

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
    <div key={index} onClick={() => handleOnClick(post.avatar, post.username)}>
      <CommunityPost
        imageURL={post.pictures}
        text={post.title}
        profileImage={post.avatar}
        authorName={post.username}
        likes={post.likeCount}
        isProfile={true}
      />
    </div>
  ));

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

              {/* Archive Posts Button */}
              <div className='archived-posts-button-container'>
                <img src={ArchiveFilter} alt='Image-Archive-Posts' />
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
          postAvatar={avatar}
        />
      )}
    </div>
  );
};

export default UserProfilePost;
