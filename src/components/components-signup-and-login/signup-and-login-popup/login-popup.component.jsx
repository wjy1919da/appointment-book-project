import React, { useState, useEffect,useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
/* TODO: password Validation */
const LoginPopup = (props) => {
    const [setToken] = userInfoQueryStore((state) => state.setToken);
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { login, handleSubmit, formState: { errors } } = useForm({
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
            alert(data.msg);
            props.onHide();
        }
        if (data?.data && data.code === 500) {
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
        <Modal
            dialogClassName="signup-popup-modal"
            show={props.show}
            onHide={props.onHide}
            size="lg"
            style={{ marginTop: '100px' }}
        >
            <div className="signup-popup-container">
                <p style={{
                    color: '#000',
                    fontFamily: 'Playfair Display',
                    fontStyle: 'normal',
                    fontSize: '36px',
                    fontWeight: 400,
                    lineHeight: '135%',
                    marginTop: '25px',
                }}>
                    Log In
                </p>
                <p style={{
                    color: '#000',
                    fontFamily: 'PingFang HK',
                    fontStyle: 'normal',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: '160%',
                    marginTop: '-15px',
                }}>
                    Welcome Back
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="login-popup-username">
                        <div className="login-popup-label">
                            <p>
                                User Name<span className="red-asterisk">*</span>
                            </p>
                        </div>
                        <input
                            {...login('email')}
                            className='login-popup-username-input'
                            type='text'
                            placeholder='Username'
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>

                    <div className="signup-popup-password">
                        <div className="login-popup-label">
                            <p>
                                Password<span className="red-asterisk">*</span>
                            </p>
                        </div>
                        <input
                            {...login('password')}
                            className='login-popup-password-input'
                            type='password'
                            placeholder='Password'
                        />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>

                    <button type="submit">Log in</button>
                </form>
                <SocialSignUP onHide={props.onHide} />
            </div>
        </Modal>
    );
}


export default LoginPopup;