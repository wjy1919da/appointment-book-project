import React,{ useRef} from 'react';
import "./postDetail-popUp.styles.scss";
import CommentCard from '../comment-card/comment-card';
import heartIcon from '../../assets/post/heart.png';
import commentIcon from '../../assets/post/chat_bubble.png';
import shareIcon from '../../assets/post/shareIcon.png';
import collectIcon from '../../assets/post/star.png';

const PostDetailPopUP = ({picture,brief,tag,postDate,comments,likeCount,collectCount,commentCount}) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    // useEffect(() => {
    //     adjustContainerHeight();
    //     window.addEventListener('resize', adjustContainerHeight);
    //     return () => {
    //       window.removeEventListener('resize', adjustContainerHeight);
    //     };
    //   }, []);

      const adjustContainerHeight = () => {
        const container = containerRef.current;
        const image = imageRef.current;
    
        if (container && image) {
          container.style.height = image.offsetHeight + 'px';
        }
      };
      const handleImageLoad = () => {
        adjustContainerHeight();
      };
      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US');
        return formattedDate;
      };
      const ndate=formatDate(postDate)
      const handleIconClick = () => {
        window.location.href = '/download';
      };
    
      
    
    if(!picture&&!tag&&!postDate&&!likeCount&&!collectCount&&!comments&&!commentCount&&!brief)
    {
        return null
    }
    return (
        <div className='post-detail-popUp-container'ref={containerRef}>
            <div className="postdetail-popUp-left-container" >
                {picture&&<img src ={picture} ref={imageRef} onLoad={handleImageLoad}className="post-detail-image" alt='detail-pic'></img>}
            </div>
            <div className="postdetail-popUp-right-container">
                <div className="detail-top-content">
                    <div className="post-popUp-content">
                        {brief&&<span>{brief}</span>}
                        <span>This experience has set the bar for 
                            me for all future surgeries and/or other medical 
                            procedures moving forward. From the moment I walked in the 
                            door and was greeted by Arissa I felt warm and welcomed.
                            She immediately made me feel comfortable by explaining every step of
                                the procedure and post</span>
                        {tag&&<span className="detail-red-font">{tag}</span>}
                        {postDate&&<span className="detail-gray-font">{ndate}</span>}
                    </div>
                    <div className="post-popUp-break-lines">
                    </div>
                    <div className="post-popUp-comments">
                        <span className="detail-gray-font">{commentCount} comments</span>
                        {/* {comments&&<CommentCard avatar={comments.avatar} name={comments./>} */}
                        <div className="comment-detail" onClick={handleIconClick}>
                            {comments&&comments.map((comment,index)=>
                                <CommentCard
                                    key={index}
                                    avatar={comment.avatar}
                                    name={comment.userName}
                                    commentText={comment.content}
                                    date={formatDate(comment.commentDate)}
                                    
                                />

                                )}
                    </div>
                    </div>
            </div>
                    <div className='fixed-input-box' >
                       <div className="Icon-display">
                            <span className="Icon-count"><img src = {heartIcon} alt="Icon"  className="Icon-size" onClick={handleIconClick} />{likeCount}</span>
                            <span className="Icon-count"><img src = {collectIcon} alt="Icon" className="Icon-size"onClick={handleIconClick}/>{collectCount}</span>
                            <span className="Icon-count"><img src ={commentIcon} alt="Icon" className="Icon-size"onClick={handleIconClick}/>{commentCount}</span>
                       </div>
                       <div className="new-comment-input" onClick={handleIconClick}>
                           <input type="text" placeholder="Enter your comment" className="input-blank"/>
                       </div>
                    </div>
            </div>
        </div>
    )
}

export default PostDetailPopUP;