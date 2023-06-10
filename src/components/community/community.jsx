import React from 'react';
import "./community.styles.scss";
import Masonry from 'react-masonry-css'
import CommunityPost from '../community-post/community-post';
import image1 from '../../assets/doctor/post1.png'
import image2 from '../../assets/doctor/post2.png'
import image3 from '../../assets/doctor/post3.png'
import image4 from '../../assets/doctor/post4.png'
import image5 from '../../assets/doctor/post5.png'
import image6 from '../../assets/doctor/post6.png'
import image7 from '../../assets/doctor/post7.png'
import image8 from '../../assets/doctor/post8.png'
import image9 from '../../assets/doctor/post9.png'
import image10 from '../../assets/doctor/post10.png'
import image11 from '../../assets/doctor/post11.png'
import image12 from '../../assets/doctor/post12.png'
import profile1 from '../../assets/doctor/profile1.png'

const Community = () => {
    const posts = [
        {imageURL:image1, text: 'text1', profileImage: profile1, authorName:"Anna",likes: '70'},
        {imageURL:image2, text: 'text2', profileImage: profile1, authorName:"Anna",likes: '256'},
        {imageURL:image3, text: 'text3', profileImage: profile1, authorName:"Anna",likes: '300'},
        {imageURL:image4, text: 'text4', profileImage: profile1, authorName:"Anna",likes: '50'},
        {imageURL:image5, text: 'text4', profileImage: profile1, authorName:"Anna",likes: '50'},
        {imageURL:image9, text: 'text4', profileImage: profile1, authorName:"Anna",likes: '50'},
        {imageURL:image7, text: 'text4', profileImage: profile1, authorName:"Anna",likes: '50'},
        {imageURL:image8, text: 'text4', profileImage: profile1, authorName:"Anna",likes: '50'},
        {imageURL:image6, text: 'text4', profileImage: profile1, authorName:"Anna",likes: '50'},
        {imageURL:image10, text: 'text4', profileImage: profile1, authorName:"Anna",likes: '50'},{},
        {imageURL:image12, text: 'text4', profileImage: profile1, authorName:"Anna",likes: '50'},{},
        {imageURL:image11, text: 'text4', profileImage: profile1, authorName:"Anna",likes: '50'},
        
        
        
      ];
      const items =posts.map((post, index) => (
        <CommunityPost 
        key={index}
        imageURL={post.imageURL}
        text={post.text}
        profileImage={post.profileImage}
        authorName={post.authorName}
        likes={post.likes}
        />
    ));
    const breakpointColumnsObj = {
        default: 5,
        1100: 4,
        700: 3,
        500: 2
      };

    return (
        <div className='community-container'>

            { <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
                >
                {items}
            </Masonry>}
        </div>
    )
}

export default Community;