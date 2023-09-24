import React, { useState, useEffect,useCallback } from 'react';
import { Modal } from 'react-bootstrap';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import './login-popup.styles.scss';
import Cookies from 'js-cookie';
import { useUserEmailLogin } from '../../../hooks/useAuth';
import userInfoQueryStore from '../../../userStore.ts';
import SocialSignUP from './social-signup.component';
import HomeSpinner from '../../home-spinner/home-spinner.component';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { FormControl, FormLabel,FormErrorMessage, Text } from "@chakra-ui/react";
import LoginRegisterTitle from './login-register-title.component';
const LoginForm = (props) => {
    const setToken = userInfoQueryStore((state) => state.setToken);
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    const togglePopup = userInfoQueryStore(state=>state.togglePopup);
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });
    const { mutate, data, isLoading, isError, error } = useUserEmailLogin();
    const onSubmit = (formData) => {
        mutate({
            email: formData.email,
            password: formData.password,
            provider: 'email',
        });
    };
    useEffect(() => {
        if (data?.data && data.code === 100) {
            const myToken = data.data.token;
            Cookies.set('token', myToken);
            setToken(myToken);
            /* TODO：alert component */ 
            alert(data.msg);
            togglePopup(false);
            //props.onHide();
        }
        if (data?.data && data.code === 500) {
            alert(data.msg);
        }
    }, [data]);
     /* TODO: Need to improve */ 
    if (isLoading) {
        return <HomeSpinner />;
    }
    if (error) {
        alert(error.message);
    }

    return (
            <div className="sign-in-form-container">
                <div className='login-title-container'>
                    <LoginRegisterTitle title={"Log in"} subTitle={"Welcome back"}/>
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
                    <div onClick={()=>switchPopupTab('signUp')}>go to register</div>
                    <div className='login-button-section'>
                        <SignupAndLoginButton title="Login" type="submit" width="100px" height= "35px"/>
                    </div>
                </FormControl>
                <SocialSignUP onHide={props.onHide} />
            </div>
    );
}


export default LoginForm;