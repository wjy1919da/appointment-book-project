import React from "react";
import { SkeletonCircle, SkeletonText, Skeleton } from "@chakra-ui/react";
import "./comment-card.styles.scss";
import "../components-posts/community-post-detail-pop-up/community-post-detail-pop-up.styles.scss";
const CommentCardSkeleton = () => {
  return (
    <div>
      <div className="comment-card-container">
        <div className="comment-card-inner-container" style={{ width: "100%" }}>
          <div
            className="comment-card-detail-container"
            style={{ width: "100%" }}
          >
            <div
              className="comment-card-profile-information-wrapper"
              style={{ width: "100%" }}
            >
              <div
                className="reviewer-profile-information"
                style={{ padding: "8px", width: "100%" }}
              >
                <div className="reviewer-progile-avatar">
                  <SkeletonCircle size="8" />
                </div>
                <div className="reviewer-information" style={{ width: "100%" }}>
                  <Skeleton height="20px" width="100%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCardSkeleton;
