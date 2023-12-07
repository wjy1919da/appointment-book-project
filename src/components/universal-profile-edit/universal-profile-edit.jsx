import './universal-profile-edit.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import defaultPhoto from '../../assets/post/user-profile-avatar.png';
import backArrow from '../../assets/doctor/left_back.png';
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    useDisclosure,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
  } from "@chakra-ui/react";

const UniversalProfileEdit = () => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState(0);
    const [birthday, setBirthday] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [bio, setBio] = useState("");
    const [interests, setInterests] = useState([]);
    const [interestSelections, setInterestSelections] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [accountType, setAccountType] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();
    const modalDisclosure = useDisclosure();

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
        // console.log('attempting to handle click of: ', item);
        // console.log('currently, interests looks like: ', interests);
        if (!interests.includes(item)) addToInterests(item);
        else removeFromInterests(item);
    }

    const handleButtonClick = (event) => {
        event.preventDefault();
        modalDisclosure.onOpen();
    }

    const handleFormSubmission = () => {
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
        modalDisclosure.onClose();
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
            <Modal isOpen={modalDisclosure.isOpen} onClose={modalDisclosure.onClose} >
                <ModalOverlay />
                <ModalContent bg="rgba(0,0,0,0)" boxShadow="none" >
                <ModalHeader></ModalHeader>
                <ModalBody display="flex" justifyContent="center" >
                    <Text fontSize="3xl" color="white" fontWeight="600" >
                    Save Changes?
                    </Text>
                </ModalBody>

                <ModalFooter display="flex" justifyContent="center" columnGap="2.5rem">
                    <Button bgColor="#675D59" px="28px" py="20px" color="white" _hover={{ bg: "#4c4542" }} onClick={modalDisclosure.onClose}>
                    Don't Save
                    </Button>
                    <Button bgGradient="linear(to-r, #F48C8A, #F0A484)" color="white" _hover={{ bgGradient: "linear(to-r, #f27673, #ee9570)" }} px="28px" py="20px" onClick={handleFormSubmission}>
                    Save
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
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
                                    <UniversalInfoFormInput stateVariable={birthday} onChange={(e) => setBirthday(e.target.value)} placeholder={'mm/dd/yyyy'} label={'Age'} />
                                </div>
                                <div className='univ-edit-info-form-email-container'>
                                    <UniversalInfoFormInput stateVariable={email} onChange={(e) => setEmail(e.target.value)} placeholder={'charm@gmail.com'} label={'Email'} />
                                </div>
                                <div className='univ-edit-info-form-phone-container'>
                                    <UniversalInfoFormInput stateVariable={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder={'(xxx) xxx-xxxx'} label={'Phone Number'} />
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
                                <label>
                                    <h4 className='univ-edit-password-form-subtitle'>Current Password</h4>
                                    <input value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='******' className='univ-edit-info-form-input univ-edit-info-form-password' type='password' />
                                </label>
                                <label>
                                    <h4 className='univ-edit-password-form-subtitle'>New Password</h4>
                                    <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className='univ-edit-info-form-input univ-edit-info-form-password' type='password' />
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

const UniversalInfoFormInput = ({onChange, stateVariable, placeholder, label}) => {
    return (
        <div className='univ-edit-info-form-input-container'>
            <label className='univ-edit-info-form-label'>
                <h4 className='univ-edit-info-form-label-text univ-edit-text'>{label}</h4>
                <input value={stateVariable} onChange={onChange} placeholder={placeholder} className='univ-edit-info-form-input' />
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