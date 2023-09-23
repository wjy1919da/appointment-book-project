import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import GoogleLoginButton from "./sigin-with-gfa-button-google-children.component";

const CLIENT_ID = '1034793734928-td2qeg4g3rsjesij5rfqg00a4hs5egjp.apps.googleusercontent.com'

const GoogleLoginBtnWrap = (props) => {
    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLoginButton {...props} />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginBtnWrap;