import './universal-profile-edit.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { useUserEmailLogin, useDoctorLogin } from '../../hooks/useAuth';
import defaultPhoto from '../../assets/post/user-profile-avatar.png';
import backArrow from '../../assets/doctor/left_back.png';
import axios from 'axios';
import { isValidDate, isValidEmail, isValidPhoneNumber, isValidPassword } from './universal-edit-verification-functions';
// import {
//     useDisclosure,
//   } from "@chakra-ui/react";
import ChakraModal from '../chakra-modal/chakra-modal';
import userInfoQueryStore from '../../userStore';

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
    const [oldPassword, setOldPassword] = useState("");
    const [oldPasswordError, setOldPasswordError] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changesSaved, setChangesSaved] = useState(false);
    const navigate = useNavigate();
    const userEmailLogin = useUserEmailLogin();
    const doctorLogin = useDoctorLogin();
    const authHook = accountType === '1' ? userEmailLogin : doctorLogin;
    // const modalDisclosure = useDisclosure();
    const userInfo = userInfoQueryStore((state) => state.userInfo);
    

    const retrieveAccountType = () => {
        const accountNumber = localStorage.getItem("accountType");
        if (accountNumber === null) throw new Error('No account type found...');
        return Number(accountNumber);
    }

    useEffect(() => {
        setIsLoading(true);
        try {
            setAccountType(retrieveAccountType());
            const grabUserInfo = async () => {
                // call get API for user info when implemented
                // then put all info into states if that info exists;
            } 
            grabUserInfo();
            console.log('user info is: ', userInfo);
            const getProcedures = async () => {
                const body = {
                    pageReq: 0
                };
                try {
                    const res1 = await axios.post('https://api-dev.charm-life.com/doctor/search/procedure', body);
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
                    setInterestSelections(proceduresArray);
                } catch (err) {
                    throw new Error('Unable to retrieve procedure data for interests selection on edit profile');
                }   
            }
            getProcedures();
            
        } catch (err) {
            console.log('Error retrieving user info for edit page: ', err);
            setError(err);
        } finally {
            setIsLoading(false);
        }
    }, [])

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
        if (!interests.includes(item)) addToInterests(item);
        else removeFromInterests(item);
    }

    const checkForErrors = () => {
        // console.log(`${birthdayError} + ${emailError} + ${newPasswordError} + ${oldPasswordError}`);
        return birthdayError || emailError || phoneNumberError|| newPasswordError || oldPasswordError;
    }

    const handleButtonClick = (event) => {
        event.preventDefault();
        setChangesSaved(false);
        if (checkForErrors()) return;
        setIsModalOpen(true);
    }

    const onBlurCheck = (stateVariable, setStateVariableError, checkerFunc) => {
        if (stateVariable === null || stateVariable === "") {
            setStateVariableError(false);
            return;
        }
        setStateVariableError(!checkerFunc(stateVariable));
    }

    const handleFormSubmission = () => {
        console.log('submitting form!');
        const obj = {
            'name': name,
            'bday': birthday,
            'gender': gender,
            'email': email,
            'phone': phoneNumber,
            'bio': bio,
            'interests': interests
        }
        console.log('submission obj is: ', obj);
        setChangesSaved(true);
        setIsModalOpen(false);
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
                                    <UniversalInfoFormInput stateVariable={birthday} onChange={(e) => setBirthday(e.target.value)} onBlur={() => onBlurCheck(birthday, setBirthdayError, isValidDate)} placeholder={'mm/dd/yyyy'} label={'Age'} possibleError={birthdayError} errorMessage={'Invalid date, please enter a valid date.'} />
                                </div>
                                <div className='univ-edit-info-form-email-container'>
                                    <UniversalInfoFormInput stateVariable={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => onBlurCheck(email, setEmailError, isValidEmail)} placeholder={'charm@gmail.com'} label={'Email'} possibleError={emailError} errorMessage={'Invalid email, please enter a valid address.'} />
                                </div>
                                <div className='univ-edit-info-form-phone-container'>
                                    <UniversalInfoFormInput stateVariable={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} onBlur={() => onBlurCheck(phoneNumber, setPhoneNumberError, isValidPhoneNumber)} placeholder={'(xxx) xxx-xxxx'} label={'Phone Number'} possibleError={phoneNumberError} errorMessage={'Please use the correct phone number format. (xxx) xxx-xxxx'} />
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
                    <div className='univ-edit-sub-container univ-edit-password-container'>
                        <div className='univ-edit-password-form-container'>
                            <div className='univ-edit-sub-container-title-container'>
                                <h2 className='univ-edit-sub-container-title univ-edit-text'>Change Password</h2>
                            </div>
                            <form className='univ-edit-password-form'>
                                <UniversalInfoFormInput stateVariable={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder={'******'} label={'Current Password'} possibleError={oldPasswordError} errorMessage={'Invalid password.'} password={true} />
                                <UniversalInfoFormInput stateVariable={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder={''} label={'New Password'} possibleError={newPasswordError} onBlur={() => onBlurCheck(newPassword, setNewPasswordError, isValidPassword)} errorMessage={'Password must be between 6 and 18 characters, and must contain numbers and (letters or special characters).'} password={true} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

const UniversalInfoFormInput = ({onChange, stateVariable, placeholder, label, possibleError, errorMessage, onBlur, password}) => {
    return (
        <div className='univ-edit-info-form-input-container'>
            <label className='univ-edit-info-form-label'>
                <h4 className='univ-edit-info-form-label-text univ-edit-text'>{label}</h4>
                <input value={stateVariable} onChange={onChange} onBlur={onBlur} placeholder={placeholder} className={`univ-edit-info-form-input ${possibleError ? 'univ-edit-info-form-input-error' : ''}`} type={password ? 'password' : ''} />
                {possibleError ? <div className='univ-edit-info-form-input-error-message'>{errorMessage}</div> : ''}
            </label>
        </div>
    )
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
        console.log('Setting procedures as: ', interestsArray[interestTab]?.procedures);
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

export default UniversalProfileEdit;