import React, { useState, useEffect } from 'react';
import './login-form.styles.scss';
import {useUserRegister} from '../../../hooks/useAuth';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import LoginRegisterTitle from './login-register-title.component';
import userInfoQueryStore from '../../../userStore.ts';
import Cookie from 'js-cookie';
import NextButton from './next-button.component';
import { Form, InputGroup } from 'react-bootstrap'
import CustomInput from '../custom-input/custom-input.component';
import SendVerifyEmail from './send-verify-email.component';
//import DatePicker from "react-datepicker";
const SignUpForm = () => {
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    //const setEmail = userInfoQueryStore(state=>state.setEmail);
    const setPassword = userInfoQueryStore(state=>state.setPassword);
    const setUsername = userInfoQueryStore(state=>state.setUsername);
    const setToken = userInfoQueryStore(state=>state.setToken);
  
    const userInfo = userInfoQueryStore(state=>state.userInfo);
    const schema = z.object({
        password: z.string()
            .min(6)
            .max(18)
            .refine(password => 
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(password),
                {
                    message: "Password must contain both letters and numbers."
                }
        ),  
        repassword: z.string().min(6)
        .max(18)
        .refine(password => 
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/.test(password),
            {
                message: "Password must contain both letters and numbers."
            }
        )
    });    
    const { register, handleSubmit, formState: { errors,isValid } } = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange'
    });
    const {mutate,data,isLoading,isError,error} = useUserRegister();
    //Load accountType from localstorage
    var userRole;
    var email;
    useEffect(() => {
        userRole = localStorage.getItem('accountType') === 1 ? 'USER' : 'DOCTOR';
        email = localStorage.getItem('email');
    });
    const onSubmit = (formData) => {
        if(formData.password !== formData.repassword){
            alert("password not match");
            return;
        }
        console.log("email before mutate ",email);
        mutate({
            email: email,
            password: formData.password,
            userRole: userRole
        });
        setPassword(formData.password); 
        setUsername(formData.username);
    };
    //console.log("sign up form errors ",errors);
    
    useEffect(() => {
        if (data?.msg && data.code === 100) {
           //  切换到下一个tab
           const myToken = data.data.token;
           console.log("myToken in new register ",myToken);
           Cookie.set('token', myToken);
           setToken(myToken);
           alert("register success ",data.code);
           switchPopupTab('gender');
        }else if(data){
            alert(data.msg);
        }
    }, [data]);
    
    return (
        <div className='sign-in-form-container'>
        <div className='login-title-container'>
            <LoginRegisterTitle title={"Sign in"} handleBackwards={()=>switchPopupTab('sendVerifyEmail')}/>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
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
                <InputGroup hasValidation>
                    <div style={{ fontSize: "14px" }}>Re-ented your password</div>
                    <CustomInput 
                        {...register('repassword')} 
                        type="password"
                        className={`d-block ${errors.repassword ? 'is-invalid' : ''}`} 
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.repassword?.message}
                    </Form.Control.Feedback>
                </InputGroup>
                <button style={{ color: '#F48C8A', textDecoration: 'none', background: 'none', border: 'none', fontSize: '14px' }} onClick={()=>switchPopupTab('phoneNumberLogin')}>Forgot Password?</button>
            </Form.Group>
            <div className='signUp-download-button'>
                <NextButton title='Log In' width='180px' disabled={!isValid} />
            </div>
        </Form>
    </div>
    )
}

export default SignUpForm