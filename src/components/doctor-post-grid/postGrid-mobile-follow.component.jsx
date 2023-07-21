import './postGrid-mobile-follow.styles.scss'
import PostCardMobileFollow from '../community-post/postCard-mobile-follow.component'
import HomeSpinner from '../home-spinner/home-spinner.component';
import { useGetPost } from '../../hooks/useGetPosts';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Divider } from 'antd';
const PostGridMobileFollow = () => {
    const {
        data, 
        error, 
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage
        } = useGetPost();
    if (isLoading) return <HomeSpinner />;
    if (error) return <div className='error'>{error.message}</div>;
    const fetchPostCount = data?.pages.reduce(
        (total,page)=>total+page.data.length,
         0
        ) || 0;
    return (
        <div className="posts">
            {data && 
                <InfiniteScroll
                    dataLength={fetchPostCount}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    scrollThreshold={0.8}
                >
                    {data?.pages.map((page, pageIndex) =>
                        page.data.map((post, postIndex) => (
                            <div key={`${pageIndex}-${postIndex}`}>
                                <PostCardMobileFollow
                                    imageURL={post.pictures}
                                    text={post.title}
                                    profileImage={post.avatar}
                                    authorName={post.username}
                                    likes={post.likeCount}
                                />
                                {/* <Divider className="custom-divider" /> */}
                            </div>
                        ))
                    )
                    }
                </InfiniteScroll>}
            <PostCardMobileFollow/>
        </div>
    )
}

export default PostGridMobileFollow