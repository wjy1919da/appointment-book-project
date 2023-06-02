import DoctorPostGrid from '../doctor-post-grid/doctor-post-grid.component';
import './doctor-post.styles.scss'
import { useGetPost } from '../../hooks/useSearchDoctors';
import { useState , useEffect} from 'react';
import PostDropDown from '../post-drop-down/post-drop-down.component';


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
    const [selectedGenres, setSelectedGenres] = useState({Facial: 'all', Breast: 'all', Body: 'all'});
    const { isLoading, data, error } = useGetPost(selectedGenres.Facial, selectedGenres.Breast, selectedGenres.Body);

    useEffect(() => {
        // data 加载完成后，将其设置为 filteredPosts 的值
        if (!isLoading && data && data.result) {
            setFilteredPosts(data.result);
        }
    }, [data, isLoading]);

    const handleFilters = (filters) => {
        if (filters.includes("All")) {
            console.log('"All" selected');
            return data.result;
        }
    
        if (filters.length === 0) {
            console.log('no filters');
            return data.result;
        }
    
        const filteredResult = data.result.filter(post => filters.includes(post.PostBy));
        console.log('filtered result: ', filteredResult);
        return filteredResult;
    };
  

    const onFilterChange = (filters) => {
        const filteredResult = handleFilters(filters);
        setFilteredPosts(filteredResult);
    };
    const onGenreChange = (genre) => {
        setSelectedGenres((prevGenres) => ({
            ...prevGenres,  // 复制旧状态
            [genre]: prevGenres[genre] === "all" ? genre : "all" // 修改需要变动的部分
        }));
    }
    
    // 提前返回，防止在 data 尚未加载完成时渲染组件
    if (isLoading || !data || !data.result) {
        return <div>Loading...</div>;
    }

    return (
        <div className='doctor-post-outer-container'>
            <div className='doctor-post-header-container'>
                <PostDropDown handleFilters={onGenreChange} options={postGenres} />
                <PostDropDown handleFilters={onFilterChange} options={filterOptions} />
            </div>
            <div className='doctor-post-content-container'>
                <DoctorPostGrid posts={filteredPosts} />
            </div>
        </div>
    )
}

export default DoctorPost;


  