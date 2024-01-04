import { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import usePostQueryStore from "../../postStore.ts";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

// components
// import CreatePostOfUser from '../../create-post/create-post';
import CommunityPost from "../../components/components-posts/community-post/community-post.component.jsx";
import PostDetail from "../../components/components-posts/community-post-detail/community-post-detail.component.jsx";
import CommunityPostSkeleton from "../../components/components-posts/community-post/community-post-skeleton.component.jsx";

// hook
import { useGetUserPostedPost } from "../../hooks/useGetPosts.js";

// scss
import "./doctor-own-profile-grid.scss";

// images
import post1 from "../../assets/doctor/post3.png";
import creatPostIcon from "../../assets/post/create-post-icon.png";
import userPostAvatar from "../../assets/post/user-profile-avatar.png";

const DoctorProfileGrid = ({ showCreatePost, setShowCreatePost }) => {
  const {
    data,
    error,
    isLoading,
    // fetchNextPage,
    // isFetchingNextPage,
    // hasNextPage,
  } = useGetUserPostedPost();
  const postQuery = usePostQueryStore((state) => state.postQuery);
  const [userAvatar, setUserAvatar] = useState("");
  const [userName, setUserName] = useState("");
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [IsModalOpen, setIsModelOpen] = useState(false);
  const setPostID = usePostQueryStore((state) => state.setPostID);
  const setMemberID = usePostQueryStore((state) => state.setMemberID);
  const setTitle = usePostQueryStore((state) => state.setTitle);
  const setDescription = usePostQueryStore((state) => state.setDescription);
  const setIsHighlight = usePostQueryStore((state) => state.setIsHighlight);
  const setIsPrivate = usePostQueryStore((state) => state.setIsPrivate);
  const setIsLike = usePostQueryStore((state) => state.setIsLike);

  const flatData = data?.pages?.flatMap((page) => page.data || []) || [];
  const navigate = useNavigate();
  const skeletons = [1, 2, 3, 4, 5, 6, 7];

  const handleIconClick = () => {
    // setShowCreatePost(true);
    navigate("/posts/create", { state: { source: "doctorProfile" } });
  };

  // width
  const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });

  const [gutterwidth, setGutterWidth] = useState("20px");

  const breakPoint = {
    default: 4,
    2500: 5,
    2047: 5,
    1700: 5,
    1024: 4,
    767: 3,
    430: 2,
  };

  const handleClickPost = (
    ID,
    avatar,
    username,
    title,
    memberId,
    isPrivate,
    isHighlight,
    isLike
  ) => {
    setIsModelOpen(true);
    setPostID(ID);
    setUserAvatar(avatar);
    setUserName(username);
    setTitle(title);
    setMemberID(memberId);
    setIsHighlight(isHighlight);
    setIsPrivate(isPrivate);
    setIsLike(isLike);
  };

  const postList = isLoading
    ? skeletons.map((skeleton) => <CommunityPostSkeleton key={skeleton} />)
    : flatData.map((post, index) => (
        <div
          key={index}
          onClick={() =>
            handleClickPost(
              post.id,
              post.avatar,
              post.username,
              post.title,
              post.memberId,
              post.isDisplay,
              post.highlightStatus
            )
          }
        >
          <CommunityPost
            imageURL={post.coverImg || []}
            text={post.title || ""}
            profileImage={post.avatar || ""}
            authorName={post.username || ""}
            likes={post.like_count || 0}
            dummyPrivate={post.isDisplay}
            dummyHighlight={post.highlightStatus}
            id={post.id}
            liked={post.isLike}
            status={post.status}
          />
        </div>
      ));

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
    <div className="doctor-profile-post-grid-container">
      {!showCreatePost && imagesLoaded && (
        <div className="doctor-profile-post-grid-choose-picture-conatiner-post">
          <ResponsiveMasonry
            columnsCountBreakPoints={breakPoint}
            gutter={gutterwidth}
          >
            <Masonry gutter={gutterwidth}>
              <div className="doctor-profile-post-grid-choose-picture-section-image-post">
                <img
                  src={creatPostIcon}
                  onClick={handleIconClick}
                  className="doctor-profile-post-grid-choose-picture-section-image"
                  alt="Create Post"
                />
              </div>
              {postList}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      )}

      {/* {showCreatePost && <CreatePostOfUser />} */}

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

export default DoctorProfileGrid;
