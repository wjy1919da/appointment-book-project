import './doctor-search-specialization.styles.scss'
import React, { useState } from 'react';
import { forwardRef } from 'react';
const DoctorSearchSpecialization = forwardRef(({ q, setQ, items ,  setIsSpecializationOpen,  isSpecializationOpen,closeOthers},ref) => {
    
    const toggle = () => {
      setIsSpecializationOpen(!isSpecializationOpen);
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
      <div ref={ref} >
        {/* <img src={SearchIcon} className='doctor-search-icon' alt='search'/> */}
        <input type='search' 
          className='doctor-search-text' 
          placeholder='Specialization'
          value={q}
          onClick={() => toggle()}
          onChange={handleInputChange}
          onKeyDown={handleEnterPress}
         />
        {isSpecializationOpen && items &&  (
          <div className = 'doctor-search-drop-down-specialization-container'>
              {
                  items.map(item => (
                      <div key={item.id}>
                         <button  
                              className='doctor-search-drop-down-specialization-item'
                              onClick={() => handleOnClick(item)}
                              >
                              <span>{item.specialization}</span>
                          </button>
                      </div>
                  ))
              }  
          </div>    
        )}
      </div>
    )
});
export default DoctorSearchSpecialization;  