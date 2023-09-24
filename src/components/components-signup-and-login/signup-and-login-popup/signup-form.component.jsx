import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
// import { useMediaQuery } from 'react-responsive';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import './login-popup.styles.scss';
import HomeSpinner from '../../home-spinner/home-spinner.component';
import {useUserRegister} from '../../../hooks/useAuth';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { FormControl, FormLabel,FormErrorMessage, Text } from "@chakra-ui/react";
import LoginRegisterTitle from './login-register-title.component';
import userInfoQueryStore from '../../../userStore.ts';
const SignUpForm = () => {
    const {mutate,data,isLoading,isError,error} = useUserRegister();
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });
    const onSubmit = (formData) => {
        mutate({
            email: formData.email,
            password: formData.password
        });
    };
    useEffect(() => {
        if (data?.data && data.code === 100) {
           //  切换到下一个tab
           // 用户点击链接获取token
           alert("sending email ",data.msg);
           //setActiveTab();
           switchPopupTab('verifyEmail');
        }
        if (data?.data && 400<=data.code <=500) {
            alert(data.msg);
        }
    }, [data]);
    if (isLoading) {
        return <HomeSpinner />;
    }
    if (error) {
        alert(error.message);
    }
    return (
        <div className='sign-in-form-container'>
            <div className='login-title-container'>
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
                    <Text 
                        mb="3px"
                        color="red"
                        fontFamily="Open Sans"
                        fontSize="13px"
                        fontWeight="600"
                        lineHeight="100%"
                    >{errors.email?.message}</Text>
                </FormControl>
                <FormControl mt={4} isInvalid={!!errors.password}>
                    <Text 
                        mb="3px"
                        color="#352C29"
                        fontFamily="Open Sans"
                        fontSize="13px"
                        fontWeight="600"
                        lineHeight="100%"
                    >
                        Password
                    </Text>
                    <input {...register('password')} type="password" placeholder="Password" className='custom-input'/>
                    <Text 
                        mb="3px"
                        color="red"
                        fontFamily="Open Sans"
                        fontSize="13px"
                        fontWeight="600"
                        lineHeight="100%"
                    >{errors.password?.message}</Text>
                </FormControl>
                <div onClick={()=>switchPopupTab('login')}>go to login</div>
                <div className='login-button-section'>
                    <SignupAndLoginButton title="Next" type="submit" width="100px" height= "35px"/>
                </div>
            </FormControl>     
            {/* <div className="next-button-section">
                <SignupAndLoginButton width='70px' height='28px' borderRadius='6px' isIcon={ '' } title='Next' herf='/download' onClick = { handleOnClick }/> 
            </div> */}
        </div>
    )
}

export default SignUpForm