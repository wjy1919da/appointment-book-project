
import Footer from '../../components/footer/footer.component';
import './doctor.styles.scss';
import DoctorSearch from '../../components/doctor-search/doctor-search.component';
import DoctorFilterLocation from '../../components/doctor-filter/doctor-filter-location.component';
import DoctorFilterField from '../../components/doctor-filter/doctor-filter-field.component';
import DoctorSearchName from './../../components/doctor-search-name/doctor-search-name.component';
import DoctorSearchPopup from '../../components/doctor-search-popup/doctor-search-popup.component';
import React, { useRef, useEffect, useState,useReducer } from 'react'
import { useMutation, useQuery, useQueryClient } from "react-query";
import HomeTitle from '../../components/home-title/home-title.component';
import DoctorSearchBackground from '../../assets/doctor/doctor-search-background.png';
import DoctorSearchPhone from '../../assets/doctor/doctor-search-phone.png';
import { useSearchDoctors, useSearchSpecialization, useSearchLocation,useSearchMultiConditions,useSearchMultiConditionsPopUp } from '../../hooks/useSearchDoctors';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import FeatureDoctor from '../../components/FeatureDoctor/feature-doctor.component';
import IntroDoctor from '../../components/intro-doctor/intro-doctor.component';
import DoctorPostGrid from '../../components/doctor-post-grid/doctor-post-grid.component';
import useDoctorQueryStore from '../../store.ts';
import {Input,InputGroup,InputLeftElement,Button,InputRightElement} from "@chakra-ui/react";
import DoctorSearchMultiInput from '../../components/doctor-search-multiInput/doctor-search-multiInput.component';
const Doctor = () => {
   
  // const setIsModelOpen = useDoctorQueryStore(state=>state.setIsModelOpen);
  
  return (
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
                  <div className = 'doctor-search-outter-box'>
                      <DoctorSearchMultiInput />
                  </div>
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
 
  );
};

export default Doctor;
