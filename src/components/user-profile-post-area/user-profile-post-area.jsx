import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import usePostQueryStore from "../../postStore.ts";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

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
  const {
    data,
    error,
    isLoading,
    // fetchNextPage,
    // isFetchingNextPage,
    // hasNextPage,
  } = useGetUserPostedPost();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [IsModalOpen, setIsModelOpen] = useState(false);
  const setPostID = usePostQueryStore((state) => state.setPostID);
  const flatData = data?.pages?.flatMap((page) => page.data || []) || [];
  const setMemberID = usePostQueryStore((state) => state.setMemberID);
  const setTitle = usePostQueryStore((state) => state.setTitle);
  const setUserName = usePostQueryStore((state) => state.setUserName);
  const setUserAvatar = usePostQueryStore((state) => state.setUserAvatar);
  const setIsPrivate = usePostQueryStore((state) => state.setIsPrivate);
  const navigate = useNavigate();

  // hook

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

  // create a post + icon button
  const handleIconClick = () => {
    // setShowCreatePost(true);
    navigate("/posts/create", { state: { source: "userProfile" } });
  };

  const handleClickPost = (
    ID,
    avatar,
    username,
    title,
    memberId,
    isPrivate
  ) => {
    setIsModelOpen(true);
    setPostID(ID);
    setUserAvatar(avatar);
    setUserName(username);
    setTitle(title);
    setMemberID(memberId);
    setIsPrivate(isPrivate);
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
          post.memberId,
          post.isDisplay
        )
      }
    >
      <CommunityPost
        // dummyHighlight={post.highlight}
        dummyPrivate={post.isDisplay}
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
