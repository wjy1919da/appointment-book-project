import React, { useState, useEffect,useCallback } from 'react';
import './send-verify-email.styles.scss';
import userInfoQueryStore from '../../../userStore.ts';
import HomeSpinner from '../../home-spinner/home-spinner.component';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { Form, InputGroup } from 'react-bootstrap'
import CustomInput from '../custom-input/custom-input.component';
import NextButton from './next-button.component';
import LoginRegisterTitle from './login-register-title.component';
import {useUserOtpRegister} from '../../../hooks/useAuth';
const LoginPhone = () => {
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    const setPhoneNumber = userInfoQueryStore(state=>state.setPhoneNumber);
    const togglePopup = userInfoQueryStore(state=>state.togglePopup);
    const userInfo = userInfoQueryStore((state) => state.userInfo);
    var userRole = localStorage.getItem('accountType');
    const usPhoneNumberPattern = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}$/;
    const schema = z.object({
        phoneNumber: z.string()
            .nonempty("Phone number is required")
            .refine(value => usPhoneNumberPattern.test(value), "Invalid US phone number format"),
    });
    const { register, handleSubmit, formState: { errors,isValid } } = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange'
    });
    const {mutate,data,isLoading,isError,error} = useUserOtpRegister();
    const onSubmit = (formData) => {
        setPhoneNumber(formData.phoneNumber);
        mutate({
            phoneNumber: formData.phoneNumber,
        });
    };
    useEffect(() => {
        if (data?.code === 100) {
            /* TODO：alert component */ 
            alert(data.msg);
            switchPopupTab('sendOtpVerification');
        }
        if (data?.code === 500 || data?.code === 403) {
            alert(data.msg);  
        }
    }, [data]);
    if(isError){
        alert(error.message);
    }
    return (
        <div className="verify-email-container">
            <div className='verify-title-container'>
                <LoginRegisterTitle title={"Log In"}/>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <div style={{ fontSize: "14px" }}>phoneNumber</div>
                    <InputGroup hasValidation>
                        <CustomInput 
                            {...register('phoneNumber')}
                            className={`d-block ${errors.phoneNumber ? 'is-invalid' : ''}`} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phoneNumber?.message}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <div className='signUp-download-button'>
                    <NextButton title='Send OPT' width='180px' disabled={!isValid} />
                </div>
            </Form>
        </div>
  );
}

export default LoginPhone