import React from 'react';
import "./comment-card.styles.scss";
import HeartIcon from '../../assets/doctor/heartIcon.png';
import commentIcon from '../../assets/post/comment-icon.png';
import '../post-detail-popUp/postDetail-popUp.styles.scss'

const CommentCard = ({avatar,name,date,commentText}) => {
    
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
    return (
        <div className='comment-card-container'>
            <div className="reviewer-progile-avatar">
                <img src= {avatar} className="reviewer-avatar"></img>
            </div>
            <div className="reviewer-information">
                <div className="userName-date">
                    <span className="detail-gray-font">{name}</span>
                    <span className="detail-gray-font">{newDate}</span>
                </div>
                <span className="detail-comment-text">{commentText}</span>
            </div>
            <div className="likeCount-commentCount">
                <span>
                    <img src ={HeartIcon}></img>
                </span>
                <span>
                    <img src={commentIcon}></img>
                </span>
            </div>
        </div>
    )
}

export default CommentCard;