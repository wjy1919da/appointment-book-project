import './doctor-search.styles.scss';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const DoctorSearch = () => {
    const [searchParams] = useSearchParams();
    const [keywords, setKeywords] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        setKeywords(searchParams.get('searchCondition'));
        setCity(searchParams.get('city'));
    }, [searchParams]);

    return (
        <div className="doctor-search-container">
            Search Condition: {keywords}, City: {city}  
        </div>
    )
}

export default DoctorSearch;
