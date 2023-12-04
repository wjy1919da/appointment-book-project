import React from 'react';
import { usePostDetail } from '../../../hooks/useGetPosts';
import Modal from 'react-bootstrap/Modal';
import PostDetailPopUP from '../community-post-detail-pop-up/community-post-detail-pop-up';
import './community-post-detail.styles.scss';

// images
import CloseButton from '../../../assets/post/pop-up-close-button.png';

const PostDetail = ({ show, onHide, isMobile, postUserName, postAvatar }) => {
  const { data, error, isLoading } = usePostDetail();

  if (data) {
    console.log('fetchdata', data);
  }

  //   if (error) {
  //     return <div>Error: {error.message}</div>;
  //   }
  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <div>
      <div className='modal-parent-container'>
        <Modal
          dialogClassName='close-button-modal'
          show={show} // Set this according to your logic
          onHide={onHide} // Set this according to your logic
          size='xl'
          aria-labelledby='example-custom-modal-styling-title'
          style={{ marginTop: '50px' }}
        >
          <div className='modal-content-centering-wrapper'>
            <div className='modal-content first-modal-content'>
              <button className='close-button' onClick={onHide}>
                <img src={CloseButton} alt='Icon-Close-Button' />
              </button>
              {/* ...more content for the first modal... */}
            </div>
          </div>
        </Modal>
      </div>
      {isMobile ? (
        <div>
          <div class='modal-parent-container'>
            <Modal
              dialogClassName='post-detail-mobile-modals'
              show={show}
              onHide={onHide}
              size='xl'
              aria-labelledby='example-custom-modal-styling-title'
              style={{ marginTop: '100px' }}
            >
              <div style={{ border: '10px solid white', borderRadius: '50px' }}>
                {data?.data && (
                  <PostDetailPopUP
                    picture={data.data.pictures}
                    brief={data.data.brief}
                    tag={data.data.tags ? data.data.tags[0].tagName : null}
                    postDate={data.data.createTimestamp}
                    commentCount={data.data.commentCount}
                    likeCount={data.data.likeCount}
                    collectCount={data.data.collectCount}
                    comments={data.data.comments}
                    id={data.data.id}
                    userName={postUserName}
                    userAvatar={postAvatar}
                  />
                )}
              </div>
            </Modal>
          </div>
        </div>
      ) : (
        <Modal
          dialogClassName='post-detail-modals'
          show={show}
          onHide={onHide}
          size='xl'
          aria-labelledby='example-custom-modal-styling-title'
          style={{ marginTop: '100px' }}
        >
          {data?.data && (
            <PostDetailPopUP
              picture={data.data.pictures}
              brief={data.data.brief}
              tag={data.data.tags ? data.data.tags[0].tagName : null}
              postDate={data.data.createTimestamp}
              commentCount={data.data.commentCount}
              likeCount={data.data.likeCount}
              collectCount={data.data.collectCount}
              comments={data.data.comments}
              id={data.data.id}
              userName={postUserName}
              userAvatar={postAvatar}
            />
          )}
        </Modal>
      )}
    </div>
  );
};
export default PostDetail;
