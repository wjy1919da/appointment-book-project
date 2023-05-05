import React, { useState } from 'react';
import "./my-profile.styles.scss";

function ProfilePage() {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
    const [isVerifiedMobile, setIsVerifiedMobile] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setIsVerifiedEmail(false);
    };

    const handleMobileChange = (event) => {
        setMobile(event.target.value);
        setIsVerifiedMobile(false);
    };

    const handleVerifyEmail = () => {
        setIsVerifiedEmail(true);
    };

    const handleVerifyMobile = () => {
        setIsVerifiedMobile(true);
    };

    return (
        <div className="profile-page">
            <div className="profile-image">
                <span>Profile Image:</span>
                <div className="profile-icon"></div>
                <label htmlFor="image-upload">
                    {imageSrc ? (
                        <img src={imageSrc} alt="Profile" />
                    ) : (
                        <div className="image-placeholder">Upload Image</div>
                    )}
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button className="edit-button">Edit</button>
            </div>
            <div className="profile-details">
                <div className="username">
                    <label htmlFor="username-input">Username</label>
                    <input
                        id="username-input"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="bio">
                    <label htmlFor="bio-input">Bio</label>
                    <textarea
                        id="bio-input"
                        value={bio}
                        onChange={handleBioChange}
                    />
                </div>
                <div className="email">
                    <label htmlFor="email-input">Email</label>
                    <input
                        id="email-input"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    {isVerifiedEmail ? (
                        <span className="verified">Verified</span>
                    ) : (
                        <button className="verify-button" onClick={handleVerifyEmail}>
                            Verify
                        </button>
                    )}
                </div>
                <div className="mobile">
                    <label htmlFor="mobile-input">Mobile</label>
                    <input
                        id="mobile-input"
                        type="tel"
                        value={mobile}
                        onChange={handleMobileChange}
                    />
                    {isVerifiedMobile ? (
                        <span className="verified">Verified</span>
                    ) : (
                        <button className="verify-button" onClick={handleVerifyMobile}>
                            Verify
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
