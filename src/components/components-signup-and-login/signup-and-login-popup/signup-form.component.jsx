import React, { useState, useEffect } from 'react';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import './login-popup.styles.scss';
import {useUserRegister} from '../../../hooks/useAuth';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { FormControl, Text } from "@chakra-ui/react";
import LoginRegisterTitle from './login-register-title.component';
import userInfoQueryStore from '../../../userStore.ts';
import Cookie from 'js-cookie';
//import DatePicker from "react-datepicker";
const SignUpForm = () => {
    const {mutate,data,isLoading,isError,error} = useUserRegister();
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    const setEmail = userInfoQueryStore(state=>state.setEmail);
    const setPassword = userInfoQueryStore(state=>state.setPassword);
    const setUsername = userInfoQueryStore(state=>state.setUsername);
    const setToken = userInfoQueryStore(state=>state.setToken);
    const setBirthday = userInfoQueryStore(state=>state.setBirthday);
    const [startDate, setStartDate] = useState(new Date());
    const schema = z.object({
        username: z.string().nonempty("Username is required"),
        email: z.string().email(),
        password: z.string()
            .min(8)
            .max(16)
            .refine(pass => /[A-Za-z]/.test(pass), {
                message: "Password must contain at least one letter",
            }),
        birthday: z.string().nonempty("Birthday is required"),
    });    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });
    const onSubmit = (formData) => {
        //console.log("formData ",formData);
        mutate({
            username: formData.username,  
            email: formData.email,
            password: formData.password
        });
        setEmail(formData.email);
        setPassword(formData.password); 
        setUsername(formData.username);
        setBirthday(formData.birthday);
    };
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
    if (error) {
        alert(error.message);
    }
    return (
        <div className='sign-in-form-container'>
            <div className='login-title-container'>
                <LoginRegisterTitle title={"Sign in"}/>
            </div>
            <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb="16px">
                     <Text 
                        mb="3px"
                        color="#352C29"
                        fontFamily="Open Sans"
                        fontSize="13px"
                        fontWeight="600"
                        lineHeight="100%"
                    >
                        User Name
                    </Text>
                    <input {...register('username')} placeholder="username" className='custom-input'/>
                    <Text 
                        mb="3px"
                        color="red"
                        fontFamily="Open Sans"
                        fontSize="13px"
                        fontWeight="600"
                        lineHeight="100%"
                    >{errors.username?.message}</Text>
                </FormControl>
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
                <FormControl mt={4} isInvalid={!!errors.password} mb="16px">
                    <Text 
                        mb="3px"
                        color="#352C29"
                        fontFamily="Open Sans"
                        fontSize="13px"
                        fontWeight="600"
                        lineHeight="100%"
                    >
                        Password (8 or more characters)
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
                <FormControl mt={4} mb='8px'>
                    <Text 
                        mb="3px"
                        color="#352C29"
                        fontFamily="Open Sans"
                        fontSize="13px"
                        fontWeight="600"
                        lineHeight="100%"
                    >
                        Birthday
                    </Text>
                    <input
                        {...register('birthday')} 
                        placeholder="Select Date"
                        size="md"
                        type="date"
                        className='custom-input'
                    />
                    <Text 
                        mb="3px"
                        color="red"
                        fontFamily="Open Sans"
                        fontSize="13px"
                        fontWeight="600"
                        lineHeight="100%"
                    >{errors.birthday?.message}</Text>
                </FormControl>
                <div onClick={()=>switchPopupTab('login')}>go to login</div>
                <div onClick={()=>switchPopupTab('sendVerifyEmail')}>go to verify</div>
                <div className='login-button-section'>
                    <SignupAndLoginButton title="Next" type="submit" width="100px" height= "35px"/>
                </div>
            </FormControl>     
        </div>
    )
}

export default SignUpForm