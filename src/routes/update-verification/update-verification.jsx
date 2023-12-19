import './update-verification.scss';
import { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import APIClient from '../../services/api-client';

const UpdateVerification = () => {
    const [isSubmitted, setIsSubmitted] = useState(true);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        for (const param of searchParams) {
            console.log('One param is: ', param);
        }
        const userToken = '';
        const verification = '';
        const obj = {
            userToken: userToken,
            verification: verification
        }
        const sendVerificationInfo = async () => {
        //     try {
        //         const apiClient = new APIClient("API HERE!");
        //         const res = await apiClient.post(obj);
        //     } catch (err) {
        //         console.log('unable to change email');
        //         setIsError(true);
        //     }
        }
        sendVerificationInfo()
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