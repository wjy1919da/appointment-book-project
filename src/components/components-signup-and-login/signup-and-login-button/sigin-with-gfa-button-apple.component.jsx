import React from 'react';
import AppleLogin from 'react-apple-login';
import { useAppleLogin } from '../../../hooks/useAuth';
import { useToast } from '@chakra-ui/react';
import SignupAndLoginButton from './signup-and-login-button.component';

const AppleLoginBtnWrap = (props) => {
    const appleSignin = useAppleLogin();
    const toast = useToast();

    const handleAppleLoginSuccess = async (response) => {
        console.log('Apple login successful:', response);
        const token = response.token;

        try {
            const result = await appleSignin.mutateAsync({ token });

            if (result.status === 'success') {
                toast.success('Login successful!');
            } else {
                toast.error(result.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.log("Backend error or some other error : ", error);
        }
    };

    const handleAppleLoginFailure = (error) => {
        console.error('Apple login failed:', error);
    };

    return (
        <AppleLogin
            usePopup={false}
            clientId="com.longcai.charm.sign"
            redirectURI="https://local.test:3000"
            responseMode="query"
            //responseType="code id_token"
            handleSuccess={handleAppleLoginSuccess}
            handleFailure={handleAppleLoginFailure}
            scope="email phone"
            render={({ onClick }) => (
                <SignupAndLoginButton {...props} onClick={onClick}></SignupAndLoginButton>
            )}
        />
    );
};

export default AppleLoginBtnWrap;

