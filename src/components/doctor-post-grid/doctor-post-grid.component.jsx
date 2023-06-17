import Masonry from 'react-masonry-css'
import './doctor-post-grid.styles.scss'
import CommunityPost from '../community-post/community-post.component'
import profileImage from '../../assets/doctor/profile1.png'
import DoctorPostCard from '../doctor-post-card/doctor-post-card.component'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetPost } from '../../hooks/useSearchDoctors';
import HomeSpinner from '../home-spinner/home-spinner.component';
import React, { useState } from 'react';
const DoctorPostGrid = () => {
  const pageSize = 20;
  const [filterType, setFilterType] = useState(2);
    const {
      data, 
      error, 
      isLoading,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage
    } = useGetPost(pageSize, filterType);
    console.log("doctor-post.component.jsx: data",data);
    const flatData = data ? data.pages.flatMap(page => page.data) : [];

    if (isLoading) return <HomeSpinner />;
    if (error) return <div className='error'>{error.message}</div>; // 将Message改为message
   
    const postCardList =flatData.map(post => (
        <CommunityPost 
            key={post.id}
            imageURL={post.pictures}
            text={post.title}
            profileImage={post.avatar}
            authorName={post.username}
            likes= {post.likeCount}
        />
    ));
   const breakpointColumnsObj = {
      default: 5,
        1100: 4,
        700: 1,
   }
   return(
    <div className='doctor-post-grid-container'>
       {data &&
            <InfiniteScroll
                dataLength={flatData.length}
                next={fetchNextPage}
                hasMore={hasNextPage}
                scrollThreshold={0.1} 
            >
              <Masonry
                breakpointCols = {breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column">
               {postCardList}
             </Masonry>
          </InfiniteScroll>}
         
    </div>
          
   )
   
}

export default DoctorPostGrid;