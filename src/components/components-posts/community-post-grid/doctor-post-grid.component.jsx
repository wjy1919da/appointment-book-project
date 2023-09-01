import './doctor-post-grid.styles.scss';
import CommunityPost from '../community-post/community-post.component';
import { useGetPost } from '../../../hooks/useGetPosts';
import HomeSpinner from '../../home-spinner/home-spinner.component';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import React, { useState,useEffect } from 'react';
import PostDetail from '../community-post-detail/community-post-detail.component'
import usePostQueryStore from "../../../postStore.ts";
import Arrow from '../../../assets/post/arrow_grid.png';
import Arrow1 from '../../../assets/post/arrow1_grid.png';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import ErrorMsg from '../../error-msg/error-msg.component';
const DoctorPostGrid = ({isAbout}) => {
  const {
      data,
      error,
      isLoading,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage
  } = useGetPost();
  const [IsModalOpen, setIsModelOpen] = useState(false);
  const setUserID = usePostQueryStore((state) => state.setUserID);
  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState();
  const flatData = data ? data.pages.flatMap(page => page.data) : [];
  const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });
  const [gutterwidth, setGutterWidth] = useState('');
  const breakPoint = isAbout ?  { default: 3, 2500:6, 2047:5, 1700: 4, 1024: 3,600: 2 }: {default: 5, 2500: 8, 2047:7,1700: 6, 1024: 5, 767: 3, 430: 2} ;
  const isMobileOrAbout = isMobile || isAbout;
  useEffect(() => {
      setGutterWidth(isMobileOrAbout ? '0px' : '10px');
    }, [isMobile]);
  if (isLoading) return <HomeSpinner />;
  if (error) return <ErrorMsg />;
  const setPostID = (ID, avatar, username) => {
      setIsModelOpen(true);
      setUserID(ID);
      setUserAvatar(avatar);
      setUserName(username);
  }
 const postCardList = flatData.map(post => (
    <div 
        className='btn' 
        onClick={() => setPostID(post.id, post.avatar, post.username)}
        key={post.id}  // Moved key prop to the outermost element being returned from .map()
    >
        <CommunityPost
            imageURL={post.pictures}
            text={post.title}
            profileImage={post.avatar}
            authorName={post.username}
            likes={post.likeCount}
        />
    </div>
  ));


  return (
      <div className='doctor-post-grid-inner-container'>
          {data &&
              <InfiniteScroll
                  dataLength={flatData.length}
                  next={fetchNextPage}
                  hasMore={hasNextPage}
                  scrollThreshold={0.8}
              >
                  <ResponsiveMasonry
                      columnsCountBreakPoints={breakPoint}
                      gutter={gutterwidth}
                  >
                      <Masonry gutter={gutterwidth}>
                          {postCardList}
                      </Masonry>
                  </ResponsiveMasonry>
              </InfiniteScroll>
          }
          {IsModalOpen &&
              <PostDetail
                  show={IsModalOpen}
                  onHide={() => setIsModelOpen(false)}
                  isMobile={isMobile}
                  postUserName={userName}
                  postAvatar={userAvatar}
              />
          }
          <div className='down-load-more-container'>
             {!isMobile && <img src={Arrow} alt='arrow' className='arrow-containter' />} 
             {isMobile &&  <img src={Arrow1} alt='arrow1' className='arrow1-containter' />}
              <div className='download-text'>
                  Join Charm community to view more
              </div>
              <Link to='/download'>
                  <button className='download-button'>
                      <div className='download-button-text'>
                          DownLoad APP
                      </div>
                  </button>
              </Link>
          </div>
      </div>
  );
}

export default DoctorPostGrid;