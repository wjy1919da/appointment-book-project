import AppleLogin from "react-apple-login";

import SignupAndLoginButton from "./signup-and-login-button.component";

const AppleLoginBtnWrap = (props) => (
    <AppleLogin
        clientId="N8YQ2J6D7H"
        redirectURI="https://redirectUrl.com"
        render={(
            renderProps //Custom Apple Sign in Button
        ) => {
            // props.children.onClick = renderProps.onClick
            return <SignupAndLoginButton {...props} onClick={renderProps.onClick}></SignupAndLoginButton>;
        }}
    />
);

export default AppleLoginBtnWrap;
