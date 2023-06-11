import DoctorPostGrid from '../doctor-post-grid/doctor-post-grid.component';
import './doctor-post.styles.scss'
import { useGetPost } from '../../hooks/useSearchDoctors';
import React, { useState , useEffect} from 'react';
import PostDropDown from '../post-drop-down/post-drop-down.component';
import Footer from '../footer/footer.component';
import WaterfallLayout from '../waterfall-layout/waterfall-layout';
import HomeSpinner from '../home-spinner/home-spinner.component';


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
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [filterType, setFilterType] = useState(2);
    const pageSize = 20;

    const {
      data, 
      error, 
      isLoading,
      fetchNextPage,
      isFetchingNextPage
    } = useGetPost(pageSize, filterType);
    if (isLoading) return <HomeSpinner />;
    if (error) return <div className='error'>{error.Message}</div>;
    return (
    <div className='doctor-post-outer-container'>
        <>
                {data && data.pages.map((page, index) => 
                    <React.Fragment key={index}>
                        {/* {page.map((post) =>
                            <li key={post.id} className='list-group-item'>
                                {post.title}
                            </li>
                        )} */}
                        <DoctorPostGrid posts={page} />
                        {/* <WaterfallLayout posts={page} /> */}
                    </React.Fragment>
                )}
               <button
                    className='btn btn-primary my-3 ms-1'
                    onClick={() => fetchNextPage()}
                    disabled={!data || isFetchingNextPage}
                >
                  {isFetchingNextPage ? 'Loading ...' :'Load More'}
                </button>     
        </>
          
    </div>
    )
}

export default DoctorPost;



  