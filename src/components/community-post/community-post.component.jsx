import React from 'react';
import "./community-post.styles.scss";
import heartIcon from "../../assets/post/heart.png"

//src\assets\doctor\post1.png

const CommunityPost = ({imageURL,text,profileImage,authorName,likes}) => {

    return (
        <div className='community-post-container'>
            <div className="post-Image">
                <img src={imageURL[0]} className="postImage"></img>
            </div>
            <div className="post-information">
                <span className="post-text">{text}</span>
                <div className="profile">
                    <div className="profileImage">
                        <img className = 'profile-pic' src={profileImage}></img>
                        <span className="gray-text">{authorName}</span>
                    </div>
                    <div className="likeNumber">
                       <img src={heartIcon} className="heartIcon"></img>
                        <span className="gray-text">{likes}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommunityPost;