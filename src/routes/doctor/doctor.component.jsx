import Footer from '../../components/footer/footer.component';
import './doctor.styles.scss';
import DoctorSearchBackground from '../../assets/doctor/featureDoctor3.png';
import IntroDoctor from '../../components/components-doctor-search/doctor-search-info/doctor-search-info.component';
import DoctorSearchMultiInput from '../../components/components-doctor-search/doctor-search-multiInput/doctor-search-multiInput.component';
import locationIcon from '../../assets/doctor/search-card-locationIcon.png';
import badgeIcon from '../../assets/doctor/search-card-badgeIcon.png';
import glassesIcon from '../../assets/doctor/search-card-glassIcon.png';
import DoctorCardComponent from '../../components/doctor-card/doctor-card.component'
import StarRate from '../../components/starRate/starRate';
import doctorStockPhoto from '../../assets/doctor/doctor-profile-image.png';
import { Link } from 'react-router-dom';
import { useLayoutEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import DoctorMobilWebpage from '../../components/components-doctor-search/doctor-mobile-webpage/doctor-mobile-web';
const Doctor = () => {
    const [searchResults, setSearchResults] = useState([]);
    // useLayoutEffect(() => {
    //    window.scrollTo(0, 0);
    // });
    const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });
    const retrieveSearchResults = (results) => {  // callback function passed to search bar to retrieve results
        setSearchResults(results);
        console.log('search results set');
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
                        <button type='button' className='doctor-test-button' onClick={() => console.log(searchResults)} >Click for search results</button>
                        {/* <FeatureDoctor />
                        <span className="doctor-title">Post by doctor</span>
                        <div className='doctor-post-grid-container'>
                            <DoctorPostGrid />
                        </div> */}
                    </div>
                )}
            </div>
            <Footer isMobile={isMobile} />
        </div>
    )
};

const DoctorSearchCard = ({doctorObj}) => { // based on Figma, doctorObj should preferably have: name, doctorId, photoUrl, rating, location, specialization/field, license/verification
    const name = doctorObj?.name;           // ^I would assume doctorQuerys would be passed in here, from store.ts, which dont contain their rating. I'll have to ask how we will store that
    const photoUrl = doctorObj?.photoUrl;
    const id = doctorObj?.memberId;
    const rating = doctorObj?.rating;
    const location = doctorObj?.location;
    const field = doctorObj?.field;
    return (
        <div className='doctor-sc-container'>  {/* 'sc' stands for search card */}
            <div className='doctor-sc'>
                <div className='doctor-sc-image-column'>
                    <div className='doctor-sc-image-container'>
                        <img src={photoUrl || doctorStockPhoto} alt='Doctor photo' className='doctor-sc-image' /> 
                    </div>
                    <div className='doctor-sc-rating-container'>
                        <StarRate rateScore={rating} />
                    </div>
                </div>
                <div className='doctor-sc-info-column'>
                    <div className='doctor-sc-location-row doctor-sc-row'>
                        <div className='doctor-sc-icon-container'>
                            <img src={locationIcon} alt='location icon' className='doctor-sc-icon' />
                        </div>
                        <p className='doctor-sc-location-text doctor-sc-text'>{location  || 'City, State'}</p>
                    </div>
                    <div className='doctor-sc-name-row doctor-sc-row'>
                        <div className='doctor-sc-name-container'>
                        <Link to={`/doctor/${id}`}><h4 className='doctor-sc-name-text doctor-sc-text'>{name || 'Dr. Name Name'}</h4></Link>
                        </div>
                    </div>
                    <div className='doctor-sc-field-row doctor-sc-row'>
                        <div className='doctor-sc-icon-container'>
                            <img src={glassesIcon} alt='glasses icon' className='doctor-sc-icon' />
                        </div>
                        <p className='doctor-sc-field-text doctor-sc-text'>{field || 'Generalist'}</p>
                    </div>
                    <div className='doctor-sc-license-row doctor-sc-row'>
                        <div className='doctor-sc-icon-container'>
                            <img src={badgeIcon} alt='badge icon' className='doctor-sc-icon' />
                        </div>
                        <p className='doctor-sc-verification-text doctor-sc-text'>License or Verification</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Doctor;
