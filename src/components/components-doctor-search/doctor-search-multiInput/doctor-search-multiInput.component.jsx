import React, { useRef, useState,useReducer,useEffect} from 'react'
import { InputGroup, Input } from "@chakra-ui/react";
import useDoctorQueryStore from '../../../store.ts';
import DoctorSearchDropDown from './doctor-search-dropdown.component.jsx'
import DoctorSearchPopup from '../doctor-search-popup/doctor-search-popup.component.jsx';
import searchReducer from '../../../reducer/searchReducer.ts';
import VerticalDivider from './doctor-search-divider.component'
import SearchIcon from '../../../assets/doctor/doctor-search-button-icon.png';
import FormInput from '../../form-input/form-input.component.jsx';
import CloseButton from '../../../assets/post/pop-up-close-button.png';
import './doctor-search-multiput-dropDown.styles.scss'
import HomeButton from '../../home-button/home-button.component.jsx';
import { Button, Dropdown, Form } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';

const DoctorSearchMultiInput = ({searchCallback}) => {
    const locationRef = useRef(null);
    const specializationRef = useRef(null);
    const doctorNameRef = useRef(null);
    const doctorQuery  = useDoctorQueryStore(state=>state.doctorQuery);
    const setDoctorName = useDoctorQueryStore(state=>state.setDoctorName);
    const setField = useDoctorQueryStore(state=>state.setField);
    const setLocation = useDoctorQueryStore(state=>state.setLocation);
    const [dropdownIsOpen, dispatchDropdown] = useReducer(searchReducer, false);
    const [IsModalOpen,setIsModelOpen] = useState(false);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const isMobile = useMediaQuery({ query: `(max-width: 1024px)` }); 
    const isPhone = useMediaQuery({ query: `(max-width: 767px)` });
    const isIpad = useMediaQuery({query: `(min-width: 768px) and (max-width:1024px)` });
    const searchButtonWidth = isIpad ? '257px' : (isPhone ? '150px' : 'defaultWidth');
    const searchButtonHeight = isIpad ? '52px' : (isPhone ? '40px' : 'defaultWidth');
    useEffect(() => {
        if (!IsModalOpen) {
            setDoctorName('');
            setField('');
            setLocation('');
        }
    }, [IsModalOpen]);
    const handleOnClick = () => {
        setIsModelOpen(true);
    }
    const handleDropdownLocationClick = (item) => {
        setLocation(item);
        closeLocationModal();
    }
    const handleBlur = () => {
        if (dropdownIsOpen) {
            setTimeout(() => {
                dispatchDropdown({type: 'CLOSE_DROPDOWN'});
            }, 100);
        }
    }
    const defaultLocations = ["Los Angeles, CA", "Dallas, TX", "New York City, NY", "San Francisco, CA", "Las Vegas, NV", "Minneapolis, MI", "Atlanta, GA", "Phoenix, AZ"];
    const handleSubmit = () => {
        const obj = {'location': doctorQuery.location,
                      'field':   doctorQuery.field,
                      'name': doctorQuery.doctorName
                    }
        console.log('Now calling multiInput callback...');
        searchCallback(obj);
    }
    const openLocationModal = () => {
        setIsLocationModalOpen(true);
    }
    const closeLocationModal = () => {
        setIsLocationModalOpen(false);
    }
    const filterFunction = (subString) => {
        console.log(subString);
        const filtered = defaultLocations.filter((location) => {return location.includes(subString)});
        console.log(filtered);
    }
    return (
        <div>
            {isMobile?(
                <div className="doctor-search-mobile-multiInput-container">
                    <div className='doctor-search-multiInput-button'>
                    <Dropdown>
                        <Dropdown.Toggle className="custom-button" id="dropdownMenuButton" data-bs-auto-close="outside">
                            {/* ZIP,city or state */}
                            {doctorQuery.location || 'ZIP,city or state'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu  className='search-doctor-dropDown-menu'>
                            <Form className="p-4">
                            {/* <Form.Group className="mb-3" controlId="exampleDropdownFormEmail2" style={{width:'100%', marginLeft:'-10px',marginTop:'-10px'}}> */}
                            <Form.Group className="mb-3" controlId="exampleDropdownFormEmail2" style={{width:'100%', marginTop:'-10px'}}>
                                <Form.Control 
                                    type="input" 
                                    placeholder="search..." 
                                    ref = {locationRef}
                                    value = {doctorQuery.location || ''}
                                    onChange = {(event) => setLocation(event.target.value)}
                                />
                            </Form.Group>
                            {/* {topLocations.map((item, index) => (
                                    <Button 
                                        key={index}
                                        className="search-location-button mb-3"  
                                        variant="outline-primary"
                                        onClick={() => handleDropdownLocationClick(item)}
                                    >
                                        {item}
                                    </Button>
                                ))} */}
                            </Form>
                        </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                        <Dropdown.Toggle className="custom-button" id="dropdownMenuButton" data-bs-auto-close="outside">
                           {doctorQuery.field || 'Specialization'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='search-doctor-dropDown-menu'>
                            <Form className="p-4">
                            {/* <Form.Group className="mb-3" controlId="exampleDropdownFormEmail2" style={{width:'100%', marginLeft:'-10px'}}> */}
                            <Form.Group className="mb-3" controlId="exampleDropdownFormEmail2" style={{width:'100%'}}>
                               <Form.Control 
                                    type="input" 
                                    placeholder="search..." 
                                    ref = {specializationRef}
                                    value={doctorQuery.field || ''}
                                    onChange = {(event) => setField(event.target.value)}
                                />
                            </Form.Group>
                            </Form>
                        </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                        <Dropdown.Toggle className="custom-button" id="dropdownMenuButton" data-bs-auto-close="outside">
                            {doctorQuery.doctorName || 'Doctor Name'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='search-doctor-dropDown-menu'>
                            <Form className="p-4">
                            {/* <Form.Group className="mb-3" controlId="exampleDropdownFormEmail2" style={{width:'100%', marginLeft:'-10px'}}> */}
                            <Form.Group className="mb-3" controlId="exampleDropdownFormEmail2" style={{width:'100%'}}>
                                <Form.Control 
                                    type="input" 
                                    placeholder="search..." 
                                    ref = {doctorNameRef}
                                    value={doctorQuery.doctorName || ''}
                                    onChange = {(event) => setDoctorName(event.target.value)} 
                                />
                            </Form.Group>
                            </Form>
                        </Dropdown.Menu>
                        </Dropdown>
                        {/* <button className='doctor-search-button' 
                                style={{
                                    width:'150px',
                                    marginLeft:'-1px'
                                    }}
                                onClick = {handleOnClick}
                                >
                            <img src={SearchIcon} className='doctor-search-icon' alt='search'/>
                            Search
                        </button> */}
                        <HomeButton title='Search' onClick ={handleOnClick}  isIcon={SearchIcon} width={searchButtonWidth} height={searchButtonHeight}/>
                        {IsModalOpen && <DoctorSearchPopup show={IsModalOpen} onHide={()=>setIsModelOpen(false)} isMobile={isMobile}/>}
                    </div>
                </div>
            ):(
                <div className='doctor-multiInput-container'>
                    <form className='doctor-input-form'>
                        <span className='location-input-container' >
                            <input placeholder='ZIP or City, State' 
                                name='location' 
                                onChange={(event) => setLocation(event.target.value)}
                                onFocus={() => openLocationModal()}
                                onKeyUp={(event) => filterFunction(event.target.value)}
                                value={doctorQuery.location}
                                className='doctor-input-for-multiInput doctor-location-input' />  {/*Location input */}
                            <div className={`location-dropdown-container ${isLocationModalOpen ? 'dropdown-open' : 'dropdown-closed'}`} onBlur={() => closeLocationModal()} >
                                <span className='doctor-modal-x-button-container' onClick={() => closeLocationModal()}>x</span> 
                                {defaultLocations.filter((location) => { return location.toUpperCase().includes(doctorQuery.location.toUpperCase())}).map((item, index) => {
                                    return <div className='location-dropdown-selection' key={index} onClick={() => handleDropdownLocationClick(item)} >{item}</div>
                                })}
                            </div>
                        </span>
                        <input placeholder='Specialization' 
                            name='specialization' 
                            onChange={(event) => setField(event.target.value)} 
                            className='doctor-input-for-multiInput doctor-field-input' />  {/*Specialization input */}
                        <input placeholder='Doctor' 
                            name='doctor' 
                            onChange={(event) => setDoctorName(event.target.value)} 
                            className='doctor-input-for-multiInput doctor-name-input' />  {/*Doctor's Name input */}
                        <button type='button' onClick={handleSubmit} className='doctor-search-button-multiInput'><img src={SearchIcon} alt='search'/>Search</button>
                        {/* <HomeButton title='Search' onClick={handleSubmit} isIcon={SearchIcon} className='doctor-search-button-multiInput' /> */}
                    </form>
                </div>
        )}
        </div>
    )
}

// const DoctorInput = ({onChange, placeHolder}) => {
//     return (
//         <input placeholder={placeHolder} onChange={onChange} className='doctor-input-for-multiInput' />
//     )
// }

export default DoctorSearchMultiInput;