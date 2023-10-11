import './doctor-personal-information.styles.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { useDoctorAddProfile } from '../../hooks/useDoctorAddProfile';
import doctorInfoQueryStore from '../../doctorStore.ts';
import SignupAndLoginButton from '../components-signup-and-login/signup-and-login-button/signup-and-login-button.component';
const DoctorPersonalInformation = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const { mutate: addDoctorProfile } = useDoctorAddProfile();
    const togglePopup = doctorInfoQueryStore(state=>state.togglePopup);
    const [name, setName] = useState("");
    const [clinic, setClinic] = useState("");
    const [street, setStreet] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [website, setWebsite] = useState("");
    const [password, setPassword] = useState("");
    const [businessPhone, setBusinessPhone] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [isAgreed, setIsAgreed] = useState(false);
    const generateErrorMessage = () => {
        if (errors.name && errors.name.message) {
            console.log("Name error");
            return errors.name.message;
        }
        if (errors.clinic && errors.clinic.message) {
            return errors.clinic.message;
        }
        if (errors.password && errors.password.message) {
            return errors.password.message;
        }
        if (errors.businessPhone && errors.businessPhone.message) {
            return errors.businessPhone.message;
        }
        if (errors.mobilePhone && errors.mobilePhone.message) {
            return errors.mobilePhone.message;
        }
        if (errors.isAgreed && errors.isAgreed.message) {
            return errors.isAgreed.message;
        }
        return "There are some errors in the form.";
    };
    useEffect(() => {
        setErrorMessage("Test error message");
    }, []);
    const schema = z.object({
        name: z.string().min(1, 'Name is required'),
        clinic: z.string().min(1, 'Clinic is required'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        businessPhone: z.string().min(1, 'Business phone number is required'),
        mobilePhone: z.string().min(1, 'Mobile phone number is required'),
        isAgreed: z.boolean().refine(value => value === true, {
            message: 'You must agree to the terms',
            path: [] // You might not need this, but sometimes it's useful
        }),
        // ... Add other fields if necessary
    });
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(schema),
    });
    
    const handleSubmitProfile = async () => {
        console.log("handleSubmitProfile is triggered");
        console.log("handleSubmitProfile called", errors, isValid);
        if (!isValid) {
            console.log("Form is not valid!");
            setErrorMessage(generateErrorMessage());
            return;
        }
        // Construct the payload
        const payload = {
            address: street + ", " + city + ", " + state,
            mechName: businessName,
            mechTel: businessPhone,
            miaoshu: website,  // Description - based on your API structure, might need changes
            mobile: mobilePhone,
            nickname: name,
            password: password
        };

        // try {
        //     const response = await axios.post("http://localhost:8080/user_action/set_doctor_profile", payload);
        //     // Handle success
        //     console.log(response.data);
        // } catch (error) {
        //     // Handle error
        //     console.error("Error setting doctor profile:", error);
        // }
        addDoctorProfile(payload);
        togglePopup(true, 'verification');
    };
    const onSubmit = handleSubmit(handleSubmitProfile);

    return (
        <div className='doctor-personal-information-main-container'>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className='doctor-personal-informtion-title'>
                <span className='doctor-personal-info-text'>Personal Information</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
        <div className='doctor-Personal-Information-container'>  
            <div className='doctor-personal-information-right-section'>
                <span className='doctor-personal-info-text'>
                   Personal Information 
                </span>
                <input
                        type="text"
                        {...register('name')}
                        className="doctor-information-customInput"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                <input
                        type="text"
                        {...register('clinic')}
                        className="doctor-information-customInput"
                        placeholder="Clinic/Organization"
                        value={clinic}
                        onChange={(e) => setClinic(e.target.value)}

                    />
                <input
                        type="text"
                        className="doctor-information-customInput"
                        placeholder="Street"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                    />
                    <span className='doctor-personal-info-text'>
                        Practice Information
                    </span>
                    <input
                        type="text"
                        className="doctor-information-customInput"
                        placeholder="Business Name"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                    />
                <input
                        type="text"
                        className="doctor-information-customInput"
                        placeholder="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
            </div>
            <div className='doctor-personal-information-left-section'>
                <span className='doctor-personal-info-text'>
                    Password
                    </span>
                    <input
                            type="text"
                            {...register('password')}
                            className="doctor-information-customInput"
                            placeholder="8 or more characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    <input
                            type="text"
                            {...register('businessPhone')}
                            className="doctor-information-customInput"
                            placeholder="Enter Business Phone Number"
                            value={businessPhone}
                            onChange={(e) => setBusinessPhone(e.target.value)}

                        />
                    <input
                            type="text"
                            {...register('mobilePhone')}
                            className="doctor-information-customInput"
                            placeholder="enter Mobile Phone Number"
                            value={mobilePhone}
                            onChange={(e) => setMobilePhone(e.target.value)}
                        />
                        <div className='doctor-personal-address'>
                            <input
                                type="text"
                                className="doctor-information-address-customInput"
                                placeholder="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <input
                                type="text"
                                className="doctor-information-address-customInput"
                                placeholder="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                        <div className="terms-agreement">
                            <input type="checkbox" id="termsCheckbox" className="terms-checkbox"    
                                   checked={isAgreed}
                                   {...register('isAgreed')}
                                   onChange={(e) => setIsAgreed(e.target.checked)}
                                />
                            <label htmlFor="termsCheckbox" className="terms-label">
                                I agreed to the Charm Life's 
                                <Link className='charm-life-term-service'>
                                Terms of service</Link>
                            </label>
                    </div>
            </div>
        </div> 
        <div className='doctor-Personal-Information-verify-button'>
            <SignupAndLoginButton title ='Verify your profile' width='200px' height='40px'
                disabled={!isValid}   
                type='submit'/>
                
        </div>
        </form>
        </div>  
    )
}

export default DoctorPersonalInformation;