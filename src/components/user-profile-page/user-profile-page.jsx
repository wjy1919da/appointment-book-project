import React, { useState } from 'react';
import UserProfileBasic from '../user-profile-basic/user-profile-basic';
import UserProfileSubArea from '../user-profile-subArea/user-profile-subArea';
const UserProfilePage = () => {

    return (
        <div className="user-profile-page-container">
            <UserProfileBasic/>
            <UserProfileSubArea/>
        </div>
    )
}

export default UserProfilePage;