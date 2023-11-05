import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import LoginRegisterTitle from './login-register-title.component';
import userInfoQueryStore from '../../../userStore.ts';
import {useClickVerification} from '../../../hooks/useAuth';
import './send-verify-email.styles.scss';
import CustomInput from '../custom-input/custom-input.component';
import { Form, InputGroup } from 'react-bootstrap';
import NextButton from './next-button.component';
const SendVerifyEmail = () => {
    const schema = z.object({
        email: z.string().email(),
    });
    const { register, handleSubmit, formState: { errors,isValid } } = useForm({
        resolver: zodResolver(schema),
    });
    const {mutate,data,isLoading,isError,error} = useClickVerification();
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    const setEmail = userInfoQueryStore(state=>state.setEmail);
    const userInfo = userInfoQueryStore((state) => state.userInfo);
    // var userRole;
    // useEffect(() => {
    //     userRole = localStorage.getItem('accountType') === 1 ? 'USER' : 'DOCTOR';
    // });
    const onSubmit = (formData) => {
        localStorage.setItem('email', formData.email);
        let userRole = localStorage.getItem('accountType') === "1" ? 'USER' : 'DOCTOR';
        setEmail(formData.email);
        mutate({
            email: formData.email,
            userRole: userRole
        });
    };
    useEffect(() => {
        if (data?.msg) {
            alert(data.msg);
            if (data.code === 100 && data.msg !== "Already verified") {
                switchPopupTab('verifyEmail');
            }
        }        
    }, [data]);
    return (
        <div className='verify-email-container'>
            <div className='verify-title-container'>
                <LoginRegisterTitle title={userInfo.accountType == "1" ? "User Sign Up" : "Doctor Sign Up"} handleBackwards={()=>switchPopupTab("accountType")}/> 
           </div>
           <div className='verify-email-content-container'>
            <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <div style={{ fontSize: "14px" }}>Email Address</div>
                            <InputGroup hasValidation>
                                <CustomInput 
                                    {...register('email')}
                                    className={`d-block ${errors.email ? 'is-invalid' : ''}`} 
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.email?.message}
                                </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <div>
                        <NextButton type="submit" title='Verify ' width='180px' disabled={!isValid} />
                    </div>
                </Form>
           </div>
        </div>
    )
}

export default SendVerifyEmail