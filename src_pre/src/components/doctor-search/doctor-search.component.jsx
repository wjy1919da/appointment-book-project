import React, { useState } from 'react';
import './doctor-search.styles.scss';
import { forwardRef } from 'react';
import mapImg from '../../assets/doctor/doctor-map.png';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
function SearchResult({data, onClick, isLoading}) {
  const groupedData = [];
  for (let i = 0; i < data.length; i += 3) {
      groupedData.push(data.slice(i, i + 3));
  }

  return(
      <div className='doctor-search-drop-down-container'> 
          {isLoading && <div>Loading...</div>}
          <div className = 'doctor-search-drop-down-frame'>
              {groupedData.map((group, index) => (
                  <div key={index} className='doctor-search-drop-down-row-container'>
                      {group.map(item => (
                          <div key={item.id}> 
                              <button  
                                  className='doctor-search-drop-down-item'
                                  onClick={() => onClick(item)}
                              >
                                  <span>{item}</span>
                              </button>
                          </div>
                      ))}
                  </div>
              ))}
          </div>
          <div className='doctor-search-drop-down-map-container'>
              <img src={mapImg} alt="map" className='doctor-search-drop-down-map-pic' />  
          </div>
      </div>
  );
}
const DoctorSearch = forwardRef(({ q,setQ, title, searchF,setIsSearchOpen,isSearchOpen, closeOthers},ref) => {
  const {data, isLoading, error} = searchF(q);
  const toggle = () => {
    setIsSearchOpen(!isSearchOpen);
    closeOthers();
  };

  const handleOnClick = (item) => {
    setQ(item);
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
      <Form.Control
        className="custom-form-control"
        type="text"
        class="form-control"
        placeholder={title}
        value={q}
        onClick={toggle}
        onChange={handleInputChange}
        onKeyDown={handleEnterPress}
       />
      {isSearchOpen  && (
        data && <SearchResult data={data.result} onClick={handleOnClick} isLoading={isLoading}/>
      )}
    </div>
  )
});


export default DoctorSearch;
