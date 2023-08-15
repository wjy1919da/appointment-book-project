import React,{ useRef} from 'react';
import "./community-post-detail-pop-up.styles.scss";
import CommentCard from '../../comment-card/comment-card';
import heartIcon from '../../../assets/post/heart.png';
import commentIcon from '../../../assets/post/chat_bubble.png';
import DownArrow from '../../../assets/post/down-arrow.png'
import collectIcon from '../../../assets/post/star.png';
import { useEffect, useState} from 'react';
import { useMediaQuery } from 'react-responsive';

const CommunityPostDetailPopUP = ({picture,brief,tag,postDate,comments,likeCount,collectCount,commentCount,userName,userAvatar}) => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);
    //const [forceRerender, setForceRerender] = useState(false);

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' })
    
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

    function convertUnicode(input) {
      if (!input) return '';  // Return an empty string if input is null, undefined, or empty string
      return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a,b) => String.fromCharCode(parseInt(b, 16)));
    }
  
    
    return (
        <div className='post-detail-popUp-container'ref={containerRef}>
          {/* Moblie */}
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
            {/* Web */}
            <div className="postdetail-popUp-left-container" >
                {!isMobile&&picture&&<img src ={picture} ref={imageRef} onLoad={handleImageLoad}className="post-detail-image" alt='detail-pic'></img>}
                {isMobile&&<img src ={picture} ref={imageRef} style={{borderRadius:'10px'}}></img>}
            </div>
            <div className="postdetail-popUp-right-container">
                <div className="detail-top-content">
                    <div className="post-popUp-content">
                        {!isMobile&&brief&&<span>{brief}</span>}
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
                        {comments && comments.map((comment,index) => {
                            if (comment && comment.content) {
                                return (
                                    <CommentCard
                                        key={index}
                                        avatar={comment.avatar || ''}
                                        name={comment.userName||''}
                                        commentText={convertUnicode(comment.content)}
                                        date={formatDate(comment.commentDate)}
                                    />
                                );
                            }
                            return null;  // Or handle this case differently
                        })}
                    </div>
                    
                    </div>
                   </div>
                   {/* Mobile */}
                   <div className='post-detail-mobile-download-button'>
                        <img src={DownArrow} style={{marginTop:'50px',width:'15px',height:'13px'}}></img>
                        <span className='join-community-text'>Join the Charm Life Community to View More</span>
                        <button className='doctor-search-button'  
                                style={{width:'150px',height:'40px',radius:'20px',fontSize:'15px',marginTop:'10px'}}
                                >
                            Try Charm Life
                        </button>
                    </div>
                    {/* Web */}
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

export default CommunityPostDetailPopUP;