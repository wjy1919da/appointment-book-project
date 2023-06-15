import {
    Input,
    InputGroup,
    SimpleGrid,
    Spinner,
    Text
  } from '@chakra-ui/react';
import './doctor-search-popup.styles.scss'
import React,{ useRef, useEffect,useState } from 'react';
import {useSearchMultiConditionsPopUp ,useSearchMultiConditions} from '../../hooks/useSearchDoctors';
import InfiniteScroll from 'react-infinite-scroll-component';
import DoctorCard from '../doctor-card/doctor-card.component';
import DoctorSearchButton from '../doctor-search-button/doctor-search-button.component';
import Modal from 'react-bootstrap/Modal';
import DoctorSearchMultiInput from '../doctor-search-multiInput/doctor-search-multiInput.component';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import HomeSpinner from '../home-spinner/home-spinner.component';
import useDoctorQueryStore from '../../store.ts';
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
      // 校验输入是否全部为空
      if(locationRef.current){
        setLocation(internalLocation);
      }
      if(specializationRef.current){
        setField(internalField);
      }
     if(doctorNameRef.current){
        setDoctorName(internalName);       
     }
     // 用户输入为空
     if(!locationRef.current && specializationRef.current && doctorNameRef.current){
        alert("please input at least one condition");
     }

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
           <form onSubmit={handleSubmit}>
                <Input
                    ref = {locationRef}
                    type = "text"
                    placeholder = "ZIP Code"
                    value={internalLocation}
                    onChange={(e)=>setInternalLocation(e.target.value)}
                    focusBorderColor="orange.200"
                />
                <Input
                    ref = {specializationRef}
                    type = "text"
                    placeholder = "Specialization"
                    value={internalField}
                    onChange={(e)=>setInternalField(e.target.value)}
                />
                <Input
                    ref = {doctorNameRef}
                    type = "text"
                    placeholder = "Doctor Name"
                    value={internalName}
                    onChange={(e)=>setInternalName(e.target.value)}
                />
                <button type = 'submit'>search</button>
           </form>
        </div>
        <div className='doctor-search-grid-container'>
        {data &&  
                <InfiniteScroll
                    dataLength={fetchDoctorCount}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={<Spinner/>}
                >
                    {data.pages.map((page, index) => (
                    <SimpleGrid key={index} columns={3} spacing={10}>
                        {page.data.map((item, i) => (
                        <div key={i} className='doctor-search-card-container'>
                            <DoctorCard doctor={item} />
                        </div>
                        ))}
                    </SimpleGrid>
                    ))}
                </InfiniteScroll>
            }
        </div>   
        </Modal>  
    )
}
export default DoctorSearchPopup;