import './doctor-search-popup.styles.scss'
import { useRef, useEffect } from 'react';
import { useState } from 'react';
import React from 'react';
import {useSearchMultiConditionsPopUp ,useSearchMultiConditions} from '../../hooks/useSearchDoctors';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SimpleGrid } from '@chakra-ui/react';
import DoctorCard from '../doctor-card/doctor-card.component';
import DoctorSearchButton from '../doctor-search-button/doctor-search-button.component';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
const DoctorSearchPopup = ({name , field, location, searchResults,show,onHide}) => {
  const [internalName,setInternalName] = useState(name);
  const [internalField,setInternalField] = useState(field);
  const [internalLocation,setInternalLocation] = useState(location);
  const [internalResults,setInternalResults] = useState(searchResults);
  
  // const { 
  //   isLoading, 
  //   data, 
  //   error, 
  //   refetch,
  //   isFetchingNextPage,
  //   fetchNextPage,
  //   hasNextPage 
  // } = useSearchMultiConditionsPopUp();
  // const {isLoading,data,error} = useSearchMultiConditionsPopUp();
  const { isLoading, data, error, refetch } = useSearchMultiConditionsPopUp(internalLocation,internalField,internalName);
  
  useEffect(() => {
      if (data) {
          // setFetchedDoctorCount(data.pages.reduce((acc, page) => acc + page.results.length, 0));
          setInternalResults(data.result);
          console.log("data refresh ",internalResults);
      }
  }, [data]);
  
  const handleOnClick = () => {
    if (!internalName && !internalLocation && !internalField) {
        alert("Error: All parameters are empty. Please enter at least one parameter.");
    } else {
        refetch({
            location: internalLocation,
            field: internalField,
            name: internalName
        });
        console.log("button clicked",internalLocation,internalField,internalName); 
      }
  };
  const handleNameChange = (event) => {
      setInternalName(event.target.value);
  };
  const handleFieldChange = (event) => {
      setInternalField(event.target.value);
  };
  const handleLocationChange = (event) => {
      setInternalLocation(event.target.value);
  };
  const generateCardList = (items) => {
    return items.map(item => (
        <div key={item.id} className='doctor-search-card-container'>
            <DoctorCard doctor={item} />
        </div>
    ));
  }
  console.log(internalResults,"internalResults length",internalResults.length);
  return(
          <Modal
              dialogClassName="doctor-search-modals"
              show={show}
              onHide={onHide}
              size='xl'
              aria-labelledby="example-custom-modal-styling-title"
           >
         <div className='doctor-search-input-frame'>
            <InputGroup className="mb-3">
              <Form.Group className="form-floating">
                 <Form.Label htmlFor="floatingInput">ZIP or City, State</Form.Label>
                 <Form.Control 
                        className="custom-form-control"
                        aria-label="Location"
                        //placeholder={internalLocation}
                        value={internalLocation}
                        onChange={handleLocationChange} 
                 />
              </Form.Group>
              <Form.Group className="form-floating">
                    <Form.Label htmlFor="floatingInput">Field</Form.Label>
                    <Form.Control 
                        className="custom-form-control"
                        aria-label="Field"
                        //placeholder={internalField}
                        value={internalField}
                        onChange={handleFieldChange} 
                    />
              </Form.Group>
             <Form.Group className="form-floating">
                <Form.Label htmlFor="floatingInput">Name</Form.Label>
                <Form.Control 
                        className="custom-form-control"
                        aria-label="Name"
                       // placeholder={internalName}
                        value={internalName}
                        onChange={handleNameChange} 
                />
             </Form.Group>
               
             <DoctorSearchButton title='Search' onClick={handleOnClick} />
           </InputGroup>
          </div>
          <div className='doctor-search-grid-container'>
              <SimpleGrid columns={3} spacing={10}>
                      {isLoading && <div>Loading...</div>}
                      {internalResults && generateCardList(internalResults)} 
              </SimpleGrid>
          </div>   
        </Modal>
        
  )
};

export default DoctorSearchPopup;