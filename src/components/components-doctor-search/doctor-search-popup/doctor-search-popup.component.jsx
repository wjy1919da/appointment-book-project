import {
    InputGroup,
    SimpleGrid,
    Text
  } from '@chakra-ui/react';
  //src/components/form-input/form-input.component.jsx
import './doctor-search-popup.styles.scss'
import { Link } from 'react-router-dom';
import React,{ useRef, useState } from 'react';
import {useSearchMultiConditionsPopUp ,useSearchMultiConditions} from '../../../hooks/useSearchDoctors';
import DoctorCard from '../../doctor-card/doctor-card.component';
import Modal from 'react-bootstrap/Modal';
//src/store.ts
import useDoctorQueryStore from '../../../store.ts';
import VerticalDivider from '../doctor-search-multiInput/doctor-search-divider.component';
import SearchIcon from '../../../assets/doctor/doctor-search-button-icon.png';
import FormInput from '../../form-input/form-input.component';
import { Button, Dropdown, Form } from 'react-bootstrap';
import '../doctor-search-multiInput/doctor-search-multiput-dropDown.styles.scss'

import { useMemo } from 'react';
const mergeDoctorsByNickname = (pages) => {
    const mergedDoctors = {};
  
    // Flatten the data into a single array
    const flatData = pages.flatMap(page => page.data || []);
  
    flatData.forEach(doctor => {
      const { nickname, name } = doctor;
  
      if (mergedDoctors[nickname]) {
        // If doctor already exists, add the new programTitle to the existing one
        mergedDoctors[nickname].name.push(name);
      } else {
        // If doctor doesn't exist, add them to the object
        mergedDoctors[nickname] = {
          ...doctor,
          name: [name],  // Use an array to store programTitles
        };
      }
    });
  
    // Convert the object back into an array
    return Object.values(mergedDoctors);
  };

