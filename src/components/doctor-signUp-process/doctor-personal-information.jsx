import './doctor-personal-information.styles.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { useDoctorAddProfile } from '../../hooks/useDoctorAddProfile';
import userInfoQueryStore from '../../userStore';

import SignupAndLoginButton from '../components-signup-and-login/signup-and-login-button/signup-and-login-button.component';
const DoctorPersonalInformation = () => {
    // const [errorMessage, setErrorMessage] = useState("");
    const { mutate, isLoading, data, error } = useDoctorAddProfile();
    //const togglePopup = doctorInfoQueryStore(state=>state.togglePopup);
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    // const inputFieldsOrder = ["name", "clinic", "password", "mobilePhone", "businessPhone", "hasCheck"];
    const [isAgreed, setIsAgreed] = useState(false);
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
    const onSubmit = (formData) => {
        console.log("formData in personal Information",formData);
        mutate({
            name: formData.name,
            clinic: formData.clinic,
            password: formData.password,
            businessPhone: formData.businessPhone,
            mobilePhone: formData.mobilePhone,
            isAgreed: formData.isAgreed,
        });
    };
    useEffect(() => {
        if (data) {
            alert(data.msg);
            switchPopupTab("doctorVerification");
        }
    },[data]);
    
    return (
        <div className='doctor-personal-information-main-container'>
            {/* {firstErrorMessage && <div className="error-message">{firstErrorMessage}</div>} */}
            <div className='doctor-personal-informtion-title'>
                <span className='doctor-personal-info-text'>Personal Information</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',flexDirection:'column'}}>
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
                                // value={name}
                                // onChange={(e) => setName(e.target.value)}
                            />
                            
                        <input
                                type="text"
                                {...register('clinic')}
                                className="doctor-information-customInput"
                                placeholder="Clinic/Organization"
                                // value={clinic}
                                // onChange={(e) => setClinic(e.target.value)}

                            />
                        <input
                                type="text"
                                className="doctor-information-customInput"
                                placeholder="Street"
                                // value={street}
                                // onChange={(e) => setStreet(e.target.value)}
                            />
                            <span className='doctor-personal-info-text'>
                                Practice Information
                            </span>
                        <input
                                type="text"
                                className="doctor-information-customInput"
                                placeholder="Business Name"
                                // value={businessName}
                                // onChange={(e) => setBusinessName(e.target.value)}
                            />
                        <input
                                type="text"
                                className="doctor-information-customInput"
                                placeholder="website"
                                // value={website}
                                // onChange={(e) => setWebsite(e.target.value)}
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
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                            />
                        <input
                                type="text"
                                {...register('businessPhone')}
                                className="doctor-information-customInput"
                                placeholder="Enter Business Phone Number"
                                // value={businessPhone}
                                // onChange={(e) => setBusinessPhone(e.target.value)}

                            />
                        <input
                                type="text"
                                {...register('mobilePhone')}
                                className="doctor-information-customInput"
                                placeholder="enter Mobile Phone Number"
                                // value={mobilePhone}
                                // onChange={(e) => setMobilePhone(e.target.value)}
                            />
                        <div className='doctor-personal-address'>
                            <input
                                type="text"
                                className="doctor-information-address-customInput"
                                placeholder="city"
                                // value={city}
                                // onChange={(e) => setCity(e.target.value)}
                            />
                            <input
                                type="text"
                                className="doctor-information-address-customInput"
                                placeholder="state"
                                // value={state}
                                // onChange={(e) => setState(e.target.value)}
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