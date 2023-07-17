import React,{useState} from "react";
import './doctor-procesure-mobile-styles.scss';
import '../doctor-search-multiInput/doctor-search-multiput-dropDown.styles.scss'
import SearchIcon from '../../assets/doctor/doctor-search-button-icon.png';
import ProcesureInstrumentMobile from "../procedure-mobile-instrument/procedure-mobile-instrument";
import ProcedureSearchMenuMobile from "../procedure-search-menu-mobile/procedure-search-menu-mobile";
import {  Dropdown, Form } from 'react-bootstrap';
import Footer from "../footer/footer.component";
const DoctorProcudreMobile =()=>
{
    const [IsModalOpen,setIsModelOpen] = useState(false);
    const handleOnClick = () => {
        setIsModelOpen(true);
    }
    
    return (
        <div className="procedure-mobile-container">
            <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" className="custom-toggle"
            style=
            {{ backgroundColor: 'transparent',
                borderColor: 'transparent',
                width:'100%',
                height:'130px',
                padding:'0px 10px'}}>
                <Form className='p-4' >
                    <Form.Group className='mb-3'controlId="exampleDropdownFormEmail2" >
                        <Form.Control type="email" placeholder="Facial, Botox Injection, Breast, Body, Legs" className="procedure-search-mobile" onClick = {handleOnClick} />
                    </Form.Group>
                </Form>
            </Dropdown.Toggle>
            <Dropdown.Menu className='procedure-mobile-dropdown-menu' >
                <ProcedureSearchMenuMobile />
            </Dropdown.Menu>
            </Dropdown>

            <div className='procedure-search-container'>
                <button className='doctor-search-button' 
                                    
                                    style={{width:'327px',height:'45px',radius:'8px'}}
                                    >
                                <img src={SearchIcon} className='doctor-search-icon' alt='search'/>
                                Search
                </button>
            </div>
            <div>
                <ProcesureInstrumentMobile names={['botox-injections', 'breast-augmentation','chemical-peels','lip-augmentation','teeth-whitening','fox-eyes','laser-hair-removal','Chin-Implants','Facelift','Neck-Contouring','Tummy-Tuck','Otoplasty']} option="procedure"/>
            </div>
            <Footer/>
        </div>
        
    );

}
export default DoctorProcudreMobile;