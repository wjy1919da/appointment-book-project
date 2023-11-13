import React, { useState, useEffect,useCallback } from 'react';
import './login-form.styles.scss';
import { useUserEmailLogin } from '../../../hooks/useAuth';
import userInfoQueryStore from '../../../userStore.ts';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
import { Form, InputGroup } from 'react-bootstrap'
import CustomInput from '../custom-input/custom-input.component';
import NextButton from './next-button.component';
import LoginRegisterTitle from './login-register-title.component';
import { useDoctorLogin } from '../../../hooks/useAuth';
import { useToast } from '@chakra-ui/react'

const LoginForm = (props) => {
    // console.log("loginForm");
    const setToken = userInfoQueryStore((state) => state.setToken);
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    const togglePopup = userInfoQueryStore(state=>state.togglePopup);
    //var userRole = localStorage.getItem('accountType');
    const [accountType, setAccountType] = useState(null);
    const toast = useToast()

    useEffect(() => {
        setAccountType(localStorage.getItem('accountType'));
    }, []);
    const userEmailLogin = useUserEmailLogin();
    const doctorLogin = useDoctorLogin();
    const authHook = accountType === '1' ? userEmailLogin : doctorLogin;
    //console.log("authhook",authHook === doctorLogin);
    const schema = z.object({
        email: z.string().email(),
        password: z.string()
            .min(6)
            .max(18)
            .refine(password => /^(?=.*\d)(?=.*[A-Za-z]|[!@#¥%^&*()_+=-~`])[A-Za-z\d!@#¥%^&*()_+=-~`]{6,18}$/.test(password), {
            message: "Password must contain numbers and (letters or special characters)."
        })
    });
    const { register, handleSubmit, formState: { errors,isValid } } = useForm({
        resolver: zodResolver(schema),
        mode: 'onChange'
    });
   
    const { mutate, isLoading, data: resp, error } = authHook;
    const userRole = localStorage.getItem('accountType') === 1 ? 'USER' : 'DOCTOR';
    const onSubmit = (formData) => {
        mutate({
            email: formData.email,
            password: formData.password,
            provider: 'email',
            userRole: userRole
        });
    };
    useEffect(() => {
        console.log('data::', resp);
        if ( resp ){
            if (resp?.code === 100) {
                const token = resp?.data?.token;
                if (token) {
                    localStorage.setItem('token', token);
                    setToken(token);
                    togglePopup(false);
                    toast({title: 'Login Success',status: 'success'});
                }else {
                    toast({title: 'Login Failed, please try again',status: 'error',})
                    console.error('token is not found.')
                }
            }else{
                const msg = resp?.msg || 'failed, please try again'
                toast({title: msg, status: 'error',})
            }
        }
    }, [resp]);
    if (error) {
        alert(error.message);
    }
    return (
        <div className="sign-in-form-container">
            <div className='login-title-container'>
               <LoginRegisterTitle title={"Log In"} handleBackwards={()=>switchPopupTab("accountType")}/>
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className='login-input-container'>
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
                        <button style={{ color: '#F48C8A', textDecoration: 'none', background: 'none', border: 'none', fontSize: '14px' }} onClick={()=>switchPopupTab('sendVerifyEmail')}>Forgot Password?</button>
                    </Form.Group>
                </div>
               
                <div className='signUp-download-button'>
                    <NextButton title='Log In' width='180px' disabled={!isValid} />
                </div>
            </Form>
       </div>
    );
}

export default LoginForm;