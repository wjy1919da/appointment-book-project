import FacebookLogin from "@greatsumini/react-facebook-login";
import SignupAndLoginButton from "./signup-and-login-button.component";

const APPID = "302901895399050";
const FacebookLoginBtnWrap = (props) => {
    return (
        // custom render function
        <FacebookLogin
            appId={APPID}
            onSuccess={(response) => {
                console.log("Login Success!", response);
            }}
            onFail={(error) => {
                console.log("Login Failed!", error);
            }}
            onProfileSuccess={(response) => {
                console.log("Get Profile Success!", response);
            }}
            render={({ onClick, logout }) => <SignupAndLoginButton {...props} onClick={onClick}></SignupAndLoginButton>}
        />
    );
};
export default FacebookLoginBtnWrap;
