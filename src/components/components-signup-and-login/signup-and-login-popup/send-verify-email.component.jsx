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
const SendVerifyEmail = () => {
    const schema = z.object({
        email: z.string().email(),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });
    const {mutate,data,isLoading,isError,error} = useClickVerification();
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    const onSubmit = (formData) => {
        //console.log("formData ",formData);
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
    // if (isLoading) {
    //     return <SignupVerify />;
    // }
    if (error) {
        alert(error.message);
    }
    return (
        <div className='verify-email-container'>
            <div className='verify-title-container'>
                <LoginRegisterTitle title={"Sign in"}/> 
           </div>
            <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.email} mb="16px">
                    <Text 
                        mb="3px"
                        color="#352C29"
                        fontFamily="Open Sans"
                        fontSize="13px"
                        fontWeight="600"
                        lineHeight="100%"
                    >
                        Email
                    </Text>
                    <input {...register('email')} placeholder="Email" className='custom-input'/>
                </FormControl>
                {/* <div onClick={()=>switchPopupTab('verifyEmail')}>go to verifyEmail</div> */}
                <div onClick={()=>switchPopupTab('login')}>go to login</div>
                <div className='submit-button-section'>
                    <SignupAndLoginButton title="Send Verification Email" type="submit" width="220px" height= "35px"/>
                </div>
            </FormControl>    
        </div>
    )
}

export default SendVerifyEmail