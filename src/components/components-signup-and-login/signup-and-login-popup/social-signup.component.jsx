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
import './login-popup.styles.scss';

const SocialSignUP = () => {
    const [provider, setProvider] = useState('')
    const [profile, setProfile] = useState(null)
    const REDIRECT_URI = 'http://localhost:3000';
    const onLoginStart = useCallback(() => {
        alert('login start');
      }, []);

    const onResolve = async ({provider, data}) => {
        if (provider === 'google') {
          console.log("google ", data);
          try {
            const accessToken = data.access_token;
            console.log("accessToken ",accessToken);
          } catch (error) {
            console.log('error signing in', error);
          }
        } 
        if (provider === 'facebook') {
            console.log("facebook "+data);
        }
    };    
  return (
        <div className="login-popup-gfa-section">
            <div className="or-section">
                {/* <div className="line-separator"></div>  */}
                <div className="or-label">- OR -</div>
                {/* <div class="line-separator"></div> */}
            </div>
            {/* <div className="signin-with-apple-section">
                <SignupAndLoginButton width='220px' height='42px' borderRadius='20px' isIcon={ AppleLogo } title='Sign in with Apple' />
            </div>
            <div className="signin-with-google-section">
                <SignupAndLoginButton width='220px' height='42px' borderRadius='20px' isIcon={ GoogleLogo } title='Sign in with Google' />
            </div>
            <div className="signin-with-facebook-section">
                <SignupAndLoginButton width='220px' height='42px' borderRadius='20px' isIcon= { FacebookLogo } title='Sign in with Facebook'/> 
            </div> */}
             <div>
             <LoginSocialFacebook
                            appId="1301849283867898"
                            onLoginStart={onLoginStart}
                            //redirect_uri={REDIRECT_URI}
                            onResolve={onResolve}
                            onReject={(error) => {
                               console.log(error);
                            }}
                    >
                        <FacebookLoginButton  />      
                </LoginSocialFacebook>
                    
            </div>
            <div>
                <LoginSocialGoogle
                    client_id="304434731320-nh74t4nic2hbq9vhqr3n1jqe4u5gc6n1.apps.googleusercontent.com"
                    onResolve={onResolve}
                      onReject={(error) => {
                        console.log(error);
                      }}
                >
                    <GoogleLoginButton

                    />
                </LoginSocialGoogle>      
            </div>
        </div>
  )
}

export default SocialSignUP