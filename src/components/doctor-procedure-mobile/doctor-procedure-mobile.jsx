import React,{useState} from "react";
import './doctor-procesure-mobile-styles.scss';
import '../doctor-search-multiInput/doctor-search-multiput-dropDown.styles.scss'
import SearchIcon from '../../assets/doctor/doctor-search-button-icon.png';
import ProcesureInstrumentMobile from "../procedure-mobile-instrument/procedure-mobile-instrument";
import ProcedureSearchMenuMobile from "../procedure-search-menu-mobile/procedure-search-menu-mobile";
import {  Dropdown, Form } from 'react-bootstrap';
import Footer from "../footer/footer.component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useProcedureQueryStore from "../../procedureStore.ts"
import HomeButton from "../home-button/home-button.component";
const formatTitle = (title) => {
    title = title.replace(/_/g, ' ');
    return title.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); 
}
const DoctorProcudreMobile =()=>
{
    const [IsModalOpen,setIsModelOpen] = useState(false);
    
    const setCategories = useProcedureQueryStore(state=>state.setCategories);
    const procedureQuery = useProcedureQueryStore(state=>state.procedureQuery);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // 每当路由发生变化时，这个回调函数会被调用
        setCategories(''); // 重置categories为''
    }, [location.pathname, setCategories]); 

    const handleOnClick = () => {
        setIsModelOpen(true);
    }
    const handleSearchClick = () => {
        if (!procedureQuery.categories) {
            alert('Error: 输入不能为空!');
        } else {
            navigate(`/procedure/${procedureQuery.categories}`);
        }
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
                        <Form.Control type="email" 
                            placeholder="Facial, Botox Injection, Breast, Body, Legs" 
                            className="procedure-search-mobile custom-input" 
                            value={formatTitle(procedureQuery.categories) || ''}
                            //onChange={(event) => setCategories(event.target.value)}
                            onClick = {handleOnClick} />
                    </Form.Group>
                </Form>
            </Dropdown.Toggle>
            <Dropdown.Menu className='procedure-mobile-dropdown-menu' >
                <ProcedureSearchMenuMobile />
            </Dropdown.Menu>
            </Dropdown>

            <div className='procedure-search-container'>
            {/* <button 
                className='doctor-search-button'
                style={{width:'90%',height:'45px',radius:'8px'}}
                onClick={handleSearchClick}
            >
                <img src={SearchIcon} className='doctor-search-icon' alt='search'/>
                Search
            </button> */}
            <HomeButton title='Search' onClick={handleSearchClick} isIcon = {SearchIcon} width='100%'/>
            </div>
            <div>
                <ProcesureInstrumentMobile names={['botox_injections', 'breast_augmentation','chemical_peels','lip_augmentation','teeth_whitening','fox_eyes','laser_hair_removal','Chin-Implants','Facelift','Neck_Contouring','Tummy_Tuck','Otoplasty']} option="procedure"/>
            </div>
            <Footer/>
        </div>
        
    );

}
export default DoctorProcudreMobile;