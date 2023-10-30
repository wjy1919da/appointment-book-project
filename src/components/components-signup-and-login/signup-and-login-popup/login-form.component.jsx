import React, { useState, useEffect,useCallback } from 'react';
import './login-form.styles.scss';
import Cookies from 'js-cookie';
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
const LoginForm = (props) => {
    // console.log("loginForm");
    const setToken = userInfoQueryStore((state) => state.setToken);
    const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
    const togglePopup = userInfoQueryStore(state=>state.togglePopup);
    //var userRole = localStorage.getItem('accountType');
    const [accountType, setAccountType] = useState(null);
    useEffect(() => {
        setAccountType(localStorage.getItem('accountType'));
    }, []);
    const userEmailLogin = useUserEmailLogin();
    const doctorLogin = useDoctorLogin();
    const authHook = accountType === '1' ? userEmailLogin : doctorLogin;
    console.log("authhook",authHook === doctorLogin);
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
   
    const { mutate, isLoading, data, error } = authHook;
   
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
        if (data?.code === 100) {
            const myToken = data.data.token;
            Cookies.set('token', myToken);
            setToken(myToken);
            /* TODO：alert component */ 
            alert(data.msg);
            togglePopup(false);
            //switchPopupTab("doctorProfile");
            //props.onHide();
        }
        if (data?.code === 500 || data?.code === 403) {
            alert(data.msg);  
        }
    }, [data]);
    //  /* TODO: Need to improve */ 
    // if (isLoading) {
    //     return <HomeSpinner />;
    // }
    if (error) {
        alert(error.message);
    }

    return (
        <div className="sign-in-form-container">
            <div className='login-title-container'>
               <LoginRegisterTitle title={"Log In"}/>
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
                        <button style={{ color: '#F48C8A', textDecoration: 'none', background: 'none', border: 'none', fontSize: '14px' }} onClick={()=>switchPopupTab('phoneNumberLogin')}>Forgot Password?</button>
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