import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import SignupAndLoginButton from "./signup-and-login-button.component";
import React, { useEffect, useState } from 'react';
import { useSocialLogin } from '../../../hooks/useAuth.js';
import { useToast } from "@chakra-ui/react";
import { retrieveUserFollowList } from '../../../hooks/useAuth.js';

const GoogleLoginButton = ({setToken, setEmail, togglePopup, ...props }) => {
    const toast = useToast();
    const { mutateAsync: fetchSocialLogin } = useSocialLogin();
    const [response, setResponse] = useState(null);

    const handleSuccess = async (codeResponse) => {
        console.log("THIS IS THE CODE RESPONSE", codeResponse);
        const googleAccessToken = codeResponse.googleAccessToken;

        try {
            setResponse(await fetchSocialLogin({
                googleAccessToken,
                provider: 'google',
            }));

            if (response && response.code === 100) {
                localStorage.setItem('token', response.data.token);
                setToken(response.data.token);
                togglePopup(false);

                const followedIdArray = await retrieveUserFollowList();
                localStorage.setItem('charmFollowedUsers', JSON.stringify(followedIdArray));

                setEmail(response.data.email);
                toast({ title: 'Login Success', status: 'success' });
            } else {
                toast({ title: 'Login Failed, please try again', status: 'error' });
                console.error('Token is not found.');
            }
        } catch (error) {
            console.error('Error sending token to backend:', error);
            toast({ title: 'Login Failed, please try again', status: 'error' });
        }
    };

    const login = useGoogleLogin({
        onSuccess: handleSuccess,
        flow: "auth-code",
    });

    useEffect(() => {
        const resp = response;
        console.log('data::', resp);

        if (resp) {
            if (resp?.code === 100) {
                const token = resp?.data?.token;
                if (token) {
                    localStorage.setItem('token', token);
                    setToken(token);
                    togglePopup(false);

                    const fetchUserFollowerList = async () => {
                        const followedIdArray = await retrieveUserFollowList();
                        localStorage.setItem('charmFollowedUsers', JSON.stringify(followedIdArray));
                    }

                    fetchUserFollowerList();
                    setEmail(resp?.data?.email);
                    toast({ title: 'Login Success', status: 'success' });
                } else {
                    toast({ title: 'Login Failed, please try again', status: 'error' });
                    console.error('token is not found.')
                }
            } else {
                const msg = resp?.msg || 'failed, please try again';
                toast({ title: msg, status: 'error' });
            }
        }
    }, [response, setToken, togglePopup, setEmail, toast]);

    return (<SignupAndLoginButton {...props} onClick={login} />);
};

export default GoogleLoginButton;
