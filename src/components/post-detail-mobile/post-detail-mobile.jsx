import React,{ useRef} from 'react';
import "./post-detail-mobile-styles.scss";
import CommentCard from '../../comment-card/comment-card';
import heartIcon from '../../assets/post/heart.png';
import commentIcon from '../../assets/post/chat_bubble.png';
import shareIcon from '../../assets/post/shareIcon.png';
import collectIcon from '../../assets/post/star.png';
import DownArrow from '../../assets/post/down-arrow.png'
import '../post-detail-popUp/postDetail-popUp.styles.scss'

const PostDetailMobile = ({picture,brief,tag,postDate,comments,likeCount,collectCount,commentCount,userName,userAvatar}) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    //   const adjustContainerHeight = () => {
    //     const container = containerRef.current;
    //     const image = imageRef.current;
    
    //     if (container && image) {
    //       container.style.height = image.offsetHeight + 'px';
    //     }
    //   };
    //   const handleImageLoad = () => {
    //     adjustContainerHeight();
    //   };
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

    function convertUnicode(input) {
      return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a,b) =>
          String.fromCharCode(parseInt(b, 16)));
    }
    
    return (
        <div className='post-detail-mobile-container'ref={containerRef}>
            <div className='post-detail-mobile-profile-container'>
                <div className='post-detail-mobile-profile' >
                    <img src={userAvatar} className="post-detail-mobile-avatar"></img>
                    <span>{userName}</span>
                </div>
                <div> 
                <button className='doctor-search-button'  
                        style={{width:'90px',height:'30px',radius:'8px',fontSize:'10px'}}
                        >
                    Try Charm Life
                </button>
                </div>
            </div>
            <div className='post-detail-mobile-img-container'>
            {picture&&<img src ={picture} ref={imageRef} style={{borderRadius:'10px'}}>
                </img>}
            </div>
            <div className='post-detail-mobile-text-container'>
                {/* {brief&&<span>{brief}</span>} */}
                <span>
                This experience has set the bar for 
                me for all future surgeries and/or other medical 
                procedures moving forward. From the moment I walked in the 
                door and was greeted by Arissa I felt warm and welcomed.
                She immediately made me feel comfortable by explaining every step of
                    the procedure and post
                </span>
                {tag&&<span className="detail-red-font">{tag}</span>}
                {postDate&&<span  className="detail-gray-font">{ndate}</span>}
            </div>
            <div className='post-detail-mobile-comment-container'>
                <div className="detail-gray-font" style={{marginTop:'20px'}}>{commentCount} comments</div>
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
            <div className='post-detail-mobile-download-button'>
                <img src={DownArrow} style={{marginTop:'50px',width:'15px',height:'13px'}}></img>
                <span className='join-community-text'>Join the Charm Life Community to View More</span>
                <button className='doctor-search-button'  
                        style={{width:'150px',height:'40px',radius:'20px',fontSize:'15px',marginTop:'10px'}}
                        >
                    Try Charm Life
                </button>
            </div>
        </div>
    )
}

export default PostDetailMobile;

