import React from 'react';
import "./community-post.styles.scss";
import heartIcon from "../../assets/doctor/heartIcon.png"
import postImage from '../../assets/doctor/post4.png';
//src\assets\doctor\post1.png

const CommunityPost = ({imageURL,text,profileImage,authorName,likes}) => {

    return (
        <div className='community-post-container'>
            <div className="post-Image">
                <img src={require(`../../assets/doctor/${imageURL}.png`)} className="post-image-url"></img>
                {/* <img src={postImage} className="post-image-url"></img> */}
            </div>
            <div className="post-information">
                <span className="post-text">{text}</span>
                <div className="profile">
                    <div className="profileImage">
                        <img src={require(`../../assets/doctor/${profileImage}.png`)}></img>
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