import './doctor-personal-information.styles.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { useDoctorAddProfile } from '../../hooks/useDoctorAddProfile';
import userInfoQueryStore from '../../userStore';
import { Controller, useFormContext } from 'react-hook-form';

import SignupAndLoginButton from '../components-signup-and-login/signup-and-login-button/signup-and-login-button.component';
const DoctorPersonalInformation = () => {
    // const [errorMessage, setErrorMessage] = useState("");
    const { mutate, isLoading, data, error } = useDoctorAddProfile();
    //const togglePopup = doctorInfoQueryStore(state=>state.togglePopup);
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    // const inputFieldsOrder = ["name", "clinic", "password", "mobilePhone", "businessPhone", "hasCheck"];
    const [isAgreed, setIsAgreed] = useState(false);
    const schema = z.object({
        nickname: z.string().min(2).max(20),
        mechName: z.string().min(2).max(20),
        miaoshu: z.string().min(2).max(20),
        password: z.string()
            .min(6)
            .max(18)
            .refine(password => 
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(password),
                {
                    message: "Password must contain both letters and numbers."
                }
        ),
        mobile: z.string().min(10).max(10),
        mechTel: z.string().min(10).max(10),
        address: z.string().min(2).max(20)
    });
    
    const { register, handleSubmit, formState: { errors, isValid }, setValue, watch } = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange'
    });
    const city = watch("city");
    const state = watch("state");
    useEffect(() => {
        if (city && state) {
            setValue("address", `${city}, ${state}`);
        }
    }, [city, state, setValue]);

    const onSubmit = (formData) => {
        console.log("formData in personal Information",formData);
        mutate({
            address: formData.address,
            mechName: formData.mechName,
            mechTel: formData.mechTel,
            miaoshu: formData.miaoshu,
            mobile: formData.mobile,
            nickname: formData.nickname,
            password: formData.password,
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
                                {...register('nickname')}
                                className="doctor-information-customInput"
                                placeholder="Name"
                                // value={name}
                                // onChange={(e) => setName(e.target.value)}
                            />
                            
                        <input
                                type="text"
                                {...register('mechName')}
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
                                // {...register('')}
                                className="doctor-information-customInput"
                                placeholder="Business Name"
                                // value={businessName}
                                // onChange={(e) => setBusinessName(e.target.value)}
                            />
                        <input
                                type="text"
                                className="doctor-information-customInput"
                                {...register('miaoshu')}
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
                                type="password"
                                {...register('password')}
                                className="doctor-information-customInput"
                                placeholder="8 or more characters"
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                            />
                        <input
                                type="text"
                                 {...register('mechTel')}
                                className="doctor-information-customInput"
                                placeholder="Enter Business Phone Number"
                                // value={businessPhone}
                                // onChange={(e) => setBusinessPhone(e.target.value)}
                            />
                        <input
                                type="text"
                                {...register('mobile')}
                                className="doctor-information-customInput"
                                placeholder="enter Mobile Phone Number"
                                // value={mobilePhone}
                                // onChange={(e) => setMobilePhone(e.target.value)}
                            />
                        <div className='doctor-personal-address'>
                           <input
                                type="text"
                                {...register('city')} 
                                className="doctor-information-address-customInput"
                                placeholder="city"
                            />
                            <input
                                type="text"
                                {...register('state')} 
                                className="doctor-information-address-customInput"
                                placeholder="state"
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
                        // disabled={!isValid}   
                        type='submit'/>
                </div>
          </form>
        </div>  
    )
}

export default DoctorPersonalInformation;