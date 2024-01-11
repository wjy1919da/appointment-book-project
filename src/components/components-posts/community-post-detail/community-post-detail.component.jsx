import React from "react";
import { usePostDetail } from "../../../hooks/useApiRequestPostFilter";
import Modal from "react-bootstrap/Modal";
import PostDetailPopUP from "../community-post-detail-pop-up/community-post-detail-pop-up";
import "./community-post-detail.styles.scss";
import CommunityPostDetailPopUPSkeleton from "../community-post-detail-pop-up/community-post-detail-popup-skeleton";

// images
import CloseButton from "../../../assets/post/pop-up-close-button.png";

const PostDetail = ({ show, onHide, isMobile }) => {
  const { data, error, isLoading } = usePostDetail();
  // console.log("post detail", postTitle);
  // let isLoading = true;
  return (
    <div>
      <div className="modal-parent-container">
        <Modal
          dialogClassName="close-button-modal"
          show={show}
          onHide={onHide}
          size="xl"
          aria-labelledby="example-custom-modal-styling-title"
          // style={{ marginTop: "50px" }}
        >
          <div className="modal-content-centering-wrapper">
            <div className="modal-content first-modal-content">
              <button className="close-button" onClick={onHide}>
                <img src={CloseButton} alt="Icon-Close-Button" />
              </button>
            </div>
          </div>
        </Modal>
      </div>

      {isMobile ? (
        <div>
          <div class="modal-parent-container">
            <Modal
              dialogClassName="post-detail-mobile-modals"
              show={show}
              onHide={onHide}
              size="xl"
              aria-labelledby="example-custom-modal-styling-title"
              style={{ marginTop: "20px" }}
            >
              <div style={{ border: "10px solid white", borderRadius: "50px" }}>
                {isLoading ? (
                  <CommunityPostDetailPopUPSkeleton />
                ) : (
                  data?.data && (
                    <PostDetailPopUP
                      picture={data.data.pictures}
                      brief={data.data.brief}
                      tag={data.data.tags}
                      postDate={data.data.createTimestamp}
                      commentCount={data.data.commentCount}
                      likeCount={data.data.likeCount}
                      collectCount={data.data.collectCount}
                      comments={data.data.comments}
                      isLiked={data.data.isLike}
                    />
                  )
                  // <div>hello</div>
                )}
              </div>
            </Modal>
          </div>
        </div>
      ) : (
        <Modal
          dialogClassName="custom-modal-size"
          show={show}
          onHide={onHide}
          aria-labelledby="example-custom-modal-styling-title"
          style={{ marginTop: "20px", borderRadius: "55px" }}
          centered
        >
          {isLoading ? (
            <CommunityPostDetailPopUPSkeleton />
          ) : (
            data?.data && (
              <PostDetailPopUP
                picture={data.data.pictures}
                brief={data.data.brief}
                tag={data.data.tags}
                postDate={data.data.createTimestamp}
                commentCount={data.data.commentCount}
                likeCount={data.data.likeCount}
                collectCount={data.data.collectCount}
                comments={data.data.comments}
                isLiked={data.data.isLike}
              />
            )
            // <div>hello</div>
          )}
        </Modal>
      )}
    </div>
  );
};
export default PostDetail;
