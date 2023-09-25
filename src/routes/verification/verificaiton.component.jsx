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
    const { data, isLoading, isError, error } = useUserEmailRegisterValidate(token);
    const navigate = useNavigate();
    const setToken = userInfoQueryStore(state => state.setToken);
    const togglePopup = userInfoQueryStore(state => state.togglePopup);
    //console.log("verification is called!!!",token)
    useEffect(() => {
        if (!isLoading) {
            if (isError) {
                alert("Error verifying email:", error);
                // Handle the error accordingly, perhaps show a message to the user
            }
        }
        if(data && data.code === 100){
            Cookies.set('token', data.data.token);
            setToken(data.data.token);
            togglePopup(true,'gender');
            alert("Verification data success");
            navigate('/');
        }
    }, [data, isLoading, isError, error]);
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