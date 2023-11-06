import React from 'react';
import { useEffect } from 'react';
import { useUserEmailRegisterValidate } from '../../hooks/useAuth';
import HomeSpinner from '../../components/home-spinner/home-spinner.component';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import userInfoQueryStore from '../../userStore.ts';
import ErrorPageCommon from '../error-page-common/error-page-common.component';
const Verification = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
   // const userInfo = userInfoQueryStore(state => state.userInfo);
    const { data, isLoading, isError, error } = useUserEmailRegisterValidate(token);
    const navigate = useNavigate();
    const togglePopup = userInfoQueryStore(state => state.togglePopup);
    useEffect(() => {
        if (data?.code === 100) {
            togglePopup(true, 'signUp');
            localStorage.setItem('email', data.data.email);
            const accountType = data.data.userRole === "DOCTOR" ? 2 : 1;
            localStorage.setItem('accountType', accountType);
    
            alert("go to sign up page");
            navigate('/');
        }
    }, [data]);
    if (isError) {
        alert(`Error verifying email: ${error}`);
        // 这里添加错误处理逻辑
        return; // 出错后不再继续执行后续代码
    }
    if (isLoading) {
        return <HomeSpinner />;
    }
    return (
        // <div style={{diplay:'flex', justifyContent: 'center', alignItems: 'center' }}>
        //     Email verification in process...
        // </div>
        <ErrorPageCommon title="The email url is expired." context="please try agein"></ErrorPageCommon>
    );
};

export default Verification;