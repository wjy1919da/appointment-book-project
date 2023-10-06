import {
    LoginSocialGoogle,
    LoginSocialAmazon,
    LoginSocialFacebook,
    LoginSocialGithub,
    LoginSocialInstagram,
    LoginSocialLinkedin,
    LoginSocialMicrosoft,
    LoginSocialPinterest,
    LoginSocialTwitter,
    LoginSocialApple,
    LoginSocialTiktok,
  } from 'reactjs-social-login'
  import {
    FacebookLoginButton,
    GoogleLoginButton,
    GithubLoginButton,
    AmazonLoginButton,
    InstagramLoginButton,
    LinkedInLoginButton,
    MicrosoftLoginButton,
    TwitterLoginButton,
    AppleLoginButton,
  } from 'react-social-login-buttons'
import React, { useState, useEffect,useCallback } from 'react';
import AppleLogo from '../../../assets/sign/apple-logo.png';
import GoogleLogo from '../../../assets/sign/google-logo.png';
import FacebookLogo from '../../../assets/sign/facebook-logo.png';
import SignupAndLoginButton from '../signup-and-login-button/signup-and-login-button.component';
import './signup-varify.styles.scss';
import userInfoQueryStore from '../../../userStore.ts';
import { useSocialLogin } from '../../../hooks/useAuth';
import AppleLoginBtnWrap from '../signup-and-login-button/sigin-with-gfa-button-apple.component';
import FacebookLoginBtnWrap from '../signup-and-login-button/sigin-with-gfa-button-facebook.component';
import GoogleLoginBtnWrap from '../signup-and-login-button/sigin-with-gfa-button-google.component';

const SocialSignUP = ({onHide}) => {
  //   const [provider, setProvider] = useState('')
  //   const [profile, setProfile] = useState(null)
  //   const REDIRECT_URI = 'http://localhost:3000';
  //   const setToken = userInfoQueryStore(state=>state.setToken);
  //   const onLoginStart = useCallback(() => {
  //       alert('login start');
  //     }, []);
  //   const { mutate, data, isLoading, isError, error } = useSocialLogin();
  //   const onResolve = async ({provider, data}) => {
  //       if (provider === 'google') {
  //         console.log("google ", data);
  //         try {
  //           const accessToken = data.access_token;
  //           // setGoogleToken(accessToken);
  //           // onHide();
  //           console.log("accessToken ",accessToken);
  //           mutate({
  //               googleAccessToken: accessToken,
  //               provider: 'google'
  //           });
  //         } catch (error) {
  //           console.log('error signing in', error);
  //         }
         
  //         // if (data?.data && 400 <= data.code <=500) {
  //         //     alert(data.msg);
  //         // }
  //       } 
  //       if (provider === 'facebook') {
  //           console.log("facebook "+data);
  //       }

  //   };  
  //   useEffect(() => {
  //     // 100 success
  //     if (data?.data && data.code === 100) {
  //         alert(data.msg);
  //         onHide();
  //     }
  //     if (data?.data && data.code == 400) {
  //         alert(data.msg);
  //     }
  // }, [data]);
  return (
        <div className="login-popup-gfa-section">
            <div className="or-section">
                {/* <div className="line-separator"></div>  */}
                <div className="or-label">- Or Log In With -</div>
                {/* <div class="line-separator"></div> */}
            </div>
            <div className="signin-with-apple-section">
                <AppleLoginBtnWrap width='220px' height='42px' borderRadius='20px' isIcon={ AppleLogo } title='Sign in with Apple' />
            </div>
            <div className="signin-with-google-section">
                <GoogleLoginBtnWrap width='220px' height='42px' borderRadius='20px' isIcon={ GoogleLogo } title='Sign in with Google' />
            </div>
            <div className="signin-with-facebook-section">
                <FacebookLoginBtnWrap width='220px' height='42px' borderRadius='20px' isIcon= { FacebookLogo } title='Sign in with Facebook'/>
            </div>
        </div>
  )
}

export default SocialSignUP