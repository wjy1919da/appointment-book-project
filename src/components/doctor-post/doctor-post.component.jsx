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
   
    return (
        <div className='doctor-post-outer-container'>
        
            <DoctorPostGrid />
            
    
        </div>
    )
}

export default DoctorPost;
