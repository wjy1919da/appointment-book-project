import React, { useRef, useState,useReducer,useEffect} from 'react';
import axios from 'axios';
// import { InputGroup, Input } from "@chakra-ui/react";
import useDoctorQueryStore from '../../../store.ts';
import DoctorSearchDropDown from './doctor-search-dropdown.component.jsx';
import DoctorSearchPopup from '../doctor-search-popup/doctor-search-popup.component.jsx';
import searchReducer from '../../../reducer/searchReducer.ts';
// import VerticalDivider from './doctor-search-divider.component'
import SearchIcon from '../../../assets/doctor/doctor-search-button-icon.png';
// import FormInput from '../../form-input/form-input.component.jsx';
// import CloseButton from '../../../assets/post/pop-up-close-button.png';
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
    const [isFieldModalOpen, setIsFieldModalOpen] = useState(false);
    const [dropdownLocations, setDropdownLocations] = useState([]);
    const [dropdownProcedures, setDropdownProcedures] = useState([]);
    const isMobile = useMediaQuery({ query: `(max-width: 1024px)` }); 
    const isPhone = useMediaQuery({ query: `(max-width: 767px)` });
    const isIpad = useMediaQuery({query: `(min-width: 768px) and (max-width:1024px)` });
    const searchButtonWidth = isIpad ? '257px' : (isPhone ? '150px' : 'defaultWidth');
    const searchButtonHeight = isIpad ? '52px' : (isPhone ? '40px' : 'defaultWidth');
    useEffect(() => {
        const body = {
            pageReq: 0
        };
        const getProcedures = async () => {
            try {
                const res1 = await axios.post('https://api-dev.charm-life.com/doctor/search/procedure', body);
                console.log('Res1: ', res1);
                if (!res1?.data?.code === 100) throw new Error();
                const procedures = res1?.data?.data;
                const locationsDict = {};
                const proceduresArray = [];
                for (let i = 0; i < procedures.length; i++) {
                    const procedure = procedures[i];
                    const location = procedure.groupName.split(' ')[0].toLowerCase();
                    if (!locationsDict[location]) {  // if we haven't seen the current location
                        locationsDict[location] = 1;  // mark that we've seen the location
                        proceduresArray.push({ 'location': location, 'procedures': [procedure.categoryName]}); // create a new location object, and start the array with the current procedure
                    } else {  // else if we've seen this location before
                        for (let j = 0; j < proceduresArray.length; j++) { // cycle through the array
                            if (proceduresArray[j].location === location) {  // when we found the correct location object
                                proceduresArray[j].procedures.push(procedure.categoryName);  // add the current procedure to the list
                            }
                        }
                    }
                }
                setDropdownProcedures(proceduresArray);
            } catch (err) {
                console.log('Unable to retrieve procedure data for multiInput dropdown');
            }   
            
        }
        const getLocations = async () => {
            const res2 = await axios.post('https://api-dev.charm-life.com/doctor/search/address', body);
            const newLocations = res2?.data?.data?.map((locationObj) => `${locationObj?.city}, ${locationObj?.state}`);
            setDropdownLocations(newLocations);
        }
        getProcedures();
        getLocations();
    }, []);
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
    const proceduresNameAndImg = [{"location": "Face", "procedures" : [{"procedureName": "Botox", "photoURL": "botox_injections.svg"}, {"procedureName": "Chemical Peel", "photoURL": "chemical_peels.svg"}, {"procedureName": "Chin Implants", "photoURL": "Chin-Implants.svg"}, {"procedureName": "Face Life", "photoURL": "Facelift.svg"}, {"procedureName": "Fox Eyes", "photoURL": "fox_eyes.svg"}, {"procedureName": "Lip Augmentation", "photoURL": "lip_augmentation.svg"}, {"procedureName": "Otoplasty", "photoURL": "Otoplasty.svg"}, {"procedureName": "Teeth Whitening", "photoURL": "teeth_whitening.svg"}]}, 
                               {"location": "Body", "procedures" : [{"procedureName": "Breast Augmentation", "photoURL": "breast_augmentation.svg"}, {"procedureName": "Laser Hair Removal", "photoURL": "laser_hair_removal.svg"}, {"procedureName": "Neck Contouring", "photoURL": "Neck_Contouring.svg"}, {"procedureName": "Tummy Tuck", "photoURL": "Tummy_Tuck.svg"}]}
                              ]
    const handleSubmit = () => {
        const obj = { 
                      'address': doctorQuery.location,
                      'name':   doctorQuery.field,
                      'nickname': doctorQuery.doctorName
                    }
        console.log('Now calling multiInput callback...');
        searchCallback(obj);
    }
    const toggleLocationModal = () => {
        setIsLocationModalOpen(!isLocationModalOpen);
    }
    const closeLocationModal = () => {
        setTimeout(() => {
            setIsLocationModalOpen(false);
        }, 100); // need the timeout here or else the modal would close before we could grab the data from clicking the modal
    }
    const toggleFieldModal = () => {
        setIsFieldModalOpen(!isFieldModalOpen);
    }
    const closeFieldModal = () => {
        setTimeout(() => {
            setIsFieldModalOpen(false);
        }, 100); // need the timeout here or else the modal would close before we could grab the data from clicking the modal
    }
    const proceduresGetInfo = (item) => {
        const splitItem = item.split('_');
        const upperCased = splitItem.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
        const procedureTitle = upperCased.join(' ');
        setField(procedureTitle);
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
                <div className='doctor-multiInput-container'> {/* I did not touch the mobile version above. Once the UI team completes the wireframe for it I can come back to this page */}
                    <form className='doctor-input-form'>
                        <span className='location-input-container' >  {/* Has position set to relative to allow the absolute position of the dropdown */}
                            <input placeholder='City, State' 
                                name='location' 
                                onChange={(event) => setLocation(event.target.value)}
                                onClick={() => toggleLocationModal()}  // clicking the input will open and close the modal
                                onBlur={() => closeLocationModal()}  // moving focus away from the input will close the modal
                                value={doctorQuery?.location}
                                className='doctor-input-for-multiInput doctor-location-input' />  {/*Location input */}
                            <div className={`location-dropdown dropdown-container ${isLocationModalOpen ? 'dropdown-open' : 'dropdown-closed'}`} >
                                {dropdownLocations.filter((location) => { return location.toUpperCase().includes(doctorQuery.location.toUpperCase())}).map((item, index) => {
                                    return <div className='location-dropdown-selection' key={index} onClick={() => handleDropdownLocationClick(item)} >{item}</div>
                                })}
                            </div>
                        </span>
                        <span className='field-input-container'>
                            <input placeholder='Specialization' 
                                name='specialization' 
                                onChange={(event) => setField(event.target.value)}
                                onClick={() => toggleFieldModal()} 
                                onBlur={() => closeFieldModal()}
                                value={doctorQuery?.field}
                                className='doctor-input-for-multiInput doctor-field-input' />  {/*Specialization input */}
                            <div className={`dropdown-container field-dropdown ${isFieldModalOpen ? 'dropdown-open' : 'dropdown-closed'}`} >
                                {dropdownProcedures.map((procedureObj, index) => {
                                    return <span className='procedure-dropdown-row-container'>
                                        <ProcedureRow key={index+100} procedureObj={procedureObj} onClick={proceduresGetInfo}/>
                                    </span>
                                })}
                            </div>
                        </span>
                        <input placeholder='Doctor' 
                            name='doctor' 
                            onChange={(event) => setDoctorName(event.target.value)} 
                            className='doctor-input-for-multiInput doctor-name-input' />  {/*Doctor's Name input */}
                        
                        <button type='button' onClick={handleSubmit} className='doctor-search-button-multiInput'><img src={SearchIcon} alt='search'/>Search</button>
                    </form>
                </div>
        )}
        </div>
    )
}

const ProcedureRow = ({procedureObj, onClick}) => {
    const location = procedureObj.location.charAt(0).toUpperCase() + procedureObj.location.slice(1);
    return (
        <div className='procedure-dropdown-row'>
            <p className='procedure-dropdown-title'>{location}</p>
            <div className='procedure-dropdown-procedures-container'>
                {procedureObj.procedures.map((item, index) => {
                    const splitItem = item.split('_');
                    const upperCased = splitItem.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
                    const procedureTitle = upperCased.join(' ');
                    return (<div className='procedure-wrapper' onClick={() => onClick(item)} key={index+200}>
                                <div className='procedure-photo-container'>
                                    {item ? <img src={require(`../../../assets/procedure/${item}.svg`)} alt='procedure' className='procedure-photo' /> : <div className='blank-procedure-photo'></div>}
                                </div>
                                <p className='procedure-subtitle'>{procedureTitle}</p>
                            </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DoctorSearchMultiInput;