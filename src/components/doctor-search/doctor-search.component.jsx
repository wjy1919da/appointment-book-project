import SearchIcon from '../../assets/doctor/doctor-search-icon.png';

import './doctor-search.styles.scss';

const DoctorSearch = ({ q, setQ, setKeywords, setPage, setPageFilterParam }) => {
    return (
        <div className="doctor-search-container">
            <img src={SearchIcon} className='doctor-search-icon' alt='search'/>
            <input type='search' 
                   className='doctor-search-text' 
                   placeholder='Search for the keyword'
                   value={q}
                   onChange={(e) => {setQ(e.target.value); setKeywords(e.target.value); setPage(1); setPageFilterParam(1);}}/>
        </div>
    )
}

export default DoctorSearch;