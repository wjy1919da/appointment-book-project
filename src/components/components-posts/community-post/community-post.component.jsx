import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

// hooks
import { useGetLikesPost } from "../../../hooks/useGetPosts";

// stores
import usePostQueryStore from "../../../postStore.ts";

// scss
import "./community-post.styles.scss";

// images
import defaultImage from "../../../assets/post/default_image.png";
import LockIcon from "../../../assets/post/lock_icon.svg";
import heartIcon from "../../../assets/post/heart.png";
import heartIconFilled from "../../../assets/post/heart-fill-Icon.png";

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
  id,
}) => {
  // console.log("community post", id);
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const [width, setWidth] = useState("");
  const [liked, setLiked] = useState(isLike);
  const [displayImage, setDisplayImage] = useState(imageURL);

  const postQuery = usePostQueryStore((state) => state.postQuery);

  useEffect(() => {
    if (isMobile) {
      setWidth("240px");
    } else {
      setWidth("186px");
    }
  }, [isMobile]);

  // likes hook import
  const { mutate: apiLikeMutate } = useGetLikesPost();

  // set default image when image is not loaded function is here
  const handleImageError = () => {
    setDisplayImage(defaultImage);
  };

  // like button function is here
  // prevent to open pop up when like buttonis clicked
  const handleHeartIconClick = (e) => {
    e.stopPropagation();
    setLiked((prevLiked) => !prevLiked);
    apiLikeMutate({ postId: postQuery.postID });
  };

  return (
    <div
      className="community-post-container"
      style={{
        width: isProfile ? "240px" : "100%",
        backgroundColor: dummyHighlight === 1 ? "#352C28" : "",
      }}
    >
      {dummyPrivate === 0 && (
        <img
          src={LockIcon}
          alt="Icon-Lock"
          className="community-post-icon-lock"
        />
      )}

      <div className="post-Image">
        <img
          src={displayImage}
          className="postImage"
          onError={handleImageError}
        />
      </div>
      <div className="post-information">
        <span className="post-text">{text}</span>
        <div className="profile">
          <div className="profileImage">
            <img className="profile-pic" src={profileImage}></img>
            <span className="gray-text">{authorName}</span>
          </div>
          <div className="likeNumber">
            <img
              src={liked ? heartIconFilled : heartIcon}
              className="heartIcon"
              onClick={handleHeartIconClick}
              // onClick={toggleLike}
              alt="Like Icon"
            />

            <span className="gray-text">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;
