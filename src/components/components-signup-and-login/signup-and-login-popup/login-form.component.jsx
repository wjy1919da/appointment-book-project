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
import { Form, InputGroup } from 'react-bootstrap'
import CustomInput from '../custom-input/custom-input.component';
import NextButton from './next-button.component';
import LoginRegisterTitle from './login-register-title.component';
const LoginForm = (props) => {
    const setToken = userInfoQueryStore((state) => state.setToken);
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    const togglePopup = userInfoQueryStore(state=>state.togglePopup);
    const userInfo = userInfoQueryStore((state) => state.userInfo);
    var userRole = userInfo.accountType;
    const schema = z.object({
        email: z.string().email(),
        password: z.string()
            .min(6)
            .max(18)
            .refine(password => 
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(password),
                {
                    message: "Password must contain both letters and numbers."
                }
            ),
    });
    const { register, handleSubmit, formState: { errors,isValid } } = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange'
    });
    const { mutate, data, isLoading, isError, error } = useUserEmailLogin();
    const onSubmit = (formData) => {
        mutate({
            email: formData.email,
            password: formData.password,
            provider: 'email',
            identity: userRole
        });
    };
    useEffect(() => {
        if (data?.code === 100) {
            const myToken = data.data.token;
            Cookies.set('token', myToken);
            setToken(myToken);
            /* TODO：alert component */ 
            alert(data.msg);
            togglePopup(false);
            //props.onHide();
        }
        if (data?.code === 500 || data?.code === 403) {
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

    const handleCreateAccountClick = () => {
        switchPopupTab('accountType')
    };

   
    return (
        <div className="sign-in-form-container">
            <div className='login-title-container'>
               <LoginRegisterTitle title={"Log In"}/>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                {/* <Form.Label className="d-block">Email Address</Form.Label> */}
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
                
                <Form.Group className="mb-3">
                    {/* <Form.Label className="d-block">Password</Form.Label> */}
                    <div style={{ fontSize: "14px" }}>Password</div>
                    <InputGroup hasValidation>
                        <CustomInput 
                            {...register('password')} 
                            type="password"
                            className={`d-block ${errors.password ? 'is-invalid' : ''}`} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password?.message}
                        </Form.Control.Feedback>
                    </InputGroup>
                     <button style={{ color: '#F48C8A', textDecoration: 'none', background: 'none', border: 'none', fontSize: '14px' }} onClick={handleCreateAccountClick}>Forgot Password?</button>
                </Form.Group>

                <div className='signUp-download-button'>
            <NextButton title='Log In' width='180px'
            disabled={!isValid} />
        </div>
            
            </Form>
            
            <SocialSignUP onHide={props.onHide} />

            <div className="create-account">

            <span>Don't have an account?</span> 

            <button style={{ color: '#F48C8A', textDecoration: 'none', background: 'none', border: 'none', fontSize: '12px', marginLeft: '4px' }} onClick={handleCreateAccountClick}> Create one!</button>
        </div>
       </div>

    );
}

export default LoginForm;