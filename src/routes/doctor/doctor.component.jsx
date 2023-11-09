import './doctor.styles.scss';
import DoctorImg from '../../assets/home/doctor_mobile.svg';  // we need better naming for this image file, not intuitive
import IntroDoctor from '../../components/components-doctor-search/doctor-search-info/doctor-search-info.component';
import DoctorSearchMultiInput from '../../components/components-doctor-search/doctor-search-multiInput/doctor-search-multiInput.component';
import DoctorSearchCard from '../../components/doctor-search-card/doctor-search-card.component';
import BlankSearchCard from '../../components/doctor-search-card/blank-search-card.component';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { retrieveMultiInputResults } from '../../hooks/useGetMultiInputResults';
import DoctorMobilWebpage from '../../components/components-doctor-search/doctor-mobile-webpage/doctor-mobile-web';
import DoctorSearchLoadingBar from '../../components/doctor-search-loading-bar/doctor-search-loading-bar.component';
const Doctor = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });
    const searchLocations = [];
    useEffect(() => {
        // const retrieveLocations = async () => {
        //     try {
        //         const locations = await retrieveSearchResults();
        //         // maybe do some data manipulation here if necessary, to get an array of city names?
        //         searchLocations = locations;
        //     } catch (err) {
        //         // what to do if we can't retrieve location possibilities? default to basic cities?
        //     }
        // }
    }, [])
    async function retrieveSearchResults(results) {  // callback function passed to search bar to retrieve results
        setIsLoading(true);
        try {
            const data = await retrieveMultiInputResults(results);
            // console.log('Data for multiInput results is: ', data);
            // CALL API HERE ONCE BACKEND IMPLEMENTS API!
            // pass results to API call, then pass returned values as an array to setSearchResults below
            setSearchResults(doctorArray); // CHANGE doctorArray TO THE RESULTS OF THE API CALL
        } catch (err) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }
    const testDoctor1 = {'name': 'Dr. Strange',
                            'memberId': 84,
                            'rating': 3,
                            'location': 'New York City',
                            'field': 'Time Manipulation'
                        };
    const testDoctor2 = {'name': 'Dr. Jill',
                            'memberId': 17,
                            'rating': 5,
                            'location': 'Dallas, Texas',
                            'field': 'Botox'
                        };
    const testDoctor3 = {'name': 'Dr. Bob',
                            'memberId': 18,
                            'rating': 4,
                            'location': 'Los Angeles, CA',
                            'field': 'Lipo'
                        }; 
    const testDoctor4 = {'name': 'Dr. Smiles',
                            'memberId': 29,
                            'rating': 5,
                            'location': 'Chicago, IL',
                            'field': 'Dentistry'
                        }; 
    const doctorArray = [testDoctor1, testDoctor2, testDoctor3, testDoctor4, testDoctor1, testDoctor2];                 
    
    if (error) {  // do we have a generic error page?
        return (
            <div className='error-page'>
                <h1>Error</h1>
            </div>
        )
    }
    return (
        <div className='doctor-container animate__animated animate__fadeIn'>
            <div>
                <div className='doctor-search-outer-container'>
                    <div className='gradient-background'>
                        <div className='doctor-search-header-container'>
                            <div className='doctor-search-header-title-container'>
                                <h1 className='doctor-upper-title'>Find the Right Doctor At Your Fingertip</h1>
                            </div>
                            <div className='doctor-search-header-pic-container animate__animated animate__slideInUp'>
                                <img src={DoctorImg} alt='Doctor Search Background' className='doctor-search-header-pic' />
                            </div>
                        </div>
                        <div className='doctor-intro-container'>
                            <IntroDoctor isMobile={isMobile}/>
                        </div>
                        <div className='doctor-search-search-bar-container'>
                            <h2 className='doctor-search-title'>Find your doctors</h2>
                            {isLoading && <DoctorSearchLoadingBar />}
                            <div className='doctor-search-container'>
                                <DoctorSearchMultiInput searchCallback={retrieveSearchResults} />
                            </div>
                        </div>
                    </div>
                    <div className='doctor-search-results-container'>
                        {!isLoading ? searchResults?.map((doctorObj, index) => 
                            <DoctorSearchCard doctorObj={doctorObj} key={index} />
                        ) : doctorArray.map((doctorObj, index) => 
                            <BlankSearchCard doctorObj={doctorObj} key={index} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

const delay = ms => new Promise(res => setTimeout(res, ms)); // used to simulate an API call to return information, remove when we actually get the API call

export default Doctor;
