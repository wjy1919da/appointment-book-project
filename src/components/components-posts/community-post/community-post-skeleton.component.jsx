import {
  Card,
  CardBody,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";
import heartIcon from "../../../assets/post/heart.png";
import "./community-post.styles.scss";
// import Comm
const CommunityPostSkeleton = () => {
  return (
    <div className="community-post-container" style={{ height: "280px" }}>
      <Skeleton
        height="200px"
        width="100%"
        borderTopLeftRadius="8px"
        borderTopRightRadius="8px"
      />

      <div className="post-information">
        {/* <span className="post-text">{text}</span> */}
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <div className="profile">
          <div className="profileImage">
            <SkeletonCircle size="7" />
            {/* <span className="gray-text">{authorName}</span> */}
          </div>
          <div className="likeNumber">
            <img src={heartIcon} className="heartIcon" alt="Like Icon" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommunityPostSkeleton;
