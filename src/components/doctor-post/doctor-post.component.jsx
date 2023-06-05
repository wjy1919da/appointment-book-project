import DoctorPostGrid from '../doctor-post-grid/doctor-post-grid.component';
import './doctor-post.styles.scss'
import { useGetPost } from '../../hooks/useSearchDoctors';
import { useState , useEffect} from 'react';
import PostDropDown from '../post-drop-down/post-drop-down.component';
import Footer from '../footer/footer.component';


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

    // 初始值设为 []，稍后在 useEffect 中处理数据加载
    const [filteredPosts, setFilteredPosts] = useState([]);
    // 获取选中的genres
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const { isLoading, data, error } = useGetPost();

    useEffect(() => {
        // data 加载完成后，将其设置为 filteredPosts 的值
        if (!isLoading && data && data.result) {
            setFilteredPosts(data.result);
        }
    }, [data, isLoading]);

    const handleFilters = (filters, genre) => {
        let filteredResult = data.result;
    
        if (filters.length !== 0) {
            filteredResult = filteredResult.filter(post => filters.includes(post.PostBy));
            console.log("by user", filteredResult);
        }
        if (genre.length !== 0) {
            filteredResult = filteredResult.filter(post => genre.includes(post.type));
            console.log("by genre", filteredResult);
        }
    
        return filteredResult;
    };
    
    const onFilterChange = (filters) => {
        setSelectedFilters(filters);
        const filteredResult = handleFilters(filters, selectedGenres);
        setFilteredPosts(filteredResult);
    };
    
    const onGenreChange = (genres) => {
        setSelectedGenres(genres);
        const filteredResult = handleFilters(selectedFilters, genres);
        setFilteredPosts(filteredResult);
    };

    // 提前返回，防止在 data 尚未加载完成时渲染组件
    if (isLoading || !data || !data.result) {
        return <div>Loading...</div>;
    }

    return (
        <div className='doctor-post-outer-container'>
            <div className='doctor-post-header-container'>
                <PostDropDown handleFilters={onGenreChange} options={postGenres} title = "Category" />
                <PostDropDown handleFilters={onFilterChange} options={filterOptions} title = "Post By"/>
            </div>
            <div className='doctor-post-content-container'>
                <DoctorPostGrid posts = {filteredPosts}/>
            </div>
            <Footer />
        </div>
    )
}

export default DoctorPost;



  