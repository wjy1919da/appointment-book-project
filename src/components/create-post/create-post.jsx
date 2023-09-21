import { Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './create-post.style.scss'
import creatPostIcon from '../../assets/post/create-post-icon.png'
const CreatePostOfUser = () => {
   return (
    <div className="create-post-container">
        <div className="choose-picture-conatiner">
            <div className="choose-picture-section-title">Lorem ipsum dolor sit amet, consectetur adipiscing</div>
            <div className='choose-picture-section-image'>
                <img src = {creatPostIcon}></img>
            </div>
            <div className="choose-picture-section-text">Lorem ipsum dolor sit amet, consectetur adipiscing</div>
        </div>
        <div className="post-information-container">
            <div className='post-information-multi-input'>

                    <input type="text" className="post-information-customInput" placeholder="Title"></input>


                    <input type="text" className="post-information-customInput" placeholder="Text"></input>

                    <input type="text" className="post-information-customInput" placeholder="Tag Doctor"></input>
                    <input type="text" className="post-information-customInput" placeholder="Add Location"></input>
            </div>
            <div className='post-information-sendButton'>
                <button class="create-post-custom-button">Post</button>
            </div>
        </div>
    </div>
  );
}

export default CreatePostOfUser;