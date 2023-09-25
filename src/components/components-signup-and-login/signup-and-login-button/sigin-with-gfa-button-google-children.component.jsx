import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

import SignupAndLoginButton from "./signup-and-login-button.component";

const GoogleLoginButton = (props) => {
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => console.log(codeResponse),
        flow: "auth-code",
    });

    return (<SignupAndLoginButton {...props} onClick={login} />);
};


export default GoogleLoginButton;