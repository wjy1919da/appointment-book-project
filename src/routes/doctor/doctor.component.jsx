import Footer from '../../components/footer/footer.component';
import './doctor.styles.scss';
import DoctorSearchBackground from '../../assets/doctor/featureDoctor3.png';
import IntroDoctor from '../../components/components-doctor-search/doctor-search-info/doctor-search-info.component';
import DoctorSearchMultiInput from '../../components/components-doctor-search/doctor-search-multiInput/doctor-search-multiInput.component';
import DoctorSearchCard from '../../components/doctor-search-card/doctor-search-card.component';
import { useLayoutEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import DoctorMobilWebpage from '../../components/components-doctor-search/doctor-mobile-webpage/doctor-mobile-web';
import DoctorSearchLoadingBar from '../../components/doctor-search-loading-bar/doctor-search-loading-bar.component';
const Doctor = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    // useLayoutEffect(() => {
    //    window.scrollTo(0, 0);
    // });
    const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });
    async function retrieveSearchResults(results) {  // callback function passed to search bar to retrieve results
        setIsLoading(true);
        try {
            setSearchResults(results);
            console.log('search results set');
        } catch (err) {
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }
    const testDoctor1 = {'name': 'Dr. Strange',
                            'memberId': 9001,
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
    const doctorArray = [testDoctor1, testDoctor2, testDoctor3, testDoctor4];                 
    
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
                {isMobile ? (
                    <DoctorMobilWebpage/>
                ) : (
                    <div className='doctor-search-outer-container'>
                        <div className='gradient-background'>
                            <div className='doctor-search-header-container'>
                                <div className='doctor-search-header-title-container'>
                                    <h1 className='doctor-upper-title'>Find the Right Doctor At Your Fingertip</h1>
                                    {/* <HomeTitle title='Find the Right Doctor At Your Fingertip' isMobile={isMobile} /> */}
                                </div>
                                <div className='doctor-search-header-pic-container animate__animated animate__slideInUp'>
                                    <img src={DoctorSearchBackground} alt='Doctor Search Background' className='doctor-search-header-pic' />
                                    {/* <img src={DoctorSearchPhone} alt='Doctor Search Phone' className='doctor-search-header-phone-pic' /> */}
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
                            {doctorArray.map((doctorObj, index) => 
                                <DoctorSearchCard doctorObj={doctorObj} />
                            )}
                        </div>
                        <button type='button' className='doctor-test-button' onClick={() => console.log(searchResults)} >Click for search results (testing purposes)</button>
                    </div>
                )}
            </div>
            <Footer isMobile={isMobile} />
        </div>
    )
};


export default Doctor;
