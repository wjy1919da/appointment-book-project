import React, { useState } from 'react';
//import './user-profile-review-card.styles.scss';
import './user-profile-review-card-styles.scss';
import verifiedIcon from '../../assets/post/Verifiedicon.png'
import StarRate from '../starRate/starRate';
const UserProfileReviewCard = () => {
    const [activeTab, setActiveTab] = useState("like");  // By default, "like" is the active taba

    return (
        <div className="user-profile-review-card-container">
            <div className='user-review-card-info'>
                <div className='user-review-basic-info'>
                    <div className='user-review-card-avatar'>

                    </div>
                    <div className='user-review-card-name'>
                        <span>User_Name1</span>
                    </div>
                    <div className='user-review-card-verified'>
                        <img src = {verifiedIcon} style={{width:'24px',height:'24px'}}></img>
                        <span>verified customer</span>
                    </div>
                </div>
                <div className='user-review-card-date'> 
                    <span>2023-05-26</span>
                </div>
            </div>
            <div className='user-review-card-rate-star'>
                <StarRate rateScore ={5}/>
            </div>
            <div className = 'user-review-card-title'>
                <span>
                The Review Title
                </span>
            </div>
            <div className='user-review-card-text'>
                <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </span>
            </div>
        </div>
    )
}

export default UserProfileReviewCard;