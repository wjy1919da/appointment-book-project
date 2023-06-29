import React, { useRef, useState,useReducer } from 'react'
import { InputGroup } from "@chakra-ui/react";
import useDoctorQueryStore from '../../store.ts';
import DoctorSearchDropDown from './doctor-search-dropdown.component'
import DoctorSearchPopup from '../doctor-search-popup/doctor-search-popup.component';
import searchReducer from '../../reducer/searchReducer.ts';
import VerticalDivider from './doctor-search-divider.component'
import SearchIcon from '../../assets/doctor/doctor-search-button-icon.png';
import FormInput from '../form-input/form-input.component.jsx';

const DoctorSearchMultiInput = () => {
    const locationRef = useRef(null);
    const specializationRef = useRef(null);
    const doctorNameRef = useRef(null);
    const doctorQuery  = useDoctorQueryStore(state=>state.doctorQuery);
    const setDoctorName = useDoctorQueryStore(state=>state.setDoctorName);
    const setField = useDoctorQueryStore(state=>state.setField);
    const setLocation = useDoctorQueryStore(state=>state.setLocation);
    const [dropdownIsOpen, dispatchDropdown] = useReducer(searchReducer, false);
    const [IsModalOpen,setIsModelOpen] = useState(false);
    const handleOnClick = () => {
        setIsModelOpen(true);
    }
    const handleBlur = () => {
        if (dropdownIsOpen) {
            setTimeout(() => {
                dispatchDropdown({type: 'CLOSE_DROPDOWN'});
            }, 100);
        }
    }
    return (
        <div>
            <InputGroup display="flex" alignItems="center">
                <FormInput 
                    ref = {locationRef}
                    onClick = {()=> { dispatchDropdown({type: 'TOGGLE_DROPDOWN'}); }}
                    onBlur = {handleBlur}
                    value = {doctorQuery.location || ''}
                    onChange = {(event) => setLocation(event.target.value)}
                    focusBorderColor="orange.200"
                    label = "ZIP Code"  />
                    {dropdownIsOpen && <DoctorSearchDropDown/>}
                <VerticalDivider/>
                <FormInput 
                    ref = {specializationRef}
                    value={doctorQuery.field || ''}
                    onChange = {(event) => setField(event.target.value)}
                    label = "Specialization"  />
                <VerticalDivider/>
                <FormInput 
                    ref = {doctorNameRef}
                    value={doctorQuery.doctorName || ''}
                    onChange = {(event) => setDoctorName(event.target.value)}
                    label = "Doctor Name"  />
                <button className='doctor-search-button' onClick = {handleOnClick}>
                    <img src={SearchIcon} className='doctor-search-icon' alt='search'/>
                    search
                </button>
            </InputGroup>
            {IsModalOpen && <DoctorSearchPopup show={IsModalOpen} onHide={()=>setIsModelOpen(false)}/>}
        </div>
    )
}
export default DoctorSearchMultiInput;