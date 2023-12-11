import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import usePostQueryStore from "../../postStore.ts";
import { useMediaQuery } from "react-responsive";

// components
import CreatePostOfUser from "../create-post/create-post";
import CommunityPost from "../components-posts/community-post/community-post.component";
import PostDetail from "../components-posts/community-post-detail/community-post-detail.component";
// import UserProfileReview from '../user-profile-review-area/user-profile-review-area';

// hook
import { useGetUserPostedPost } from "../../hooks/useGetPosts.js";

// scss
import "./user-profile-post-area.styles.scss";
import "../create-post/create-post.style.scss";

// images
import post1 from "../../assets/doctor/post3.png";
import creatPostIcon from "../../assets/post/create-post-icon.png";
import userPostAvatar from "../../assets/post/user-profile-avatar.png";

const UserProfilePost = ({ showCreatePost, setShowCreatePost }) => {
  // calling hook
  const {
    data,
    error,
    isLoading,
    // fetchNextPage,
    // isFetchingNextPage,
    // hasNextPage,
  } = useGetUserPostedPost();

  // let data = {
  //   pages: [
  //     {
  //       data: [
  //         {
  //           id: 13,
  //           title: '哈哈哈',
  //           coverImg:
  //             'http://dxm72.longcai.pw/uploads/20220403/5235ed292a68dc6e07fe8b11e49af30a.png',
  //           memberId: 262,
  //           nickname: 'DrJohnDoe',
  //           likedCount: 2,
  //           private: 0,
  //           highlight: 1,
  //         },
  //         {
  //           id: 72,
  //           title: '11',
  //           coverImg:
  //             'http://dxm72.zihai.shop/uploads/20220725/a26366a3b047841bf7c8fe24f50c200e.jpg',
  //           memberId: 84,
  //           nickname: 'rgwyq1',
  //           likedCount: 4,
  //           private: 0,
  //           highlight: 1,
  //         },
  //         {
  //           id: 74,
  //           title: 'hajs',
  //           coverImg:
  //             'http://dxm72.zihai.shop/uploads/20220819/3b33d04748999acf876fc17a761c3c6d.png',
  //           memberId: 94,
  //           nickname: 'zbzm',
  //           likedCount: 2,
  //           private: 0,
  //           highlight: 1,
  //         },
  //         {
  //           id: 75,
  //           title: '我们的生活方式是什么意思123',
  //           coverImg:
  //             'http://dxm72.zihai.shop/uploads/20220819/7399be71bbdacc8037682ef726e5d45a.png',
  //           memberId: 94,
  //           nickname: 'zbzm',
  //           likedCount: 2,
  //           private: 0,
  //           highlight: 1,
  //         },
  //         {
  //           id: 77,
  //           title: '今天',
  //           coverImg:
  //             'http://dxm72.zihai.shop/uploads/20220723/3785cf8e2c338bc9954d3c8cb2fad62e.png',
  //           memberId: 35,
  //           nickname: 'John',
  //           likedCount: 3,
  //           private: 0,
  //           highlight: 0,
  //         },
  //         {
  //           id: 84,
  //           title: 'test 2',
  //           coverImg:
  //             'http://charmlife.cc/uploads/20221004/28cc88e32be9b53e67664562758d6852.png',
  //           memberId: 100,
  //           nickname: 'test',
  //           likedCount: 0,
  //           private: 0,
  //           highlight: 0,
  //         },
  //         {
  //           id: 136,
  //           title: '滤镜测试',
  //           coverImg: 'content://media/external_primary/images/media/127341',
  //           memberId: 299,
  //           nickname: 'lllLouis',
  //           likedCount: 0,
  //           private: 0,
  //           highlight: 0,
  //         },
  //         {
  //           id: 137,
  //           title: 'test',
  //           coverImg: 'content://media/external_primary/images/media/127342',
  //           memberId: 299,
  //           nickname: 'lllLouis',
  //           likedCount: 0,
  //           private: 0,
  //           highlight: 0,
  //         },
  //         {
  //           id: 94,
  //           title: 'test',
  //           coverImg:
  //             'http://18.144.138.153/uploads/20230214/4603519aa92906895b20f81b6dae8a20.png',
  //           memberId: 101,
  //           nickname: 'wjs',
  //           likedCount: 2,
  //           private: 0,
  //           highlight: 0
  //         },
  //       ],
  //       pageInfo: {
  //         currentPage: 1,
  //         totalPage: 6,
  //         pageSize: 12,
  //         totalRecords: 62,
  //       },
  //     },
  //   ],
  //   pageParams: [null],
  // };
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [IsModalOpen, setIsModelOpen] = useState(false);
  const setPostID = usePostQueryStore((state) => state.setPostID);
  const flatData = data?.pages?.flatMap((page) => page.data || []) || [];
  const setMemberID = usePostQueryStore((state) => state.setMemberID);
  const setTitle = usePostQueryStore((state) => state.setTitle);
  const setUserName = usePostQueryStore((state) => state.setUserName);
  const setUserAvatar = usePostQueryStore((state) => state.setUserAvatar);
  const handleIconClick = () => {
    setShowCreatePost(true);
  };

  // width
  const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });

  const [gutterwidth, setGutterWidth] = useState("20px");

  const breakPoint = {
    default: 4,
    2500: 4,
    2047: 4,
    1700: 4,
    1024: 4,
    767: 3,
    430: 2,
  };

  const handleClickPost = (ID, avatar, username, title, memberId) => {
    setIsModelOpen(true);
    setPostID(ID);
    setUserAvatar(avatar);
    setUserName(username);
    setTitle(title);
    setMemberID(memberId);
  };

  const postList = flatData.map((post, index) => (
    <div
      key={index}
      onClick={() =>
        handleClickPost(
          post.id,
          post.avatar,
          post.username,
          post.title,
          post.memberId
        )
      }
    >
      <CommunityPost
        dummyHighlight={post.highlight}
        dummyPrivate={post.private}
        imageURL={post.coverImg || []}
        text={post.title || ""}
        profileImage={post.avatar || ""}
        authorName={post.username || ""}
        likes={post.like_count || 0}
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
  return (
    <div className="user-profile-post-area-container">
      {!showCreatePost && imagesLoaded && (
        <div className="choose-picture-conatiner-post">
          <ResponsiveMasonry
            columnsCountBreakPoints={breakPoint}
            gutter={gutterwidth}
          >
            <Masonry gutter={gutterwidth}>
              {/* CreatePostIcon as the first post */}

              <div className="choose-picture-section-image-post">
                <img
                  src={creatPostIcon}
                  onClick={handleIconClick}
                  className="choose-picture-section-image"
                  alt="Create Post"
                />
              </div>

              {/* archive posts button */}
              <div className="archive-posts-button-container">
                <span className="archive-title">Archived Posts</span>
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
        />
      )}
    </div>
  );
};

export default UserProfilePost;
