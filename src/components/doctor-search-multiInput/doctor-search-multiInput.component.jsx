import React, { useRef, useEffect, useState,useReducer } from 'react'
import {Input,InputGroup,InputLeftElement,Button,InputRightElement,Divider} from "@chakra-ui/react";
import useDoctorQueryStore from '../../store.ts';
import DoctorSearchDropDown from './doctor-search-dropdown.component'
import DoctorSearchPopup from '../doctor-search-popup/doctor-search-popup.component';
import searchReducer from '../../reducer/searchReducer.ts';
import VerticalDivider from './doctor-search-divider.component'
import DoctorSearchButton from '../doctor-search-button/doctor-search-button.component.jsx';
import SearchIcon from '../../assets/doctor/doctor-search-button-icon.png';
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
    console.log("doctorQuery.isModelOpen",doctorQuery.isModelOpen);
    const handleOnClick = () => {
        if(!locationRef.current.value && !specializationRef.current.value && !doctorNameRef.current.value){
            alert("please enter at least one field");
        }
        setIsModelOpen(true);
    }
    const handleBlur = () => {
        if (dropdownIsOpen) {
            // Delay the execution of closing the dropdown
            setTimeout(() => {
                dispatchDropdown({type: 'CLOSE_DROPDOWN'});
            }, 100);
        }
    }
    return (
    <div>
            <InputGroup display="flex" alignItems="center">
                    <Input 
                        ref = {locationRef} 
                        h="50px"   // 设置高度
                        w="280px"
                        borderRadius="5px"   // 设置宽度
                        type = "text" 
                        onClick = {()=> {
                            dispatchDropdown({type: 'TOGGLE_DROPDOWN'});
                        }}
                        onBlur = {handleBlur}
                        value = {doctorQuery.location}
                        onChange = {(event) => setLocation(event.target.value)}
                        focusBorderColor="orange.200"
                        placeholder = "ZIP Code"  />
                        {dropdownIsOpen && <DoctorSearchDropDown/>}
                      <VerticalDivider/>
                    <Input 
                        h="50px"   // 设置高度
                        w="280px"
                        borderRadius="5px" 
                        ref = {specializationRef} 
                        type = "text" 
                        value={doctorQuery.field}
                        onChange = {(event) => setField(event.target.value)}
                        focusBorderColor="orange.200"
                        placeholder = "Specialization"  />
                         <VerticalDivider/>
                    <Input 
                        h="50px"   // 设置高度
                        w="280px"
                        borderRadius="5px" 
                        ref = {doctorNameRef} 
                        type = "text" 
                        value={doctorQuery.doctorName}
                        onChange = {(event) => setDoctorName(event.target.value)}
                        focusBorderColor="orange.200"
                        placeholder = "Doctor Name"  />
                         <VerticalDivider/>
                         <button className='doctor-search-button' onClick = {handleOnClick}>
                            <img src={SearchIcon} className='doctor-search-icon' />
                            search
                         </button>
            </InputGroup>
           {IsModalOpen && <DoctorSearchPopup show={IsModalOpen} onHide={()=>setIsModelOpen(false)}/>}
            
    </div>
  )
}
export default DoctorSearchMultiInput;