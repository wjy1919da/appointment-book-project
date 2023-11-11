import "./user-profile-edit.styles.scss"
import React, { useState } from 'react';

const UserProfileEdit = () => {
    const [changePic, setChangePic] = useState(false);
    const handleHover = (isHovered) => {
        setChangePic(isHovered);
    }
    return (
        <div className='user-profile-edit-container'>
            <div className='user-profile-edit-screen'>
                <button class="button-to-userprofile"></button>
                <span className='edit-profile-text'>Edit Profile</span>
                <button class="button-save-changes">
                    <span className='subtext-save-changes'>Save Changes</span>
                </button>
                <div className='personal-info-table'>
                    <span className='table-subheading'>Personal Information</span>
                    <div 
                        className="avatar-picture"
                        onMouseEnter={() => handleHover(true)}
                    >
                    </div>
                    {changePic && (
                    <div 
                        className="avatar-picture-on-hover"
                        onMouseLeave={() => handleHover(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200" fill="none">
                            <circle cx="100" cy="100" r="100" fill="#141414" fill-opacity="0.5"/>
                        </svg>
                        <span className='click-to-change-text'>Click to Change</span>
                        <div className="delete-pic"></div>
                    </div>
                    )}
                    <span className='gender-text' style={{ position: 'absolute', top: '265px', left: '315px' }}>Female</span>
                    <span className='gender-text' style={{ position: 'absolute', top: '265px', left: '423px' }}>Male</span>
                    <span className='gender-text' style={{ position: 'absolute', top: '265px', left: '513px' }}>Other</span>
                    
                    <textarea style={{width: '278px', height: '40px', top: '165px', left:'281px', padding: "9px 20px 9px 12px"}} placeholder="Name" />
                    <textarea style={{width: '504px', height: '48px', top: '364px', left:'55px', padding: "13px 374px 13px 12px"}} placeholder="mm/dd/yyyy" />
                    <textarea style={{width: '504px', height: '48px', top: '471px', left:'55px', padding: "13px 320px 13px 12px"}} placeholder="charm@gmail.com" />
                    <textarea style={{width: '504px', height: '48px', top: '578px', left:'55px', padding: "13px 365px 13px 12px"}} placeholder="(xxx)-xxxx-xxxx" />
                    <textarea style={{width: '504px', height: '178px', top: '685px', left:'55px', padding: "8px 12px 148px 12px"}} placeholder="Description" />
                    <span className='table-body' style={{top: '124px', left: '281px' }}>Name</span>
                    <span className='table-body' style={{top: '223px', left: '281px' }}>Gender</span>
                    <span className='table-body' style={{top: '323px', left: '55px' }}>Age</span>
                    <span className='table-body' style={{top: '430px', left: '55px' }}>Email</span>
                    <span className='table-body' style={{top: '537px', left: '55px' }}>Phone Number</span>
                    <span className='table-body' style={{top: '644px', left: '55px' }}>Bio</span>
                </div>
                <div className='interests-table'>
                    <span className='table-subheading'>Interests</span>
                </div>
            </div>
        </div>
    )
}

export default UserProfileEdit;