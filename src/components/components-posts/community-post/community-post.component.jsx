import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import {
  Card,
  CardBody,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";

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
import userInfoQueryStore from "../../../userStore";

const CommunityPost = ({
  id,
  dummyHighlight,
  dummyPrivate,
  imageURL,
  text,
  profileImage,
  authorName,
  likes, // likeCount
  isProfile,
  liked, // isLike
}) => {
  const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const togglePopup = userInfoQueryStore((state) => state.togglePopup);
  const postQuery = usePostQueryStore((state) => state.postQuery);
  const setIsLike = usePostQueryStore((state) => state.setIsLike);

  const [width, setWidth] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(true);

  // const [displayImage, setDisplayImage] = useState(imageURL);

  // likes
  const [isHeartLiked, setIsHeartLiked] = useState(liked);
  const [countLikes, setCountLikes] = useState(likes);
  useEffect(() => {
    setIsHeartLiked(liked);
    // setIsLike(liked);
    setCountLikes(likes);
  }, [liked, likes]);

  useEffect(() => {
    if (isMobile) {
      setWidth("240px");
    } else {
      setWidth("186px");
    }
  }, [isMobile]);

  // default image when image is not loaded
  const handleImageError = () => {
    setIsImageLoaded(false);
    // setDisplayImage(defaultImage);
  };
  const handleAvatarError = () => {
    setIsAvatarLoaded(false);
  };

  // likes hook import
  const { mutate: apiLikeMutate } = useGetLikesPost();

  // like button
  const handleHeartIconClick = (e) => {
    e.stopPropagation(); // prevent to open pop up when like button is clicked
    if (!userInfo.token) {
      togglePopup(true, "accountType");
      return;
    }
    apiLikeMutate({ postId: id });
    // setIsLike(!isHeartLiked);

    setIsHeartLiked((prev) => {
      const newCountLikes = prev ? countLikes - 1 : countLikes + 1;
      setCountLikes(newCountLikes);
      return !prev;
    });
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

      {imageURL && isImageLoaded ? (
        <div className="post-Image">
          <img
            src={imageURL}
            className="postImage"
            onError={handleImageError}
          />
        </div>
      ) : (
        <Skeleton height="186px" width="100%" />
      )}
      <div className="post-information">
        <span className="post-text">{text}</span>
        <div className="profile">
          <div className="profileImage">
            {profileImage && isAvatarLoaded ? (
              <img
                className="profile-pic"
                src={profileImage}
                onError={handleAvatarError}
              ></img>
            ) : (
              <SkeletonCircle size="7" />
            )}
            <span className="gray-text">{authorName}</span>
          </div>
          <div className="likeNumber">
            <img
              src={isHeartLiked ? heartIconFilled : heartIcon}
              className="heartIcon"
              onClick={(e) => handleHeartIconClick(e)}
              alt="Like Icon"
            />
            <span className="gray-text">{countLikes}</span>
            {/* <span className='gray-text'>{likes}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;
