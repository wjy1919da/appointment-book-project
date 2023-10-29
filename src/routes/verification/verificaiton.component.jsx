import React from 'react';
import { useEffect } from 'react';
import { useUserEmailRegisterValidate } from '../../hooks/useAuth';
import HomeSpinner from '../../components/home-spinner/home-spinner.component';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import userInfoQueryStore from '../../userStore.ts';
import Cookies from 'js-cookie';
const Verification = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
   // const userInfo = userInfoQueryStore(state => state.userInfo);
    const { data, isLoading, isError, error } = useUserEmailRegisterValidate(token);
    const navigate = useNavigate();
    const togglePopup = userInfoQueryStore(state => state.togglePopup);
    //console.log("verification is called!!!",token)
    // var userRole;
    // useEffect(() => {
    //     userRole = localStorage.getItem('accountType') === "1" ? 'USER' : 'DOCTOR';
    //     console.log("userRole in sign up form ",userRole,localStorage.getItem('accountType'));
    // });
    useEffect(() => {
        if (!isLoading) {
            if (isError) {
                alert("Error verifying email:", error);
                // Handle the error accordingly, perhaps show a message to the user
            }
        }
        if(data && data.code === 100){
           // Cookies.set('token', data.data.token);
           // setToken(data.data.token);
            togglePopup(true,'signUp');
            // if (userInfo && userInfo.accountType) {
            //     if (userInfo.accountType === "1") {
            //         togglePopup(true,'signUp');
            //     } else if (userInfo.accountType === "2") {
            //         togglePopup(true,'doctorProfile');
            //     }
            // }
            alert("go to sign up page");
            navigate('/');
        }
    }, [data, isLoading, isError, error]);
    //console.log("data in verification", data);
    if (isLoading) {
        return <HomeSpinner />;
    }
    return (
        <div style={{diplay:'flex', justifyContent: 'center', alignItems: 'center' }}>
            Email verification in process...
        </div>

    );
};

export default Verification;