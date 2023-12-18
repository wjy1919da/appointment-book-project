import './universal-profile-edit.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { useUserEmailLogin, useDoctorLogin, useClickVerification } from '../../hooks/useAuth';
import useUploadImg from '../../hooks/useUploadImg';
import defaultPhoto from '../../assets/post/user-profile-avatar.png';
import backArrow from '../../assets/doctor/left_back.png';
import axios from 'axios';
import * as editFuncs from './universal-edit-verification-functions';
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
    const [interests, setInterests] = useState([]);  // the array of interests returned from the backend
    const [interestSelections, setInterestSelections] = useState([]);  // the array that we put what the user selects their interests as in
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [accountType, setAccountType] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [changesSaved, setChangesSaved] = useState(false);
    // const originalObj = {'name': '', 'gender': 0, 'birthday': '', 'email': '', 'phoneNumber': '', 'bio': '', 'interests': ''};
    const [originalInformation, setOriginalInformation] = useState({'name': '', 'gender': 0, 'birthday': '', 'email': '', 'phoneNumber': '', 'bio': '', 'interests': ''});
    const navigate = useNavigate();
    const userEmailLogin = useUserEmailLogin();
    const doctorLogin = useDoctorLogin();
    const authHook = accountType === '1' ? userEmailLogin : doctorLogin;
    // const modalDisclosure = useDisclosure();
    const userInfo = userInfoQueryStore((state) => state.userInfo);
    const {mutate,data, isLoading: isVerificationLoading,isError,error: verificationError} = useClickVerification();
    

    const retrieveAccountType = () => {
        const accountNumber = localStorage.getItem("accountType");
        if (accountNumber === null) throw new Error('No account type found...');
        return Number(accountNumber);
    }
    useEffect(() => {
        setIsLoading(true);
        try {
            const grabUserInfo = async () => {
                console.log('attempting to grab user info!');
                // call get API for user info when implemented
                // then put all info into states if that info exists;
                // const userObj = { 'name' : '', 'gender': '', 'birthday': '', 'email': '', 'phone': '', 'bio': '', 'interests': ''};
                // setOriginalInformation(...)
                try {
                    const response = await editFuncs.getUserData();
                    console.log('getUSER response returned as: ', response);
                    let { nickname, description, image } = response?.data?.data;
                    let holder = JSON.parse(JSON.stringify(originalInformation));
                    if (nickname) {
                        setName(nickname);
                        holder = {...holder, 'name': nickname};
                        //setOriginalInformation({...originalInformation, 'name': nickname});
                    }
                    if (description) {
                        setBio(description);
                        holder = {...holder, 'bio': description};
                        //setOriginalInformation({...originalInformation, 'bio': description});
                    }
                    setOriginalInformation(holder);
                } catch (err) {
                    throw new Error(err);
                }
                
            } 
            grabUserInfo();
        } catch (err) {
            console.log('Error retrieving user info for edit page: ', err);
            setError(err);
        }
    }, [])

    useEffect(() => {
        try {
            setAccountType(retrieveAccountType());
            const retrieveProcedures = async () => {
                try {
                    const procedures = await editFuncs.getProcedures();
                    setInterestSelections(procedures);
                } catch (err) {
                    throw new Error(err);
                }
            }
            retrieveProcedures(); 
        } catch (err) {
            console.log('Error retrieving procedures info for edit page: ', err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [])

    // useEffect(() => {
    //     if (oldPasswordError) {
    //         let pwForm = document.getElementById('password-form');
    //         if (pwForm) {
    //             pwForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //         }
    //     }
    // }, [oldPasswordError])

    const alterInterestsForSending = () => {
        const holder = [];
        interestSelections.forEach((item) => {

        })
    }

    const goBack = () => {
        navigate(-1);
    }

    const addToInterests = (item) => {
        setInterests((array) => [...array, item]);
    }

    const removeFromInterests = (item) => {
        const filteredArray = interests.filter((procedure) => procedure !== item);
        setInterests(filteredArray);
    }

    const handleInterestsClick = (item) => {
        // console.log('originalInfo is: ', originalInformation);
        if (!interests.includes(item)) addToInterests(item);
        else removeFromInterests(item);
    }

    const checkForErrors = () => {
        // console.log(`${birthdayError} + ${emailError} + ${newPasswordError} + ${oldPasswordError}`);
        return birthdayError || emailError || phoneNumberError;
    }

    const handleButtonClick = (event) => {
        event.preventDefault();
        setChangesSaved(false);
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
        if (email) {
            console.log('testing verification!');
            const verifyEmail = async () => {
                let userRole = localStorage.getItem('accountType') === "1" ? 'USER' : 'DOCTOR';
                const isEmailValid = await editFuncs.verifyEmailForChange(email, userRole);  // checks to see if this new email is already in use or not
                if (!isEmailValid) {  // USE DIFFERENT ERROR HANDLING HERE!
                    console.log('Unable to use this email, please use a different email.');
                }
            }
            await verifyEmail();
        }

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

        if (name || bio) {
            console.log('attempting to change name or bio');
            const data = {};
            const changeName = async () => {
                try {
                    // if (name && name !== originalInformation.name) data['name'] = name;
                    if (name) data['name'] = name;
                    // console.log('data name is: ', data);
                    // if (bio && bio !== originalInformation.bio) data['bio'] = bio;
                    if (bio) data['bio'] = bio;
                    console.log('sending data as: ', data);
                    const res = await editFuncs.setUserData(data);
                    console.log('name res returned as: ', res);
                } catch (err) {
                    console.log('Could not change name or bio: ', err);
                }
            }
            await changeName();
        }
        
        // const sendVerificationEmail = async () => {
        //     if (await verifyEmail()) {
        //         console.log('attempting to send verification email...');
        //         mutate({
        //             email: email,
        //             userRole: 1
        //         })
        //     }
        // }
        
        // const obj = {
        //     'name': name,
        //     'birthday': birthday,
        //     'gender': gender,
        //     'email': email,
        //     'mobile': phoneNumber,
        //     'bio': bio,
        //     'interests': interests
        // }
        // console.log('submission obj is: ', obj);
        setChangesSaved(true);
        setIsLoadingModalOpen(false);
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
                                    <img src={defaultPhoto} alt='profilePicture' className='univ-edit-info-form-profile-pic' />
                                </div>
                                <div className='univ-edit-info-form-name-and-gender-container'>
                                    <div className='univ-edit-info-form-name-container'>
                                        <UniversalInfoFormInput stateVariable={name} onChange={(e) => setName(e.target.value)} placeholder={'Charlotte'} label={'Name'} />
                                    </div>
                                    <div className='univ-edit-info-form-gender-container'>
                                        <h4 className='univ-edit-info-form-label univ-edit-text'>Gender</h4>
                                        <div className='univ-edit-info-form-gender-radio-container'>
                                            <div className='univ-edit-info-form-gender-radio'>
                                                <input type='radio' id='female' name='gender' className='univ-edit-info-form-gender-radio-button' value={0} onClick={() => setGender(0)} defaultChecked={gender === 0 ? "checked" : ""} />
                                                <label className='univ-edit-info-form-gender-radio-label'>Female</label>
                                            </div>
                                            <div className='univ-edit-info-form-gender-radio'>
                                                <input type='radio' id='male' name='gender' className='univ-edit-info-form-gender-radio-button' value={1} onClick={() => setGender(1)} defaultChecked={gender === 1 ? "checked" : ""}/>
                                                <label className='univ-edit-info-form-gender-radio-label'>Male</label>
                                            </div>
                                            <div className='univ-edit-info-form-gender-radio'>
                                                <input type='radio' id='other' name='gender' className='univ-edit-info-form-gender-radio-button' value={2} onClick={() => setGender(2)} defaultChecked={gender === 2 ? "checked" : ""}/>
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
                        <UniversalInfoInterestsSelection interestsArray={interestSelections} interestOnClick={handleInterestsClick} userInterests={interests} accountType={accountType} />
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

const UploadProfilePic = () => {
    const { selectedFiles, uploadedFiles, handleFileSelection, uploadingFiles, isError, isLoading, resetFiles, removeFiles} = useUploadImg();
}

const UniversalInfoInterestsSelection = ({interestsArray, interestOnClick, userInterests, accountType}) => {
    const [interestTab, setInterestTab] = useState(0);
    const [locations, setLocations] = useState([]);
    const [procedures, setProcedures] = useState([]);
    const selectTab = (index) => {
        setInterestTab(index);
      };
    useEffect(() => {
        const holderArray = [];
        interestsArray.forEach((element) => holderArray.push(element?.location.charAt(0).toUpperCase() + element?.location.slice(1)));
        setLocations(holderArray);
    }, [interestsArray])
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
                    const splitItem = item.split('_');
                    const upperCased = splitItem.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
                    const procedureTitle = upperCased.join(' ');
                    return (<div className='procedure-wrapper univ-edit-procedure-wrapper' onClick={() => interestOnClick(item)} key={index+100}>
                                <div className={`procedure-photo-container univ-edit-procedure-photo-container ${userInterests.includes(item) ? 'univ-edit-procedure-selected' : ''}`}>
                                    {item ? <img src={require(`../../assets/procedure/${item}.svg`)} alt='procedure' className='procedure-photo' /> : <div className='blank-procedure-photo'></div>}
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
        console.log('attempting to click the submission button!')
        if (checkForPasswordInputError()) {
            return;
        }
        openLoadingModal();
        await handlePasswordFormSubmission();
        closeLoadingModal();
    }

    const handlePasswordFormSubmission = async () => {
        console.log('attempting to submit the password form!');
        const obj = {
            'oldPW': oldPassword,
            'newPW': newPassword,
            'newPWRep': newPasswordRepeated
        }
        console.log('submitting: ', obj);
        
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

    const handleEmailButtonClick = async () => {
        if (newEmailError) return;
        if (!newEmail) {
            setNewEmailError(true);
            return;
        }
        console.log('attempting to change email to: ', newEmail);
        setHasSentEmail(true);
    }

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