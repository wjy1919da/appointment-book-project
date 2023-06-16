import DoctorPostGrid from '../doctor-post-grid/doctor-post-grid.component';
import './doctor-post.styles.scss'
import { useGetPost } from '../../hooks/useSearchDoctors';
import React, { useState , useEffect} from 'react';
import PostDropDown from '../post-drop-down/post-drop-down.component';
import Footer from '../footer/footer.component';
import HomeSpinner from '../home-spinner/home-spinner.component';
import { SimpleGrid } from '@chakra-ui/react';
import CommunityPost from '../community-post/community-post.component';
import profileImage from '../../assets/doctor/profile1.png'
import InfiniteScroll from 'react-infinite-scroll-component';
const DoctorPost = () => {
    const filterOptions = [
        { value: "User", label: "By User" },
        { value: "Doctor", label: "By Doctor" }
    ];
    const postGenres = [
        { value: "Facial", label: "Facial" },
        { value: "Breast", label: "Breast" },
        { value: "Body", label: "Body" }
    ];
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGenres, setSelectedGenres] = useState({});
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filterType, setFilterType] = useState(2);
    const pageSize = 20;
    const {
      data, 
      error, 
      isLoading,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage
    } = useGetPost(pageSize, filterType);
    
    const flatData = data ? data.pages.flatMap(page => page.data) : [];

    if (isLoading) return <HomeSpinner />;
    if (error) return <div className='error'>{error.Message}</div>;
    return (
        <div className='doctor-post-outer-container'>
        {data &&
            <InfiniteScroll
                dataLength={flatData.length}
                next={fetchNextPage}
                hasMore={hasNextPage}
                scrollThreshold={0.1} 
            >
                <DoctorPostGrid posts={flatData} />
            </InfiniteScroll>  
        }     
        </div>
    )
}

export default DoctorPost;



  