import React from 'react';
import "./comment-card.styles.scss";
import HeartIcon from '../../assets/post/heart.png';
import commentIcon from '../../assets/post/chat_bubble.png';
import '../components-posts/community-post-detail-pop-up/community-post-detail-pop-up.styles.scss'
import userInfoQueryStore from '../../userStore.ts';

const CommentCard = ({avatar,name,date,commentText,onClick}) => {

    
    if(!avatar&&!name&&!date&&!commentText)
    {
        return null
    }
    
    const formatDate = (dateString) => {
        const dateParts = dateString.split('/');
        const month = dateParts[0];
        const day = dateParts[1];
        const formattedDate = `${month}/${day}`;
        return formattedDate;
      };
    const newDate=formatDate(date)

    function convertUnicode(input) {
        return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a,b) =>
            String.fromCharCode(parseInt(b, 16)));
    }

    return (
        <div className='comment-card-container'>
            <div className='reviewer-profile-information'>
                <div className="reviewer-progile-avatar">
                    <img src= {avatar} className="reviewer-avatar" alt='avatar'></img>
                </div>
                <div className="reviewer-information">
                    <div className="userName-date">
                        <span className="detail-gray-font">{name ? convertUnicode(name) : ""}</span>
                        <span className="detail-comment-text">{commentText ? convertUnicode(commentText) : ""}</span>
                    </div>
                </div>
            </div>
            <div className="likeCount-commentCount">
                <span>
                    <img className='post-detail-icon' src ={HeartIcon} alt='like' onClick={onClick}></img>
                </span>
                {/* <span>
                    <img className='post-detail-icon' src={commentIcon} alt='comment' onClick={onClick}></img>
                </span> */}
            </div>
        </div>
    )
}

export default CommentCard;