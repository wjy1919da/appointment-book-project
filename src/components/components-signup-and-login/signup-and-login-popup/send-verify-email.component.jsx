import React, { useState, useEffect } from 'react';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { FormControl, Text } from "@chakra-ui/react";
import LoginRegisterTitle from './login-register-title.component';
import userInfoQueryStore from '../../../userStore.ts';
import {useClickVerification} from '../../../hooks/useAuth';
import './send-verify-email.styles.scss';
import { Button } from 'react-bootstrap';
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
    const onSubmit = (formData) => {
        console.log("formData ",formData);
        setEmail(formData.email);
        mutate({
            email: formData.email,
        });
    };
    useEffect(() => {
        if (data?.code === 100) {
           //  切换到下一个tab
           alert("sending email ",data.msg);
           switchPopupTab('verifyEmail');
        }
        if (data?.data && 400<=data.code <=500) {
            alert(data.msg);
        }
    }, [data]);
    if (error) {
        alert(error.message);
    }
    return (
        <div className='verify-email-container'>
            <div className='verify-title-container'>
                <LoginRegisterTitle title={"Sign in"}/> 
           </div>
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
    )
}

export default SendVerifyEmail