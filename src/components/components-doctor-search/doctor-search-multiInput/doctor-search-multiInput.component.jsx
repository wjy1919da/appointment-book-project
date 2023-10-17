import React, { useRef, useState,useReducer,useEffect} from 'react'
import { InputGroup, Input } from "@chakra-ui/react";
import useDoctorQueryStore from '../../../store.ts';
import DoctorSearchDropDown from './doctor-search-dropdown.component.jsx'
import DoctorSearchPopup from '../doctor-search-popup/doctor-search-popup.component.jsx';
import searchReducer from '../../../reducer/searchReducer.ts';
import VerticalDivider from './doctor-search-divider.component'
import SearchIcon from '../../../assets/doctor/doctor-search-button-icon.png';
import FormInput from '../../form-input/form-input.component.jsx';
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
    const topLocations = ['Los Angeles, CA', 'Chicago, IL', 'Houston, TX'];
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
    }
    const handleBlur = () => {
        if (dropdownIsOpen) {
            setTimeout(() => {
                dispatchDropdown({type: 'CLOSE_DROPDOWN'});
            }, 100);
        }
    }
    const handleSubmit = () => {
        console.log('Location: ', doctorQuery.location);
        console.log('Specialization: ', doctorQuery.field);
        console.log('DoctorName: ', doctorQuery.doctorName);
        const obj = {'location': doctorQuery.location,
                      'field':   doctorQuery.field,
                      'name': doctorQuery.doctorName
                    }
        console.log('Now calling callback...');
        searchCallback(obj);
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
                            {topLocations.map((item, index) => (
                                    <Button 
                                        key={index}
                                        className="search-location-button mb-3"  
                                        variant="outline-primary"
                                        onClick={() => handleDropdownLocationClick(item)}
                                    >
                                        {item}
                                    </Button>
                                ))}
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
                        <input placeholder='ZIP or City, State' 
                            name='location' 
                            onChange={(event) => setLocation(event.target.value)} 
                            className='doctor-input-for-multiInput' />  {/*Location input */}
                        <input placeholder='Specialization' 
                            name='specialization' 
                            onChange={(event) => setField(event.target.value)} 
                            className='doctor-input-for-multiInput' />  {/*Specialization input */}
                        <input placeholder='Doctor' 
                            name='doctor' 
                            onChange={(event) => setDoctorName(event.target.value)} 
                            className='doctor-input-for-multiInput' />  {/*Doctor's Name input */}
                        <button type='button' onClick={handleSubmit} className='doctor-search-button-multiInput'><img src={SearchIcon} alt='search'/>Search</button>
                        {/* <HomeButton title='Search' onClick={handleSubmit} isIcon={SearchIcon} className='doctor-search-button-multiInput' /> */}
                    </form>
                    
                    {/* <InputGroup display="flex" alignItems="center"> */}
                    {/* <InputGroup >
                        <Input 
                            ref = {locationRef}
                            onClick = {()=> {dispatchDropdown({type: 'TOGGLE_DROPDOWN'}); }}
                            onBlur = {handleBlur}
                            value = {doctorQuery.location || ''}
                            onChange = {(event) => setLocation(event.target.value)}
                            focusBorderColor="orange.200"
                            label = "ZIP Code"  />
                            {dropdownIsOpen && <DoctorSearchDropDown/>}
                        <VerticalDivider/>
                        <Input 
                            ref = {specializationRef}
                            value={doctorQuery.field || ''}
                            onChange = {(event) => setField(event.target.value)}
                            label = "Specialization"  />
                        <VerticalDivider/>
                        <Input 
                            ref = {doctorNameRef}
                            value={doctorQuery.doctorName || ''}
                            onChange = {(event) => setDoctorName(event.target.value)}
                            label = "Doctor Name"  />
                        <button className='doctor-search-button' onClick = {handleOnClick}>
                            <img src={SearchIcon} className='doctor-search-icon' alt='search'/>
                            search
                        </button>
                            <HomeButton title='Search' onClick={handleOnClick} isIcon={SearchIcon} width='150px'height='40px'/>
                    </InputGroup>
                    {IsModalOpen && <DoctorSearchPopup show={IsModalOpen} onHide={()=>setIsModelOpen(false)} isMobile={isMobile}/>} */}
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