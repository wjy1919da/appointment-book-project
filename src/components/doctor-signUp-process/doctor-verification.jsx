import './doctor-verification.styles.scss';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import CloseButton from '../../assets/doctor/doctor-verification-close-Icon.png'
import UploadIcon from '../../assets/doctor/Upload.png'
import { Button, Dropdown, Form } from 'react-bootstrap';
import doctorInfoQueryStore from '../../doctorStore.ts';
import SignupAndLoginButton from '../components-signup-and-login/signup-and-login-button/signup-and-login-button.component';
const DoctorVerification = () => {
      const togglePopup = doctorInfoQueryStore(state=>state.togglePopup);
      
    return (
        <div className='doctor-verification-main-container'>
            <div className='doctor-verification-title'>
                <span className='doctor-verification-text'>
                    Verification
                </span>
            </div>
            <div className='doctor-verification-doctor-profile'>
                <span className='doctor-verification-text'>Which Profile do you want to Claim</span>
                <label htmlFor="doctorProfile"></label>
                <Dropdown>
                        <Dropdown.Toggle className="doctor-verification-dropDown--button" id="dropdownMenuButton" data-bs-auto-close="outside">
                            Doctor Profile
                        </Dropdown.Toggle>

                        <Dropdown.Menu  className='search-doctor-dropDown-menu'>
                        </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className='doctor-verification-certification'>
                <Dropdown>
                        <Dropdown.Toggle className="doctor-verification-dropDown--button" id="dropdownMenuButton" data-bs-auto-close="outside">
                            Board Certificate
                        </Dropdown.Toggle>

                        <Dropdown.Menu  className='search-doctor-dropDown-menu'>
                        </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className='doctor-verification-upload-section'>
                <span className='doctor-verification-gray-text'>Step 1 of 1</span>
                <span className='doctor-verification-text'>Please Upload all Required Medical Licenses Or Certification to Verify your Profile.</span>
            </div>
            <div className='doctor-verification-upload-body'>
                    <img src = {UploadIcon}/>
                    <span className='doctor-verification-text' >Drag and Drop files or Browse</span>
            </div>
            <div className='doctor-verification-choose-file-section'>
                <span className='doctor-verification-text'>Uploading 3/3 files</span>
                <div className='uploadFile-box'>
                    <span className='doctor-verification-text' style={{marginLeft:'10px'}}>license.PDF</span>
                    <img src = {CloseButton} style={{width:'15px',height:'15px',marginRight:'10px'}}></img>
                </div>
            </div>
            <div className='doctor-verification-list-file-section'>
                <span className='doctor-verification-text'>Upload</span>
                    <div className='uploadFile-box'>
                        <span className='doctor-verification-text'style={{marginLeft:'10px'}}>license.PDF</span>
                    </div>
                    <div className='uploadFile-box'>
                        <span className='doctor-verification-text' style={{marginLeft:'10px'}}>license.PDF</span>
                    </div>
            </div>
            <div className='doctor-verification-upload-button'>
                <button className="doctor-verification-upload-button" onClick={()=>togglePopup(true, 'finish')}>UPLOAD FILES</button>
            </div>
        </div>  
    )
}

export default DoctorVerification;