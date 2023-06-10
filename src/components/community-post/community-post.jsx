import React from 'react';
import "./community-post.styles.scss";
import heartIcon from "../../assets/doctor/heartIcon.png"


const CommunityPost = ({imageURL,text,profileImage,authorName,likes}) => {
    if (!imageURL && !text && !profileImage && !authorName && !likes) {
        return null; // Return null for empty rendering when there are no props
      }
    return (
        <div className='community-post-container'>
            {/* <img src={imageURL} alt="postImage" className="post-Image"></img> */}
            <div classname="post-Image">
                <img src={imageURL} className="post-image-url"></img>
            </div>
            <div className="post-information">
                <span className="post-text">{text}</span>
                <div className="profile">
                    <div className="profileImage">
                        <img src={profileImage}></img>
                        <span className="gray-text">{authorName}</span>
                    </div>
                    <div className="likeNumber">
                       <img src={heartIcon} className="heartIcon"></img>
                        <span className="gray-text" style={{marginTop:"-8px"}}>{likes}</span>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default CommunityPost;