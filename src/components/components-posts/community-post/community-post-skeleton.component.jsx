import {
  Card,
  CardBody,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";
import heartIcon from "../../../assets/post/heart.png";
// import Comm
const CommunityPostSkeleton = () => {
  return (
    // <Card>
    //   <CardBody>
    //     {/* Skeleton for the post image */}
    //     <Skeleton height="186px" width="100%" mb="4" />

    //     {/* Skeleton for the text */}
    //     <SkeletonText mt="4" noOfLines={1} spacing="4" />

    //     {/* Skeleton for the profile section */}
    //     <div style={{ display: "flex", alignItems: "center", marginTop: "4" }}>
    //       {/* Skeleton for the profile image */}
    //       <Skeleton circle size="7px" />

    //       {/* Skeleton for the author name */}
    //       {/* <Skeleton height="20px" width="70%" ml="4" /> */}
    //     </div>

    //     {/* Skeleton for the like section */}
    //   </CardBody>
    // </Card>
    <div className="community-post-container">
      {/* <div className="post-Image"> */}
      <Skeleton height="186px" width="100%" />
      {/* </div> */}

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
            {/* <span className="gray-text">{countLikes}</span> */}
            {/* <span className='gray-text'>{likes}</span> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommunityPostSkeleton;
