import Masonry from 'react-masonry-css'
import './doctor-post-grid.styles.scss'
import CommunityPost from '../community-post/community-post.component'
import profileImage from '../../assets/doctor/profile1.png'
import DoctorPostCard from '../doctor-post-card/doctor-post-card.component'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetPost } from '../../hooks/useSearchDoctors';
import HomeSpinner from '../home-spinner/home-spinner.component';
import React, { useState,useId,useEffect } from 'react';
import PostDetail from '../postDetail/postDetail'
import usePostQueryStore from "../../postStore.ts";
const DoctorPostGrid = () => {  
    const {
      data, 
      error, 
      isLoading,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage
    } = useGetPost();
    
    const [IsModalOpen,setIsModelOpen] = useState(false);
    const setUserID = usePostQueryStore((state) => state.setUserID);
    const flatData = data ? data.pages.flatMap(page => page.data) : [];
    console.log("flatData,",flatData)
    
    if (isLoading) return <HomeSpinner />;
    if (error) return <div className='error'>{error.message}</div>; // 将Message改为message
    const setPostID = (ID) =>
    {
      console.log("ID",{ID})
      setIsModelOpen(true)
      setUserID(ID)

    }
   
    const postCardList =flatData.map(post => (
      <div className='btn'onClick={() => setPostID(post.id)}>
        <CommunityPost 
            key={post.id}
            imageURL={post.pictures}
            text={post.title}
            profileImage={post.avatar}
            authorName={post.username}
            likes= {post.likeCount}
            
        />
      </div>
        
        
    ));
    console.log("playLIst",postCardList)
   const breakpointColumnsObj = {
      default: 5,
        1100: 4,
        700: 1,
   }

   return(
    <div className='doctor-post-grid-container' >
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
          {IsModalOpen && <PostDetail show={IsModalOpen} onHide={()=>setIsModelOpen(false)}/>}
          
       
         
    </div>
          
   )
   
}

export default DoctorPostGrid;