import React from 'react'
import './signup-popup2.styles.scss';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import userInfoQueryStore from '../../../userStore.ts';
import LoginRegisterTitle from './login-register-title.component';
import { useClickVerification } from '../../../hooks/useAuth';
import { useEffect } from 'react';
const SignupVerify = () => {
   const switchPopupTab = userInfoQueryStore(state=>state.switchPopupTab);
   const userInfo = userInfoQueryStore(state=>state.userInfo);
   const {mutate,data,isLoading,isError,error} = useClickVerification();
   const handleOnClick = () => {
        if(!userInfo.email){
            alert("email is empty");
            return;
        }
         mutate({
              email: userInfo.email
         });
   }; 
   useEffect(() => {
        if (data?.code === 100) {
        //  切换到下一个tab
            alert("sending email ",data.msg);
            switchPopupTab('gender');
        }
        if (data?.data && 400<=data.code <=500) {
            alert(data.msg);
        }
    }, [data]);
   return (
                <div >        
                    <div className="signup-popup-email">
                        <LoginRegisterTitle title={"User Sign Up"} subTitle={"We have sent you an email to verify your email address."}/>
                        <input className='signup-popup-email-input'
                            type='text' 
                            placeholder='example@email.com'
                            //onChange={(event)=>setInternalEmail(event.target.value)}
                            style={{ width: '270px',
                                        height:'20px', 
                                        marginLeft: '80px', 
                                        // borderColor:onClicked? '1px solid #FFA4A3':'1px solid #F8F8F8', 
                                        borderColor:'1px solid #F8F8F8',
                                        boxShadow: '0px 1px 4px 0px rgba(176, 176, 176, 0.25)',
                                        paddingLeft: '5px',
                                        fontFamily: 'Lora',
                                        fontSize: '12px',
                                        fontWeight: 500,
                                        letterSpacing: '0em',
                                        textAlign: 'left' }}   
                        />   
                </div>
                <p style={{ color: '#AAA',
                            fontFamily:'Lora',
                            fontStyle:'normal',
                            fontSize:'12px',
                            fontWeight:400,
                            lineHeight:'normal', 
                            marginTop:'25px',
                            display:'flex',
                            flexShrink:0,
                            flexdirection:'column',
                            justifyContent:'center' }}>
                    Already have an account? 
                        <div className="account-login"
                              style={{ color: '#FFA4A3',
                                       fontWeight:700,
                                       marginLeft:'5px' }}
                              onClick={()=>switchPopupTab('login')}
                         >
                            Log in
                        </div>
                </p>
                <div onClick={()=>switchPopupTab('sendVerifyEmail')}>go to previous tab</div>
                <div className="cancel-verification-button-section">
                    <SignupAndLoginButton onClick={handleOnClick} width='100px' height='30px' borderRadius='6px' isIcon={ '' } title='Resend'/> 
                </div>
            </div>
  )
}

export default SignupVerify