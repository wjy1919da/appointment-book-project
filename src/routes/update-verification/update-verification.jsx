import './update-verification.scss';
import { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import APIClient from '../../services/api-client';

const UpdateVerification = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    // console.log('you have reached the verification page!');
    const apiEndpoint = "https://api-dev.charm-life.com/user/user_profile/verification_email";

    useEffect(() => {
        // console.log('entering use Effect');
        const searchParams = new URLSearchParams(window.location.search);
        let userToken = '';
        let verification = '';
        for (const param of searchParams) {
            if (param[0] === 'code') {
                verification = param[1];
            }
            else if (param[0] === 'accessToken') {
                userToken = param[1];
            }
        }

        const config = {
            headers: {
              Authorization: userToken ? `Bearer ${userToken}` : undefined,
            },
          };

        const objBody = {
            code: verification
        }
        console.log('Header is: ', config);
        console.log('body is: ', objBody);
        const sendVerificationInfo = async () => {
            try {
                // const apiClient = new APIClient("/user/user_profile/verification_email");
                const res = await axios.post(apiEndpoint, objBody, config);
                console.log('update verification res is: ', res);
                if (res?.data?.data === false) {
                    throw new Error();
                }
            } catch (err) {
                console.log('unable to change email...', err);
                setIsError(true);
            } finally {
                setIsSubmitted(true);
            }
        }
        sendVerificationInfo();
        // console.log('done!');
    }, [])

    const goHome = () => {
        navigate('/');
    }

    if (!isSubmitted) {
        return (
            <div className='chakra-spinner-container'>
              <Spinner thickness='4px'
                       speed='0.65s'
                       emptyColor='gray.200'
                       color='blue.500' size='xl' />
            </div>
        )
    }

    return (
        <div className="update-verification-page-container">
            <div className="update-verification-page">
                <div className="update-verification-info-container">
                    <h1 className="update-verification-header">{isError ? 'Unable to change your Email' : 'Email has been updated'}</h1>
                    <p className="update-verification-subheader">{isError ? 'Your email was unable to be changed' : 'Your Email has been modified successfully'}</p>
                    <button type="button" className="update-verification-button" onClick={() => goHome()}>Go Home</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateVerification;