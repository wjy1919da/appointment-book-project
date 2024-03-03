import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import GoogleLoginButton from "./sigin-with-gfa-button-google-children.component";

const CLIENT_ID = '54730987867-b380cpsjliuchq2sgdogalp6c73i7u32.apps.googleusercontent.com'


const GoogleLoginBtnWrap = (props) => {
    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLoginButton {...props} />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginBtnWrap;