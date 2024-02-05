import React, { useCallback, useEffect, useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import userInfoQueryStore from "../../userStore.ts";
import { useUserEmailLogin } from "../../hooks/useAuth";
// REDIRECT URL must be same with URL where the (reactjs-social-login) components is locate
// MAKE SURE the (reactjs-social-login) components aren't unmounted or destroyed before the ask permission dialog closes
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
} from "reactjs-social-login";
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
} from "react-social-login-buttons";
const isValidEmail = (input) => {
  // 简单的正则表达式，用于验证电子邮件
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(input);
};
const SignInForm = () => {
  const [inputValue, setInputValue] = useState(""); // 初始化 inputValue 状态
  const [password, setPasswordValue] = useState("");
  const userInfoQuery = userInfoQueryStore((state) => state.userInfoQuery);
  const setEmail = userInfoQueryStore((state) => state.setEmail);
  const setPassword = userInfoQueryStore((state) => state.setPassword);
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState(null);

  const REDIRECT_URI = "http://localhost:3000/sign-in";
  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onResolve = async ({ provider, data }) => {
    if (provider === "google") {
      console.log("google ", data);
      try {
        const accessToken = data.access_token;
        // You can send the accessToken to your backend API for further processing and user management
        //const response = await apiCallToBackend(accessToken, userID);
        console.log("accessToken ", accessToken);
      } catch (error) {
        console.log("error signing in", error);
      }
    }
    if (provider === "facebook") {
      console.log("facebook " + data);
    }
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();
    if (isValidEmail(inputValue) && password) {
      setEmail(inputValue);
      setPassword(password);
    } else {
      alert("Email is not valid!");
    }
  };
  const handleContentChange = (event) => {
    const { value, name } = event.target;
    if (name === "username") {
      setInputValue(value);
    } else if (name === "password") {
      setPasswordValue(value);
    }
  };
  const { data, isLoading, error } = useUserEmailLogin();
  if (error) {
    alert(error.message);
  }
  useEffect(() => {
    if (data?.data) {
      let myToken = data.data.token;
      localStorage.setItem("token", myToken);
      //const token = Cookies.get('token');
      //console.log("my token",token);
    }
  }, [data]);
  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <h6>Sign in with your email and password</h6>
      <form onSubmit={handleSignInSubmit}>
        <FormInput
          label="Username/Email"
          type="text"
          required
          onChange={handleContentChange}
          name="username"
          value={inputValue}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleContentChange}
          name="password"
          value={password}
        />
        <div className="sign-in-btn-container">
          <button className="sign-in-btn" type="submit">
            Sign in
          </button>
        </div>
      </form>
      <div>
        <LoginSocialFacebook
          appId="206755055457088"
          onLoginStart={onLoginStart}
          redirect_uri={REDIRECT_URI}
          onResolve={onResolve}
          onReject={(error) => {
            console.log(error);
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>
      </div>
      <div>
        <LoginSocialGoogle
          client_id="335380465213-onpgm3trbbg8evainsj23ou12om5tqk1.apps.googleusercontent.com"
          onResolve={onResolve}
          onReject={(error) => {
            console.log(error);
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>
      </div>
    </div>
  );
};

export default SignInForm;
