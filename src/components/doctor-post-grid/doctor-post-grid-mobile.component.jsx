import CommunityPost from '../community-post/community-post.component';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetPost } from '../../hooks/useGetPosts';
import HomeSpinner from '../home-spinner/home-spinner.component';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import React, { useState } from 'react';
import PostDetail from '../postDetail/postDetail'
import usePostQueryStore from "../../postStore.ts";
import './doctor-post-grid.styles.scss';
import CommunityPostMobile from '../community-post/community-post-mobile.component';
const DoctorPostGridMobile = () => {
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
      //const flatData = data ? data.pages.flatMap(page => page.data) : [];
      if (isLoading) return <HomeSpinner />;
      if (error) return <div className='error'>{error.message}</div>; // 将Message改为message
      const fetchPostCount = data?.pages.reduce(
        (total,page)=>total+page.data.length,
         0
        ) || 0;
      const setPostID = (ID) =>
      {
        console.log("ID",{ID})
        setIsModelOpen(true)
        setUserID(ID)
  
      }
    return (
        <div className='doctor-post-grid--inner-container-mobile'>
            {data &&
                <InfiniteScroll
                    dataLength={fetchPostCount}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    scrollThreshold={0.8}
                >
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ default: 3,1000:4,800:3, 500:2}}
                        gutter="5px"
                    >
                        <Masonry gutter="8px">
                            {data?.pages.map((page, pageIndex) => 
                                page.data.map((post, postIndex) => (
                                    <div className='btn' onClick={() => setPostID(post.id)} key={`${pageIndex}-${postIndex}`}>
                                        <CommunityPostMobile
                                            imageURL={post.pictures}
                                            text={post.title}
                                            profileImage={post.avatar}
                                            authorName={post.username}
                                            likes={post.likeCount}
                                        />
                                    </div>
                                ))
                            )}
                        </Masonry>
                    </ResponsiveMasonry>
                </InfiniteScroll>
            }
            {IsModalOpen && <PostDetail show={IsModalOpen} onHide={() => setIsModelOpen(false)} />}
        </div>
    )    
}

export default DoctorPostGridMobile