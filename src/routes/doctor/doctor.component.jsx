import DoctorPic from '../../assets/doctor/doctor-pic.jpg';
import DoctorCard from '../../components/doctor-card/doctor-card.component';

import Footer from '../../components/footer/footer.component';
import './doctor.styles.scss';
import DoctorSearch from '../../components/doctor-search/doctor-search.component';
import DoctorFilterLocation from '../../components/doctor-filter/doctor-filter-location.component';
import DoctorFilterField from '../../components/doctor-filter/doctor-filter-field.component';
import { useState } from 'react';
import { useEffect } from 'react';
import { API } from 'aws-amplify';
import { listDoctors } from '../../graphql/queries';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';
import { useSearchParams } from 'react-router-dom';

const Doctor = () => {
    const [doctors, setDoctors] = useState([]);
    var pageNumsArray;

    const [searchParams] = useSearchParams();
    const [q, setQ] = useState(searchParams.get('keywords') ? searchParams.get('keywords'): '');
    // const [searchParam] = useState(['firstName', 'lastName', 'city', 'state', 'field', 'workYear']);
    const [searchParam] = useState(['firstName', 'lastName', 'city', 'state', 'field']);
    const [locationFilterParam, setLocationFilterParam] = useState([searchParams.get('location') ? searchParams.get('location') : 'all']);
    const [fieldFilterParam, setFieldFilterParam] = useState([searchParams.get('field') ? searchParams.get('field') : 'all']);
    const [pageFilterParam, setPageFilterParam] = useState([searchParams.get('page') ? searchParams.get('page') : 1]);

    // eslint-disable-next-line no-unused-vars
    const [keywords, setKeywords] = useQueryParam('keywords', StringParam);
    // eslint-disable-next-line no-unused-vars
    const [location, setLocation] = useQueryParam('location', StringParam);
    // eslint-disable-next-line no-unused-vars
    const [field, selField] = useQueryParam('field', StringParam);
    // eslint-disable-next-line no-unused-vars
    const [page, setPage] = useQueryParam('page', NumberParam);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDoctors();
        window.scrollTo(0, 0);
    }, []);

    async function fetchDoctors() {
        const apiData = await API.graphql({ query: listDoctors });
        console.log(apiData);
        const doctorsFromAPI = apiData.data.listDoctors.items;
        // const validDoctors = doctorsFromAPI.filter((doctor) => doctor._deleted !== true);
        const validDoctors = doctorsFromAPI;
        setDoctors(validDoctors);
        pageNumsArray = new Array(Math.ceil(validDoctors.length / 6)).fill(null).map((_, i) => i + 1);
        setIsLoading(false);
    };

    function search() {
        // eslint-disable-next-line array-callback-return
        const searchResult = doctors.filter((doctor) => {
            // eslint-disable-next-line eqeqeq
            if (doctor.city.toLowerCase() == locationFilterParam || locationFilterParam == 'all' ) { 
            //     // eslint-disable-next-line eqeqeq
                if (doctor.field.toLowerCase().split('&').includes(fieldFilterParam) || fieldFilterParam == 'all') { 
                    return searchParam.some((param) => {
                        return doctor[param].toString().toLowerCase().indexOf(q.toLowerCase()) > -1;
                    })
                }
            }
        })
        pageNumsArray = new Array(Math.ceil(searchResult.length / 6)).fill(null).map((_, i) => i + 1);
        return searchResult;
    }

    const doctorsCardGrid = search().map((doctor) => {
        return (
            <div className='col-12 col-md-6 col-lg-4' key={doctor.id}>
                <DoctorCard doctor={doctor} />
            </div>
        )
    }).slice((pageFilterParam - 1)*6, pageFilterParam*6);

    const pageNumGrid = pageNumsArray.map((pageNum) => {
        return (
            // eslint-disable-next-line eqeqeq
            <button className={pageNum == pageFilterParam ? 'page-num-selected' : 'page-num'} 
                    key={pageNum} 
                    value={pageNum} 
                    onClick={() => {setPage(pageNum); setPageFilterParam(pageNum);}}>
                {pageNum}
            </button>
        )
    });

    return (
        <div className='doctor-container animate__animated animate__fadeIn'>
            {isLoading ? 
            <div className="spinner-container">
                <div className="d-flex justify-content-center">
                    <div className="spinner-grow" role="status">
                    </div>
                </div>
                <div className="spinner-text">
                    Loading...
                </div>
            </div> :
            <div>
                <div className='doctor-title-container'>
                    <h1 className='doctor-title-name'>find a doctor & book online</h1>
                    <p className='doctor-title-label'>Easily book a doctor anywhere in the world with Charm</p>
                </div>
                <img className='doctor-pic' src={DoctorPic} alt='doctor' />
                <div className='doctor-search-filter-container'>
                    <DoctorSearch className='doctor-search' q={q} setQ={setQ} setKeywords={setKeywords} setPage={setPage} setPageFilterParam={setPageFilterParam} />
                    <div className='doctor-filters'>
                        <DoctorFilterLocation text='All Locations' location={locationFilterParam} setLocationFilterParam={setLocationFilterParam} setLocation={setLocation} setPage={setPage} setPageFilterParam={setPageFilterParam} />
                        <DoctorFilterField text='All Fields' field={fieldFilterParam} setFieldFilterParam={setFieldFilterParam} setField={selField} setPage={setPage} setPageFilterParam={setPageFilterParam} />
                    </div>
                </div>
                <div className='doctors-container container'>
                    <div className='row'>
                        {doctorsCardGrid}
                    </div>
                </div>
                <div className='page-nums-container'>
                    {pageNumGrid}
                </div>
                <Footer />
            </div> }
        </div>
    )
}

export default Doctor;