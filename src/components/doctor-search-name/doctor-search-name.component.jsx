import './doctor-search-name.styles.scss'
import React, { useState } from 'react';
import { forwardRef } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormInput from '../form-input/form-input.component';

function SearchResult({data,onClick,isLoading}){
  return(
    <div className = 'doctor-search-drop-down-name-container' > 
        {isLoading && <div>Loading...</div>}
        {data && data.map(item => (
            <div key={item.id}>
                <button  
                    className='doctor-search-drop-down-name-item'
                    onClick={() => onClick(item)}
                    >
                    <span>{item.name}</span>
                </button>
            </div>))}
    </div>
  )
}
const DoctorSearchName = forwardRef(({ q, setQ, title, searchF,setIsNameOpen, isNameOpen, closeOthers },ref) => {
    //const {data, isLoading, error} = searchF(q);

    const toggle = () => {
      setIsNameOpen(!isNameOpen);
      closeOthers();
    };
  
    const handleOnClick = (item) => {
      setQ(item.name);
    };
  
    const handleInputChange = (e) => {
      setQ(e.target.value);
    };
  
    const handleEnterPress = (e) => {
      if(e.key === 'Enter'){
        setQ(q);
      }
    };
    return (
      <div ref={ref}>
        <Form.Group className="form-floating">
            <Form.Label>{title}</Form.Label>
            <FormInput
              label={title}
              name='location'
              value={q}
              onClick={toggle}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
              type="text"
            />
            {/* <Form.Control
              className="custom-form-control"
              Id="floatingInput"
              //placeholder={title}
              type="text" 
              class="form-control"
              value={q}
              onClick={toggle}
              onChange={handleInputChange}
              onKeyDown={handleEnterPress}
            /> */}
        </Form.Group>
        {/* {isNameOpen && (data && <SearchResult data={data.result} onClick={handleOnClick} isLoading={isLoading}/>
         )} */}
      </div>
    )
});
export default DoctorSearchName;