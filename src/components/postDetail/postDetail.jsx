import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostDetail } from "../../hooks/useGetPosts";
import usePostQueryStore from "../../postStore.ts";
import Modal from 'react-bootstrap/Modal';
import PostDetailPopUP from "../post-detail-popUp/postDetail-popUp";
const PostDetail = ({show,onHide}) =>
{
    
    // const setUserID = usePostQueryStore((state) => state.setUserID);
    
    const{
        data,
        error,
        isLoading,
    }=usePostDetail();
    console.log("fetchdata",data);
    // console.log("userID",setUserID)
    
    
    
    // useEffect(()=>
    // {
    //     setUserID(userID)
    // }, []);
    if (error) {
        return <div>Error: {error.message}</div>;
      }
    if (isLoading) {
    return <div>Loading...</div>;
    }

    return (
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
    )
}
export default PostDetail;