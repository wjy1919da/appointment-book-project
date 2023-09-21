import React, { useState } from 'react';
import userAvatar from '../../assets/post/user-profile-avatar.png'
import './user-profile-page.styles.scss'
import userVerified from '../../assets/post/UserVerifiedIconpng.png'
import HomeButton from '../home-button/home-button.component';
import '../components-posts/community-post/community-post.styles.scss';
const UserProfileBasic = () => {

    return (
        <div className="user-profile-basic-container">
            <div className='user-profile-basic-avatar'>
                <img src = {userAvatar}></img>
            </div>
            <div className= ' user-profile-basic-information-container'>
                <div className='user-profile-basic-name-and-editButton'>
                    <div className='user-profile-basic-name'>
                        <div className='user-profile-basic-name-title'>
                            <span>Charlotte</span>
                            <img src={userVerified} style={{width:'34px',height:'34px'}}></img>
                        </div>
                        <div className='user-profile-basic-name-text'>
                            <span>@username</span>
                        </div>
                    </div>
                    <div className='user-profile-basic-edit-button'>
                        <HomeButton title = 'edit Profile' width='176px' height='56px'/>
                    </div>
                </div>
                <div className='user-profile-basic-info-text'>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</span>
                </div>
                <div className='user-profile-basic-info-following-section'>
                    <div className='user-profile-number-cate-combimation'>
                        <span className='user-profile-black-text'>3</span>
                        <span className='user-profile-gray-text'>Posts</span>
                    </div>
                    <div className='user-profile-number-cate-combimation'>
                        <span className='user-profile-black-text'>3</span>
                        <span className='user-profile-gray-text'>follower</span>
                    </div>
                    <div className='user-profile-number-cate-combimation'>
                        <span className='user-profile-black-text'>3</span>
                        <span className='user-profile-gray-text'>following</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfileBasic;