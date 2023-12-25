import './universal-profile-edit.scss';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { useToast } from "@chakra-ui/react";
import { useUserEmailLogin, useDoctorLogin, useClickVerification } from '../../hooks/useAuth';
import useUploadImg from '../../hooks/useUploadImg';
import defaultPhoto from '../../assets/post/user-profile-avatar.png';
import backArrow from '../../assets/doctor/left_back.png';
import axios from 'axios';
import * as editFuncs from './universal-edit-verification-functions';
import trashcan from '../../assets/doctor/trashcan.svg';
import APIClient from '../../services/api-client';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Text,
  } from "@chakra-ui/react";
import ChakraModal from '../chakra-modal/chakra-modal';
import ChakraLoadingModal from '../chakra-modal/chakra-loading-modal';
import userInfoQueryStore from '../../userStore';
import { da } from 'date-fns/locale';


const UniversalProfileEdit = () => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState(0);
    const [birthday, setBirthday] = useState("");
    const [birthdayError, setBirthdayError] = useState(false);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [bio, setBio] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [interests, setInterests] = useState([]);  // the array of interests returned from the backend that we display as options
    const [interestSelections, setInterestSelections] = useState([]);  // the array that we put what the user selects their interests as in
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorSubmitting, setErrorSubmitting] = useState(false);
    const [accountType, setAccountType] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [changesSaved, setChangesSaved] = useState(false);
    // const originalObj = {'name': '', 'gender': 0, 'birthday': '', 'email': '', 'phoneNumber': '', 'bio': '', 'interests': ''};
    const [originalInformation, setOriginalInformation] = useState({'name': '', 'gender': 0, 'birthday': '', 'email': '', 'phoneNumber': '', 'bio': '', 'interests': [], 'image': ''});
    const navigate = useNavigate();
    const userEmailLogin = useUserEmailLogin();
    const doctorLogin = useDoctorLogin();
    const authHook = accountType === '1' ? userEmailLogin : doctorLogin;
    // const modalDisclosure = useDisclosure();
    // const userInfo = userInfoQueryStore((state) => state.userInfo);
    const proceduresIdObj = editFuncs.proceduresId;
    // const {mutate,data, isLoading: isVerificationLoading,isError,error: verificationError} = useClickVerification();
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
        if (uploadedFiles.length > 0) {
            setImageLink(uploadedFiles[uploadedFiles.length - 1]);
        }
    }, [uploadedFiles])
    
    const retrieveAccountType = () => {
        const accountNumber = localStorage.getItem("accountType");
        if (accountNumber === null) throw new Error('No account type found...');
        console.log('userID is: ', userInfo.userId);
        return Number(accountNumber);
    }
    const establishOriginalInfo = async (userObjResponse) => {
        let { nickname, bio, email, avatar, birthday, gender, phoneNumber, interestedProcedure } = userObjResponse?.data?.data;
        let holder = JSON.parse(JSON.stringify(originalInformation));
        // establishOriginalInfo(interestedProcedure, setInterestSelections, holder, 'interests');
        if (nickname) {
            setName(nickname);
            holder = {...holder, 'name': nickname};
        }
        if (bio) {
            setBio(bio);
            holder = {...holder, 'bio': bio};
        }
        if (email) {
            setEmail(email);
            holder = {...holder, 'email': email};
        }
        if (avatar) {
            setImageLink(avatar);
            holder = {...holder, 'image': avatar};
        }
        if (birthday) {
            setBirthday(birthday);
            holder = {...holder, 'birthday': birthday};
        }
        if (gender) {
            let genderNumber = 0;
            if (gender === 'Male') {
                genderNumber = 1;
            } else if (gender === 'Female') {
                genderNumber = 2;
            } else if (gender === 'Other') {
                genderNumber = 3;
            }
            setGender(genderNumber);
            holder = {...holder, 'gender': genderNumber};
        }
        if (phoneNumber) {
            setPhoneNumber(phoneNumber);
            holder = {...holder, 'phoneNumber': phoneNumber};
        }
        if (interestedProcedure) {
            setInterestSelections(interestedProcedure);
            holder = {...holder, 'interests': interestedProcedure};
        }
        console.log('OriginalInfo is: ', holder);
        setOriginalInformation(holder);
    }

    useEffect(() => {
        setIsLoading(true);
        try {
            setAccountType(retrieveAccountType());
            const grabUserInfoAndProcedures = async () => {
                console.log('attempting to grab user info!');
                try {
                    const response = await editFuncs.getUserData();
                    console.log('getUSER response returned as: ', response);
                    await establishOriginalInfo(response);
                    const procedures = await editFuncs.getProcedures();
                    await alterInterests(procedures);
                    setIsLoading(false);
                } catch (err) {
                    throw new Error(err);
                } 
            } 
            grabUserInfoAndProcedures();
            // retrieveProcedures(); 
        } catch (err) {
            console.log('Error retrieving user info for edit page: ', err);
            setError(err);
        } finally {
            setTimeout(() => {
                // add a small delay, otherwise the page loads before the data has been rendered;
                setIsLoading(false);
            }, 3500);
        }
    }, [])

    // useEffect(() => {
    //     try {
            
            
    //     } catch (err) {
    //         console.log('Error retrieving procedures info for edit page: ', err);
    //         setError(err);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }, [])

    // useEffect(() => {
    //     if (oldPasswordError) {
    //         let pwForm = document.getElementById('password-form');
    //         if (pwForm) {
    //             pwForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //         }
    //     }
    // }, [oldPasswordError])

    const alterInterests = async (procedures) => {  // needed for if in the future, we hold the procedure imgs somewhere else (not in assets folder)
        const alteredProcedures = [];
        // console.log('procedures are: ', procedures);
        for (let i = 0; i < procedures.length; i++) {
            const location = procedures[i]?.location;
            const locationProcedureArray = procedures[i]?.procedures;
            const holder = [];
            locationProcedureArray.forEach((item) => {
                let imgUrl = '';
                let procedureTitle = '';
                if (item?.imageUrl) {
                    imgUrl = item?.imageUrl;
                }
                if (item?.procedureTitle) {
                    procedureTitle = item?.procedureTitle;
                } else {
                    procedureTitle = item;
                }
                const obj = {imageUrl: imgUrl, procedureTitle: procedureTitle};
                holder.push(obj);
            });
            const newObj = {location: location, procedures: holder};
            alteredProcedures.push(newObj);
        }
        setInterests(alteredProcedures);
        return;
    }

    const goBack = () => {
        navigate(-1);
    }

    const addToInterests = (item) => {
        // console.log('adding to interests array: ', item);
        setInterestSelections((array) => [...array, item]);
    }

    const removeFromInterests = (item) => {
        // console.log('removing from interests array: ', item);
        const filteredArray = interestSelections.filter((procedure) => procedure.procedureTitle !== item.procedureTitle);
        setInterestSelections(filteredArray);
    }

    const handleInterestsClick = (item) => {
        // console.log('originalInfo is: ', originalInformation);
        const procedureHolderArray = [];
        // console.log('INTERESTS ARRAY IS: ', interestsArray);
        interestSelections.forEach((element) => procedureHolderArray.push(element.procedureTitle));
        if (!procedureHolderArray.includes(item.procedureTitle)) addToInterests(item);
        else removeFromInterests(item);
    }

    const checkForErrors = () => {
        // console.log(`${birthdayError} + ${emailError} + ${newPasswordError} + ${oldPasswordError}`);
        return birthdayError || emailError || phoneNumberError;
    }

    const handleButtonClick = (event) => {
        event.preventDefault();
        setChangesSaved(false);
        setErrorSubmitting(false);
        if (checkForErrors()) return;
        // if (checkForPasswordInputError()) return;
        setIsModalOpen(true);
    }

    // const onBlurCheck = (stateVariable, setStateVariableError, checkerFunc) => {
    //     if (stateVariable === null || stateVariable === "") {
    //         setStateVariableError(false);
    //         return;
    //     }
    //     setStateVariableError(!checkerFunc(stateVariable));
    // }

    const handleFormSubmission = async () => {
        setIsModalOpen(false);
        setIsLoadingModalOpen(true);
        /*
        Steps for verification:
        1. (conditional) If the user is trying to change their password, check that the provided 'current password' is correct. If not, we do not save any data
        2. (conditional) If the user is trying to change their email, call verifyEmail. If the email is not valid, we will not save anything. If it is valid, somehow wait until the user has clicked 'verify' before proceeding. 
        */
        // if (email) {
        //     console.log('testing verification!');
        //     const verifyEmail = async () => {
        //         let userRole = localStorage.getItem('accountType') === "1" ? 'USER' : 'DOCTOR';
        //         const isEmailValid = await editFuncs.verifyEmailForChange(email, userRole);  // checks to see if this new email is already in use or not
        //         if (!isEmailValid) {  // USE DIFFERENT ERROR HANDLING HERE!
        //             console.log('Unable to use this email, please use a different email.');
        //         }
        //     }
        //     await verifyEmail();
        // }

        // if (oldPassword && newPassword) {
        //     console.log('attempting to change password...');
        //     const changePassword = async () => {
        //         try {
        //             const data = {'currentPassword': oldPassword, 'newPassword': newPassword, 'confirmNewPassword': newPassword};
        //             // console.log('attempting to send password data as: ', data);
        //             const res = await editFuncs.setUserData(data);
        //             // console.log('res returned as: ', res);
        //             return true;
        //         } catch (err) {
        //             if (err.message === 'Incorrect password, please try again.') {
        //                 setOldPasswordError('Incorrect password, please try again.');
        //                 return false;
        //             }
        //             // console.log('ERR is: ', err);
        //         }
        //     }
        //     if (!await changePassword()) {
        //         setIsLoadingModalOpen(false);
        //         return;
        //     }
        // }
        const data = {};

        if (name && name !== originalInformation.name) {
            data.nickname = name;
        }
        if (bio && bio !== originalInformation.bio) {
            data.bio = bio;
        }
        if (gender && gender !== originalInformation.gender) {
            data.gender = gender;
        }
        if (birthday && birthday !== originalInformation.birthday) {
            data.birthday = birthday;
        }
        if (phoneNumber && phoneNumber !== originalInformation.phoneNumber) {
            data.mobile = phoneNumber;
        }
        if (interestSelections !== originalInformation.interests) {
            // console.log('HERE YAY!: ', originalInformation.interests);
            // console.log('2nd!!: ', interestSelections);
            const holder = [];
            interestSelections.forEach((item) => holder.push(proceduresIdObj[item.procedureTitle]));
            // console.log('holder is: ', holder);
            data.interested = holder;
        }
        if (imageLink && imageLink !== originalInformation.image) {
            data.img = imageLink;
        }
        console.log('sending data as: ', data);
        let errorSubmitting = false;
        const submitForm = async () => {
            try {
                const res = await editFuncs.setUserData(data);
                console.log('edit profile res returned as: ', res);
                if (res?.data?.code === 500) {
                    throw new Error('Couldn\'t save some or all of the submitted data...');
                } else {
                    setChangesSaved(true);
                }
            } catch (err) {
                console.log('Could not change edit profile page...');
                setErrorSubmitting(true);
            } finally {
                setIsLoadingModalOpen(false);
            }
        }
        submitForm();
        
        // const sendVerificationEmail = async () => {
        //     if (await verifyEmail()) {
        //         console.log('attempting to send verification email...');
        //         mutate({
        //             email: email,
        //             userRole: 1
        //         })
        //     }
        // }
        // if (!errorSubmitting) {
        //     setChangesSaved(true);
        // }
        // setIsLoadingModalOpen(false);
    }

    // const handlePhotoChange = () => {
    //     console.log('attempting to change photo');
    // }

    const handlePhotoReset = () => {
        if (imageLink === originalInformation.image) return;
        console.log('attempting to remove photo!');
        resetFiles();
        console.log('uploadedFiles is: ', uploadedFiles);
        setImageLink("");
    }
    

    if (isLoading) {
        return (
            <div className='chakra-spinner-container'>
              <Spinner thickness='4px'
                       speed='0.65s'
                       emptyColor='gray.200'
                       color='blue.500' size='xl' />
            </div>
             );
    }

    if (error) {
        navigate('../*');
    }

    return (
        <div className='univ-edit-main-container'>
            <ChakraModal title={'Save Changes?'} cancelButtonText={'Don\'t Save'} approveButtonText={'Save'} approveCallback={handleFormSubmission} isModalOpen={isModalOpen} closeModalFunc={() => setIsModalOpen(false)} />
            <ChakraLoadingModal isModalOpen={isLoadingModalOpen} closeModalFunc={() => setIsLoadingModalOpen(false)} />
            <ChakraPasswordModal isModalOpen={isPasswordModalOpen} closeModalFunc={() => setIsPasswordModalOpen(false)} title={'Change Password'} approveButtonText={'Save Changes'} openLoadingModal={() => setIsLoadingModalOpen(true)} closeLoadingModal={() => setIsLoadingModalOpen(false)} />
            <ChakraEmailModal isModalOpen={isEmailModalOpen} closeModalFunc={() => setIsEmailModalOpen(false)} title={'Change Email'} approveButtonText={'Save Changes'} openLoadingModal={() => setIsLoadingModalOpen(true)} closeLoadingModal={() => setIsLoadingModalOpen(false)} />
            <div className='univ-edit-top-row-container' >
                <div className='univ-edit-top-row'>
                    <div className='univ-edit-top-row-left-col univ-edit-top-row-col'>
                        <div className='univ-edit-back-arrow-container'>
                            <img src={backArrow} className='univ-edit-back-arrow' alt='back arrow' onClick={() => goBack()} />
                        </div>
                        <div className='univ-edit-title-container'>
                            <h1 className='univ-edit-title univ-edit-text'>Edit Profile</h1>
                        </div>
                    </div>
                    <div className='univ-edit-top-row-right-col univ-edit-top-row-col'>
                        <div className='univ-edit-form-button-container'>
                            {changesSaved && <p className='univ-edit-form-changes-saved-text'>Changes saved!</p>}
                            {errorSubmitting && <p className='univ-edit-form-changes-unsaved-text'>Unable to save changes at this time.</p>}
                            <button className='univ-edit-form-button' type='submit' form='univ-edit-info-form' onClick={(e) => handleButtonClick(e)}>Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='univ-edit-main-sub-container' >
                <div className='univ-edit-left-column-container'>
                    <div className='univ-edit-sub-container univ-edit-info-form-container-container'>
                        <div className='univ-edit-sub-container-title-container'>
                            <h2 className='univ-edit-sub-container-title univ-edit-text'>Personal Information</h2>
                        </div>
                        <form className='univ-edit-info-form-container' id='univ-edit-info-form'>
                            <div className='univ-edit-info-form-top-row'>
                                <div className='univ-edit-info-form-profile-pic-container'>
                                    <div className='univ-edit-profile-pic-cover-container' onDrop={handleDrop}
                                        onDragOver={handleDragOver}>
                                        <div className='univ-edit-profile-pic-cover'>
                                            <p className='univ-edit-profile-pic-change-text' onClick={handleBrowseFiles}>Click to Change</p>
                                            <div className='univ-edit-profile-pic-trash-container' onClick={handlePhotoReset}>
                                                <img src={trashcan} alt='remove profile picture' className='univ-edit-profile-pic-trash' />
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        id="imageUpload"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                        onChange={handleFileSelection}
                                    />
                                    {/* <div
                                        className="univ-edit-profile-upload-div"
                                        
                                        
                                    >
                                    </div> */}
                                    <img src={imageLink ? imageLink : originalInformation.image ? originalInformation.image : defaultPhoto} alt='profile Picture' className='univ-edit-info-form-profile-pic' />
                                </div>
                                <div className='univ-edit-info-form-name-and-gender-container'>
                                    <div className='univ-edit-info-form-name-container'>
                                        <UniversalInfoFormInput stateVariable={name} onChange={(e) => setName(e.target.value)} placeholder={'Charlotte'} label={'Name'} />
                                    </div>
                                    <div className='univ-edit-info-form-gender-container'>
                                        <h4 className='univ-edit-info-form-label univ-edit-text'>Gender</h4>
                                        <div className='univ-edit-info-form-gender-radio-container'>
                                            <div className='univ-edit-info-form-gender-radio'>
                                                <input type='radio' id='female' name='gender' className='univ-edit-info-form-gender-radio-button' value={2} onClick={() => setGender(2)} defaultChecked={gender === 2 ? "checked" : ""} />
                                                <label className='univ-edit-info-form-gender-radio-label'>Female</label>
                                            </div>
                                            <div className='univ-edit-info-form-gender-radio'>
                                                <input type='radio' id='male' name='gender' className='univ-edit-info-form-gender-radio-button' value={1} onClick={() => setGender(1)} defaultChecked={gender === 1 ? "checked" : ""}/>
                                                <label className='univ-edit-info-form-gender-radio-label'>Male</label>
                                            </div>
                                            <div className='univ-edit-info-form-gender-radio'>
                                                <input type='radio' id='other' name='gender' className='univ-edit-info-form-gender-radio-button' value={3} onClick={() => setGender(3)} defaultChecked={gender === 3 ? "checked" : ""}/>
                                                <label className='univ-edit-info-form-gender-radio-label'>Other</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='univ-edit-info-form-sub-container'>
                                <div className='univ-edit-info-form-age-container'>
                                    <UniversalInfoFormInput stateVariable={birthday} onChange={(e) => setBirthday(e.target.value)} onBlur={() => editFuncs.onBlurCheck(birthday, setBirthdayError, editFuncs.isValidDate)} placeholder={'mm/dd/yyyy'} label={'Birthday'} possibleError={birthdayError} errorMessage={'Invalid date, please enter a valid date.'} />
                                </div>
                                <div className='univ-edit-info-form-email-container'>
                                    <UniversalInfoFormInput stateVariable={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => editFuncs.onBlurCheck(email, setEmailError, editFuncs.isValidEmail)} placeholder={email || 'charm@gmail.com'} label={'Email'} possibleError={emailError} errorMessage={'Invalid email, please enter a valid address.'} disabled={true} disabledOnClick={() => setIsEmailModalOpen(true)} />
                                </div>
                                <div className='univ-edit-info-form-phone-container'>
                                    <UniversalInfoFormInput stateVariable={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} onBlur={() => editFuncs.onBlurCheck(phoneNumber, setPhoneNumberError, editFuncs.isValidPhoneNumber)} placeholder={'(xxx) xxx-xxxx'} label={'Phone Number'} possibleError={phoneNumberError} errorMessage={'Please use the correct phone number format. (xxx) xxx-xxxx'} />
                                </div>
                                <div className='univ-edit-form-bio-container'>
                                    <div className='univ-edit-info-form-input-container'>
                                        <label className='univ-edit-info-form-label'>
                                            <h4 className='univ-edit-info-form-label-text univ-edit-text'>Bio</h4>
                                            <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder={'Description'} className='univ-edit-info-form-textarea' />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='univ-edit-right-column-container'>
                    <div className='univ-edit-sub-container univ-edit-interests-container-container'>
                        <UniversalInfoInterestsSelection interestsArray={interests} interestOnClick={handleInterestsClick} userInterests={interestSelections} accountType={accountType} />
                    </div>
                    <div className='univ-edit-change-password-button-container' >
                        <button type='button' className='univ-edit-change-password-button' onClick={() => setIsPasswordModalOpen(true)} >Change Password</button>
                    </div>
                    {/* <div className='univ-edit-sub-container univ-edit-password-container'>
                        <div className='univ-edit-password-form-container'>
                            <div className='univ-edit-sub-container-title-container'>
                                <h2 className='univ-edit-sub-container-title univ-edit-text'>Change Password</h2>
                            </div>
                            <form className='univ-edit-password-form' id='password-form'>
                                <UniversalInfoFormInput stateVariable={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder={'******'} label={'Current Password'} possibleError={oldPasswordError} onBlur={() => setOldPasswordError(false)} errorMessage={oldPasswordError} password={true} />
                                <UniversalInfoFormInput stateVariable={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder={''} label={'New Password'} possibleError={newPasswordError} onBlur={() => onBlurCheck(newPassword, setNewPasswordError, editFuncs.isValidPassword)} errorMessage={'Password must be between 6 and 18 characters, and must contain numbers and (letters or special characters).'} password={true} />
                            </form>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )

}

const UniversalInfoFormInput = ({onChange, stateVariable, placeholder, label, possibleError, errorMessage, onBlur, password, disabled, disabledOnClick}) => {
    return (
        <div className='univ-edit-info-form-input-container'>
            <label className='univ-edit-info-form-label'>
                <h4 className='univ-edit-info-form-label-text univ-edit-text'>{label}</h4>
                {disabled && <div className='univ-edit-info-form-change-email-text' onClick={disabledOnClick}>Change Email</div>}
                <input value={stateVariable} onChange={onChange} onBlur={onBlur} placeholder={placeholder} className={`univ-edit-info-form-input ${possibleError ? 'univ-edit-info-form-input-error' : ''} ${disabled ? 'univ-edit-info-form-disabled' : ''}`} type={password ? 'password' : ''} disabled={disabled} />
                {possibleError ? <div className='univ-edit-info-form-input-error-message'>{errorMessage}</div> : ''}
            </label>
        </div>
    )
}

// const UploadProfilePic = () => {
//     const { selectedFiles, uploadedFiles, handleFileSelection, uploadingFiles, isError, isLoading, resetFiles, removeFiles} = useUploadImg();
// }

const UniversalInfoInterestsSelection = ({interestsArray, interestOnClick, userInterests, accountType}) => {
    const [interestTab, setInterestTab] = useState(0);
    const [locations, setLocations] = useState([]);
    const [procedures, setProcedures] = useState([]);
    const [procedureTitles, setProcedureTitles] = useState([]);
    // console.log('user interests are: ', userInterests);
    // console.log('interests array is: ', interestsArray)
    const selectTab = (index) => {
        setInterestTab(index);
      };
    useEffect(() => {
        const holderArray = [];
        interestsArray.forEach((element) => holderArray.push(element?.location.charAt(0).toUpperCase() + element?.location.slice(1)));
        setLocations(holderArray);
        const procedureHolderArray = [];
        // console.log('INTERESTS ARRAY IS: ', interestsArray);
        userInterests.forEach((element) => procedureHolderArray.push(element.procedureTitle));
        console.log('procedureHolderArray is: ', procedureHolderArray);
        setProcedureTitles(procedureHolderArray);
    }, [interestsArray, userInterests])
    useEffect(() => {
        setProcedures(interestsArray[interestTab]?.procedures);
        // console.log('Setting procedures as: ', interestsArray[interestTab]?.procedures);
    }, [interestTab, interestsArray])
    // console.log('Interests Array passed in as: ', interestsArray);

    return (
        <div className='univ-edit-interests-selection-main-container'>
            <div className='univ-edit-sub-container-title-container'>
                <h4 className='univ-edit-sub-container-title univ-edit-text'>{accountType === 2 ? 'Specializations' : 'Interests'}</h4>
                <div className='univ-edit-interests-selection-navbar-container'>
                    {locations?.map((location, index) => {
                        return <p className={`univ-edit-interests-selection-navbar-item ${interestTab === index ? 'univ-edit-selections-selected-tab' : ''}`} key={index} onClick={() => selectTab(index)}>{location}</p>
                    })}
                </div>
            </div>
            
            <div className='univ-edit-interests-selection-interests-container'>
                {procedures?.map((item, index) => {
                    const imgUrl = item?.imgUrl;
                    const itemTitle = item?.procedureTitle || item;
                    const splitItem = itemTitle.split('_');
                    const upperCased = splitItem.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
                    const procedureTitle = upperCased.join(' ');
                    return (<div className='univ-edit-procedure-wrapper' onClick={() => interestOnClick(item)} key={index+100}>
                                <div className={`procedure-photo-container univ-edit-procedure-photo-container ${procedureTitles.includes(item?.procedureTitle) ? 'univ-edit-procedure-selected' : ''}`}>
                                    {imgUrl ? <img src={imgUrl} alt='procedure' className='procedure-photo' /> : <img src={require(`../../assets/procedure/${itemTitle}.svg`)} alt='procedure' className='procedure-photo' />}
                                </div>
                                <p className='procedure-subtitle'>{procedureTitle}</p>
                            </div>
                    )
                })}
            </div>
        </div>
    )
}

const ChakraPasswordModal = ({title, approveButtonText, isModalOpen, closeModalFunc, openLoadingModal, closeLoadingModal}) => {
    const [oldPassword, setOldPassword] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [newPasswordRepeated, setNewPasswordRepeated] = useState("");
    const [newPasswordRepeatedError, setNewPasswordRepeatedError] = useState(false);

    const checkForPasswordInputError = () => {
        let foundError = false;
        if (newPassword !== newPasswordRepeated) {
            setNewPasswordRepeatedError(true);
            foundError = true;
        }
        if (!oldPassword) {
            setOldPasswordError('Please enter your current password if you are attempting to create a new password.');
            foundError = true;
        }
        if (!newPassword) {
            setNewPasswordError(true);
            foundError = true;
        }
        // if (!newPasswordRepeated) {
        //     setNewPasswordRepeatedError(true);
        // }
        // if (newPassword && !newPasswordRepeated)
        return foundError;
    }

    const handlePasswordButtonClick = async () => {
        // console.log('attempting to click the submission button!')
        if (checkForPasswordInputError()) {
            return;
        }
        openLoadingModal();
        await handlePasswordFormSubmission();
        closeLoadingModal();
    }

    const handlePasswordFormSubmission = async () => {
        // console.log('attempting to submit the password form!');
        // setIsLoadingModalOpen(true);
        const obj = {
            'currentPassword': oldPassword,
            'newPassword': newPassword,
            'confirmNewPassword': newPasswordRepeated
        }
        try {
            const res = await editFuncs.setUserData(obj)
            console.log('new password res is: ', res);
        } catch (err) {
            if (err.message === 'Incorrect password, please try again.') {
                setOldPasswordError('Incorrect password, please try again.');
            }
        }
    }

    return (
        <Modal isOpen={isModalOpen} onClose={closeModalFunc} >
            <ModalOverlay />
            <ModalContent bg="#FBFCFF" border="2px" borderColor="#675D59" borderRadius="12px" p="30px 36px" minWidth="40%" >
            <ModalBody >
                <Text fontSize="3xl" color="#352C29" fontWeight="600" >
                {title}
                </Text>
            </ModalBody>

            <ModalFooter display="flex" flexDirection="column" justifyContent="center" rowGap="1.5rem">
                {/* <Button bgColor="#675D59" px="28px" py="20px" color="white" _hover={{ bg: "#4c4542" }} onClick={closeModalFunc}>
                {cancelButtonText}
                </Button> */}
                <form className='univ-edit-password-form' id='password-form'>
                    <UniversalInfoFormInput stateVariable={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder={'******'} label={'Current Password'} possibleError={oldPasswordError} onBlur={() => setOldPasswordError(false)} errorMessage={oldPasswordError} password={true} />
                    <UniversalInfoFormInput stateVariable={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder={'******'} label={'New Password'} possibleError={newPasswordError} onBlur={() => editFuncs.onBlurCheck(newPassword, setNewPasswordError, editFuncs.isValidPassword)} errorMessage={'Password must be between 6 and 18 characters, and must contain numbers and (letters or special characters).'} password={true} />
                    <UniversalInfoFormInput stateVariable={newPasswordRepeated} onChange={(e) => setNewPasswordRepeated(e.target.value)} placeholder={'******'} label={'Enter New Password Again'} possibleError={newPasswordRepeatedError} onBlur={() => editFuncs.onBlurCheck(newPasswordRepeated, setNewPasswordRepeatedError, () => newPasswordRepeated === newPassword)} errorMessage={'Passwords do not match.'} password={true} />
                </form>
                <Button bgGradient="linear(to-r, #F48C8A, #F0A484)" color="white" _hover={{ bgGradient: "linear(to-r, #f27673, #ee9570)" }} px="28px" py="20px" width="100%" onClick={handlePasswordButtonClick}>
                {approveButtonText}
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const ChakraEmailModal = ({title, approveButtonText, isModalOpen, closeModalFunc, openLoadingModal, closeLoadingModal}) => {
    const [newEmail, setNewEmail] = useState("");
    const [newEmailError, setNewEmailError] = useState(false);
    const [hasSentEmail, setHasSentEmail] = useState(false);
    const [emailSendingError, setEmailSendingError] = useState(false);

    const handleEmailButtonClick = async () => {
        if (newEmailError) return;
        if (!newEmail) {
            setNewEmailError(true);
            return;
        }
        console.log('attempting to change email to: ', newEmail);
        try {
            openLoadingModal();
            const res = await editFuncs.sendEmailUpdateVerification(newEmail);
            setHasSentEmail(true);
        } catch (err) {
            setEmailSendingError(true);
            console.log(err);
        } finally {
            closeLoadingModal();
        }
        
    }

    if (emailSendingError) return (
        <Modal isOpen={isModalOpen} onClose={closeModalFunc} >
            <ModalOverlay />
            <ModalContent bg="#FBFCFF" border="2px" borderColor="#675D59" borderRadius="12px" p="30px 36px" minWidth="40%" >
            <ModalBody >
                <Text fontSize="3xl" color="#352C29" fontWeight="600" >
                    {title}
                </Text>
            </ModalBody>

            <ModalFooter display="flex" flexDirection="column" justifyContent="center" rowGap="1rem">
                {/* <Button bgColor="#675D59" px="28px" py="20px" color="white" _hover={{ bg: "#4c4542" }} onClick={closeModalFunc}>
                {cancelButtonText}
                </Button> */}
                <Text fontSize="m" color="#352C29" fontWeight="400" >
                {`We could not send a verification link to ${newEmail} at this time, please try again later.`}
                </Text>
                <Button bgGradient="linear(to-r, #F48C8A, #F0A484)" color="white" _hover={{ bgGradient: "linear(to-r, #f27673, #ee9570)" }} px="28px" py="20px" width="100%" onClick={closeModalFunc}>
                {'Close'}
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )

    if (hasSentEmail) return (
        <Modal isOpen={isModalOpen} onClose={closeModalFunc} >
            <ModalOverlay />
            <ModalContent bg="#FBFCFF" border="2px" borderColor="#675D59" borderRadius="12px" p="30px 36px" minWidth="40%" >
            <ModalBody >
                <Text fontSize="3xl" color="#352C29" fontWeight="600" >
                    {title}
                </Text>
            </ModalBody>

            <ModalFooter display="flex" flexDirection="column" justifyContent="center" rowGap="1rem">
                {/* <Button bgColor="#675D59" px="28px" py="20px" color="white" _hover={{ bg: "#4c4542" }} onClick={closeModalFunc}>
                {cancelButtonText}
                </Button> */}
                <Text fontSize="m" color="#352C29" fontWeight="400" >
                {`We have sent an email to ${newEmail}, please click the link in the email to complete the modification.`}
                </Text>
                <Button bgGradient="linear(to-r, #F48C8A, #F0A484)" color="white" _hover={{ bgGradient: "linear(to-r, #f27673, #ee9570)" }} px="28px" py="20px" width="100%" onClick={closeModalFunc}>
                {'Close'}
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )

    return (
        <Modal isOpen={isModalOpen} onClose={closeModalFunc} >
            <ModalOverlay />
            <ModalContent bg="#FBFCFF" border="2px" borderColor="#675D59" borderRadius="12px" p="30px 36px" minWidth="40%" >
            <ModalBody >
                <Text fontSize="3xl" color="#352C29" fontWeight="600" >
                {title}
                </Text>
            </ModalBody>

            <ModalFooter display="flex" flexDirection="column" justifyContent="center" rowGap="1.5rem">
                {/* <Button bgColor="#675D59" px="28px" py="20px" color="white" _hover={{ bg: "#4c4542" }} onClick={closeModalFunc}>
                {cancelButtonText}
                </Button> */}
                <form className='univ-edit-password-form' id='password-form'>
                    <UniversalInfoFormInput stateVariable={newEmail} onChange={(e) => setNewEmail(e.target.value)} onBlur={() => editFuncs.onBlurCheck(newEmail, setNewEmailError, editFuncs.isValidEmail)} placeholder={'charm@gmail.com'} label={'New Email'} possibleError={newEmailError} errorMessage={'Invalid email, please enter a valid address.'} />
                </form>
                <Button bgGradient="linear(to-r, #F48C8A, #F0A484)" color="white" _hover={{ bgGradient: "linear(to-r, #f27673, #ee9570)" }} px="28px" py="20px" width="100%" onClick={handleEmailButtonClick}>
                {approveButtonText}
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default UniversalProfileEdit;