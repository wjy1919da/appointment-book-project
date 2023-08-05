import React from "react";
import { usePostDetail } from "../../../hooks/useGetPosts";
import Modal from 'react-bootstrap/Modal';
import PostDetailPopUP from "../community-post-detail-pop-up/community-post-detail-pop-up";
import PostDetailMobile from "../community-post-detail-mobile/community-post-detail-mobile.component";
import './community-post-detail.styles.scss'
import CloseButton from 'react-bootstrap/CloseButton';
const PostDetail = ({show,onHide,isMobile,postUserName,postAvatar}) =>
{
    const{
        data,
        error,
        isLoading,
    } = usePostDetail();
    console.log("fetchdata",data);
   
    if (error) {
        return <div>Error: {error.message}</div>;
      }
    if (isLoading) {
    return <div>Loading...</div>;
    }

    return (
        <div>
        {isMobile?(
            <div>
            {show && (
            <div style={{ position: 'fixed', top: '0px', right:'0px' }}>
            <div className='post-detail-close-button'>
            <CloseButton style={{color:"white"}} onClick={onHide}/>
            </div>

            </div>
        )}
            <Modal
            dialogClassName='post-detail-mobile-modals'
            show={show}
            onHide={onHide}
            size="sm"
            aria-labelledby="example-custom-modal-styling-title"
            style={{marginTop:'30px'}}
            >
            <div style={{border:'20px solid white',borderRadius:'50px'}}>
            {data&&<PostDetailMobile
                    picture= {data.data.pictures} 
                    brief={data.data.brief} 
                    tag={data.data.tags?data.data.tags[0].tagName : null}
                    postDate={data.data.createTimestamp}
                    commentCount={data.data.commentCount}
                    likeCount={data.data.likeCount}
                    collectCount={data.data.collectCount}
                    comments={data.data.comments}
                    userName={postUserName}      
                    userAvatar={postAvatar}          
                />   
            }
            </div>
            </Modal>
            </div>
        ):(
        <Modal
        dialogClassName="post-detail-modals"
        show={show}
        onHide={onHide}
        size='xl'
        aria-labelledby="example-custom-modal-styling-title"
        >
        {data&&<PostDetailPopUP 
            picture= {data.data.pictures} 
            brief={data.data.brief} 
            tag={data.data.tags?data.data.tags[0].tagName : null}
            postDate={data.data.createTimestamp}
            commentCount={data.data.commentCount}
            likeCount={data.data.likeCount}
            collectCount={data.data.collectCount}
            comments={data.data.comments}
            
        />}
        
        </Modal>
        )} 
        </div>
    )
}
export default PostDetail;