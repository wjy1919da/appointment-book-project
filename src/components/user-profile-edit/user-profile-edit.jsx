import "./user-profile-edit.styles.scss"

const UserProfileEdit = () => {
    return (
        <div className='user-profile-edit-container'>
            <div className='user-profile-edit-screen'>
                <button class="button-to-userprofile"></button>
                <span className='edit-profile-text'>Edit Profile</span>
                <button class="button-save-changes">
                    <span className='subtext-save-changes'>Save Changes</span>
                </button>
                <div className='personal-info-table'>

                </div>
                <div className='interests-table'>

                </div>
            </div>
        </div>
    )
}

export default UserProfileEdit;