import axios from 'axios';
import Footer from '../../components/footer/footer.component';
import './doctor.styles.scss';
import DoctorSearch from '../../components/doctor-search/doctor-search.component';
import DoctorFilterLocation from '../../components/doctor-filter/doctor-filter-location.component';
import DoctorFilterField from '../../components/doctor-filter/doctor-filter-field.component';
import { useState } from 'react';
import DoctorSearchName from './../../components/doctor-search-name/doctor-search-name.component';
import DoctorSearchPopup from '../../components/doctor-search-popup/doctor-search-popup.component';
import { useRef, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from "react-query";
import HomeTitle from '../../components/home-title/home-title.component';
import DoctorSearchBackground from '../../assets/doctor/doctor-search-background.png';
import DoctorSearchPhone from '../../assets/doctor/doctor-search-phone.png';
import DoctorSearchButton from '../../components/doctor-search-button/doctor-search-button.component';
import { useSearchDoctors, useSearchSpecialization, useSearchLocation,useSearchMultiConditions,useSearchMultiConditionsPopUp } from '../../hooks/useSearchDoctors';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import FeatureDoctor from '../../components/FeatureDoctor/feature-doctor.component';
import IntroDoctor from '../../components/intro-doctor/intro-doctor.component';
import DoctorSearchMultiInput from '../../components/doctor-search-multiInput/doctor-search-multiInput.component';
import DoctorPostGrid from '../../components/doctor-post-grid/doctor-post-grid.component';


const Doctor = () => {
  const [q, setQ] = useState([]);
  const [location, setLocation] = useState([]);
  const [field, setField] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [searchResults, setSearchResults] = useState([]);
  const [searchClick,setSearchClick] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSpecializationOpen, setIsSpecializationOpen] = useState(false);
  const [isNameOpen, setIsNameOpen] = useState(false);

  const searchRef = useRef();
  const specializationRef = useRef();
  const nameRef = useRef();
  const { isLoading, data, error, refetch } = useSearchMultiConditions(location,field,q);
  // const { 
  //   isLoading, 
  //   data, 
  //   error, 
  //   refetch,
  //   isFetchingNextPage,
  //   fetchNextPage,
  //   hasNextPage 
  //  } = useSearchMultiConditionsPopUp();
  // const {isLoading,data,error} = useSearchMultiConditionsPopUp();
  
  
  const closeAllDropdowns = () => {
    setIsSearchOpen(false);
    setIsSpecializationOpen(false);
    setIsNameOpen(false);
  };

  const handleButtonClick = () => {
    if (!q && !location && !field) {
      alert("Error: All parameters are empty. Please enter at least one parameter.");
    } else {
      setIsModalOpen(true);
      console.log("Modal Opened",isModalOpen);
      refetch()
    }
  };
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !modalRef.current?.contains(event.target) &&
        !searchRef.current?.contains(event.target) &&
        !specializationRef.current?.contains(event.target)&&
        !nameRef.current?.contains(event.target)
      ) {
          closeAllDropdowns();
      }
    };
    window.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className='doctor-container animate__animated animate__fadeIn'>
      {error ? (
        <h2>Error: {error.message}</h2>
      ) : (
        <div>
          <div className='doctor-search-outer-container'>
            <div className='doctor-search-header-container'>
                 <div className='doctor-search-header-title-container'>
                    <HomeTitle title='Find the Right Doctor
                                        At Your Fingertip' />
                 </div>
                 <div className='doctor-search-header-pic-container animate__animated animate__slideInUp'>
                      {<img src={DoctorSearchBackground} alt='doctor-search-background' className='doctor-search-header-pic'></img>}
                      {<img src={DoctorSearchPhone} alt='doctor-search-phone' className='doctor-search-header-phone-pic'></img>}
                 </div>
            </div>
           
              <div className='doctor-search-search-bar-outer-container'>
                    <InputGroup className="mb-3">
                      <div className='doctor-input-container'>
                          <DoctorSearch 
                              q={location} 
                              setQ={setLocation} 
                              title = "ZIP or City, State"
                              searchF = {useSearchLocation}
                              setIsSearchOpen={setIsSearchOpen} 
                              isSearchOpen={isSearchOpen}
                              closeOthers={() => {
                                setIsSpecializationOpen(false);
                                setIsNameOpen(false);
                                setIsModalOpen(false);
                              }} 
                              ref={searchRef}
                            />
                      </div>
                      <div className='doctor-input-container'>
                          <DoctorSearchName 
                            q={field} 
                            setQ={setField} 
                            title = "Specialization"
                            searchF = {useSearchSpecialization}
                            setIsNameOpen={setIsSpecializationOpen} 
                            isNameOpen={isSpecializationOpen}
                            closeOthers={() => {
                              setIsSearchOpen(false);
                              setIsNameOpen(false);
                              setIsModalOpen(false);
                            }} 
                            ref={specializationRef}
                          />
                      </div>
                      <div className='doctor-input-container'>
                          <DoctorSearchName 
                            q={q} 
                            setQ={setQ} 
                            title = "Doctor Name"
                            searchF = {useSearchDoctors}
                            setIsNameOpen={setIsNameOpen} 
                            isNameOpen={isNameOpen}
                            closeOthers={() => {
                              setIsSearchOpen(false);
                              setIsSpecializationOpen(false);
                              setIsModalOpen(false);
                            }} 
                            ref={nameRef}
                          />
                      </div>
                      <DoctorSearchButton title = "search" onClick={handleButtonClick} />
                    </InputGroup>
              </div>
              <div className='doctor-search-search-bar-outer-container'>
                <div className = 'doctor-search-outter-box'>
                  <DoctorSearchMultiInput />
                </div>
              </div>
              <div className='doctor-intro-container'>
                <IntroDoctor />
              </div>
             <FeatureDoctor />
             <span className="doctor-title">Post by doctor</span>
             <div className='doctor-post-grid-container'>
                <div className='doctor-post-grid-box'>
                  <DoctorPostGrid />
                </div>
             </div>
          </div>
          {isLoading ? (
            <div className="spinner-container">
              <div className="d-flex justify-content-center">
                <div className="spinner-grow" role="status"></div>
              </div>
              <div className="spinner-text">Loading...</div>
            </div>
          ) : isModalOpen && data && (
            <div ref={modalRef}> 
              <DoctorSearchPopup 
                  name={q} 
                  field={field} 
                  location={location} 
                  searchResults={data.result} 
                  show={isModalOpen}
                  onHide={() => setIsModalOpen(false)}
               />
            </div>
          )}
          
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Doctor;