const DoctorSearchPopup = ({show,onHide,isMobile}) => {
   const {
        data,
        error,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
   } = useSearchMultiConditionsPopUp();
   const mergedData = useMemo(() => {
     return data ? mergeDoctorsByNickname(data.pages) : [];
   }, [data]);
   const locationRef = useRef(null);
   const specializationRef = useRef(null);
   const doctorNameRef = useRef(null);
   const doctorQuery  = useDoctorQueryStore(state=>state.doctorQuery);


   const setDoctorName = useDoctorQueryStore(state=>state.setDoctorName);
   const setField = useDoctorQueryStore(state=>state.setField);
   const setLocation = useDoctorQueryStore(state=>state.setLocation);
   const [internalLocation,setInternalLocation] = useState(doctorQuery.location);
   const [internalField,setInternalField] = useState(doctorQuery.field);
   const [internalName,setInternalName] = useState(doctorQuery.doctorName);
   if (error) return <Text>{error.message}</Text>;
   const handleSubmit = (event) => {
      event.preventDefault();
      setLocation(internalLocation);
      setField(internalField);
      setDoctorName(internalName);
    }
    const handleMobileClick = () => {
       setLocation(internalLocation);
       setField(internalField);
       setDoctorName(internalName);
    }
   
    return(
        <div>
            {isMobile?(
                <div>
                    <Modal
                    dialogClassName='doctor-search-modals'
                    show={show}
                    onHide={onHide}
                    size='lg'
                    aria-labelledby="example-custom-modal-styling-title"
                    >
                    
                    <div className='doctor-search-multiInput-button'>
                    <Dropdown>
                        <Dropdown.Toggle className="custom-button" id="dropdownMenuButton" data-bs-auto-close="outside">
                            {internalLocation||'ZIP,city or state'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='search-doctor-dropDown-menu'>
                            <Form className="p-4">
                            <Form.Group className="mb-3" controlId="exampleDropdownFormEmail2" style={{width:'186px', marginLeft:'-10px'}}>
                                <Form.Control 
                                   type="input" 
                                   placeholder="search..." 
                                   ref = {locationRef}
                                   value={internalLocation||''}
                                   onChange={(e)=>setInternalLocation(e.target.value)}
                                />
                            </Form.Group>
                            </Form>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle className="custom-button" id="dropdownMenuButton" data-bs-auto-close="outside">
                              {internalField||'Specialization'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='search-doctor-dropDown-menu'>
                            <Form className="p-4">
                            <Form.Group className="mb-3" controlId="exampleDropdownFormEmail2" style={{width:'186px', marginLeft:'-10px'}}>
                                <Form.Control 
                                    type="input" 
                                    placeholder="search..." 
                                    ref = {specializationRef}
                                    value={internalField||''}
                                    onChange={(e)=>setInternalField(e.target.value)}
                                />
                            </Form.Group>
                            </Form>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle className="custom-button" id="dropdownMenuButton" data-bs-auto-close="outside">
                           {internalName||'Doctor Name'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='search-doctor-dropDown-menu'>
                            <Form className="p-4">
                            <Form.Group className="mb-3" controlId="exampleDropdownFormEmail2" style={{width:'186px', marginLeft:'-10px'}}>
                                <Form.Control 
                                    type="email" 
                                    placeholder="search..." 
                                    ref = {doctorNameRef}
                                    value={internalName||''}
                                    onChange={(e)=>setInternalName(e.target.value)}
                                  />
                            </Form.Group>
                         
                            </Form>
                        </Dropdown.Menu>
                    </Dropdown>
                       <button 
                            className='doctor-search-button' 
                            type = 'search'
                            onClick={handleMobileClick}
                        >
                            <img src={SearchIcon} className='doctor-search-icon' alt='search'/>
                            search
                     </button>
                    {isLoading ?
                        <div ><p>is Loading</p></div> :
                        (data && 
                            <SimpleGrid columns={1} spacing={0}>
                                {mergedData && mergedData.map((item, i) => (
                                    item.nickname &&
                                    <div key={i} className='doctor-search-card-container-mobile'>
                                        <Link to={`/doctor/${item.nickname}`}>
                                            <DoctorCard doctor={item} />
                                        </Link>
                                    </div>
                                ))}
                            </SimpleGrid>
                        )
                    }
                    </div>
                    </Modal>
                </div> 
            ):(
        <Modal
            dialogClassName="doctor-search-modals"
            show={show}
            onHide={onHide}
            size='xl'
            aria-labelledby="example-custom-modal-styling-title"
        >
        <div className='doctor-search-input-frame'>
            <div className='doctor-search-outter-box'>
            <form onSubmit={handleSubmit}>
               <InputGroup display="flex" alignItems="center">
                   <FormInput 
                        ref = {locationRef}
                        label = "ZIP Code"
                        value={internalLocation||''}
                        onChange={(e)=>setInternalLocation(e.target.value)}
                    />
                     <VerticalDivider/>
                    <FormInput 
                        ref = {specializationRef}
                        label = "Specialization"
                        value={internalField || ''}
                        onChange={(e)=>setInternalField(e.target.value)}
                    />
                     <VerticalDivider/>
                    <FormInput 
                        ref = {doctorNameRef}
                        label = "Doctor Name"
                        value={internalName || ''}
                        onChange={(e)=>setInternalName(e.target.value)}
                    />
                     <VerticalDivider/>
                      <button className='doctor-search-button' type = 'submit'>
                            <img src={SearchIcon} className='doctor-search-icon' alt='search'/>
                            search
                     </button>
                </InputGroup> 
           </form>
            </div>
        </div> 
        
        <div className='doctor-search-grid-container'>

        {isLoading ?
            <div ><p>is Loading</p></div> :
            (data && 
                <SimpleGrid columns={3} spacing={10}>
                    {mergedData && mergedData.map((item, i) => (
                        item.nickname &&
                        <div key={i} className='doctor-search-card-container'>
                            <Link to={`/doctor/${item.nickname}`}>
                                <DoctorCard doctor={item} />
                            </Link>
                        </div>
                    ))}
                </SimpleGrid>
            )
        }
     </div>
        </Modal> 
        )}
        </div> 
    )
}
export default DoctorSearchPopup;