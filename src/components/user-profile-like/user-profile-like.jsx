import React, { useState, useEffect } from "react";
import usePostQueryStore from "../../postStore.ts";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// components
import CommunityPost from "../components-posts/community-post/community-post.component";
import PostDetail from "../components-posts/community-post-detail/community-post-detail.component";

// hook
import { useGetUserLikededPost } from "../../hooks/useGetPosts";

// scss
import "../user-profile-post-area/user-profile-post-area.styles.scss";
import "../create-post/create-post.style.scss";

// images
import post1 from "../../assets/doctor/post3.png";
import userPostAvatar from "../../assets/post/user-profile-avatar.png";
import creatPostIcon from "../../assets/post/create-post-icon.png";
import CommunityPostSkeleton from "../components-posts/community-post/community-post-skeleton.component.jsx";

const UserProfileLike = () => {
  // calling hook
  console.log("user profile like");
  const { data, isLoading, isError } = useGetUserLikededPost();

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [IsModalOpen, setIsModelOpen] = useState(false);
  const setPostID = usePostQueryStore((state) => state.setPostID);
  const flatData = data?.pages?.flatMap((page) => page.data || []) || [];
  const setMemberID = usePostQueryStore((state) => state.setMemberID);
  const setTitle = usePostQueryStore((state) => state.setTitle);
  const setUserName = usePostQueryStore((state) => state.setUserName);
  const setUserAvatar = usePostQueryStore((state) => state.setUserAvatar);

  const [gutterwidth, setGutterWidth] = useState("10px");
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
  const skeletons = [1, 2, 3, 4, 5, 6, 7];

  const handleClickPost = (ID, avatar, username, title, memberId) => {
    setIsModelOpen(true);
    setPostID(ID);
    setUserAvatar(avatar);
    setUserName(username);
    setTitle(title);
    setMemberID(memberId);
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
              post.memberId
            )
          }
        >
          <CommunityPost
            dummyHighlight={post.isHighlight}
            dummyPrivate={post.isDisplay}
            id={post.id}
            imageURL={post.coverImg || []}
            text={post.title || ""}
            profileImage={post.avatar || ""}
            authorName={post.nickname || ""}
            likes={post.like_count || 0}
            liked={post.isLike}
          />
        </div>
      ));

  return (
    <div className="user-profile-post-area-container">
      {imagesLoaded && (
        <div className="choose-picture-conatiner-post">
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
