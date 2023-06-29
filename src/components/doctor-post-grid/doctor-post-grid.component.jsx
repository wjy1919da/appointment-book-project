import './doctor-post-grid.styles.scss';
import CommunityPost from '../community-post/community-post.component';
import { useGetPost } from '../../hooks/useGetPosts';
import HomeSpinner from '../home-spinner/home-spinner.component';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import React, { useState } from 'react';
import PostDetail from '../postDetail/postDetail'
import usePostQueryStore from "../../postStore.ts";
import Arrow from '../../assets/post/arrow_grid.png';
import { Link } from 'react-router-dom';

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

   return(
    <div className='doctor-post-grid-container' >
       {data &&
            // <InfiniteScroll
            //     dataLength={flatData.length}
            //     next={fetchNextPage}
            //     hasMore={hasNextPage}
            //     scrollThreshold={0.8} 
            // >
             <ResponsiveMasonry
                columnsCountBreakPoints={{default: 5,
                  1100: 5,
                  1000: 4,
                  800: 3,
                }}
                gutter="25px"
              >
                <Masonry
                  gutter="25px"
                >
                    {postCardList}
                </Masonry>
            </ResponsiveMasonry>
          // </InfiniteScroll>
      }
     {IsModalOpen && <PostDetail show={IsModalOpen} onHide={()=>setIsModelOpen(false)}/>}
     <div className='down-load-more-container'>
        <img src={Arrow} alt='arrow' className='arrow-containter' />
        <div className='download-text'>
            Join Charm community to view more
        </div>
        <Link to='/download'>
          <button className='download-button'>
            <div className = 'download-button-text'>
              DownLoad APP
            </div>
          </button>
        </Link>
     </div>
         
    </div>
          
   )
   
}


export default DoctorPostGrid;