import React,{useState,useEffect} from 'react';
import "./community-post.styles.scss";
import heartIcon from "../../assets/post/heart.png"

//src\assets\doctor\post1.png

const CommunityPost = ({imageURL,text,profileImage,authorName,likes}) => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    const [width,setWidth]=useState('');
    useEffect(() => {
        if (isMobile) {
          setWidth('240px');
        } else {
          setWidth('186px');
        }
      }, [isMobile]);


    return (
        <div className='community-post-container'>
            <div className="post-Image">
                <img src={imageURL[0]} className="postImage" style={{width}}></img>
            </div>
            <div className="post-information" style={{width:{width}}}>
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