import {
    InputGroup,
    SimpleGrid,
    Text
  } from '@chakra-ui/react';
import './doctor-search-popup.styles.scss'
import { Link } from 'react-router-dom';
import React,{ useRef, useState } from 'react';
import {useSearchMultiConditionsPopUp ,useSearchMultiConditions} from '../../hooks/useSearchDoctors';
import DoctorCard from '../doctor-card/doctor-card.component';
import Modal from 'react-bootstrap/Modal';
import useDoctorQueryStore from '../../store.ts';
import VerticalDivider from '../doctor-search-multiInput/doctor-search-divider.component';
import SearchIcon from '../../assets/doctor/doctor-search-button-icon.png';
import FormInput from '../form-input/form-input.component';
const DoctorSearchPopup = ({show,onHide}) => {
   const {
        data,
        error,
        isLoading,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
   } = useSearchMultiConditionsPopUp();
   if(data){
     console.log("doctor component search popup data: ",data);
   }
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
    
    const fetchDoctorCount = 
        data?.pages.reduce(
            (total, page) => total + (page.data?.length || 0),
            0
        ) || 0;
   
    return(
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
            // <InfiniteScroll
            //     dataLength={fetchDoctorCount}
            //     next={fetchNextPage}
            //     hasMore={hasNextPage}
            //     loader={<Spinner/>}
            // >
                (
                    data.pages.map((page, index) => (
                        <SimpleGrid key={index} columns={3} spacing={10}>
                            {page.data && page.data.map((item, i) => (
                            <div key={i} className='doctor-search-card-container'>
                                <Link to={`/doctor/${item.nickname}`}>
                                    <DoctorCard doctor={item} />
                                </Link>
                            </div>
                            ))}
                        </SimpleGrid>
                    ))
                )
            // </InfiniteScroll>
        )
    }
     </div>
        </Modal>  
    )
}
export default DoctorSearchPopup;