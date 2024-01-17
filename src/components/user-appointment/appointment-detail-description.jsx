import './appointment-detail.styles.scss'
import './appointment-detail-description.styles.scss'
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import AppInfoQueryStore from '../../appointmentStore.ts'
import doctorAvatar from '../../assets/user/doctor-profile-image.png'
import locationIcon from '../../assets/user/locationIcon.png'
import badgeIcon from '../../assets/user/badgeIcon.png'
import glassesIcon from '../../assets/user/glassesIcon.png'
import ChakraModal from '../chakra-modal/chakra-modal';
import { UniversalInfoFormInput } from '../universal-profile-edit/universal-profile-edit';
import * as editFuncs from "../universal-profile-edit/universal-edit-verification-functions";
import useUploadImg from "../../hooks/useUploadImg";
import trashcan from "../../assets/doctor/trashcan.svg";

const consultationItems = ['Eyes', 'Body', 'Injections', 'Nose', 'Lips', 'Breasts'];

const AppDetailDescription = ({appointmentObj}) => {
    const togglePopup = AppInfoQueryStore(state=>state.togglePopup);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gender, setGender] = useState(2);
    const [birthday, setBirthday] = useState('');
    const [birthdayError, setBirthdayError] = useState(false);
    const [consultation, setConsultation] = useState([]);
    const [description, setDescription] = useState('');
    const [imageLinks, setImageLinks] = useState([]);
    const cancelAppointment = () => {
        console.log('User is trying to cancel the appointment!');
        setIsModalOpen(false);
    }
    const handleConsultationClick = (itemName) => {
        if (consultation.includes(itemName)) {
            const holder = consultation.filter((item) => item !== itemName);
            setConsultation(holder);
            return;
        }
        if (consultation.length === 2) return;
        setConsultation([...consultation, itemName]);
    }
    const handleSaveChanges = (e) => {
        e.preventDefault();
        console.log('attempting to save changes!');
        togglePopup(true, 'finish');
    }
    const handleCancelAppointment = (e) => {
        e.preventDefault();
        console.log('attempting to cancel the appointment');
        togglePopup(true, 'cancelAppointment');
    }
    const {
        selectedFiles,
        setSelectedFiles,
        handleFileSelection,
        uploadProgress,
        isLoading: isUploadLoading,
        isError: isUploadError,
        uploadedFiles,
        resetFiles,
        removeUploadedFile,
      } = useUploadImg();
    const fileInputRef = useRef(null);
    const handleBrowseFiles = () => {
    fileInputRef.current.click();
    };
    const handleDragOver = (e) => {
    e.preventDefault();
    };

    const handleDrop = (e) => {
    e.preventDefault();
    handleFileSelection({ target: { files: e.dataTransfer.files } });
    };

    useEffect(() => {
        setImageLinks(uploadedFiles);
      }, [uploadedFiles]);

    return (
        <>
        {/* <ChakraModal title={'Are you sure you want to cancel this appointment?'} cancelButtonText={'Don\'t Cancel'} approveButtonText={'Confirm'} approveCallback={cancelAppointment} isModalOpen={isModalOpen} closeModalFunc={() => setIsModalOpen(false)} /> */}
        <div className='user-appointment-description-main-container'>
            <div className='user-appointment-description-form-container'>
                <form className='user-appointment-description-form' id='appointment-form' name='appointment-form'>
                    <h3 className='user-appointment-description-form-title'>Please fill out the following information regarding your details.</h3>
                    <div className='user-appointment-description-form-top-row'>
                        <div className="user-appointment-edit-info-form-gender-container">
                            <h4 className="user-appointment-edit-info-form-label univ-edit-text">
                            Gender
                            </h4>
                            <div className="univ-edit-info-form-gender-radio-container">
                                <div className="univ-edit-info-form-gender-radio">
                                    <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    className="univ-edit-info-form-gender-radio-button"
                                    value={2}
                                    onClick={() => setGender(2)}
                                    defaultChecked={gender === 2 ? "checked" : ""}
                                    />
                                    <label className="univ-edit-info-form-gender-radio-label">
                                    Female
                                    </label>
                                </div>
                                <div className="univ-edit-info-form-gender-radio">
                                    <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    className="univ-edit-info-form-gender-radio-button"
                                    value={1}
                                    onClick={() => setGender(1)}
                                    defaultChecked={gender === 1 ? "checked" : ""}
                                    />
                                    <label className="univ-edit-info-form-gender-radio-label">
                                    Male
                                    </label>
                                </div>
                                <div className="univ-edit-info-form-gender-radio">
                                    <input
                                    type="radio"
                                    id="other"
                                    name="gender"
                                    className="univ-edit-info-form-gender-radio-button"
                                    value={3}
                                    onClick={() => setGender(3)}
                                    defaultChecked={gender === 3 ? "checked" : ""}
                                    />
                                    <label className="univ-edit-info-form-gender-radio-label">
                                    Other
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='user-appointment-description-form-birthday-container'>
                            <label className='user-appointment-description-form-birthday-label'>
                                <h4 className='user-appointment-description-form-birthday-title'>Birthday</h4>
                                <input value={birthday}
                                       onChange={(e) => setBirthday(e.target.value)}
                                       placeholder='mm/dd/yyyy'
                                       onBlur={() =>
                                        editFuncs.onBlurCheck(
                                            birthday,
                                            setBirthdayError,
                                            editFuncs.isValidDate
                                        )
                                        }
                                       className={`user-appointment-description-form-birthday-input ${birthdayError && 'user-appointment-description-form-error'}`} />
                                {birthdayError && <p className='user-appointment-description-form-birthday-error-message'>Invalid date.</p>}
                            </label>
                        {/* <label className="univ-edit-info-form-label">
                            <h4 className="univ-edit-info-form-label-text univ-edit-text">
                            {label}
                            </h4>
                            {disabled && (
                            <div
                                className="univ-edit-info-form-change-email-text"
                                onClick={disabledOnClick}
                            >
                                Change Email
                            </div>
                            )}
                            <input
                            value={stateVariable}
                            onChange={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            className={`univ-edit-info-form-input ${
                                possibleError ? "univ-edit-info-form-input-error" : ""
                            } ${disabled ? "univ-edit-info-form-disabled" : ""}`}
                            type={password ? "password" : ""}
                            disabled={disabled}
                            />
                            {possibleError ? (
                            <div className="univ-edit-info-form-input-error-message">
                                {errorMessage}
                            </div>
                            ) : (
                            ""
                            )}
                        </label> */}
                        {/* <UniversalInfoFormInput
                            stateVariable={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            onBlur={() =>
                            editFuncs.onBlurCheck(
                                birthday,
                                setBirthdayError,
                                editFuncs.isValidDate
                            )
                            }
                            placeholder={"mm/dd/yyyy"}
                            label={"Birthday"}
                            possibleError={birthdayError}
                            errorMessage={"Invalid date, please enter a valid date."}
                        /> */}
                        </div>
                    </div>
                    <div className='user-appointment-description-form-interests-row'>
                        <h4 className='user-appointment-description-form-birthday-title' >I want to consult about (Choose up to 2):</h4>
                        <div className='user-appointment-description-form-interests-container'>
                            {consultationItems.map((item, index) => 
                                 <button key={index} className={`user-appointment-interests-button ${consultation.includes(item) && 'user-appointment-interests-selected'} `} onClick={(e) => {e.preventDefault(); handleConsultationClick(item);}} >{item}</button>
                            )}
                            {/* <button disabled className='user-appointment-interests-button' >Eyes</button>
                            <button disabled className='user-appointment-interests-button' >Body</button>
                            <button disabled className='user-appointment-interests-button' >Injections</button>
                            <button disabled className='user-appointment-interests-button' >Nose</button>
                            <button disabled className='user-appointment-interests-button user-appointment-interests-selected' >Lips</button>
                            <button disabled className='user-appointment-interests-button' >Breasts</button> */}
                            <button disabled className='user-appointment-interests-button' >Not what you want? Add here...</button>
                        </div>
                    </div>
                    <div className='user-appointment-description-form-description-row'>
                        <label className='user-appointment-description-form-description-label'>
                            <h4 className='user-appointment-description-form-birthday-title'>Description (Optional):</h4>
                            <textarea className='user-appointment-description-form-description' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
                        </label>
                    </div>
                    <div className='user-appointment-description-form-photos-row'>
                        <h4 className='user-appointment-description-form-birthday-title'>Photos (Optional):</h4>
                        <div className='user-appointment-description-form-photos-container'>
                            <input
                                ref={fileInputRef}
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleFileSelection}
                            />
                            <div className='user-appointment-description-form-add-photo' onDrop={handleDrop}
                                onDragOver={handleDragOver} onClick={handleBrowseFiles} >+</div>
                            {imageLinks.map((item, index) => { return (
                                <div className='app-description-photo-container' key={index}>
                                    <div className='user-appointment-photo-cover-container'>
                                        <img
                                            src={trashcan}
                                            alt="remove picture"
                                            className="user-appointment-pic-trash"
                                            onClick={() => removeUploadedFile(index)}
                                            />
                                    </div>
                                    {/* <div className='user-appointment-remove-photo-button' onClick={() => removeUploadedFile(index)}>x</div> */}
                                    <img className='app-description-photo' src={imageLinks[index]} alt='app description' />
                                </div>
                            )})}
                        </div>
                    </div>
                    <div className='user-appointment-description-form-bottom-row'>
                        <button className='app-ending-reschedule-button' onClick={() => togglePopup(true, 'EditAppointment')} >Reschedule</button>
                        <button className='app-ending-cancel-button' onClick={(e) => handleCancelAppointment(e)} >Cancel Appointment</button>
                        <button className='app-doctor-ending-join-consultation-button' onClick={(e) => handleSaveChanges(e)}>Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    );   
};

export default AppDetailDescription;