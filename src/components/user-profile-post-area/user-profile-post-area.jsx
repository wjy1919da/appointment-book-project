import React, { useState, useEffect } from 'react';
import DoctorPostGrid from '../components-posts/community-post-grid/doctor-post-grid.component';
import CreatePostOfUser from '../create-post/create-post';
import './user-profile-post-area.styles.scss';
import '../create-post/create-post.style.scss';
import userPostAvatar from '../../assets/post/user-profile-avatar.png'
import post1 from '../../assets/doctor/post3.png'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import creatPostIcon from '../../assets/post/create-post-icon.png';
import CommunityPost from '../components-posts/community-post/community-post.component';
//import DoctorPostGrid from '../components-posts/community-post-grid/doctor-post-grid.component';

import UserProfileReview from '../user-profile-review-area/user-profile-review-area';

const UserProfilePost = () => {
    const [activeTab, setActiveTab] = useState("like");  // By default, "like" is the active taba
    const [showCreatePost, setShowCreatePost] = useState(false);
    const handleIconClick = () => {
        setShowCreatePost(true); // Show the CreatePostOfUser component when the icon is clicked
    };
    const [gutterwidth, setGutterWidth] = useState('40px');
    const breakPoint ={default: 4, 2500: 4, 2047:4,1700: 4, 1024: 4, 767: 3, 430: 2} ;
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const images = [creatPostIcon, post1, userPostAvatar]; // Add all images here

        let loadedImagesCount = 0;
        images.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedImagesCount += 1;
                if (loadedImagesCount === images.length) {
                    setImagesLoaded(true);
                }
            };
        });
    }, []);

    const samplePosts = Array(10).fill({
        pictures: post1,
        title: 'Sample Title',
        avatar: userPostAvatar,
        username: 'Sample Author',
        likeCount: 42
    });
    const postList = samplePosts.map((post, index) => (
        <CommunityPost
            key={index}
            imageURL={post.pictures}
            text={post.title}
            profileImage={post.avatar}
            authorName={post.username}
            likes={post.likeCount}
        />
    ));
    return (
        <div className="user-profile-post-area-container">
            {!showCreatePost && imagesLoaded &&
                <div className="choose-picture-conatiner-post">
                    <ResponsiveMasonry
                        columnsCountBreakPoints={breakPoint}
                        gutter={gutterwidth}
                    >
                        <Masonry gutter={gutterwidth}>
                            {/* CreatePostIcon as the first post */}
                            <div className='choose-picture-section-image-post'>
                                <img src={creatPostIcon} onClick={handleIconClick}  className='choose-picture-section-image'alt="Create Post" />
                            </div>
                            
                            {/* Rest of the posts */}
                            {postList}
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            }
            {showCreatePost && <CreatePostOfUser />} 
        </div>
    )
}

export default UserProfilePost;