import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";
const CommunityPostSkeleton = () => {
  return (
    <Card>
      <CardBody>
        {/* Skeleton for the post image */}
        <Skeleton height="186px" width="100%" mb="4" />

        {/* Skeleton for the text */}
        <SkeletonText mt="4" noOfLines={4} spacing="4" />

        {/* Skeleton for the profile section */}
        <div style={{ display: "flex", alignItems: "center", marginTop: "4" }}>
          {/* Skeleton for the profile image */}
          <Skeleton circle size="40px" />

          {/* Skeleton for the author name */}
          <Skeleton height="20px" width="70%" ml="4" />
        </div>

        {/* Skeleton for the like section */}
        <div style={{ display: "flex", alignItems: "center", marginTop: "4" }}>
          {/* Skeleton for the like icon */}
          <Skeleton circle size="24px" />

          {/* Skeleton for the like count */}
          <Skeleton height="20px" width="30%" ml="4" />
        </div>
      </CardBody>
    </Card>
  );
};
export default CommunityPostSkeleton;
