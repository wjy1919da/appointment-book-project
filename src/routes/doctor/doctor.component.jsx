
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
//import Form from 'react-bootstrap/Form';
//import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import FeatureDoctor from '../../components/FeatureDoctor/feature-doctor.component';
import IntroDoctor from '../../components/intro-doctor/intro-doctor.component';
import DoctorPostGrid from '../../components/doctor-post-grid/doctor-post-grid.component';
import useDoctorQueryStore from '../../store.ts';
import {Input,InputGroup,InputLeftElement,Button,InputRightElement} from "@chakra-ui/react";

const Doctor = () => {
  // useRef
  const locationRef = useRef(null);
  const specializationRef = useRef(null);
  const doctorNameRef = useRef(null);
  const { setDoctorName, setLocation, setField } = useDoctorQueryStore();
  const { isLoading, data, error, refetch } = useSearchMultiConditions('','','');
  const handleSubmit = (event) => {
    event.preventDefault();
    let isFormEmpty = true;
  
    if(locationRef.current && locationRef.current.value !== "") {
      setLocation(locationRef.current.value);
      isFormEmpty = false;
    }
    
    if(specializationRef.current && specializationRef.current.value !== "") {
      setField(specializationRef.current.value);
      isFormEmpty = false;
    }
    if(doctorNameRef.current && doctorNameRef.current.value !== "") {
      setDoctorName(doctorNameRef.current.value);
      isFormEmpty = false;
    }
    
    if(isFormEmpty){
      alert("Please enter a valid search query");
    }
  }
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
                 <form onSubmit={handleSubmit}>
                      <InputGroup>
                      {/* locationRef */}
                          <Input 
                            ref = {locationRef} 
                            type = "text" 
                            focusBorderColor="orange.200"
                            placeholder = "ZIP Code"  />
                          <Input 
                            ref = {specializationRef} 
                            type = "text" 
                            focusBorderColor="orange.200"
                            placeholder = "Specialization"  />
                          <Input 
                            ref = {doctorNameRef} 
                            type = "text" 
                            focusBorderColor="orange.200"
                            placeholder = "Doctor Name"  />
                          <InputRightElement children = {<DoctorSearchButton type = "submit" title = "Search"/>} /> 
                    </InputGroup>
                </form>
               
                   
                </div>
               <div className='doctor-intro-container'>
                  <IntroDoctor />
               </div>
             <FeatureDoctor />
            {/* <div className='doctor-post-container'>
              <DoctorPostGrid /> 
             </div>  */}
          </div>
         
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Doctor;
