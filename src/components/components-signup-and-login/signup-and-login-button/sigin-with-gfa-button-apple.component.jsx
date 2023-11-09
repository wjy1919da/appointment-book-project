import AppleLogin from "react-apple-login";

import SignupAndLoginButton from "./signup-and-login-button.component";

//N8YQ2J6D7H (Team ID)
// Key ID：F28BBAKJ84
// clientId :com.longcai.charm
const AppleLoginBtnWrap = (props) => (
    <AppleLogin
        usePopup={false}
        clientId="com.longcai.charm.sign"
        redirectURI="https://local.test:3000"
        // redirectURI="https://localhost:3000"
        render={(
            renderProps //Custom Apple Sign in Button
        ) => {
            // props.children.onClick = renderProps.onClick
            return <SignupAndLoginButton {...props} onClick={renderProps.onClick}></SignupAndLoginButton>;
        }}
    />
);

export default AppleLoginBtnWrap;
