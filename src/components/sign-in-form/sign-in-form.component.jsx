import React, { useCallback, useState } from "react";
import FormInput from "../form-input/form-input.component";
import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from "react-social-login-buttons";
import "./sign-in-form.styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//import FacebookLogin from "react-facebook-login";

const defaultFormContent = {
  username: "",
  password: "",
};
const isValidEmail = (input) => {
  // 简单的正则表达式，用于验证电子邮件
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(input);
};
const SignInForm = () => {
  // const [login, setLogin] = useState(false);
  // display need to be implemented
  const [inputValue, setInputValue] = useState("");
  const [formContent, setFormContent] = useState(defaultFormContent);
  const [error, setError] = useState("");
  const { username, password } = formContent;

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
  // send accessToken to your backend API
  // async function apiCallToBackend(accessToken, userID) {
  //     try {
  //       const response = await fetch('https://your-backend-api.example.com/login', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           accessToken: accessToken,
  //           userID: userID,
  //         }),
  //       });

  //       if (response.ok) {
  //         const data = await response.json();
  //         return data;
  //       } else {
  //         console.error('Error during the API call:', response.status, response.statusText);
  //         return null;
  //       }
  //     } catch (error) {
  //       console.error('Error during the API call:', error);
  //       return null;
  //     }
  //   }

  const handleContentChange = (event) => {
    const { name, value } = event.target;
    setInputValue(event.target.value);
    setFormContent({ ...formContent, [name]: value });
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isValidEmail(inputValue)) {
        // 输入是一个有效的电子邮件地址，调用邮箱登录函数
        console.log("Email login function called");
        // const url = "http://localhost:8080/api/auth";
        // const { data: res } = await axios.post(url, data);
        // localStorage.setItem("token", res.data);
        // window.location = "/";
      } else {
        // 输入是一个用户名，调用用户名登录函数
        console.log("Username login function called");
      }
      console.log("email sign in successfully");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

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
          appId="1301849283867898"
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
