import React from "react";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import './procesure-search-menu-mobile.styles.scss';
import SearchIcon from '../../assets/doctor/doctor-search-button-icon.png';
const ProcedureSearchMenuMobile = ({show,onHide}) => {
    
    return(

        <div className='procedure-search-menu-mobile-container'>
            <div className='procedure-search-menu-mobile-category'>
                <div className='procedure-category-title'>
                    <h4>Breast Procedures</h4>
                </div>
                <div className='procedure-category-text' >
                    <div>
                        <h6>Breast Augumentation</h6>
                    </div>
                    <div className='procedure-category-subtext'> 
                        <h6>Breast Lift</h6>
                        <Link style={{marginRight:'10px',textDecorationLine: 'underline' }}>View More...</Link>
                    </div>
                </div>
            </div>

            <div className='procedure-search-menu-mobile-category'>
                <div className='procedure-category-title'>
                        <h4>Body Procedures</h4>
                    </div>
                    <div className='procedure-category-text' >
                        <div>
                            <h6>Non-Surgical Butt Lift</h6>
                        </div>
                        <div className='procedure-category-subtext'> 
                            <h6>Lipoma Removal</h6>
                            <Link style={{marginRight:'10px',textDecorationLine: 'underline' }}>View More...</Link>
                        </div>
                    </div>
            </div>
            <div className='procedure-search-menu-mobile-category'>
                <div className='procedure-category-title'>
                    <h4>Face Procedures</h4>
                </div>
                <div className='procedure-category-text' >
                    <div>
                        <h6>Facelift</h6>
                    </div>
                    <div className='procedure-category-subtext'> 
                        <h6>Necklift</h6>
                        <Link style={{marginRight:'10px',textDecorationLine: 'underline' }}>View More...</Link>
                    </div>
                </div>
            </div>
            <div className='procedure-search-menu-mobile-category'>
                <div className='procedure-category-title'>
                        <h4>Skin Procedures</h4>
                    </div>
                    <div className='procedure-category-text' >
                        <div>
                            <h6>BOTOX Cosmetic</h6>
                        </div>
                        <div className='procedure-category-subtext'> 
                            <h6>Dermal Fillers</h6>
                            <Link style={{marginRight:'10px',textDecorationLine: 'underline'  }}>View More...</Link>
                        </div>
                    </div>
            </div>
            <div >
            <button className='doctor-search-button'
                style={{width:'90%',height:'45px',radius:'8px',marginTop:'5%',marginLeft:'7%'}}
                >
            <img src={SearchIcon} className='doctor-search-icon' alt='search'/>
            Search
                </button>
            </div>
        </div>
        
    )
    
    
   
}
export default ProcedureSearchMenuMobile;