import './postCard-mobile-follow.styles.scss'
//src/components/community-post/postCard-mobile-follow.styles.scss
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import CommentIcon from '@mui/icons-material/Comment';
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Divider from '@mui/material/Divider';
const PostCardMobileFollow = ({imageURL,text,profileImage,authorName,likes}) => {
  const liked = false;
  return (
    <div className="post">
         <div className="container">
            <div className="user">
                <div className="userInfo">
                    <img src={profileImage} alt="" className = 'userInfo-img'/>
                    <div className='details'>
                        <span className="name">{authorName}</span>
                    </div>
                </div>
                <MoreHorizIcon />
            </div>
            <div className='mobile-post-content'>
                <img src={imageURL} alt="" className='content-img'/>
                <div className='content-text-container'>
                    <div className='content-text'>
                        {text}
                    </div>
                </div>
                <div className='content-text-container'>
                    <span className='post-text-mobile-tag'># BreastAugmentation</span>
                </div>
            </div>
            <div className='info'>
                <div className='item'>
                    {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
                    {likes}
                    <CommentIcon />3
                    <StarOutlineIcon />4
                </div>
            </div>
         </div>
    </div>
  )
}

export default PostCardMobileFollow